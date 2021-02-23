<template>
  <div>
    <b-modal v-model="isActive" has-modal-card trap-focus full-screen>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ operation }} Employment</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Title">
            <b-input v-model="employment.title" :disabled="isDelete"></b-input>
          </b-field>
          <b-field label="Employer">
            <b-input
              v-model="employment.employer"
              :disabled="isDelete"
            ></b-input>
          </b-field>
          <b-field label="Location">
            <b-input
              v-model="employment.location"
              :disabled="isDelete"
            ></b-input>
          </b-field>
          <div class="columns">
            <div class="column">
              <b-field label="Date Started">
                <b-datepicker
                  v-model="employment.dateStarted"
                  icon="calendar-today"
                  :disabled="isDelete"
                >
                </b-datepicker>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Date Ended">
                <b-datepicker
                  v-model="employment.dateEnded"
                  icon="calendar-today"
                  :disabled="isDelete"
                >
                </b-datepicker>
              </b-field>
            </div>
          </div>
          <b-field label="Description">
            <b-input
              v-model="employment.description"
              type="textarea"
              :disabled="isDelete"
            ></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button label="Cancel" @click="$emit('cancel')" />
          <b-button
            label="Submit"
            :type="color"
            @click="
              $emit('submit', employment);
              $emit('cancel');
            "
          />
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "EmploymentModalForm.vue",
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      default: false
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    employment: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    operation() {
      if (this.isCreate) return "Create";
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
  }
};
</script>
