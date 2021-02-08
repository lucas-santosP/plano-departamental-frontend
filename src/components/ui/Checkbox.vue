<template>
  <b-form-group class="mb-1 mt-1">
    <div class="d-flex justify-content-start align-items-center">
      <b-form-checkbox :id="id" :checked="value" @change="emitInput" size="sm" />
      <label v-prevent-click-selection :for="id" class="d-block col-form-label-sm pr-2">
        {{ label }}
      </label>
    </div>
  </b-form-group>
</template>

<script>
import { uniqueId } from "lodash-es";
import { preventClickSelection } from "@mixins";
export default {
  name: "Checkbox",
  mixins: [preventClickSelection],
  props: {
    id: { type: String, default: () => uniqueId() },
    value: { type: Boolean, required: true },
    label: { type: String, default: "" },
  },

  methods: {
    emitInput(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";

.d-flex > label {
  transform: translateY(2px);
}
::v-deep .bv-no-focus-ring {
  @include no-focus;
}
</style>
