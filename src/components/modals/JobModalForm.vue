<template>
  <GenericCardModal ref="generic" topic="Job" @submit="submit()">
    <b-field id="jobmodalform-title" label="Title">
      <b-input
        aria-labelledby="jobmodalform-title"
        v-model="job.title"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field id="jobmodalform-employer" label="Employer">
      <b-input
        aria-labelledby="jobmodalform-employer"
        v-model="job.employer"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field id="jobmodalform-location" label="Location">
      <b-input
        aria-labelledby="jobmodalform-location"
        v-model="job.location"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field id="jobmodalform-salary" label="Salary">
      <b-input
        aria-labelledby="jobmodalform-salary"
        v-model="job.salary"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field id="jobmodalform-description" label="Description">
      <b-input
        aria-labelledby="jobmodalform-description"
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
      delete obj.poster;
      delete obj.savedBy;
      delete obj.applications;
      this.job = obj;
    },
    submit() {
      if (this.isCreate) this.job.poster = this.$keycloak.subject;
      this.$apollo
        .mutate({
          mutation: this.op,
          variables: {
            inputs: this.job
          }
        })
        .then(response => {
          if (this.isCreate) {
            const job = response.data.createJob.job;
            this.$store.commit("createJob", job);
            this.$buefy.snackbar.open("Your job was successfully created!");
          }
          if (this.isUpdate) {
            const job = response.data.updateJob.job;
            this.$store.commit("updateJob", job);
            this.$buefy.snackbar.open("Your job was successfully updated!");
          }
          if (this.isDelete) {
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
