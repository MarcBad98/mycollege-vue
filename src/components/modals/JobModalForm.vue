<template>
  <GenericCardModal ref="generic" topic="Job" @submit="submit()">
    <b-field label="Title" label-for="jobmodalform-title">
      <b-input
        id="jobmodalform-title"
        v-model="job.title"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <div class="columns">
      <div class="column">
        <b-field label="Employer" label-for="jobmodalform-employer">
          <b-input
            id="jobmodalform-employer"
            v-model="job.employer"
            :disabled="disabled"
            :readonly="readonly"
          ></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Location" label-for="jobmodalform-location">
          <b-input
            id="jobmodalform-location"
            v-model="job.location"
            :disabled="disabled"
            :readonly="readonly"
          ></b-input>
        </b-field>
      </div>
    </div>
    <b-field label="Salary" label-for="jobmodalform-salary">
      <b-input
        id="jobmodalform-salary"
        v-model="job.salary"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field label="Description" label-for="jobmodalform-description">
      <b-input
        id="jobmodalform-description"
        v-model="job.description"
        type="textarea"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
  </GenericCardModal>
</template>

<script>
import GenericCardModal from "@/components/generic/GenericCardModal.vue";
import { CreateJob, UpdateJob, DeleteJob } from "@/graphql/Job.gql";
export default {
  name: "JobModalForm",
  components: {
    GenericCardModal
  },
  data() {
    return {
      isCreate: false,
      isUpdate: false,
      isDelete: false,
      readonly: false,
      disabled: false,
      job: {}
    };
  },
  computed: {
    op() {
      if (this.isCreate) return CreateJob;
      if (this.isUpdate) return UpdateJob;
      if (this.isDelete) return DeleteJob;
      return null;
    }
  },
  methods: {
    open(options) {
      this.$refs.generic.open(options);
      this.isCreate = options.isCreate === true;
      this.isUpdate = options.isUpdate === true;
      this.isDelete = options.isDelete === true;
      this.readonly = options.isRead === true;
      this.disabled = options.isDelete === true;
      const obj = JSON.parse(JSON.stringify(options.form));
      delete obj.__typename;
      delete obj.postedOn;
      delete obj.metadata;
      if (this.isCreate) obj.poster = this.$keycloak.subject;
      this.job = obj;
    },
    submit() {
      this.$apollo
        .mutate({
          mutation: this.op,
          variables: {
            keycloakUserId: this.$keycloak.subject,
            inputs: this.job
          }
        })
        .then(response => {
          if (this.isCreate) {
            const job = response.data.createJob.job;
            this.$store.commit("createJob", job);
            this.$buefy.snackbar.open("Your job was successfully created!");
          } else if (this.isUpdate) {
            const job = response.data.updateJob.job;
            this.$store.commit("updateJob", job);
            this.$buefy.snackbar.open("Your job was successfully updated!");
          } else if (this.isDelete) {
            const job = response.data.deleteJob.job;
            this.$store.commit("deleteJob", job);
            this.$buefy.snackbar.open("Your job was successfully deleted!");
          }
        });
      this.job = {};
    }
  }
};
</script>
