<template>
  <div id="BodyFiltros" class="w-100 m-0 p-0">
    <div class="p-0 m-0" style="height: 30px; width: 465px;">
      <ul
        class="nav nav-tabs card-header-tabs m-0"
        style="font-size: 11px !important; height: 30px;"
      >
        <template v-for="tab in TabsModal">
          <li
            :key="'tab-' + tab"
            @click="$emit('change-tab', tab)"
            class="nav-item"
          >
            <a
              class="nav-link border clickable"
              :class="{
                active: tabSelected === tab,
              }"
              >{{ tab }}</a
            >
          </li>
        </template>
      </ul>
    </div>
    <div
      class="col m-0 p-0"
      style="width: max-content; height: 450px !important;"
    >
      <slot name="table-group"></slot>
      <!-- <table
        v-if="tabSelected === 'Semestre'"
        class="table table-bordered table-sm modal-table"
        style="max-height: 392px !important;"
      >
        <thead class="thead-light ">
          <tr class="sticky">
            <div style="font-size: 11px !important;" class="max-content">
              <th>
                <p style="width: 25px;" class="p-header"></p>
              </th>
              <th>
                <p class="p-header" style="width: 435px; text-align: start;">
                  Semestre Letivo
                </p>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <tr>
            <div style="width: max-content;">
              <td>
                <div style="width: 25px; height: inherit;" class="px-1">
                  <input
                    type="checkbox"
                    class="form-check-input position-static m-0"
                  />
                </div>
              </td>
              <td>
                <p style="width: 435px; text-align: start;">PRIMEIRO</p>
              </td>
            </div>
          </tr>
          <tr>
            <div style="width: max-content;">
              <td>
                <div style="width: 25px; height: inherit;" class="px-1">
                  <input
                    type="checkbox"
                    class="form-check-input position-static m-0"
                  />
                </div>
              </td>
              <td>
                <p style="width: 435px; text-align: start;">SEGUNDO</p>
              </td>
            </div>
          </tr>
        </tbody>
      </table>

      <table
        v-else-if="tabSelected === 'Conflitos'"
        class="table table-bordered table-sm modal-table"
        style="max-height: 392px !important;"
      >
        <thead class="thead-light ">
          <tr class="sticky">
            <div style="font-size: 11px !important;" class="max-content">
              <th>
                <p style="width: 25px;" class="p-header"></p>
              </th>
              <th>
                <p class="p-header" style="width: 435px; text-align: start;">
                  Conflitos
                </p>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <tr>
            <div style="width: max-content;">
              <td>
                <div style="width: 25px; height: inherit;" class="px-1">
                  <input
                    type="checkbox"
                    class="form-check-input position-static m-0"
                  />
                </div>
              </td>
              <td>
                <p style="width: 435px; text-align: start;">PRIMEIRO</p>
              </td>
            </div>
          </tr>
          <tr>
            <div style="width: max-content;">
              <td>
                <div style="width: 25px; height: inherit;" class="px-1">
                  <input
                    type="checkbox"
                    class="form-check-input position-static m-0"
                  />
                </div>
              </td>
              <td>
                <p style="width: 435px; text-align: start;">SEGUNDO</p>
              </td>
            </div>
          </tr>
        </tbody>
      </table> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "BodyFiltros",
  props: {
    tabSelected: String,
    TabsModal: Array,
  },
};
</script>
