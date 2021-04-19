<template>
  <div>
    <h1 tabindex="0" class="title">Jobs</h1>
    <hr aria-hidden="true" />
    <JobTable :jobs="jobs" />
  </div>
</template>

<script>
import JobTable from "@/components/tables/JobTable.vue";
import { RetrieveJobs } from "@/graphql/Job.gql";
export default {
  name: "Jobs",
  components: {
    JobTable
  },
  mounted() {
    this.$apollo
      .mutate({
        mutation: RetrieveJobs,
        variables: {
          keycloakUserId: this.keycloakUserId
        }
      })
      .then(response => {
        const jobs = response.data.getJobs;
        this.$store.commit("setJobs", jobs);
      });
  },
  computed: {
    jobs() {
      return this.$store.state.jobs;
    },
    keycloakUserId() {
      return this.$keycloak.authenticated ? this.$keycloak.subject : "";
    }
  }
};
</script>
