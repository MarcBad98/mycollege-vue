<template>
  <GenericCardModal ref="generic" topic="Education" @submit="submit()">
    <b-field label="Degree" label-for="educationmodalform-degree">
      <b-input
        id="educationmodalform-degree"
        v-model="education.degree"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <div class="columns">
      <div class="column">
        <b-field label="School" label-for="educationmodalform-school">
          <b-input
            id="educationmodalform-school"
            v-model="education.school"
            :disabled="disabled"
            :readonly="readonly"
          ></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Location" label-for="educationmodalform-location">
          <b-input
            id="educationmodalform-location"
            v-model="education.location"
            :disabled="disabled"
            :readonly="readonly"
          ></b-input>
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-field label="Start Date" label-for="educationmodalform-startdate">
          <b-datepicker
            id="educationmodalform-startdate"
            v-model="education.dateStarted"
            icon="calendar-today"
            :disabled="disabled"
            v-if="!readonly"
          ></b-datepicker>
          <b-input
            id="educationmodalform-startdate"
            :value="moment(education.dateStarted).format('YYYY-MM-DD')"
            :readonly="readonly"
            v-else
          ></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="End Date" label-for="educationmodalform-enddate">
          <b-datepicker
            id="educationmodalform-enddate"
            v-model="education.dateEnded"
            icon="calendar-today"
            :disabled="disabled"
            v-if="!readonly"
          ></b-datepicker>
          <b-input
            id="educationmodalform-enddate"
            :value="moment(education.dateStarted).format('YYYY-MM-DD')"
            :readonly="readonly"
            v-else
          ></b-input>
        </b-field>
      </div>
    </div>
    <b-field label="Description" label-for="educationmodalform-description">
      <b-input
        id="educationmodalform-description"
        v-model="education.description"
        type="textarea"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
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
