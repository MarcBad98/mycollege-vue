<template>
  <div>
    <h1 tabindex="0" class="title">Training and Education</h1>
    <hr aria-hidden="true" />
    <div class="columns">
      <div class="column is-one-quarter">
        <b-menu
          tabindex="0"
          role="menu"
          aria-label="Training and Education Menu"
          class="box has-background-light"
        >
          <b-menu-list label="Training and Education">
            <b-menu-item
              tag="router-link"
              :to="{ name: 'AccessibilityTraining' }"
              label="Training: Accessibility"
              :active="$route.name === 'AccessibilityTraining'"
            ></b-menu-item>
            <b-menu-item
              tag="router-link"
              :to="{ name: 'DiversityTraining' }"
              label="Training: Diversity"
              :active="$route.name === 'DiversityTraining'"
            ></b-menu-item>
            <b-menu-item
              tag="router-link"
              :to="{ name: 'SensitivityTraining' }"
              label="Training: Sensitivity"
              :active="$route.name === 'SensitivityTraining'"
            ></b-menu-item>
            <b-menu-item
              tag="router-link"
              :to="{ name: 'AwarenessTraining' }"
              label="Training: Awareness"
              :active="$route.name === 'AwarenessTraining'"
            ></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrainingEducation"
};
</script>
