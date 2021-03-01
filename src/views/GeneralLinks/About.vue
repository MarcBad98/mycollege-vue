<template>
  <div>
    <h1 tabindex="0">About</h1>
    <hr aria-hidden="true" />
    <div
      tabindex="0"
      role="region"
      class="box has-background-light"
      aria-label="Page Summary"
    >
      <p>
        Welcome to MyCollege, the world's largest college student network with
        users in many countries and territories worldwide. Our goal is to
        provide college students across the globe with the tools, skills, and
        connections necessary to kickstart their careers. To learn more about
        us, continue reading this web page.
      </p>
    </div>
    <UnderConstruction feature="Text Content: About" />
  </div>
</template>

<script>
import UnderConstruction from "@/components/temp/UnderConstruction.vue";

export default {
  name: "About",
  components: {
    UnderConstruction
  }
};
</script>
