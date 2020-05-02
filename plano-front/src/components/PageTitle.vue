<template>
  <div
    id="PageTitle"
    class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
    style="height: 38px;"
  >
    <div class="form-inline col-12 pl-0 mb-1 pr-1">
      <h1 class="titulo col-xl-6 col-lg-6 col-md-7 col-sm-7 col-8 px-0 pr-1">
        <slot name="title"></slot>
      </h1>

      <div
        class="form-group col-xl-6 col-lg-6 col-md-5 col-sm-5 col-4 mb-0 p-0"
        style="justify-content: flex-end !important;"
      >
        <slot name="botoes"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    title: String,
  },
};
</script>

<style></style>
