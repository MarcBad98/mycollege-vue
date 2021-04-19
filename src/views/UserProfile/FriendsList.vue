<template>
  <div>
    <h1 tabindex="0" class="title">Friends List</h1>
    <hr aria-hidden="true" />
    <UserTable :users="friends" />
  </div>
</template>

<script>
import UserTable from "@/components/tables/UserTable.vue";
import { RetrieveUsers } from "@/graphql/User.gql";
export default {
  name: "FriendsList",
  components: {
    UserTable
  },
  data() {
    return {
      friends: []
    };
  },
  mounted() {
    this.retrieveFriends();
  },
  methods: {
    retrieveFriends() {
      this.$apollo
        .query({
          query: RetrieveUsers,
          variables: {
            keycloakUserId: this.$keycloak.subject,
            filters: {
              friend: this.$keycloak.subject
            }
          }
        })
        .then(response => {
          this.friends = response.data.getUsers;
        });
    }
  }
};
</script>
