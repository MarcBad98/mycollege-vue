<template>
  <div>
    <h1 tabindex="0" class="title">Help Center</h1>
    <hr aria-hidden="true" />
    <div
      tabindex="0"
      class="box has-background-primary-light"
      role="region"
      aria-label="Page Summary"
    >
      <p>
        Welcome to the MyCollege Help Center! Our support team is available 24/7
        across the globe to provide assistance at a moment's notice. Don't know
        how to do something? Having trouble accessing something on our web site?
        If you are having questions like these, then you are on the right web
        page! Keep on reading to find our FAQ section.
      </p>
    </div>
    <UnderConstruction feature="Text Content: Help Center" />
  </div>
</template>

<script>
import UnderConstruction from "@/components/temp/UnderConstruction.vue";
export default {
  name: "HelpCenter",
  components: {
    UnderConstruction
  }
};
</script>
