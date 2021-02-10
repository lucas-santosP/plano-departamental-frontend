<template>
  <v-th
    @click.native="toggleOrder"
    :align="align"
    :width="width"
    :paddingX="paddingX"
    class="clickable"
  >
    <div v-if="orderFixed" class="container-fixed-order">
      <font-awesome-icon
        v-if="align === 'center'"
        :icon="['fas', 'thumbtack']"
        :class="{ 'low-opacity': currentOrder.order === null }"
        title="Ordenação fixa"
      />
      <span>
        {{ text }}
        <slot v-if="text === ''"></slot>
      </span>

      <div>
        <font-awesome-icon
          :icon="['fas', 'thumbtack']"
          v-if="align === 'start'"
          class="mx-1"
          :class="{ 'low-opacity': currentOrder.order === null }"
          title="Ordenação fixa"
        />

        <OrdinationArrow
          :currentOrder="currentOrder"
          :orderToCheck="orderToCheck"
          :orderType="orderType"
        />
      </div>
    </div>

    <template v-else>
      {{ text }}
      <slot v-if="text === ''"></slot>

      <OrdinationArrow
        :currentOrder="currentOrder"
        :orderToCheck="orderToCheck"
        :orderType="orderType"
      />
    </template>
  </v-th>
</template>

<script>
import OrdinationArrow from "@/components/ui/OrdinationArrow";

export default {
  name: "v-th-ordination",
  components: { OrdinationArrow },
  props: {
    currentOrder: { type: Object, required: true },
    orderToCheck: { type: String, required: true },
    orderType: { type: String, default: "asc" },
    orderFixed: { type: Boolean, default: false },
    text: { type: String, default: "" },
    align: { type: String, default: "center" },
    width: { type: [String, Number], required: true },
    paddingX: { type: [String, Number], default: "5" },
  },

  methods: {
    toggleOrder() {
      const { currentOrder, orderType } = this;
      let newOrder = this.orderToCheck;

      if (this.orderFixed && currentOrder.type !== this.orderType) {
        newOrder = null;
      }

      if (currentOrder.order !== newOrder) {
        currentOrder.order = newOrder;
        currentOrder.type = orderType;
      } else {
        currentOrder.type = currentOrder.type == "asc" ? "desc" : "asc";
      }
    },
  },
};
</script>

<style scoped>
.container-fixed-order {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
