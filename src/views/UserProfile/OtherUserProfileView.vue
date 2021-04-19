<template>
  <div>
    <h1 tabindex="0" class="title">{{ user.profile.fullName }}</h1>
    <p tabindex="0" class="subtitle">User Profile</p>
    <hr aria-hidden="true" />
    <UserProfileForm :user="user" readonly />
  </div>
</template>

<script>
import UserProfileForm from "@/components/forms/UserProfileForm.vue";
import { CreateRetrieveUser } from "@/graphql/User.gql";
export default {
  name: "OtherUserProfileView",
  components: {
    UserProfileForm
  },
  data() {
    return {
      user: {
        keycloakUserId: null,
        profile: {
          fullName: null,
          major: null,
          university: null,
          about: null,
          employment: [],
          education: []
        }
      }
    };
  },
  mounted() {
    this.retrieveUser();
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
    }
  }
};
</script>
