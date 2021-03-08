<template>
  <GenericCardModal ref="generic" topic="Education" @submit="submit()">
    <b-field label="Degree">
      <b-input
        v-model="education.degree"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field label="School">
      <b-input
        v-model="education.school"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field label="Location">
      <b-input
        v-model="education.location"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <div class="columns">
      <div class="column">
        <b-field label="Date Started">
          <b-datepicker
            v-model="education.dateStarted"
            icon="calendar-today"
            :disabled="disabled"
            v-if="!readonly"
          >
          </b-datepicker>
          <b-input
            :value="moment(education.dateStarted).format('YYYY-MM-DD')"
            readonly
            v-else
          ></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Date Ended">
          <b-datepicker
            v-model="education.dateEnded"
            icon="calendar-today"
            :disabled="disabled"
            v-if="!readonly"
          >
          </b-datepicker>
          <b-input
            :value="moment(education.dateEnded).format('YYYY-MM-DD')"
            readonly
            v-else
          ></b-input>
        </b-field>
      </div>
    </div>
  </GenericCardModal>
</template>

<script>
import GenericCardModal from "@/components/generic/GenericCardModal.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "EducationModalForm",
  components: {
    GenericCardModal
  },
  data() {
    return {
      readonly: false,
      disabled: false,
      education: {}
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
      this.$refs.generic.open(options);
      this.readonly = options.isRead === true;
      this.disabled = options.isDelete === true;
      options.form.id = uuidv4();
      const obj = JSON.parse(JSON.stringify(options.form));
      obj.dateStarted = this.moment(obj.dateStarted).toDate();
      obj.dateEnded = this.moment(obj.dateEnded).toDate();
      this.education = obj;
    },
    submit() {
      this.$emit("submit", this.education);
      this.education = {};
    }
  }
};
</script>
