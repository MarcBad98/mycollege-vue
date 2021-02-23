<template>
  <div>
    <h2>Edit Profile</h2>
    <b-field label="Full Name">
      <b-input v-model="fullName"></b-input>
    </b-field>
    <b-field label="Title">
      <b-input v-model="profile.title"></b-input>
    </b-field>
    <b-field label="Major">
      <b-input v-model="profile.major"></b-input>
    </b-field>
    <b-field label="University">
      <b-input v-model="profile.currentUniversity"></b-input>
    </b-field>
    <b-field label="About You">
      <b-input v-model="profile.about" type="textarea"></b-input>
    </b-field>
    <b-field label="Employment">
      <EmploymentTable :employment="profile.employment" />
    </b-field>
    <b-field label="Education">
      <template v-if="profile.education.length === 0">
        <p>You have no education listed.</p>
      </template>
    </b-field>
    <b-button label="Save" type="is-primary" v-on:click="save()" />
  </div>
</template>

<script>
import EmploymentTable from "@/components/parts/EmploymentTable.vue";
import { UpdateUserProfile } from "@/graphql/User.gql";
import { EventBus } from "@/EventBus";

export default {
  name: "ProfileEdit",
  components: {
    EmploymentTable
  },
  data() {
    return {
      fullName: null,
      profile: {
        employment: [],
        education: []
      }
    };
  },
  mounted() {
    this.updateProfile();
    EventBus.$on("retrieved-user-data", () => {
      this.updateProfile();
    });
  },
  destroyed() {
    EventBus.$off("retrieved-user-data");
  },
  methods: {
    updateProfile() {
      this.fullName = this.$store.state.user.fullName;
      this.profile = JSON.parse(JSON.stringify(this.$store.state.user.profile));
      delete this.profile.__typename;
      this.profile.employment.forEach(emp => delete emp.__typename);
      this.profile.education.forEach(edu => delete edu.__typename);
    },
    save() {
      this.$apollo
        .mutate({
          mutation: UpdateUserProfile,
          variables: {
            keycloakUserId: this.$keycloak.subject,
            fullName: this.fullName,
            profile: this.profile
          }
        })
        .then(response => {
          this.$store.state.user = response.data.updateUser.user;
          this.$buefy.snackbar.open("Your profile was successfully saved!");
          EventBus.$emit("retrieved-user-data");
        });
    }
  }
};
</script>
