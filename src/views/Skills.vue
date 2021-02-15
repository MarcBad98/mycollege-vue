<template>
  <div>
    <template v-if="$route.query.skill !== null">
      <h1>{{ $route.query.skill }}</h1>
      <hr />
      <UnderConstruction :feature="`Web Page: ${$route.query.skill}`" />
    </template>
    <template v-else> Skill could not be found. </template>
  </div>
</template>

<script>
import UnderConstruction from "@/components/temp/UnderConstruction.vue";

export default {
  name: "Skills",
  components: {
    UnderConstruction
  }
};
</script>
