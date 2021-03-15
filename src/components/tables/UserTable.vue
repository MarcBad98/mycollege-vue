<template>
  <b-table :data="users">
    <b-table-column label="Full Name" width="25%" v-slot="props">
      {{ props.row.fullName }}
    </b-table-column>
    <b-table-column label="University" width="25%" v-slot="props">
      {{ props.row.profile.currentUniversity }}
    </b-table-column>
    <b-table-column label="Major" width="25%" v-slot="props">
      {{ props.row.profile.major }}
    </b-table-column>
    <b-table-column label="Actions" width="25%" v-slot="props">
      <div class="buttons">
        <b-button
          tag="router-link"
          :to="{
            name: 'OtherUserProfileView',
            params: { fullName: props.row.fullName, user: props.row }
          }"
          label="View"
          type="is-info"
          size="is-small"
          icon-left="eye"
        />
        <b-button
          label="Send Friend Request"
          type="is-info"
          size="is-small"
          icon-left="account-plus"
          @click="sendFriendsRequest(props.row)"
          v-if="displayFriendsRequest(props.row)"
        />
      </div>
    </b-table-column>
  </b-table>
</template>

<script>
import { SendFriendsRequest } from "@/graphql/FriendsRequest.gql";

export default {
  name: "UserTable",
  props: {
    users: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    sendFriendsRequest(otherUser) {
      this.$apollo
        .mutate({
          mutation: SendFriendsRequest,
          variables: {
            pairing: [
              this.$store.state.user.keycloakUserId,
              otherUser.keycloakUserId
            ]
          }
        })
        .then(response => {
          this.$store.state.friendsRequests.push(
            response.data.createFriendsRequest.friendsRequest
          );
          this.$buefy.snackbar.open("Successfully sent friend request!");
        });
    },
    displayFriendsRequest(otherUser) {
      if (!this.$keycloak.authenticated) return false;
      return (
        this.$store.state.friendsRequests.find(
          request =>
            request.pairing.includes(this.$store.state.user.keycloakUserId) &&
            request.pairing.includes(otherUser.keycloakUserId)
        ) === undefined
      );
    }
  }
};
</script>
