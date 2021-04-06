<template>
  <div id="app">
    <NavBar />
    <main class="section container">
      <div class="content box">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { CreateRetrieveUser } from "@/graphql/User.gql";

export default {
  components: {
    NavBar
  },
  mounted() {
    if (this.$keycloak.authenticated) {
      this.retrieveUser();
      this.$buefy.snackbar.open("Login successful. Welcome to MyCollege!");
    }
  },
  methods: {
    retrieveUser() {
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
        });
    }
  }
};
</script>
