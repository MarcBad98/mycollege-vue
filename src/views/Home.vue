<template>
  <div>
    <h1>Welcome to MyCollege!</h1>
    <Introduction />
    <SuccessStory />
    <h2>Why Use MyCollege?</h2>
    <UnderConstruction feature="Video: Why Use MyCollege?" />
  </div>
</template>

<script>
import Introduction from "@/components/text/Introduction.vue";
import SuccessStory from "@/components/text/SuccessStory.vue";
import UnderConstruction from "@/components/temp/UnderConstruction.vue";

export default {
  name: "Home",
  components: {
    Introduction,
    SuccessStory,
    UnderConstruction
  }
};
</script>
