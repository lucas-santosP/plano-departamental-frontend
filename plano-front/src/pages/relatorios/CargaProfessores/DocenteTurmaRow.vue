<template>
  <tr>
    <TableTd width="130" />

    <TableTd width="30">{{ turma.periodo }}</TableTd>

    <TableTd width="80" paddingX="2">{{ turma.disciplina.codigo }}</TableTd>

    <TableTd width="300" align="start">{{ turma.disciplina.nome }}</TableTd>

    <TableTd width="35" paddingX="2">{{ turma.letra }}</TableTd>

    <TableTd width="130"
      >{{ generateHorariosText(turma.Horario1, turma.Horario2) }}
    </TableTd>

    <TableTd v-if="semestresAtivados.primeiro" width="35" paddingX="2">
      {{
        turma.periodo === 1 || turma.periodo === 2 ? turma.creditosDaTurma : ""
      }}
    </TableTd>

    <TableTd v-if="semestresAtivados.segundo" width="35" paddingX="2">
      {{
        turma.periodo === 3 || turma.periodo === 4 ? turma.creditosDaTurma : ""
      }}
    </TableTd>

    <TableTd
      v-if="semestresAtivados.primeiro && semestresAtivados.segundo"
      width="40"
      paddingX="2"
    />
  </tr>
</template>

<script>
import { generateHorariosText } from "@/common/mixins";

export default {
  name: "DocenteTurmaRow",
  mixins: [generateHorariosText],
  props: {
    turma: { type: Object, required: true },
    semestresAtivados: { type: Object, required: true },
  },
};
</script>
