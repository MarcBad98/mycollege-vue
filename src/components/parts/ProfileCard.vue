<template>
  <div class="card">
    <div class="card-content">
      <b-field label="Full Name">
        <b-input :value="fullName" readonly></b-input>
      </b-field>
      <b-field label="Major">
        <b-input :value="profile.major" readonly></b-input>
      </b-field>
      <b-field label="University">
        <b-input :value="profile.currentUniversity" readonly></b-input>
      </b-field>
      <b-field label="About">
        <b-input :value="profile.about" type="textarea" readonly></b-input>
      </b-field>
      <b-field label="Education">
        <template v-if="profile.education.length === 0">
          This person does not have any education listed.
        </template>
        <template v-else>
          <EducationTable :education="profile.education" readonly />
        </template>
      </b-field>
      <b-field label="Employment History">
        <template v-if="profile.education.length === 0">
          This person does not have any education listed.
        </template>
        <template v-else>
          <EmploymentTable :employment="profile.employment" readonly />
        </template>
      </b-field>
    </div>
  </div>
</template>

<script>
import EducationTable from "@/components/tables/EducationTable.vue";
import EmploymentTable from "@/components/tables/EmploymentTable.vue";

export default {
  name: "ProfileCard",
  components: {
    EducationTable,
    EmploymentTable
  },
  props: {
    profile: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    fullName() {
      return this.$store.state.user.fullName;
    }
  }
};
</script>
