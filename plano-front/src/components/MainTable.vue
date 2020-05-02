<template>
  <table
    id="MainTable"
    class="main-table table table-hover table-sm table-bordered"
  >
    <thead class="thead-light">
      <tr class="sticky">
        <div class="max-content">
          <slot name="thead"></slot>
        </div>
      </tr>
    </thead>
    <tbody>
      <slot name="tbody"> </slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "MainTable",
};
</script>

<style scoped>
.main-table {
  display: block !important;
  overflow-y: scroll !important;
  overflow-x: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: -webkit-calc(100vh - 100px);
  height: -moz-calc(100vh - 100px);
  height: calc(100vh - 100px);
}
.tab-table {
  height: -webkit-calc(100vh - 125px);
  height: -moz-calc(100vh - 125px);
  height: calc(100vh - 125px);
}
.main-table tr thead {
  display: block !important;
}
.main-table thead tr th {
  height: 18px;
  padding: 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
}
.main-table td {
  text-align: center;
  vertical-align: middle !important;
  padding: 0 5px !important;
  margin: 0 !important;
  height: 20px !important;
}
tbody {
  max-height: 100% !important;
  width: 100% !important;
}

.main-table thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
.main-table input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0 !important;
  margin-top: 4px !important;
}
.bg-custom {
  background-color: #c8c8c8;
}
.bg-custom:hover {
  background-color: #c8c8c8;
}
.tr-bg-gray {
  background-color: #00000017;
}
</style>
