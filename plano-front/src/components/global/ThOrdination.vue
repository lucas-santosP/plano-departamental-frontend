<template>
  <th
    @click="toggleOrder"
    class="clickable"
    :style="{ textAlign: align, width: tdWidth }"
  >
    <div v-if="orderFixed" class="container-fixed-order">
      <font-awesome-icon
        :icon="['fas', 'thumbtack']"
        :class="currentOrder.order === null ? 'low-opacity' : ''"
      />
      <span>{{ text }}</span>

      <OrdinationArrow
        :currentOrder="currentOrder"
        :orderToCheck="orderToCheck"
      />
    </div>

    <template v-else>
      {{ text }}
      <OrdinationArrow
        :currentOrder="currentOrder"
        :orderToCheck="orderToCheck"
      />
    </template>
  </th>
</template>

<script>
import OrdinationArrow from "@/components/ui/OrdinationArrow";

export default {
  name: "ThOrdination",
  components: { OrdinationArrow },
  props: {
    type: { type: String, default: "" },
    currentOrder: { type: Object, required: true },
    orderToCheck: { type: String, required: true },
    orderType: { type: String, default: "asc" },
    orderFixed: { type: Boolean, default: false },
    text: { type: String, required: true },
    align: { type: String, default: "" },
    width: { type: Number | String, required: true },
  },

  methods: {
    toggleOrder() {
      const { currentOrder, orderType } = this;
      let newOrder = this.orderToCheck;

      if (this.type === "fixed" && currentOrder.type === "desc") {
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
  computed: {
    tdWidth() {
      return `${parseInt(this.width, 10)}px`;
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
