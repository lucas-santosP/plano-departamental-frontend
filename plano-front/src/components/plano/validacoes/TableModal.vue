<template>
  <table id="TableModal" class="table table-bordered table-sm modal-table">
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
  name: "TableModal",
};
</script>

<style scoped>
.modal-table {
  display: block !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  font-size: 10px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  max-height: 450px;
  width: max-content !important;
}
.modal-table td,
.modal-table th {
  text-align: center;

  vertical-align: middle !important;
  margin: 0 !important;
  /* padding: 0 5px !important; */
}
.modal-table th {
  font-size: 11px !important;
  /* height: 18px !important; */
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.modal-table td {
  font-size: 10px !important;
  border-top: 0 !important;
  /* height: 22px !important; */
}
.modal-table tr thead {
  display: block !important;
}
.modal-table tbody {
  max-height: 100%;
  width: 100%;
}
.modal-table input[type="checkbox"] {
  position: relative !important;
  border-width: 1px !important ;
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 13px !important;
  width: 13px !important;

  -webkit-box-shadow: 0px 0px 0px 0.005px #555;
  -moz-box-shadow: 0px 0px 0px 0.005px #555;
  box-shadow: 0px 0px 0px 0.005px #555;
}
</style>
