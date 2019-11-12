<template>
  <div class="DashboardHome">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-0 pr-0 pl-0 pb-1 border-bottom">
      <h1 class="h2 titulo">Dashboard</h1>
    </div>

    <!-- alert -->
    <div class="alert alert-light alerta mt-1" role="alert">
      <p style="font-size:12px">
        Olá {{getUsuarioFirstName}}! Este é o sistema de gerenciamento de Plano Departamental do DCC - Departamento de Ciência da Computação.
        <br>Abaixo segue um resumo das funcionalidade de cada tela:
      </p>
      
      <!-- lista-1 -->
      <h3 class="lista-titulo">PLANO</h3>
      <ul class="listas list-group">
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'pedidos' }">Tabela:</router-link>
          </strong> Página onde encontra-se o cadastro de todas as turmas de todas as disciplinas oferecidas pelo DCC. Permite a
          alteração de vagas, horários, sala e docentes de todas as disciplinas.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'turmasExternas' }">Tabela Externa:</router-link>
          </strong> Similar a Tabela principal, onde encontra-se o cadastro de todas as turmas de disciplinas
          oferecidas por outros departamentos (externos ao DCC), e que fazem parte da grade dos cursos cadastrados.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'cargaPos' }">Tabela Pós:</router-link>
          </strong> Tela onde localiza-se uma tabela com as cargas horárias de cada docente encarregado das bolsas de pós-graduação.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'horarios' }">Horarios:</router-link>
          </strong> Página onde listam-se os horarios dos cursos do DCC, permitindo filtragem por semestres e cursos.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'turmas' }">Turmas:</router-link>
          </strong> Onde localiza-se a listagem completa de todas as turmas de todas disciplinas oferecidas pelo DCC. Também permite a 
          alteração de horarios, local e docentes. Contudo, recomenda-se fazer tais alterações pela Tabela principal.
        </li>
      </ul>
      
      <!-- lista-2 -->
      <h3 class="lista-titulo">RELATÓRIOS</h3>
      <ul class="listas list-group">
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'cargaProfessores' }">Carga Professores:</router-link>
          </strong> Listagem de todos professores e as disciplinas que estes ministram, além das bolsas de pós-gradução. Mostra o somatório parcial por semestre, e o total da carga horária de cada docente.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'horariosResumo' }">Horários - Resumo:</router-link>
          </strong> Listagem resumida dos horários de todos os cursos do DCC.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'laboratoriosAlocacao' }">Alocação - Laboratórios:</router-link>
          </strong> Lista as alocações dos laboratórios em ambos os semestres.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'gradeDisciplinas' }">Grades Disciplinas:</router-link>
          </strong> Listagem das disciplinas do DCC, divididas de acordo com seus perfis. Mostra, além disso, quais semestres e períodos cada uma é ofertada nas grades dos cursos. 
        </li>
      </ul>

      <!-- lista-3 -->
      <h3 class="lista-titulo">GERENCIAR</h3>
      <ul class="listas list-group">
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'cursos' }">Cursos:</router-link>
          </strong> Lista todos os cursos presentes no sistemas (além dos externos ao DCC), e permite a adição e alteração das informações dos cursos.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'docentes' }">Docentes:</router-link>
          </strong> Listagem de todos os docentes ativo e inativos do DCC, além de permitir a alteração de seus perfis.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'grades' }">Grades:</router-link>
          </strong> Onde encontram-se as grades dos cursos do DCC atuais e antigas que ainda estão em atividade, e permite a adição de novas grades.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'perfis' }">Perfis:</router-link>
          </strong> Onde encontram-se os perfis definidos para cada disciplina nas tabelas, permitindo também a adição e alteração de perfis, seus nomes e as cores destinadas a eles.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'disciplinas' }">Disciplina:</router-link>
          </strong> Listagem de disciplinas de todos os departamentos cadastrados no sistema. Permite a alteração de nome, código, carga teórica e pratica,
          perfis e também define se é EAD ou não.
        </li>
        <li class="list-group-item">
          <strong>
            <router-link :to="{ name: 'salas' }">Salas:</router-link>
          </strong> Listagem de todas as salas registradas no sistema. Permite a adição de novas salas e laboratórios.
        </li>
        <hr>
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
.DashboardHome{
  max-height: calc(100vh - 38px);
  display:block;
  overflow: auto;
}
.titulo{
  font-size:16px;
  font-weight: bold;
  padding-left: 0;
  margin:0;
}

.alerta {
  word-break: normal;
  text-align: justify;
  margin-left: 0;
  padding: 0;
  margin-right: 1%;
  font-weight: normal;
  color: black; 
  padding-right:30px; 
}

.listas {
  line-height: 30px;
  font-size: 12px;
  text-align: justify;
  line-height:inherit;
}

.lista-titulo {
  margin-top: 2%;
  font-size: 14px;
  font-weight: 600;
  color: #3f3f3f;
  
}
</style>