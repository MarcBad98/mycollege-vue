<template>
  <div>
    <h1 tabindex="0" class="title">Search Results</h1>
    <p tabindex="0" class="subtitle">Based On: {{ $route.query.keyword }}</p>
    <hr aria-hidden="true" />
    <UserTable :users="users" />
  </div>
</template>

<script>
import UserTable from "@/components/tables/UserTable.vue";
import { SearchUsers } from "@/graphql/User.gql";
export default {
  name: "SearchResults",
  components: {
    UserTable
  },
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.requestSearch();
  },
  watch: {
    "$route.query.keyword"() {
      this.requestSearch();
    }
  },
  computed: {
    keycloakUserId() {
      return this.$keycloak.authenticated ? this.$keycloak.subject : "";
    }
  },
  methods: {
    requestSearch() {
      this.$apollo
        .query({
          query: SearchUsers,
          variables: {
            keycloakUserId: this.keycloakUserId,
            keyword: this.$route.query.keyword
          }
        })
        .then(response => {
          this.users = response.data.searchUsers;
        });
    }
  }
};
</script>
