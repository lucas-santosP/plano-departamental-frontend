<template>
  <div class="DashboardGrades row" v-if="Admin">
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap pt-0 pb-0 pr-0 pl-0 mb-0">
      <div class="form-inline col-12 pl-0 mb-2 pr-1">
        <h1 class="titulo">Lista Disciplinas</h1>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div class="row w-100 m-0" style="font-size:11px">
    <!-- Grind esquerdo -->
      <div class="gridEsquerdo col-lg-5 col-md-6 col-sm-12 col-12 mr-md-5 mr-lg-5 px-0">
        <!-- Inicio forms Curso e Grande -->
        <div class="form-row">
          <div class="col-lg-6 col-md-6 col-sm-6 col-6 mr-2">
            <label for="cursoAtual" class="col-form-label py-0">Curso</label>
            <select
              id="cursoAtual"
              v-model="currentCurso"
              class="form-control form-control-sm selectMaior"
            >
              <option value="4">Ciência da Computação Diurno</option>
              <option value="1">Ciência da Computação Noturno</option>
              <option value="3">Sistemas de Informação</option>
              <option value="2">Engenharia Computacional</option>
            </select>
          </div>

          <div class="col-3">
            <label for="gradeAtual" class="col-form-label py-0">Grade</label>
            <select
              id="gradeAtual"
              v-model="currentGrade"
              v-on:change="findGrade()"
              class="form-control form-control-sm selectMenor"
              style="width: 90px;"
            >
              <template v-for="grade in Grades">
                <option v-if="grade.Curso == currentCurso" :key="grade.nome" :value="grade.id">{{grade.nome}}</option>
              </template>
            </select>
          </div>
        </div>
        <!-- Final Forms Curso e Grande -->

        <div class="w-100"></div>

        <!-- Inicio da tabela -->
        <div class="divTable ml-0 mt-3 pl-0 pr-0" style="border: #808080 solid 2px;">
          <table class="table table-bordered table-hover">
            <thead class="thead-light">
              <tr>
                <div
                  style="display: block; overflow: hidden; width: 435px; height:20px !important"
                  class="sticky"
                >
                  <th scope="col">
                    <p class="p-header" style="width: 32px">P.</p>
                  </th>
                  <th scope="col">
                    <p class="p-header" style="width: 400px">Disciplina</p>
                  </th>
                </div>
              </tr>
            </thead>

            <template v-if="currentGrade!=undefined">
              <template v-for="grade in Grades">
                <tbody
                  v-if="grade.id===currentGrade"
                  :key="grade.id"
                  v-on:click.prevent="showGrade(grade)"
                >
                  <template v-for="disciplinaGrade in DisciplinaGrades">
                    <tr
                      :key="disciplinaGrade.periodo"
                      v-bind:class="[isEven(disciplinaGrade.periodo)? 'even':'notEven']"
                    >
                      <div style="width: 432px;">
                        <template v-if="disciplinaGrade.Grade===grade.id">
                          <td style=" height:20px">
                            <div style="width:32px;">{{disciplinaGrade.periodo}}</div>
                          </td>

                          <td>
                            <template v-for="disciplina in Disciplinas">
                              <template v-if="andConnector(grade, disciplina, disciplinaGrade)">
                                <div
                                  style="width: 400px; cursor:pointer"
                                  :key="disciplina.nome"
                                  v-on:click.prevent="showDisciplina(disciplinaGrade)"
                                >{{disciplina.nome}}</div>
                              </template>
                            </template>
                          </td>
                        </template>
                      </div>
                    </tr>
                  </template>
                </tbody>
              </template>
            </template>
          </table>
          <!-- Final da tabela -->
        </div>
      </div>
      <!-- Fim Grind  -->

      <!-- Grind direito -->
      <div class="p-0 mb-2" style="height:max-content;">
        <div class="w-100 row" style="height:58px"></div>
        <!-- Inicio card Edit -->

        <div class="card">
          <div class="card-header">
            <template v-if="isEdit">
              <h1 class="card-title">Editar Grade</h1>
            </template>
            <template v-else>
              <h1 class="card-title">Adicionar Grade</h1>
            </template>
          </div>

          <div class="card-body">
            <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error"></b-alert>

            <form>
              <div class="form-group mb-1">
                <button
                  type="button"
                  class="btn btn-success btn-sm mr-3 botao-estilo"
                  v-on:click.prevent="editGrade"
                  :key="1"
                >Salvar alterações</button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  v-on:click.prevent="deleteGrade"
                  :key="3"
                >Excluir Grade</button>
              </div>

              <div class="row mb-1 mx-0">
                <div class="form-group m-0 mr-4 px-0">
                  <label for="nome" class="col-form-label">Nome</label>
                  <input
                    type="text"
                    class="inputMenor form-control form-control-sm"
                    id="nome"
                    v-model="gradeForm.nome"
                  />
                </div>

                <div class="form-group m-0 px-0">
                  <label for="periodoInicio" class="col-form-label">Período de Início</label>
                  <input
                    type="text"
                    class="inputMenor form-control form-control-sm col"
                    id="periodoInicio"
                    v-model="gradeForm.periodoInicio"
                  />
                </div>
              </div>

              <div class="row mb-1 mx-0">
                <div class="form-group m-0 col px-0">
                  <label for="curso" class="col-form-label">Curso</label>
                  <select
                    type="text"
                    style="text-align:center;"
                    class="form-control form-control-sm selectMaior"
                    id="curso"
                    v-model="gradeForm.Curso"
                  >
                    <option value="4">Ciência da Computação Diurno</option>
                    <option value="1">Ciência da Computação Noturno</option>
                    <option value="3">Sistemas de Informação</option>
                    <option value="2">Engenharia Computacional</option>
                  </select>
                </div>
              </div>

              <template v-if="isEdit">
                <div class="border-bottom w-100 mt-2 mb-0"></div>

                <div class="row mb-1 mx-0">
                  <div class="form-group m-0 col px-0">
                    <label for="disciplina" class="mr-2 col-form-label">Disciplina</label>
                    <select
                      type="text"
                      class="selectMaior2 form-control form-control-sm"
                      id="disciplina"
                      v-model="disciplinaGradeForm.Disciplina"
                    >
                      <option
                        v-if="Disciplinas.length===0"
                        type="text"
                        value
                      >Nenhuma Disciplina Encontrada</option>
                      <option
                        v-for="disciplina in Disciplinas"
                        :key="disciplina.id"
                        :value="disciplina.id"
                      >{{disciplina.nome}}</option>
                    </select>
                  </div>
                </div>

                <div class="row mb-1 mx-0">
                  <div class="form-group m-0 col px-0">
                    <label for="periodoDisciplina" class="col-form-label">Período</label>

                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control form-control-sm inputMenor2"
                        aria-describedby="button-edit-periodo"
                        id="periodoDisciplina"
                        v-model="disciplinaGradeForm.periodo"
                      />
                      <div class="input-group-append">
                        <button
                          type="button"
                          class="btn btn-outline-warning btn-sm botao-estilo2"
                          v-on:click.prevent="editDisciplinaGrade"
                          :key="4"
                        >Editar Período</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row mb-0 mt-3 mx-0">
                  <div class="form-group m-0 col px-0">
                    <button
                      type="button"
                      class="btn btn-success mr-2 btn-sm"
                      v-on:click.prevent="addDisciplinaGrade"
                      :key="4"
                    >Adicionar à Grade</button>

                    <button
                      type="button"
                      class="btn btn-danger mr-2 btn-sm"
                      v-on:click.prevent="deleteDisciplinaGrade"
                      :key="4"
                    >Excluir Disciplina</button>

                    <button
                      type="button"
                      class="btn btn-secondary mr-2 btn-sm"
                      v-on:click.prevent="cleanGrade"
                      :key="2"
                    >Cancelar</button>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="row mb-0 mt-3 mx-0">
                  <div class="form-group m-0 col px-0">
                    <button
                      type="button"
                      class="btn btn-success btn-sm mr-2"
                      v-on:click.prevent="addGrade"
                      :key="1"
                    >Adicionar</button>
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm mr-2"
                      v-on:click.prevent="cleanGrade"
                      :key="2"
                    >Resetar</button>
                  </div>
                </div>
              </template>
            </form>
          </div>
        </div>
        <!-- Final card Edit -->
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import gradeService from "../../common/services/grade";
import disciplinaGradeService from "../../common/services/disciplinaGrade";

const emptyGrade = {
  id: undefined,
  periodoInicio: undefined,
  Curso: undefined,
  nome: undefined
};

const emptyDisciplinaGrade = {
  periodo: undefined,
  Disciplina: undefined,
  Grade: undefined
};

export default {
  name: "DashboardGrade",

  data() {
    return {
      gradeForm: _.clone(emptyGrade),
      disciplinaGradeForm: _.clone(emptyDisciplinaGrade),
      error: undefined,
      currentGrade: undefined,
      currentCurso: undefined,
      grades: [],
      clickada: false
    };
  },

  methods: {
    addGrade() {
      gradeService
        .create(this.gradeForm)
        .then(response => {
          this.cleanGrade();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${response.Grade.nome} foi criada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Grade</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    editGrade() {
      gradeService
        .update(this.gradeForm.id, this.gradeForm)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${response.Grade.nome} foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Grade</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    deleteGrade() {
      gradeService
        .delete(this.gradeForm.id, this.gradeForm)
        .then(response => {
          this.cleanGrade();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${response.Grade.nome} foi excluída!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Grade</b>";
        });
    },

    cleanGrade() {
      this.gradeForm = _.clone(emptyGrade);
      this.error = undefined;
    },

    cleanDisciplina() {
      this.disciplinaGradeForm = _.clone(emptyDisciplinaGrade);
    },

    showGrade(grade) {
      this.cleanGrade();
      this.gradeForm = _.clone(grade);
      this.disciplinaGradeForm.Grade = this.gradeForm.id;
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    },

    findGrade() {
      var grade = _.find(this.$store.state.grade.Grades, [
        "id",
        this.currentGrade
      ]);
      this.showGrade(grade);
    },

    addDisciplinaGrade() {
      disciplinaGradeService
        .create(this.disciplinaGradeForm)
        .then(response => {
          this.disciplinaGradeForm.Disciplina = undefined;
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina} foi adicionada à Grade ${response.Grade}!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao incluir Disciplina</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    editDisciplinaGrade() {
      disciplinaGradeService
        .update(
          this.disciplinaGradeForm.Disciplina,
          this.disciplinaGradeForm.Grade,
          this.disciplinaGradeForm
        )
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina} foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Disciplina</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    deleteDisciplinaGrade() {
      disciplinaGradeService
        .delete(
          this.disciplinaGradeForm.Disciplina,
          this.disciplinaGradeForm.Grade,
          this.disciplinaGradeForm
        )
        .then(response => {
          this.cleanGrade();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina} foi excluída!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Disciplina</b>";
        });
    },

    showDisciplina: function(disciplinaGrade) {
      this.cleanDisciplina;
      this.disciplinaGradeForm = _.clone(disciplinaGrade);
    },

    andConnector: function(grade, disciplina, disciplinaGrade) {
      return (
        grade.id === disciplinaGrade.Grade &&
        disciplina.id === disciplinaGrade.Disciplina
      );
    },

    isEven(number) {
      return number % 2 === 0;
    }
  },

  computed: {
    Grades() {
      return this.$store.state.grade.Grades;
    },

    Cursos() {
      return this.$store.state.curso.Cursos;
    },

    Disciplinas() {
      return _.sortBy(this.$store.state.disciplina.Disciplinas, "nome");
    },

    DisciplinaGrades() {
      return _.sortBy(
        this.$store.state.disciplinaGrade.DisciplinaGrades,
        "periodo"
      );
    },

    isEdit() {
      return this.gradeForm.id !== undefined;
    },

    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.DashboardGrades {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.header {
  display: inline-block;
}
.data {
  display: inline-block;
}
.even {
  background-color: #d0f6fb;
}
.notEven {
  background-color: #fff0d5;
}

.btn {
  height: 25px;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  max-width: -webkit-max-content;
  max-width: -moz-max-content;
  max-width: max-content;
  font-size: 12px;
  padding: 0 5px 0 5px;
}
.botao-estilo {
  background-color: #0079fa !important;
  border-color: #0079fa !important;
}

.botao-estilo:hover {
  background-color: #0055af !important;
  border-color: #0055af !important;
}

.botao-estilo:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(108, 136, 166, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 136, 166, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 136, 166, 0.5) !important;
}
.botao-estilo2 {
  background-color: #f0852e !important;
  border-color: #f0852e !important;
  color: white;
}

.botao-estilo2:hover {
  background-color: #e86c07 !important;
  border-color: #e86c07 !important;
}

.botao-estilo2:focus {
  box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
}

.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.card {
  width: 390px;
}
.card-body {
  font-size: 12px;
  padding-top: 15px;
}
.col-form-label {
  padding-bottom: 0px;
}
select {
  height: 25px !important;
  font-size: 11px !important;
  padding: 0px 0px 0px 5px !important;
  min-width: 100px;
  max-width: 100px;
  text-align: center;
}
.selectMenor {
  min-width: 80px;
  max-width: 80px;
}
.selectMaior {
  min-width: 200px;
  max-width: 200px;
}
input {
  height: 25px !important;
  padding: 0px 0px 0px 5px !important;
  font-size: 11px !important;
  text-align: left;
}
.inputMenor {
  max-width: 60px;
  min-width: 60px;
  padding: 0px 0px 0px 0px !important;
  text-align: center;
}
.inputMenor2 {
  max-width: 40px;
  min-width: 40px;
  padding: 0px 0px 0px 0px !important;
  text-align: center;
}

.selectMaior2 {
  max-width: 350px;
  min-width: 350px;
}

.p-header {
  padding: 0px 0 0px 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
}
.divTable {
  overflow: hidden;
  height: auto;
  height: calc(100vh - 160px);
  border: #808080 solid 2px;
  width: max-content;
}
table {
  display: block;
  overflow-y: scroll;
  height: -webkit-calc(100vh - 160px);
  height: -moz-calc(100vh - 160px);
  height: calc(100vh - 160px);
  font-size: 11px;
  font-weight: normal;
  background-color: #f5f5f5;
  margin: 0;
}
tbody {
  /*top: 23px;*/
  max-height: 100%;
  width: 100%;
}
table td {
  text-align: center;
  vertical-align: middle;
  padding: 0 !important;
}
table p {
  margin-bottom: 0;
  text-align: center;
}
tr thead {
  display: block;
}
thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}

/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
  
  table select {
    height: 15px !important;
    text-align: left;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(133, 133, 133);
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  table input {
    height: 18px !important;
    text-align: center;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(92, 92, 92);
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
@media screen and (min-width:1100px) {
  .gridEsquerdo{
    margin-right: 0px!important;
  }
}
</style>