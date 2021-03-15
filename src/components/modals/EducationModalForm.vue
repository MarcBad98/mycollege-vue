<template>
  <GenericCardModal ref="generic" topic="Education" @submit="submit()">
    <b-field id="educationmodalform-degree" label="Degree">
      <b-input
        aria-labelledby="educationmodalform-degree"
        v-model="education.degree"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field id="educationmodalform-school" label="School">
      <b-input
        aria-labelledby="educationmodalform-school"
        v-model="education.school"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field id="educationmodalform-location" label="Location">
      <b-input
        aria-labelledby="educationmodalform-location"
        v-model="education.location"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <div class="columns">
      <div class="column">
        <b-field id="educationmodalform-startdate" label="Start Date">
          <b-datepicker
            aria-labelledby="educationmodalform-startdate"
            v-model="education.dateStarted"
            icon="calendar-today"
            :disabled="disabled"
            v-if="!readonly"
          >
          </b-datepicker>
          <b-input
            aria-labelledby="educationmodalform-startdate"
            :value="moment(education.dateStarted).format('YYYY-MM-DD')"
            readonly
            v-else
          ></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field id="educationmodalform-enddate" label="End Date">
          <b-datepicker
            aria-labelledby="educationmodalform-enddate"
            v-model="education.dateEnded"
            icon="calendar-today"
            :disabled="disabled"
            v-if="!readonly"
          >
          </b-datepicker>
          <b-input
            aria-labelledby="educationmodalform-enddate"
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
