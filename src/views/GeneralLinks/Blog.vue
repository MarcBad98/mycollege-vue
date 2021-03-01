<template>
  <div>
    <h1 tabindex="0">Blog</h1>
    <hr aria-hidden="true" />
    <div
      tabindex="0"
      class="box has-background-light"
      role="region"
      aria-label="Page Summary"
    >
      <p>
        Welcome to the MyCollege Blog! Stay on top of the latest news, updates,
        and reports concerning the MyCollege team, company, and website.
        Interested in learning about the newest features? How about learning
        about the team behind MyCollege? If that's the case, you're on the right
        page!
      </p>
    </div>
    <UnderConstruction feature="Web Page: Blog" />
  </div>
</template>

<script>
import UnderConstruction from "@/components/temp/UnderConstruction.vue";

export default {
  name: "Blog",
  components: {
    UnderConstruction
  }
};
</script>
