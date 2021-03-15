<template>
  <div>
    <h1 tabindex="0">Search Results</h1>
    <p tabindex="0" class="subtitle">Keyword: {{ $route.query.keyword }}</p>
    <hr aria-hidden="true" />
    <template v-if="users.length !== 0">
      <UserTable :users="users" />
    </template>
    <template v-else>
      <p tabindex="0">No search results to display.</p>
    </template>
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
  watch: {
    "$route.query.keyword"() {
      this.requestSearch();
    }
  },
  mounted() {
    this.requestSearch();
  },
  methods: {
    requestSearch() {
      this.$apollo
        .mutate({
          mutation: SearchUsers,
          variables: {
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
