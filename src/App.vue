<template>
  <div id="app">
    <NavBar />
    <main class="section container">
      <Notifications />
      <div class="box">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Notifications from "@/components/Notifications.vue";
import { CreateRetrieveUser } from "@/graphql/User.gql";
import { RetrieveMessages } from "@/graphql/Message.gql";
export default {
  components: {
    NavBar,
    Notifications
  },
  mounted() {
    if (this.$keycloak.authenticated) {
      this.$apollo
        .mutate({
          mutation: CreateRetrieveUser,
          variables: {
            keycloakUserId: this.$keycloak.subject
          }
        })
        .then(response => {
          const user = response.data.createRetrieveUser.user;
          this.$store.commit("setUser", user);
          this.$buefy.snackbar.open("Login successful. Welcome to MyCollege!");
          this.$apollo
            .query({
              query: RetrieveMessages,
              variables: {
                keycloakUserId: this.$keycloak.subject
              }
            })
            .then(response => {
              const messages = response.data.getMessages;
              this.$store.commit("setMessages", messages);
            });
        });
    }
  }
};
</script>
