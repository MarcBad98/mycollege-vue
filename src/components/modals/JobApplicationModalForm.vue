<template>
  <GenericCardModal ref="generic" topic="Job Application" @submit="submit()">
    <div class="columns">
      <div class="column">
        <b-field id="jobapplicationmodalform-graddate" label="Graduation Date">
          <b-datepicker
            aria-labelledby="jobapplicationmodalform-graddate"
            v-model="application.dateGraduated"
            icon="calendar-today"
          >
          </b-datepicker>
        </b-field>
      </div>
      <div class="column">
        <b-field id="jobapplicationmodalform-startdate" label="Start Date">
          <b-datepicker
            aria-labelledby="jobapplicationmodalform-startdate"
            v-model="application.dateStart"
            icon="calendar-today"
          >
          </b-datepicker>
        </b-field>
      </div>
    </div>
    <b-field id="jobapplicationmodalform-reason" label="Reason">
      <b-input
        aria-labelledby="jobapplicationmodalform-reason"
        v-model="application.reason"
        type="textarea"
      ></b-input>
    </b-field>
  </GenericCardModal>
</template>

<script>
import GenericCardModal from "@/components/generic/GenericCardModal.vue";
import { SendJobApplication } from "@/graphql/Job.gql";

export default {
  name: "JobModalForm",
  components: {
    GenericCardModal
  },
  data() {
    return {
      disabled: false,
      jobId: null,
      application: {}
    };
  },
  methods: {
    open(options) {
      this.$refs.generic.open(options);
      this.jobId = options.jobId;
    },
    submit() {
      this.application.applicant = this.$keycloak.subject;
      this.application.dateGraduated = this.moment(
        this.application.dateGraduated
      ).format("YYYY-MM-DD");
      this.application.dateStart = this.moment(
        this.application.dateStart
      ).format("YYYY-MM-DD");
      this.$apollo
        .mutate({
          mutation: SendJobApplication,
          variables: {
            jobId: this.jobId,
            inputs: this.application
          }
        })
        .then(response => {
          const job = response.data.sendJobApplication.job;
          delete job.__typename;
          this.$store.commit("updateJob", job);
          this.$buefy.snackbar.open(
            "Your job application was successfully saved!"
          );
        });
      this.application = {};
    }
  }
};
</script>
