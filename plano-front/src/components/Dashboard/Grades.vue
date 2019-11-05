<template>
  <div class="DashboardGrades row" style="max-width:100%;" v-if="Admin">
    <div class="col">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Lista Disciplinas</h1>
      </div>
    
    <div class="w-100"></div>

      <!-- Grind esquerdo -->
      <div class="row" style="margin:0px !important;">
        <div class="col-lg-7 col-md-12 col-sm-12 col-12">
          <!-- Inicio forms Curso e Grande -->
          <div class="form-row mt-2">
            <div class="col-lg-6 col-md-5 col-sm-6 col-12">
              <label for="cursoAtual" class="col-form-label py-0">Curso</label>
              <select style="max-width:250px" id="cursoAtual" v-model="currentCurso" class="form-control form-control-sm mr-0">
                <option value="4">Ciência da Computação Diurno</option>
                <option value="1">Ciência da Computação Noturno</option>
                <option value="3">Sistemas de Informação</option>
                <option value="2">Engenharia Computacional</option>
              </select>
            </div>

            <div class="col-lg-2 col-md-2 col-sm-2 col-2">
              <label for="gradeAtual" class="col-form-label py-0 ">Grade</label>
              <select
                id="gradeAtual"
                v-model="currentGrade"
                v-on:change="findGrade()"
                class="form-control form-control-sm"
                style="width: 90px;">
                <option
                  v-for="grade in Grades"
                  v-if="grade.Curso == currentCurso"
                  :value="grade.id">
                {{grade.nome}}</option>
              </select>
            </div>
          </div>
          <!-- Final Forms Curso e Grande -->

          <div class="w-100"></div>
          <!-- Inicio da tabela -->
          <div class="col-lg-12 col-md-10 ml-0 mt-3 pl-0 pr-0" style="width:100%; font-size:13px">
            <table class="table table-bordered" style="border: #808080 solid 2px;">
              <thead class="thead-light">
                <tr>
                  <th class="header col-2 col-md-1 col-lg-1 col-sm-1" scope="col" style="text-align:center" >P.</th>
                  <th class="header col-10 col-md-11 col-lg-11 col-sm-11" scope="col" >Disciplina</th>
                </tr>
            </thead>
            
              <template v-if="currentGrade!=undefined">
                <template v-for="grade in Grades">
                  <tbody v-if="grade.id===currentGrade" :key="grade.id" v-on:click.prevent="showGrade(grade)">
                    <template v-for="disciplinaGrade in DisciplinaGrades">
                      <template v-if="disciplinaGrade.Grade===grade.id">
                        <tr class="data" style="width:100%;"  v-bind:class="[isEven(disciplinaGrade.periodo)? 'even':'notEven']">                            
      
                            <th class="data col-2 col-md-1 col-lg-1 col-sm-1" style="text-align:center;">
                              {{disciplinaGrade.periodo}}
                            </th>
                            <td class="data col-10 col-md-11 col-lg-11 col-sm-11" style="padding-right:0">
                              <template v-for="disciplina in Disciplinas">
                                <template v-if="andConnector(grade, disciplina, disciplinaGrade)">
                                  <span  class="data w-100" v-on:click.prevent="showDisciplina(disciplinaGrade); clickada=!clickada">
                                    {{disciplina.nome}}
                                  </span>
                                </template>
                              </template>
                            </td>

                        </tr>
                      </template>
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
        <div class="col-lg-5 col-md-10 col-sm-12 col-12 my-3 ml-auto mr-auto pl-0" style="top:50px; height:calc(100vh - 200px);">
          <!-- Inicio card Edit -->
          <div class="col card ">
            <div class="card-body py-0" style="padding:15px">
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <template v-if="isEdit">
                  <h1 class="h2">Editar Grade</h1>
                </template>
                <template v-else>
                  <h1 class="h2">Adicionar Grade</h1>
                </template>
              </div>
              <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error"></b-alert>
              <form>
                <div class="form-group row">
                <button
                    type="button"
                    class="btn col-3 btn-success btn-sm botao-estilo"
                    v-on:click.prevent="editGrade"
                    :key="1">
                    Salvar alterações
                  </button>

                  <button
                    type="button"
                    class="btn btn-danger col-3 btn-sm"
                    v-on:click.prevent="deleteGrade"
                    :key="3">
                      Excluir Grade
                  </button>
                </div>
                <div class="form-group row">
                  <label for="nome" class="col-lg-4 col-md-4 col-sm-4 col-12 col-form-label">Nome</label>
                  <div class="col-lg-8 col-md-6 col-sm-4 col-5">
                    <input type="text" style="text-align:center;" class="form-control form-control-sm col-lg-4 col-md-6 col-sm-8" id="nome" v-model="gradeForm.nome" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="periodoInicio" class="col-lg-4 col-md-4 col-sm-4 col-12 col-form-label">Período de Início</label>
                  <div class="col-lg-8 col-md-6 col-sm-4 col-5">
                    <input type="text" style="text-align:center" class="form-control form-control-sm col-lg-4 col-md-6 col-sm-8" id="periodoInicio" v-model="gradeForm.periodoInicio"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="curso" class="col-md-4 col-sm-4 col-12 col-form-label">Curso</label>
                  <div class="col-lg-8 col-md-7 col-sm-7 col-12">
                    <select type="text" style="text-align:center;" class="form-control form-control-sm" id="curso" v-model="gradeForm.Curso">
                      <option value="4">Ciência da Computação Diurno</option>
                      <option value="1">Ciência da Computação Noturno</option>
                      <option value="3">Sistemas de Informação</option>
                      <option value="2">Engenharia Computacional</option>
                    </select>
                  </div>
                  
                </div>
                
                <div class="form-group row">
                  <div class="col">
                    <template v-if="isEdit">

                      <hr style="margin-top:0; margin-bottom: 15px; margin-top: 15px"/>

                      <div class="form-group row">
                        <label for="disciplina" class="col-md-4 col-sm-4 col-12 col-form-label">Disciplina</label>
                        <div class="col-lg-8 col-md-7 col-sm-7 col-12">
                          <select
                            type="text"
                            class="form-control form-control-sm"
                            id="disciplina"
                            v-model="disciplinaGradeForm.Disciplina">
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
                      
                      <div class="form-group row">
                        <label for="periodoDisciplina" class="col-md-4 col-sm-4 col-12 col-form-label">
                          Período
                        </label>
                        <div class="input-group col-lg-8 col-md-7 col-sm-7 col-12">
                          <div class="input-group">     
                            <input
                            type="text"
                            class="form-control form-control-sm col-lg-2 col-md-2 col-sm-2 col-2"
                            aria-describedby="button-edit-periodo"
                            id="periodoDisciplina"
                            v-model="disciplinaGradeForm.periodo"
                            style="text-align:center; margin-right:0; height:31px">
                            <button
                              type="button"
                              class="btn btn-warning btn-sm botao-estilo2"
                              style="backgroud-color:#f0852e;"
                              v-on:click.prevent="editDisciplinaGrade"
                              :key="4">
                                Editar Período
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="form-group row pd">
                        <button
                          type="button"
                          class="btn btn-success m-2 btn-sm"
                          v-on:click.prevent="addDisciplinaGrade"
                          :key="4"
                        >Adicionar à Grade</button>

                        <button
                          type="button"
                          class="btn btn-danger m-2 btn-sm"
                          v-on:click.prevent="deleteDisciplinaGrade"
                          :key="4"
                        >Excluir Disciplina</button>

                        <button
                          type="button"
                          class="btn btn-secondary m-2 btn-sm"
                          v-on:click.prevent="cleanGrade"
                          :key="2"
                        >Cancelar</button>
                      </div>
                    </template>

                    <template v-else>
                      <div class="form-group row">
                        <button
                          type="button"
                          class="btn btn-success btn-sm ml-3 mt-3"
                          v-on:click.prevent="addGrade"
                          :key="1"
                        >Adicionar</button>
                        <button
                          type="button"
                          class="btn btn-secondary btn-sm ml-3 mt-3"
                          v-on:click.prevent="cleanGrade"
                          :key="2"
                        >Resetar</button>
                      </div>
                    </template>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- Final card Edit -->
        </div>
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
      clickada:false,
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
.form-group{
  margin-bottom: 5px;
}
.header {
  display: inline-block;
}

.data {
  display: inline-block;
}

.even {
  background-color:#B0E0E6;
}
.notEven{
  background-color: #FFE4B5;
}
.btn{
  height:31px;
  margin-bottom: 7px;
  margin-left:15px;
  min-width: max-content;
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
  box-shadow: 0 0 0 0.2rem rgba(108, 136, 166, 0.5) !important;
}


.table tr td:hover{
    background-color: #F7F7F7 !important;   
}
.table tr td{
  border-color: #6d6d6d;
  padding-top:5px;
  padding-bottom:5px;
}
.table  tr th{
  border-color: #6d6d6d;
  padding-top:5px;
  padding-bottom:5px;
}
.disciplinaClickada{
  background-color: crimson;
}

.table tbody {
  display: block;
  overflow-y: scroll;
  height:calc(100vh - 235px);
}
.table tr td{
  display: block;
  float:right;
}
.botao-estilo2{
  background-color: #f0852e !important;
  border-color: #f0852e !important;
  color: white;
}

.botao-estilo2:hover{
  background-color: #e86c07 !important;
  border-color: #e86c07 !important;
}
    
.botao-estilo2:focus{
  box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
}
</style>