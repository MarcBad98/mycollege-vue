<template>
  <div>
    <h1 tabindex="0">User Profile</h1>
    <div class="buttons">
      <b-button
        label="Send Friend Request"
        type="is-info"
        icon-left="account-plus"
        :disabled="disable || disableRequest"
        @click="sendFriendsRequest()"
      />
      <b-button
        label="Accept Friend Request"
        type="is-success"
        icon-left="account-check"
        :disabled="disable || disableResponse"
        @click="acceptFriendsRequest()"
      />
      <b-button
        label="Reject Friend Request"
        type="is-danger"
        icon-left="account-cancel"
        :disabled="disable || disableResponse"
        @click="rejectFriendsRequest()"
      />
    </div>
    <hr aria-hidden="true" />
    <UserProfileForm :user="user" readonly />
  </div>
</template>

<script>
import UserProfileForm from "@/components/forms/UserProfileForm.vue";
import { CreateRetrieveUser } from "@/graphql/User.gql";
import {
  SendFriendsRequest,
  AcceptFriendsRequest,
  RejectFriendsRequest
} from "@/graphql/FriendsRequest.gql";

export default {
  name: "OtherUserProfileView",
  components: {
    UserProfileForm
  },
  data() {
    return {
      user: {
        keycloakUserId: null,
        fullName: null,
        profile: {
          major: null,
          currentUniversity: null,
          about: null,
          employment: [],
          education: []
        },
        settings: {
          subscriptionsEmail: null,
          subscriptionsSms: null,
          targetedAdvertising: null,
          language: null
        }
      }
    };
  },
  mounted() {
    this.retrieveUser();
  },
  computed: {
    disable() {
      const isAnonymous = !this.$keycloak.authenticated;
      const isSameUser =
        this.$store.state.user.keycloakUserId === this.$route.params.id;
      return isAnonymous || isSameUser;
    },
    disableRequest() {
      return (
        this.$store.state.friendsRequests.find(
          request =>
            request.pairing.includes(this.$store.state.user.keycloakUserId) &&
            request.pairing.includes(this.$route.params.id)
        ) !== undefined
      );
    },
    disableResponse() {
      if (!this.disableRequest) return true;
      return (
        this.$store.state.friendsRequests.find(
          request =>
            request.status === "PENDING" &&
            request.pairing[0] === this.$route.params.id &&
            request.pairing[1] === this.$store.state.user.keycloakUserId
        ) === undefined
      );
    }
  },
  methods: {
    retrieveUser() {
      this.$apollo
        .mutate({
          mutation: CreateRetrieveUser,
          variables: { keycloakUserId: this.$route.params.id }
        })
        .then(response => {
          this.user = response.data.createRetrieveUser.user;
        });
    },
    sendFriendsRequest() {
      this.$apollo
        .mutate({
          mutation: SendFriendsRequest,
          variables: {
            pairing: [
              this.$store.state.user.keycloakUserId,
              this.$route.params.id
            ]
          }
        })
        .then(response => {
          const friendsRequest =
            response.data.createFriendsRequest.friendsRequest;
          this.$store.commit("addFriendsRequest", friendsRequest);
          this.$buefy.snackbar.open("Successfully sent a friends request!");
        });
    },
    acceptFriendsRequest() {
      this.$apollo
        .mutate({
          mutation: AcceptFriendsRequest,
          variables: {
            pairing: [
              this.$route.params.id,
              this.$store.state.user.keycloakUserId
            ]
          }
        })
        .then(response => {
          const friendsRequest =
            response.data.updateFriendsRequest.friendsRequest;
          this.$store.commit("updateFriendsRequest", friendsRequest);
          this.$buefy.snackbar.open("Accepted the friends request!");
        });
    },
    rejectFriendsRequest() {
      this.$apollo
        .mutate({
          mutation: RejectFriendsRequest,
          variables: {
            pairing: [
              this.$route.params.id,
              this.$store.state.user.keycloakUserId
            ]
          }
        })
        .then(response => {
          const friendsRequest =
            response.data.deleteFriendsRequest.friendsRequest;
          this.$store.commit("deleteFriendsRequest", friendsRequest);
          this.$buefy.snackbar.open("Rejected the friends request!");
        });
    }
  }
};
</script>
