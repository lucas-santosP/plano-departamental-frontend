<template>
  <v-th @click.native="toggleOrder" :width="width" class="v-th">
    <div class="w-100 d-flex justify-content-center align-items-center">
      <span>
        <slot></slot>
      </span>

      <font-awesome-icon
        v-if="orderFixed"
        :icon="['fas', 'thumbtack']"
        class="ml-1"
        :class="{ 'low-opacity': currentOrder.order === null }"
        title="Ordenação fixa"
      />

      <OrdinationArrow
        class="ml-1"
        :currentOrder="currentOrder"
        :orderToCheck="orderToCheck"
        :orderType="orderType"
      />
    </div>
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
    width: { type: [String, Number], required: true },
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
.v-th:hover {
  transform: all ease 0.3s;
  filter: brightness(96%);
  cursor: pointer;
}
</style>
