<template>
  <div>
    <b-field grouped>
      <b-field>
        <b-tooltip label="Add Job" type="is-primary">
          <b-button
            aria-label="Add Job"
            type="is-primary"
            size="is-small"
            icon-left="plus"
            @click="openModal('Create', {})"
            :disabled="!$keycloak.authenticated"
          ></b-button>
        </b-tooltip>
      </b-field>
      <b-field expanded>
        <b-radio-button
          v-model="filter"
          native-value="no-filter"
          type="is-light"
          size="is-small"
          expanded
        >
          No Filter
        </b-radio-button>
        <b-radio-button
          v-model="filter"
          native-value="ownership"
          type="is-success"
          size="is-small"
          expanded
        >
          Your Jobs
        </b-radio-button>
        <b-radio-button
          v-model="filter"
          native-value="applied"
          type="is-info"
          size="is-small"
          expanded
        >
          Applied
        </b-radio-button>
        <b-radio-button
          v-model="filter"
          native-value="saved"
          type="is-warning"
          size="is-small"
          expanded
        >
          Saved
        </b-radio-button>
      </b-field>
    </b-field>
    <b-table :data="filteredJobs" :selected.sync="selected" focusable>
      <b-table-column label="Title" width="25%" v-slot="props">
        {{ props.row.title }}
        <b-taglist>
          <b-tag type="is-success" v-if="props.row.metadata.userIsPoster">
            Your Job
          </b-tag>
          <b-tag type="is-info" v-if="props.row.metadata.userIsApplicant">
            Applied
          </b-tag>
          <b-tag type="is-warning" v-if="props.row.metadata.userHasSaved">
            Saved
          </b-tag>
        </b-taglist>
      </b-table-column>
      <b-table-column label="Employer" width="20%" v-slot="props">
        {{ props.row.employer }}
      </b-table-column>
      <b-table-column label="Location" width="15%" v-slot="props">
        {{ props.row.location }}
      </b-table-column>
      <b-table-column label="Salary" width="15%" v-slot="props">
        {{ props.row.salary }}
      </b-table-column>
      <b-table-column label="Actions" width="25%" v-slot="props">
        <div class="b-tooltips">
          <b-tooltip label="View Job" type="is-info">
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="View Job"
              type="is-info"
              size="is-small"
              icon-left="eye"
              @click="openModal('Read', props.row)"
            ></b-button>
          </b-tooltip>
          <b-tooltip
            label="Update Job"
            type="is-warning"
            v-if="props.row.metadata.userIsPoster"
          >
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="Update Job"
              type="is-warning"
              size="is-small"
              icon-left="pencil"
              @click="openModal('Update', props.row)"
            ></b-button>
          </b-tooltip>
          <b-tooltip
            label="Delete Job"
            type="is-danger"
            v-if="props.row.metadata.userIsPoster"
          >
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="Delete Job"
              type="is-danger"
              size="is-small"
              icon-left="delete"
              @click="openModal('Delete', props.row)"
            ></b-button>
          </b-tooltip>
          <b-tooltip
            label="Star Job"
            type="is-warning"
            v-if="!props.row.metadata.userIsPoster && $keycloak.authenticated"
          >
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="Save Job"
              type="is-warning"
              size="is-small"
              :icon-left="
                props.row.metadata.userHasSaved ? 'star-check' : 'star-remove'
              "
              @click="starJob(props.row)"
            ></b-button>
          </b-tooltip>
          <b-tooltip
            label="Apply"
            type="is-info"
            v-if="!props.row.metadata.userIsPoster && $keycloak.authenticated"
          >
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="Apply"
              type="is-info"
              size="is-small"
              icon-left="email"
              @click="openApplication(props.row)"
              :disabled="props.row.metadata.userIsApplicant"
            ></b-button>
          </b-tooltip>
        </div>
      </b-table-column>
    </b-table>
    <JobModalForm ref="modal" />
    <JobApplicationModalForm ref="application" />
  </div>
</template>

<style lang="scss" scoped>
.b-tooltips {
  .b-tooltip:not(:last-child) {
    margin-right: 0.5em;
  }
  .b-tooltip {
    margin-bottom: 0.5em;
  }
}
</style>

<script>
import JobModalForm from "@/components/modals/JobModalForm.vue";
import JobApplicationModalForm from "@/components/modals/JobApplicationModalForm.vue";
import { UpdateUserSaveJob, UpdateUserUnsaveJob } from "@/graphql/User.gql";
export default {
  name: "JobTable",
  components: {
    JobModalForm,
    JobApplicationModalForm
  },
  props: {
    jobs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      filter: "no-filter",
      selected: {}
    };
  },
  computed: {
    filteredJobs() {
      if (this.filter === "ownership") {
        return this.jobs.filter(job => job.metadata.userIsPoster);
      } else if (this.filter === "applied") {
        return this.jobs.filter(job => job.metadata.userIsApplicant);
      } else if (this.filter === "saved") {
        return this.jobs.filter(job => job.metadata.userHasSaved);
      } else return this.jobs;
    }
  },
  methods: {
    openModal(op, form) {
      this.$refs.modal.open({
        isCreate: op === "Create",
        isRead: op === "Read",
        isUpdate: op === "Update",
        isDelete: op === "Delete",
        form
      });
    },
    openApplication(form) {
      this.$refs.application.open({
        isCreate: true,
        jobId: form.id,
        jobPoster: form.poster
      });
    },
    starJob(form) {
      const isSave = !form.metadata.userHasSaved;
      const variables = { keycloakUserId: this.$keycloak.subject };
      if (isSave) {
        variables.saveJob = form.id;
      } else {
        variables.unsaveJob = form.id;
      }
      this.$apollo
        .mutate({
          mutation: isSave ? UpdateUserSaveJob : UpdateUserUnsaveJob,
          variables: variables
        })
        .then(response => {
          const user = response.data.updateUser.user;
          this.$store.commit("setUser", user);
          this.$store.commit("starJob", form.id);
          this.$buefy.snackbar.open(
            `Job successfully ${isSave ? "starred" : "un-starred"}!`
          );
        });
    },
    tabindex(job) {
      return job.id === this.selected.id ? "0" : "-1";
    }
  }
};
</script>
