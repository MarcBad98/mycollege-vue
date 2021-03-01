<template>
  <div>
    <template v-if="$route.query.skill !== null">
      <h1 tabindex="0">{{ $route.query.skill }}</h1>
      <hr aria-hidden="true" />
      <UnderConstruction :feature="`Web Page: ${$route.query.skill}`" />
    </template>
    <template v-else><p tabindex="0">Skill could not be found.</p></template>
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
