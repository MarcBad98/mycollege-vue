<template>
  <div>
    <div class="buttons">
      <b-button
        label="Add"
        type="is-primary"
        size="is-small"
        icon-left="plus"
        @click="openModal('Create', {})"
      />
    </div>
    <b-field>
      <b-radio-button
        v-model="filter"
        native-value="no filter"
        type="is-light"
        size="is-small"
      >
        No Filter
      </b-radio-button>
      <b-radio-button
        v-model="filter"
        native-value="ownership"
        type="is-success"
        size="is-small"
      >
        Your Jobs
      </b-radio-button>
      <b-radio-button
        v-model="filter"
        native-value="saved"
        type="is-info"
        size="is-small"
      >
        Saved
      </b-radio-button>
      <b-radio-button
        v-model="filter"
        native-value="applied"
        type="is-info"
        size="is-small"
      >
        Applied
      </b-radio-button>
    </b-field>
    <b-table :data="filteredJobs">
      <b-table-column label="Title" width="25%" v-slot="props">
        {{ props.row.title }}
        <b-taglist>
          <b-tag type="is-success" v-if="isPoster(props.row)"> Your Job </b-tag>
          <b-tag type="is-info" v-if="!isSave(props.row)"> Saved </b-tag>
          <b-tag type="is-info" v-if="hasApplied(props.row)"> Applied </b-tag>
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
        <div class="buttons">
          <b-button
            label="View"
            type="is-info"
            size="is-small"
            icon-left="eye"
            @click="openModal('Read', props.row)"
          />
          <b-button
            label="Update"
            type="is-warning"
            size="is-small"
            icon-left="pencil"
            @click="openModal('Update', props.row)"
            v-if="isPoster(props.row)"
          />
          <b-button
            label="Delete"
            type="is-danger"
            size="is-small"
            icon-left="delete"
            @click="openModal('Delete', props.row)"
            v-if="isPoster(props.row)"
          />
          <b-button
            label="Save"
            type="is-info"
            size="is-small"
            :icon-left="isSave(props.row) ? 'star-check' : 'star-remove'"
            @click="starJob(props.row)"
            v-if="!isPoster(props.row)"
          />
          <b-button
            label="Apply"
            type="is-info"
            size="is-small"
            icon-left="email"
            @click="openApplication(props.row)"
            v-if="!isPoster(props.row)"
            :disabled="hasApplied(props.row)"
          />
        </div>
      </b-table-column>
    </b-table>
    <JobModalForm ref="modal" />
    <JobApplicationModalForm ref="application" />
  </div>
</template>

<script>
import JobModalForm from "@/components/modals/JobModalForm.vue";
import JobApplicationModalForm from "@/components/modals/JobApplicationModalForm.vue";
import { ToggleSaveJob } from "@/graphql/Job.gql";

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
      filter: "no filter"
    };
  },
  computed: {
    filteredJobs() {
      if (this.filter === "ownership") {
        return this.jobs.filter(
          job => job.poster.keycloakUserId === this.$keycloak.subject
        );
      } else if (this.filter === "saved") {
        return this.jobs.filter(
          job =>
            job.savedBy.find(
              user => user.keycloakUserId === this.$keycloak.subject
            ) !== undefined
        );
      } else if (this.filter === "applied") {
        return this.jobs.filter(
          job =>
            job.applications.find(
              application =>
                application.applicant.keycloakUserId === this.$keycloak.subject
            ) !== undefined
        );
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
      const hasApplied = this.hasApplied(form);
      this.$refs.application.open({
        isCreate: !hasApplied,
        jobId: form.id
      });
    },
    starJob(form) {
      const isSave = this.isSave(form);
      this.$apollo
        .mutate({
          mutation: ToggleSaveJob,
          variables: {
            keycloakUserId: this.$keycloak.subject,
            jobId: form.id,
            isSave: isSave
          }
        })
        .then(response => {
          const job = response.data.toggleSaveJob.job;
          delete job.__typename;
          this.$store.commit("updateJob", job);
          this.$buefy.snackbar.open(
            `Job successfully ${isSave ? "starred" : "un-starred"}!`
          );
        });
    },
    isPoster(form) {
      return form.poster.keycloakUserId === this.$keycloak.subject;
    },
    isSave(form) {
      return (
        form.savedBy.find(
          user => user.keycloakUserId === this.$keycloak.subject
        ) === undefined
      );
    },
    hasApplied(form) {
      return (
        form.applications.find(
          application =>
            application.applicant.keycloakUserId === this.$keycloak.subject
        ) !== undefined
      );
    }
  }
};
</script>
