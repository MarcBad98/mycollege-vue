<template>
  <div>
    <h2 tabindex="0">View Profile</h2>
    <UserProfileForm readonly />
  </div>
</template>

<script>
import UserProfileForm from "@/components/forms/UserProfileForm.vue";

export default {
  name: "UserProfileView",
  components: {
    UserProfileForm
  }
};
</script>
