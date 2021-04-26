<template>
  <b-table :data="courses" :selected.sync="selected" focusable>
    <b-table-column label="Title" width="50%" v-slot="props">
      {{ props.row.title }}
    </b-table-column>
    <b-table-column label="Actions" width="50%" v-slot="props">
      <div class="b-tooltips">
        <b-tooltip label="Take Course" type="is-success">
          <b-button
            :tabindex="tabindex(props.row)"
            aria-label="Take Course"
            type="is-success"
            size="is-small"
            icon-left="head-lightbulb"
            :disabled="!isAuth || hasTakenCourse(props.row)"
            @click="takeCourse(props.row)"
          ></b-button>
        </b-tooltip>
        <b-tooltip label="Re-take Course" type="is-warning">
          <b-button
            :tabindex="tabindex(props.row)"
            aria-label="Re-take Course"
            type="is-warning"
            size="is-small"
            icon-left="refresh"
            :disabled="!isAuth"
            @click="retakeCourse(props.row)"
          ></b-button>
        </b-tooltip>
      </div>
    </b-table-column>
    <template #empty>
      <p tabindex="0" class="has-text-centered">
        No courses listed.
      </p>
    </template>
    <template #footer v-if="!isAuth">
      <p tabindex="0" class="has-text-centered">
        Not seeing what you’re looking for?
        <a @click="$keycloak.keycloak.login()">Sign in</a>
        to see all 7,609 results.
      </p>
    </template>
  </b-table>
</template>

<style lang="scss" scoped>
.b-tooltips {
  .b-tooltip:not(:last-child) {
    margin-right: 0.5em;
  }
  .b-tooltip {
    margin-bottom: 0.5em;
  }
}
</style>

<script>
import { UpdateUserCourses } from "@/graphql/User.gql";
export default {
  name: "CourseTable",
  props: {
    courses: {
      type: Array,
      default() {
        return [];
      }
    },
    isAuth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: {}
    };
  },
  methods: {
    takeCourse(form) {
      this.$apollo
        .mutate({
          mutation: UpdateUserCourses,
          variables: {
            keycloakUserId: this.$keycloak.subject,
            course: form.title
          }
        })
        .then(response => {
          const user = response.data.updateUser.user;
          this.$store.commit("setUser", user);
          this.$buefy.snackbar.open(`"${form.title}" completed!`);
        });
    },
    retakeCourse(form) {
      this.$buefy.snackbar.open(`"${form.title}" completed again!`);
    },
    hasTakenCourse(form) {
      return (
        this.$store.state.user.courses.find(course => course === form.title) !==
        undefined
      );
    },
    tabindex(job) {
      return job.id === this.selected.id ? "0" : "-1";
    }
  }
};
</script>
