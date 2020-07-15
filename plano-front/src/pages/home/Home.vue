<template>
  <div class="main-component row p-0">
    <PageTitle :title="'Dashboard'" />
    <div class="alert alert-light mt-1" role="alert">
      <p class="user-paragraph" style="">
        Olá {{ usuarioNome }}! Este é o sistema de gerenciamento de Plano
        Departamental do DCC - Departamento de Ciência da Computação.
        <br />Abaixo segue um resumo das funcionalidade de cada tela:
      </p>
      <div class="row">
        <LinksList v-if="Admin" :title="'PLANO'" :pages="routesPlano" />
        <LinksList :title="'RELATÓRIOS'" :pages="routesRelatorios" />
        <LinksList v-if="Admin" :title="'GERENCIAR'" :pages="routesGerenciar" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { PageTitle } from "@/components";
import LinksList from "./LinksList";

export default {
  name: "DashboardHome",
  components: { PageTitle, LinksList },
  computed: {
    ...mapGetters([
      "Admin",
      "usuarioNome",
      "routesPlano",
      "routesRelatorios",
      "routesGerenciar",
    ]),
  },
};
</script>

<style scoped>
.alert {
  word-break: normal;
  text-align: justify;
  margin-left: 0;
  padding: 0 !important;
  margin-right: 1%;
  font-weight: normal;
  color: black;
  padding-right: 30px;
}
.user-paragraph {
  font-size: 12px;
}
</style>
