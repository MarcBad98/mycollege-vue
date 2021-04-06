<template>
  <div>
    <h2 tabindex="0" class="title is-4">Settings</h2>
    <UserSettingsForm :user="user" />
  </div>
</template>

<script>
import UserSettingsForm from "@/components/forms/UserSettingsForm.vue";
export default {
  name: "UserSettings",
  components: {
    UserSettingsForm
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
