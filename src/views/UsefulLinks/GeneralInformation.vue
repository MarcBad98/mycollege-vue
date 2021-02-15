<template>
  <div>
    <h1>General</h1>
    <div class="box has-background-light">
      <h2>Table of Content</h2>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#help-center">Help Center</a></li>
        <li><a href="#press">Press</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#careers">Careers</a></li>
        <li><a href="#developers">Developers</a></li>
      </ul>
    </div>
    <h2 id="about">About</h2>
    <About />
    <h2 id="help-center">Help Center</h2>
    <HelpCenter />
    <h2 id="press">Press</h2>
    <Press />
    <h2 id="blog">Blog</h2>
    <UnderConstruction feature="Content: Blog" />
    <h2 id="careers">Careers</h2>
    <UnderConstruction feature="Content: Careers" />
    <h2 id="developers">Developers</h2>
    <UnderConstruction feature="Content: Developers" />
  </div>
</template>

<script>
import About from "@/components/text/About.vue";
import HelpCenter from "@/components/text/HelpCenter.vue";
import Press from "@/components/text/Press.vue";
import UnderConstruction from "@/components/temp/UnderConstruction.vue";

export default {
  name: "General",
  components: {
    About,
    HelpCenter,
    Press,
    UnderConstruction
  }
};
</script>
