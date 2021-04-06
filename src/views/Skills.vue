<template>
  <div>
    <h1 tabindex="0" class="title">{{ $route.query.skill }}</h1>
    <hr aria-hidden="true" />
    <UnderConstruction :feature="`Web Page: ${$route.query.skill}`" />
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
