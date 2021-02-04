<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="fex flex-column flex-grow-1">
        <NavTab
          :currentTab="tabAtiva"
          :allTabs="['DCC', 'Outros']"
          @change-tab="tabAtiva = $event"
        />
        <component :is="`Grades${tabAtiva}`" />
      </div>

      <portal-target name="page-content-gradesDCC" slim />
      <portal-target name="page-content-gradesOutros" slim />
    </div>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar:</b>
        Clique na linha da tabela da grade que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar:</b>
        Clique na linha da tabela da grade que deseja remover. Em seguida, no cartão à direita,
        clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b>
        Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { ModalAjuda } from "@/components/modals";
import { NavTab } from "@/components/ui";
import GradesDCC from "./GradesDCC";
import GradesOutros from "./GradesOutros";

export default {
  name: "GerenciarGrades",
  components: { GradesDCC, GradesOutros, NavTab, ModalAjuda },
  data() {
    return {
      tabAtiva: "DCC",
    };
  },
};
</script>
