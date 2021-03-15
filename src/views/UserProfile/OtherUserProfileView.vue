<template>
  <div>
    <h1 tabindex="0">{{ $route.params.fullName }}'s Profile</h1>
    <b-button
      label="Send Friends Request"
      type="is-info"
      @click="sendFriendsRequest()"
    />
    <hr aria-hidden="true" />
    <UserProfileForm :otherUser="$route.params.user" readonly />
  </div>
</template>

<script>
import UserProfileForm from "@/components/forms/UserProfileForm.vue";

export default {
  name: "OtherUserProfileView",
  components: {
    UserProfileForm
  },
  methods: {
    sendFriendsRequest() {
      /* TODO: complete */
    }
  }
};
</script>
