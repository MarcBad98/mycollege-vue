<template>
  <div>
    <h2 class="title is-4" tabindex="0">View Profile</h2>
    <UserProfileForm :user="user" readonly />
  </div>
</template>

<script>
import UserProfileForm from "@/components/forms/UserProfileForm.vue";

export default {
  name: "UserProfileView",
  components: {
    UserProfileForm
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
