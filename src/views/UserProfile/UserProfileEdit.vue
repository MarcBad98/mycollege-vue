<template>
  <div>
    <h2 tabindex="0" class="title is-4">Edit Profile</h2>
    <UserProfileForm :user="user" />
  </div>
</template>

<script>
import UserProfileForm from "@/components/forms/UserProfileForm.vue";
export default {
  name: "UserProfileEdit",
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
