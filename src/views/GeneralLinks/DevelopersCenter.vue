<template>
  <div>
    <h1 tabindex="0" class="title">Developers Center</h1>
    <hr aria-hidden="true" />
    <div
      tabindex="0"
      class="box has-background-primary-light"
      role="region"
      aria-label="Page Summary"
    >
      <p>
        Welcome to the MyCollege Developers Center! Looking to use the MyCollege
        API to integrate in your projects and web sites? Find all the necessary
        resources, guides, and tutorials below.
      </p>
    </div>
    <UnderConstruction feature="Web Page: Developers Center" />
  </div>
</template>

<script>
import UnderConstruction from "@/components/temp/UnderConstruction.vue";
export default {
  name: "DevelopersCenter",
  components: {
    UnderConstruction
  }
};
</script>
