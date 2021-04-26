<template>
  <div>
    <h1 tabindex="0" class="title">
      <template v-if="!$keycloak.authenticated">
        Business Analysis and Strategy
      </template>
      <template v-else>
        MyCollege Learning
      </template>
    </h1>
    <hr aria-hidden="true" />
    <CourseTable :courses="courses" :isAuth="$keycloak.authenticated" />
  </div>
</template>

<script>
import CourseTable from "@/components/tables/CourseTable.vue";
import { RetrieveCourses } from "@/graphql/Course.gql";
export default {
  name: "BusinessAnalysis",
  components: {
    CourseTable
  },
  data() {
    return {
      courses: []
    };
  },
  mounted() {
    this.$apollo
      .query({
        query: RetrieveCourses,
        variables: {
          inputs: this.$keycloak.authenticated ? {} : { authRequired: false }
        }
      })
      .then(response => {
        this.courses = response.data.getCourses;
      });
  }
};
</script>
