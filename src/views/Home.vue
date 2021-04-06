<template>
  <div class="content">
    <h1 tabindex="0" class="title">Welcome to MyCollege!</h1>
    <hr aria-hidden="true" />
    <p tabindex="0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et eros
      purus. Sed vestibulum sagittis sem, eu porttitor quam pretium et. Nulla
      magna ante, congue pretium convallis nec, condimentum ac libero. Integer
      et mi vel lectus dapibus ultrices vel nec sem. Praesent vel nunc tellus.
      Cras venenatis metus at diam dapibus tempus. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nullam quis tempus magna, ac tincidunt dolor.
      Etiam eget augue mauris. Praesent molestie pretium blandit. Integer eget
      pharetra nunc, a iaculis diam. Curabitur nec sem eu eros commodo suscipit.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo
      lorem scelerisque varius rutrum.
    </p>
    <div
      tabindex="0"
      class="box has-background-primary-light"
      role="region"
      aria-label="Success Story"
    >
      <p>
        Nullam odio nunc, viverra in tincidunt tincidunt, molestie dignissim
        lacus. Donec aliquet consectetur sollicitudin. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Cras tincidunt congue vehicula. Maecenas euismod sapien ut leo interdum
        euismod. Vivamus sodales leo in nunc blandit rhoncus. Fusce et sagittis
        mi, et ornare magna. Nunc at interdum leo, rhoncus tempus arcu. Cras
        imperdiet, odio ut commodo finibus, nulla augue hendrerit nisl, sed
        rutrum ligula lectus ac nisi. Nulla malesuada sem at ligula convallis
        pellentesque. Cras rutrum ullamcorper nulla, nec aliquet libero.
        Pellentesque ullamcorper maximus urna eu suscipit. Sed consectetur eu
        sapien a fermentum.
      </p>
      <p>
        Nulla tempor, lacus non bibendum ultricies, lacus mi rutrum turpis, sed
        dignissim dui dui eget metus. Curabitur tempus tincidunt eros, sed
        dictum urna volutpat sit amet. Mauris magna tortor, vehicula sit amet
        ipsum sed, ultrices sodales felis. Donec iaculis, sapien eu aliquam
        fringilla, turpis diam pharetra arcu, at semper ante odio id eros. Ut
        mollis magna id nulla pretium, sit amet ornare lectus sagittis. Nullam
        fermentum ornare felis, quis imperdiet leo semper vitae. In ornare, sem
        id scelerisque consectetur, mauris lectus blandit dolor, et lacinia
        metus neque in lectus. Vestibulum eu semper nisl. Cras non libero sit
        amet nulla gravida suscipit. Aenean eget eros eget augue mollis aliquet
        tristique non augue.
      </p>
      <p class="author-name">
        <i>
          Nulla id odio vitae
          <br />
          Mauris viverra risus eget urna imperdiet lobortis.
        </i>
      </p>
    </div>
    <h2 tabindex="0" class="title is-4">Why Use MyCollege?</h2>
    <hr aria-hidden="true" />
    <UnderConstruction feature="Video: Why Use MyCollege?" />
  </div>
</template>

<style scoped>
.author-name {
  text-align: right;
}
</style>

<script>
import UnderConstruction from "@/components/temp/UnderConstruction.vue";
export default {
  name: "Home",
  components: {
    UnderConstruction
  }
};
</script>
