<template>
  <div>
    <h2>View Profile</h2>
    <ProfileCard :profile="profile" />
  </div>
</template>

<script>
import ProfileCard from "@/components/parts/ProfileCard.vue";

export default {
  name: "ProfileView",
  components: {
    ProfileCard
  },
  computed: {
    profile() {
      return this.$store.state.user.profile;
    }
  }
};
</script>
