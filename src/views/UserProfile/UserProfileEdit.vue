<template>
  <div>
    <h2 tabindex="0">Edit Profile</h2>
    <UserProfileForm />
  </div>
</template>

<script>
import UserProfileForm from "@/components/forms/UserProfileForm.vue";

export default {
  name: "UserProfileEdit",
  components: {
    UserProfileForm
  }
};
</script>
