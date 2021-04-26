<template>
  <div>
    <h1 tabindex="0" class="title">Jobs</h1>
    <hr aria-hidden="true" />
    <JobTable :jobs="jobs" />
  </div>
</template>

<script>
import JobTable from "@/components/tables/JobTable.vue";
import { DeleteMessage } from "@/graphql/Message.gql";
import { RetrieveJobs, RetrieveAppliedJobs } from "@/graphql/Job.gql";
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
    this.deleteNotifications();
    this.createTempNotifications();
  },
  destroyed() {
    this.deleteTempNotifications();
  },
  computed: {
    jobs() {
      return this.$store.state.jobs;
    },
    keycloakUserId() {
      return this.$keycloak.authenticated ? this.$keycloak.subject : "";
    }
  },
  methods: {
    deleteNotifications() {
      const notifications = this.$store.state.messages.filter(message => {
        const matchSender = message.sender === "SYSTEM";
        const matchTitle = message.title.includes("job");
        return matchSender && matchTitle;
      });
      notifications.forEach(notification => {
        this.$apollo
          .mutate({
            mutation: DeleteMessage,
            variables: {
              inputs: {
                id: notification.id
              }
            }
          })
          .then(response => {
            const message = response.data.deleteMessage.message;
            this.$store.commit("deleteMessage", message);
          });
      });
    },
    createTempNotifications() {
      this.$apollo
        .query({
          query: RetrieveAppliedJobs,
          variables: {
            keycloakUserId: this.keycloakUserId
          }
        })
        .then(response => {
          // Notification: Number of Applications
          const jobs = response.data.getJobs;
          this.$store.state.messages.push({
            id: "notification-jobs-1",
            category: "notification",
            title: `You have currently applied for ${jobs.length} jobs!`
          });
          // Notification: Reminder to Apply for Jobs
          const applications = [];
          jobs.forEach(job => {
            applications.push(job.applications[0]);
          });
          if (applications.length !== 0) {
            applications.sort((app1, app2) => {
              const d1 = new Date(app1.appliedOn);
              const d2 = new Date(app2.appliedOn);
              if (d1 < d2) return 1;
              if (d1 > d2) return -1;
              return 0;
            });
            const ms =
              new Date().getTime() -
              new Date(applications[0].appliedOn).getTime();
            const days = ms / (1000 * 60 * 60 * 24);
            if (days >= 7) {
              this.$store.state.messages.push({
                id: "notification-jobs-2",
                category: "notification",
                title: "Make sure that you start applying for jobs today!"
              });
            }
          }
        });
    },
    deleteTempNotifications() {
      this.$store.commit("deleteMessage", { id: "notification-jobs-1" });
      this.$store.commit("deleteMessage", { id: "notification-jobs-2" });
    }
  }
};
</script>
