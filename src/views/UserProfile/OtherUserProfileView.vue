<template>
  <div>
    <h1 tabindex="0">User Profile</h1>
    <div class="buttons" v-if="showFriendsRequestButton">
      <b-button
        label="Send Friend Request"
        type="is-info"
        icon-left="account-plus"
        @click="sendFriendsRequest()"
      />
    </div>
    <hr aria-hidden="true" />
    <UserProfileForm :user="user" readonly />
  </div>
</template>

<script>
import UserProfileForm from "@/components/forms/UserProfileForm.vue";
import { CreateRetrieveUser } from "@/graphql/User.gql";
import { SendFriendsRequest } from "@/graphql/FriendsRequest.gql";

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
    showFriendsRequestButton() {
      const isAnonymous = !this.$keycloak.authenticated;
      const isSameUser =
        this.$store.state.user.keycloakUserId === this.$route.params.id;
      if (isAnonymous || isSameUser) return false;
      return (
        this.$store.state.friendsRequests.find(
          request =>
            request.pairing.includes(this.$store.state.user.keycloakUserId) &&
            request.pairing.includes(this.$route.params.id)
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
    }
  }
};
</script>
