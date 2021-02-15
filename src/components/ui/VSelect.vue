<template>
  <b-form-group class="mb-1" label-size="sm" :label="label" :label-for="id">
    <b-form-select
      :id="id"
      :value="value"
      @input="emitInput"
      :state="isValid"
      :aria-describedby="feedbackId"
      :disabled="disabled"
      size="sm"
      @change="$emit('change', $event)"
    >
      <VOption v-if="value === null" :value="null" text="Selecione..." disabled />
      <VOption v-else :value="''" text="Selecione..." disabled />
      <slot></slot>
    </b-form-select>

    <b-form-invalid-feedback v-if="isValid === false" :id="feedbackId">
      <template v-if="validation.$params.required && !validation.required">
        Campo obrigatório
      </template>
      <template v-else>Valor inválido</template>
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
import { uniqueId } from "lodash-es";
import VOption from "./VOption";

export default {
  name: "VSelect",
  components: { VOption },
  props: {
    id: { type: String, default: () => uniqueId() },
    value: {
      required: true,
      validator: (prop) => {
        return (
          typeof prop === "string" ||
          typeof prop === "number" ||
          typeof prop === "object" ||
          prop === null
        );
      },
    },
    label: { type: String, default: "" },
    validation: { type: Object, default: null },
    disabled: { type: Boolean, default: false },
  },

  methods: {
    emitInput(newValue) {
      this.$emit("input", newValue);
      if (this.validation) this.validation.$touch();
    },
  },

  computed: {
    isValid() {
      if (!this.validation) return null;

      const { $dirty, $error } = this.validation;
      if ($dirty && $error) return false;
      return null;
    },
    feedbackId() {
      return "feedback-" + this.id;
    },
  },
};
</script>
