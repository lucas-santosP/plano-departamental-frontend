<template>
  <tr>
    <td style="width: 130px"></td>
    <td style="width: 25px">{{ carga.trimestre }}</td>
    <td style="width: 80px"></td>
    <td style="width: 300px" class="t-start upper-case">
      {{ carga.programa }}
    </td>
    <td style="width: 35px"></td>
    <td style="width: 130px"></td>
    <td
      v-for="periodo in periodosAtivados"
      :key="periodo.nome + periodo.id"
      style="width: 35px"
      class="less-padding"
    >
      {{ periodo.id === carga.trimestre ? carga.creditos : "" }}
    </td>
    <td
      style="width: 50px"
      class="less-padding"
      v-if="periodosAtivados.length > 1"
    ></td>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
import { generateHorariosText } from "@/common/mixins";

export default {
  name: "DocenteCargaPosRow",
  mixins: [generateHorariosText],
  props: {
    carga: { type: Object, required: true },
    periodosAtivados: { type: Array, required: true },
  },
  computed: {
    ...mapGetters(["PeriodosLetivos"]),
  },
};
</script>
