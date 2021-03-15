<template>
  <div>
    <h1 tabindex="0">Settings</h1>
    <hr aria-hidden="true" />
    <UserSettingsForm />
  </div>
</template>

<script>
import UserSettingsForm from "@/components/forms/UserSettingsForm.vue";

export default {
  name: "UserSettings",
  components: {
    UserSettingsForm
  }
};
</script>
