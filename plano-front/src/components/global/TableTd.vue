<template>
  <td
    :style="{
      textAlign: align,
      width: tdWidth,
      maxWidth: tdWidth,
      padding: tdPadding,
    }"
  >
    <slot></slot>
  </td>
</template>

<script>
export default {
  name: "TableTd",
  props: {
    width: { type: String | Number, required: true },
    align: { type: String, default: "center" },
    paddingX: { type: String | Number, default: "5" },
  },
  computed: {
    tdWidth() {
      return `${parseInt(this.width, 10)}px`;
    },
    tdPadding() {
      return `0 ${this.paddingX}px`;
    },
  },
};
</script>
<style scoped>
td {
  display: block-inline;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0;
  margin: 0;
}
</style>
