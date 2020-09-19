<template>
  <tr class="bg-custom">
    <TableTd width="130" align="start">{{ docente.apelido }}</TableTd>

    <TableTd width="575" colspan="5" />

    <TableTd v-if="semestresAtivados.primeiro" width="35" paddingX="2">
      {{ docente.creditos1Semestre }}
    </TableTd>

    <TableTd v-if="semestresAtivados.segundo" width="35" paddingX="2">
      {{ docente.creditos2Semestre }}
    </TableTd>

    <TableTd
      v-if="semestresAtivados.primeiro && semestresAtivados.segundo"
      width="40"
      paddingX="2"
    >
      {{ docente.creditos1Semestre + docente.creditos2Semestre }}
    </TableTd>
  </tr>
</template>

<script>
export default {
  name: "DocenteRow",
  props: {
    docente: { type: Object, required: true },
    semestresAtivados: { type: Object, required: true },
  },
};
</script>
