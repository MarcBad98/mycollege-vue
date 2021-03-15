<template>
  <div>
    <h1 tabindex="0">Friends List</h1>
    <hr aria-hidden="true" />
    <UserTable :users="friends" />
  </div>
</template>

<script>
import UserTable from "@/components/tables/UserTable.vue";
import { RetrieveFriends } from "@/graphql/Friend.gql";

export default {
  name: "FriendsList.vue",
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
          query: RetrieveFriends,
          variables: { keycloakUserId: this.$keycloak.subject }
        })
        .then(response => {
          const friends = response.data.getFriends;
          this.friends = friends.map(friend => {
            const copy = { ...friend };
            delete copy.major;
            delete copy.currentUniversity;
            copy.profile = {
              major: friend.major,
              currentUniversity: friend.currentUniversity
            };
            return copy;
          });
        });
    }
  }
};
</script>
