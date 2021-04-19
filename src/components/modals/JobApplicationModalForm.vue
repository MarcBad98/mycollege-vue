<template>
  <GenericCardModal ref="generic" topic="Job Application" @submit="submit()">
    <div class="columns">
      <div class="column">
        <b-field
          label="Graduation Date"
          label-for="jobapplicationmodalform-graddate"
        >
          <b-datepicker
            id="jobapplicationmodalform-graddate"
            v-model="application.dateGraduated"
            icon="calendar-today"
          ></b-datepicker>
        </b-field>
      </div>
      <div class="column">
        <b-field
          label="Start Date"
          label-for="jobapplicationmodalform-startdate"
        >
          <b-datepicker
            id="jobapplicationmodalform-startdate"
            v-model="application.dateStart"
            icon="calendar-today"
          ></b-datepicker>
        </b-field>
      </div>
    </div>
    <b-field label="Reason" label-for="jobapplicationmodalform-reason">
      <b-input
        id="jobapplicationmodalform-reason"
        v-model="application.reason"
        type="textarea"
      ></b-input>
    </b-field>
  </GenericCardModal>
</template>

<script>
import GenericCardModal from "@/components/generic/GenericCardModal.vue";
import { UpdateJob } from "@/graphql/Job.gql";
export default {
  name: "JobModalForm",
  components: {
    GenericCardModal
  },
  data() {
    return {
      jobId: null,
      jobPoster: null,
      application: {}
    };
  },
  methods: {
    open(options) {
      this.$refs.generic.open(options);
      this.jobId = options.jobId;
      this.jobPoster = options.jobPoster;
    },
    submit() {
      const fmt = "YYYY-MM-DD";
      this.application.applicant = this.$keycloak.subject;
      this.application.dateGraduated = this.moment(
        this.application.dateGraduated
      ).format(fmt);
      this.application.dateStart = this.moment(
        this.application.dateStart
      ).format(fmt);
      this.$apollo
        .mutate({
          mutation: UpdateJob,
          variables: {
            keycloakUserId: this.$keycloak.subject,
            inputs: {
              id: this.jobId,
              poster: this.jobPoster,
              addJobApplication: this.application
            }
          }
        })
        .then(response => {
          const job = response.data.updateJob.job;
          this.$store.commit("updateJob", job);
          this.$buefy.snackbar.open("Your application was successfully sent!");
        });
      this.application = {};
    }
  }
};
</script>
