<template>
  <b-modal :active="isActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ operation }} Education</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Degree">
          <b-input
            v-model="education.degree"
            :disabled="isDelete"
            :readonly="isRead"
          ></b-input>
        </b-field>
        <b-field label="School">
          <b-input
            v-model="education.school"
            :disabled="isDelete"
            :readonly="isRead"
          ></b-input>
        </b-field>
        <b-field label="Location">
          <b-input
            v-model="education.location"
            :disabled="isDelete"
            :readonly="isRead"
          ></b-input>
        </b-field>
        <div class="columns">
          <div class="column">
            <b-field label="Date Started">
              <b-datepicker
                v-model="education.dateStarted"
                icon="calendar-today"
                :disabled="isDelete"
                v-if="!isRead"
              >
              </b-datepicker>
              <b-input
                :value="moment(education.dateStarted).format('YYYY-MM-DD')"
                v-if="isRead"
                readonly
              ></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Date Ended">
              <b-datepicker
                v-model="education.dateEnded"
                icon="calendar-today"
                :disabled="isDelete"
                v-if="!isRead"
              >
              </b-datepicker>
              <b-input
                :value="moment(education.dateEnded).format('YYYY-MM-DD')"
                v-if="isRead"
                readonly
              ></b-input>
            </b-field>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <b-button
          :label="!isRead ? 'Cancel' : 'Close'"
          @click="$emit('cancel')"
        />
        <b-button
          label="Submit"
          :type="color"
          @click="
            $emit('submit', education);
            $emit('cancel');
          "
          v-if="!isRead"
        />
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "EducationModalForm.vue",
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      default: false
    },
    isRead: {
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
    education: {
      type: Object,
      default() {
        return {};
      }
    }
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
  }
};
</script>
