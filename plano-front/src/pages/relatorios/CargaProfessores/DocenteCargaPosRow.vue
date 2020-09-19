<template>
  <tr>
    <TableTd width="130" />

    <TableTd width="25">{{ carga.trimestre }}</TableTd>

    <TableTd width="80" />

    <TableTd width="300" align="start">{{ carga.programa }}</TableTd>

    <TableTd width="35" />

    <TableTd width="130" />

    <TableTd v-if="semestresAtivados.primeiro" width="35" paddingX="2">
      {{ carga.trimestre === 1 || carga.trimestre === 2 ? carga.creditos : "" }}
    </TableTd>

    <TableTd v-if="semestresAtivados.segundo" width="35" paddingX="2">
      {{ carga.trimestre === 3 || carga.trimestre === 4 ? carga.creditos : "" }}
    </TableTd>

    <TableTd
      v-if="semestresAtivados.primeiro && semestresAtivados.segundo"
      width="40"
      paddingX="2"
    />
  </tr>
</template>

<script>
export default {
  name: "DocenteCargaPosRow",
  props: {
    carga: { type: Object, required: true },
    semestresAtivados: { type: Object, required: true },
  },
};
</script>
