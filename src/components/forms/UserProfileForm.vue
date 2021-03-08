<template>
  <div>
    <b-field id="userprofileform-fullname" label="Full Name">
      <b-input
        aria-labelledby="userprofileform-fullname"
        v-model="fullName"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field id="userprofileform-major" label="Major">
      <b-input
        aria-labelledby="userprofileform-major"
        v-model="profile.major"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field id="userprofileform-university" label="University">
      <b-input
        aria-labelledby="userprofileform-university"
        v-model="profile.currentUniversity"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field id="userprofileform-aboutyou" label="About You">
      <b-input
        aria-labelledby="userprofileform-aboutyou"
        v-model="profile.about"
        type="textarea"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field label="Education">
      <template v-if="profile.education.length === 0 && readonly">
        <p tabindex="0">
          This person does not have any education records listed.
        </p>
      </template>
      <template v-else>
        <EducationTable :education="profile.education" :readonly="readonly" />
      </template>
    </b-field>
    <b-field label="Employment History">
      <template v-if="profile.employment.length === 0 && readonly">
        <p tabindex="0">
          This person does not have any employment records listed.
        </p>
      </template>
      <template v-else>
        <EmploymentTable
          :employment="profile.employment"
          :readonly="readonly"
        />
      </template>
    </b-field>
    <b-button label="Save" type="is-primary" @click="save()" v-if="!readonly" />
  </div>
</template>

<script>
import EducationTable from "@/components/tables/EducationTable.vue";
import EmploymentTable from "@/components/tables/EmploymentTable.vue";
import { UpdateUserProfile } from "@/graphql/User.gql";
import { EventBus } from "@/EventBus";

export default {
  name: "UserProfileForm",
  components: {
    EducationTable,
    EmploymentTable
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
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
