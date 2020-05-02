<template>
  <table
    id="ModalTable"
    class="table table-bordered table-sm modal-table"
    style="max-height: 450px !important;"
  >
    <thead class="thead-light">
      <tr class="sticky">
        <div style="font-size: 11px !important;" class="max-content">
          <slot name="thead"></slot>
        </div>
      </tr>
    </thead>
    <tbody>
      <slot name="tbody"></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ModalTable",
};
</script>

<style></style>
