<template>
  <div class="DashboardHome">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Dashboard</h1>
    </div>

    <!-- alert -->
    <div class="alert alert-light alert-dismissible fade show" role="alert" style="color: black">
      <p style="font-size:20px">
        <strong>Olá {{getUsuarioFirstName}}!</strong> Este é o sistema de gerenciamento de Plano departamental do DCC.
        <br />Abaixo segue um resumo das funcionalidade de cada tela:
      </p>
      <hr/>
      <!-- lista-1 -->
      <h3 class="lista-titulo">PLANO</h3>
      <ul class="listas list-group list-group-flush">
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'pedidos' }">Tabela</router-link>:
          </strong>Onde se encontra o cadastro de todas as turmas de todas as disciplinas oferecidas pelo departamento do DCC. E permite a
          alteração de vagas, horararios, local e docentes de todas as disciplinas.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'turmasExternas' }">Tabela Externa</router-link>:
          </strong> Bem parecida com a Tabela principal, porem é onde se encontra o cadastro de todas as turmas de disciplinas
          oferecidas por outros departamentos (fora o DCC), mas que fazem parte da grade dos cursos do DCC.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'cargaPos' }">Tabela Pós</router-link>:
          </strong> Onde se encotra as cargas das bolsas de pós graduação.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'horarios' }">Horarios</router-link>:
          </strong> Onde se encontra a listagem de horarios dos cursos do DCC, permitindo filtragem por semestres e cursos.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'turmas' }">Turmas</router-link>:
          </strong>Onde se encontra a listagem completa de todas as turmas de todas disciplinas ofericidas pelo DCC. Tambem permite a 
          alteração de horarios, local e docentes porem é mais recomendavel fazer tais alterações pela Tabela principal.
        </li>
      </ul>
      <!-- lista-2 -->
      <h3 class="lista-titulo">RELATÓRIOS</h3>
      <ul class="listas list-group list-group-flush">
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'cargaProfessores' }">Carga Professores</router-link>:
          </strong>Listagem de todos professores e as disciplinas que ministram, e tambem de suas bolsas de pós-gradução. Mostrando
          tambem o somatorio total de horas de cada professor.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'horariosResumo' }">Horários - Resumo</router-link>:
          </strong> Listagem resumidamente todas os horarios de todos os cursos do DCC.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'laboratoriosAlocacao' }">Alocação - Laboratórios</router-link>:
          </strong> Listagem as alocações dos laboratorios em ambos semestres.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'gradeDisciplinas' }">Grades Disciplinas</router-link>:
          </strong> Listagem as disciplinas de todos departamentos do sistema divididas em perfis e tambem verifica em que semestre e em que periodo
          cada disciplinas faz parte das grades dos cursos do DCC.
        </li>
      </ul>
      <!-- lista-3 -->
      <h3 class="lista-titulo">GERENCIAR</h3>
      <ul class="listas list-group list-group-flush">
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'cursos' }">Cursos</router-link>:
          </strong>Lista todos os cursos presentes no sistemas (não só os do DCC), e permite a adição e alteração de informações do cursos.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'docentes' }">Docentes</router-link>:
          </strong>Listagem de todos os docentes ativo e inativos do DCC e permite a alteração de seus perfis.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'grades' }">Grades</router-link>:
          </strong> Onde se encontra as grades dos cursos do DCC atuais e antigas que estejam ainda em atividade, e permite a adição de novas
          grades
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'perfis' }">Perfis</router-link>:
          </strong>Onde se encontra os perfis definidos para cada disciplina nas tabelas, e permite tambem a adição e alteração de perfis
          e de suas cores e nomes.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'disciplinas' }">Disciplina</router-link>:
          </strong>Listagem de disciplinas de todos departamentos do sistema. Permitindo a alteração de nome, codigo, carga teórica e pratica,
          perfis e tambem define se é EAD ou não.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'salas' }">Salas</router-link>:
          </strong>Listagem de todas as salas registradas no sistema. Permite a adição de novas salas e a definição se são laboratorios ou não.
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DashboardHome",

  computed: {
    ...mapGetters(["getUsuarioFirstName"])
  }
};
</script>

<style scoped>
.listas {
  line-height: 30px;
}
.lista-titulo {
  margin-left: 0px;
  margin-top: 20px;
  font-size: 22px;
  font-weight: bold;
}
</style>