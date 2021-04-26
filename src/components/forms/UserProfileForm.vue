<template>
  <form>
    <b-field label="Full Name" label-for="userprofileform-fullname">
      <b-input
        id="userprofileform-fullname"
        v-model="profile.fullName"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field label="University" label-for="userprofileform-university">
      <b-input
        id="userprofileform-university"
        v-model="profile.university"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field label="Major" label-for="userprofileform-major">
      <b-input
        id="userprofileform-major"
        v-model="profile.major"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field label="About You" label-for="userprofileform-about">
      <b-input
        id="userprofileform-about"
        v-model="profile.about"
        type="textarea"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field label="Education">
      <EducationTable :education="profile.education" :readonly="readonly" />
    </b-field>
    <b-field label="Employment History">
      <EmploymentTable :employment="profile.employment" :readonly="readonly" />
    </b-field>
    <b-button label="Save" type="is-primary" @click="save()" v-if="!readonly" />
  </form>
</template>

<script>
import EducationTable from "@/components/tables/EducationTable.vue";
import EmploymentTable from "@/components/tables/EmploymentTable.vue";
import { UpdateUserProfile } from "@/graphql/User.gql";
export default {
  name: "UserProfileForm",
  components: {
    EducationTable,
    EmploymentTable
  },
  props: {
    user: {
      type: Object,
      default() {
        return {};
      }
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      profile: {
        employment: [],
        education: []
      }
    };
  },
  mounted() {
    this.setComponentData(this.user);
  },
  watch: {
    user(user) {
      this.setComponentData(user);
    }
  },
  methods: {
    setComponentData(user) {
      this.profile = JSON.parse(JSON.stringify(user.profile));
      delete this.profile.__typename;
      this.profile.employment.forEach(emp => delete emp.__typename);
      this.profile.education.forEach(edu => delete edu.__typename);
    },
    save() {
      const notification = this.$store.state.messages.find(message => {
        const matchSender = message.sender === "SYSTEM";
        const matchTitle =
          message.title === "Don't forget to update your profile!";
        return matchSender && matchTitle;
      });
      this.$apollo
        .mutate({
          mutation: UpdateUserProfile,
          variables: {
            keycloakUserId: this.$keycloak.subject,
            profile: this.profile,
            deleteMessage: notification !== undefined,
            messageId: notification !== undefined ? notification.id : null
          }
        })
        .then(response => {
          const user = response.data.updateUser.user;
          this.$store.commit("setUser", user);
          this.$buefy.snackbar.open("Your profile was successfully saved!");
          if (response.data.deleteMessage !== undefined) {
            const message = response.data.deleteMessage.message;
            this.$store.commit("deleteMessage", message);
          }
        });
    }
  }
};
</script>
