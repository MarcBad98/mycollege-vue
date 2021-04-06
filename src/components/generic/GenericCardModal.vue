<template>
  <b-modal :active="isActive" has-modal-card full-screen @close="close()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ operation }} {{ topic }}</p>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="close()" />
        <b-button
          label="Submit"
          :type="color"
          @click="submit()"
          v-if="!isRead"
        />
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "GenericCardModal",
  props: {
    topic: {
      type: String,
      default: "ERROR: Unknown Topic"
    }
  },
  data() {
    return {
      isActive: false,
      isCreate: false,
      isRead: false,
      isUpdate: false,
      isDelete: false
    };
  },
  computed: {
    operation() {
      if (this.isCreate) return "Create";
      if (this.isRead) return "View";
      if (this.isUpdate) return "Update";
      if (this.isDelete) return "Delete";
      return "ERROR: Unknown Operation";
    },
    color() {
      return {
        "is-primary": this.isCreate,
        "is-warning": this.isUpdate,
        "is-danger": this.isDelete
      };
    }
  },
  methods: {
    open(options) {
      this.isActive = true;
      this.isCreate = options.isCreate === true;
      this.isRead = options.isRead === true;
      this.isUpdate = options.isUpdate === true;
      this.isDelete = options.isDelete === true;
    },
    close() {
      this.isActive = false;
    },
    submit() {
      this.$emit("submit");
      this.close();
    }
  }
};
</script>
