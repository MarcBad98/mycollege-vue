<template>
  <div>
    <h1 tabindex="0">Press</h1>
    <hr aria-hidden="true" />
    <div
      tabindex="0"
      class="box has-background-light"
      role="region"
      aria-label="Page Summary"
    >
      <p>
        Welcome to the MyCollege Pressroom! Stay on top of the latest news,
        updates, and reports concerning potential employers and the future of
        your industry. Below, you will find trending articles from reliable and
        trusted news sources. Rather than arbitrarily choosing which news source
        to offer in the MyCollege Pressroom, our team lets the MyCollege
        community vote on news sources. Let your voice be heard; voting is
        conducted every first Tuesday of every month.
      </p>
    </div>
    <UnderConstruction feature="Text Content: Press" />
  </div>
</template>

<script>
import UnderConstruction from "@/components/temp/UnderConstruction.vue";

export default {
  name: "Press",
  components: {
    UnderConstruction
  }
};
</script>
