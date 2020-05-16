<template>
  <div class="DashboardGradesEdit row pr-2" v-if="Admin">
    <PageTitle :title="'Disciplina na Grade'">
      <template #aside>
        <b-button
          v-b-modal.modalAjuda
          title="Ajuda"
          class="btn-custom btn-icon relatbtn"
        >
          <i class="fas fa-question"></i>
        </b-button>
      </template>
    </PageTitle>

    <div class="row w-100 m-0 p-0">
      <div class="divTable ml-0 mt-0 pl-0 pr-0 border">
        <table class="main-table table table-sm table-hover table-bordered">
          <thead class="thead-light ">
            <tr class="sticky">
              <div style="font-size: 11px;" class=" max-content">
                <th scope="col">
                  <p
                    class="p-header clickable"
                    style="width: 32px"
                    @click="toggleOrd()"
                  >
                    P.
                    <i
                      style="font-size: 0.6rem;"
                      :class="
                        ordenacao.order == 'periodo'
                          ? ordenacao.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p class="p-header " style="width:70px">
                    Código
                  </p>
                </th>
                <th scope="col">
                  <p class="p-header " style="width: 400px; text-align:start">
                    Disciplina
                  </p>
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <template v-if="hasGradeSelected">
              <template v-for="disciplinaGrade in DisciplinaGradesOrdered">
                <tr
                  @click.prevent="handleClickInDisciplina(disciplinaGrade)"
                  :key="
                    disciplinaGrade.Disciplina +
                      '-' +
                      disciplinaGrade.Grade +
                      '-' +
                      currentGradeId.id
                  "
                  :class="[
                    'clickable',
                    isEven(disciplinaGrade.periodo) ? 'bg-custom' : '',
                    {
                      'bg-selected':
                        disciplinaSelectedId === disciplinaGrade.Disciplina,
                    },
                  ]"
                >
                  <div class="max-content">
                    <td>
                      <p style="width:32px;">
                        {{ disciplinaGrade.periodo }}
                      </p>
                    </td>
                    <td>
                      <p style="width: 70px">
                        {{ disciplinaGrade.disciplina_codigo }}
                      </p>
                    </td>
                    <td>
                      <p style="width: 400px; text-align: start;">
                        {{ disciplinaGrade.disciplina_nome }}
                      </p>
                    </td>
                  </div>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
        <!-- Final da tabela -->
      </div>

      <!-- Grind direito -->
      <div class="div-card p-0 mt-0 mb-4 col-auto">
        <!-- Inicio card Disciplina -->
        <div class="card mr-3 ml-auto">
          <div class="card-header">
            <h1 class="card-title">Disciplinas</h1>
          </div>

          <div class="card-body">
            <form>
              <div class="row mb-2 mx-0">
                <div
                  class="form-group col m-0 px-0"
                  style="margin-right: 18px!important"
                >
                  <label for="cursoAtual" class="col-form-label">Curso</label>
                  <select
                    id="cursoAtual"
                    v-model="currentCursoId"
                    v-on:change="changeCurso()"
                    class="form-control form-control-sm selectMaior"
                  >
                    <option value="4">Ciência da Computação Diurno</option>
                    <option value="1">Ciência da Computação Noturno</option>
                    <option value="3">Sistemas de Informação</option>
                    <option value="2">Engenharia Computacional</option>
                  </select>
                </div>

                <div class="form-group m-0 col px-0">
                  <label for="gradeSelect" class="col-form-label">Grade</label>
                  <template v-if="hasCursoSelected">
                    <select
                      id="gradeSelect"
                      v-model="currentGradeId"
                      v-on:change="changeGrade()"
                      class="form-control form-control-sm selectMenor"
                    >
                      <template v-for="grade in GradesFiltredByCurrentCurso">
                        <option
                          :key="'grade-id' + grade.id"
                          :value="grade.id"
                          >{{ grade.nome }}</option
                        >
                      </template>
                    </select>
                  </template>
                  <template v-else>
                    <select
                      id="gradeSelect"
                      disabled
                      class="form-control form-control-sm selectMenor"
                    ></select>
                  </template>
                </div>
              </div>

              <div class="w-100 border mt-3 mb-2"></div>

              <!-- Edição de disciplina -->
              <!-- <template v-if="hasGradeSelected"> -->
              <div class="row mb-2 mx-0">
                <div class="form-group m-0 col px-0">
                  <label for="disciplina" class="col-form-label"
                    >Disciplina</label
                  >
                  <select
                    :disabled="!hasGradeSelected"
                    type="text"
                    class="form-control form-control-sm selectMaior2"
                    id="disciplina"
                    v-model="disciplinaGradeForm.Disciplina"
                    v-on:change="clearClick()"
                  >
                    <option v-if="Disciplinas.length === 0" type="text" value
                      >Nenhuma Disciplina Encontrada</option
                    >
                    <option
                      v-else
                      v-for="disciplina in Disciplinas"
                      :key="'2-grade-id' + disciplina.id"
                      :value="disciplina.id"
                      >{{ disciplina.nome }}</option
                    >
                  </select>
                </div>
              </div>

              <div class="row mb-2 mx-0">
                <div class="form-group m-0 col px-0">
                  <label for="periodoDisciplina" class="col-form-label"
                    >Período</label
                  >
                  <div class="d-flex">
                    <input
                      :disabled="!hasGradeSelected"
                      type="text"
                      class="form-control form-control-sm inputMenor2"
                      aria-describedby="button-edit-periodo"
                      id="periodoDisciplina"
                      @keypress="onlyNumber"
                      v-model="disciplinaGradeForm.periodo"
                    />

                    <button
                      v-if="!hasGradeSelected"
                      type="button"
                      class="btn-custom btn-icon btn-disable"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <button
                      v-else
                      type="button"
                      title="Salvar"
                      class="btn-custom btn-icon addbtn"
                      v-on:click.prevent="editDisciplinaGrade"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="row mb-0 mt-3 mx-0">
                <div class="d-flex mr-0 ml-auto">
                  <template v-if="!hasGradeSelected">
                    <button
                      type="button"
                      class="btn-custom btn-icon btn-disable"
                    >
                      <i class="fas fa-plus"></i>
                    </button>

                    <button
                      type="button"
                      class="btn-custom btn-icon btn-disable"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>

                    <button
                      type="button"
                      class="btn-custom btn-icon btn-disable"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </template>
                  <template v-else>
                    <button
                      v-show="isNotEditDisciplina"
                      type="button"
                      title="Adicionar à Grade"
                      class="btn-custom btn-icon addbtn"
                      v-on:click.prevent="addDisciplinaGrade"
                    >
                      <i class="fas fa-plus"></i>
                    </button>

                    <button
                      type="button"
                      v-show="!isNotEditDisciplina"
                      title="Deletar Disciplina"
                      class="btn-custom btn-icon delbtn"
                      v-on:click.prevent="deleteDisciplinaGrade(), clearClick()"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>

                    <button
                      type="button"
                      title="Cancelar"
                      class="btn-custom btn-icon cancelbtn"
                      v-on:click.prevent="cleanDisciplina()"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </template>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- Final card -->
    </div>

    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na tabela:</strong> Comece selecionando
            o curso desejado. Em seguida, selecione a grade que quer visualizar.
          </li>
          <li class="list-group-item">
            <strong>Para adicionar disciplinas à Grade:</strong> Com o cartão a
            direita em branco, preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>.
          </li>
          <li class="list-group-item">
            <strong>Para editar ou deletar uma disciplina:</strong> Na tabela,
            clique na disciplina que deseja modificar. Logo após, no cartão à
            direita, altere as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou, para excluí-la, clique em Deletar
            <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deixar o cartão em branco:</strong> No cartão, à
            direita, clique em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none"></div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import gradeService from "@/common/services/grade";
import disciplinaGradeService from "@/common/services/disciplinaGrade";
import PageTitle from "@/components/PageTitle.vue";

const emptyGrade = {
  id: undefined,
  periodoInicio: undefined,
  Curso: undefined,
  nome: undefined,
};
const emptyDisciplinaGrade = {
  periodo: undefined,
  Disciplina: undefined,
  Grade: undefined,
};
export default {
  name: "DashboardGradeEdit",
  components: {
    PageTitle,
  },
  data() {
    return {
      gradeForm: _.clone(emptyGrade),
      disciplinaGradeForm: _.clone(emptyDisciplinaGrade),
      error: undefined,
      currentGradeId: undefined,
      currentCursoId: undefined,
      grades: [],
      disciplinaSelectedId: "",
      showCard: false,
      nomeDisciplinaAtual: undefined,
      ordenacao: { order: "periodo", type: "asc" },
    };
  },
  methods: {
    toggleOrd() {
      this.ordenacao.type = this.ordenacao.type == "asc" ? "desc" : "asc";
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    handleClickInDisciplina(disciplinaGrade) {
      this.disciplinaSelectedId = disciplinaGrade.Disciplina;
      this.nomeDisciplinaAtual = disciplinaGrade.disciplina_nome;

      this.showDisciplina(disciplinaGrade);
      this.showGrade(this.currentGradeId);
    },

    clearClick() {
      this.disciplinaSelectedId = "";
      this.nomeDisciplinaAtual = "";
    },
    addGrade() {
      gradeService
        .create(this.gradeForm)
        .then((response) => {
          this.cleanGradeForm();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${response.Grade.nome} foi criada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao criar Grade</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },
    editGrade() {
      gradeService
        .update(this.gradeForm.id, this.gradeForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${response.Grade.nome} foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Grade</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },
    deleteGrade() {
      let grade_nome = this.gradeForm.nome;
      gradeService
        .delete(this.gradeForm.id, this.gradeForm)
        .then((response) => {
          this.cleanGradeForm();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${grade_nome} foi excluída!`,
            type: "warn",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Grade</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },
    cleanGradeForm() {
      this.gradeForm = _.clone(emptyGrade);
      this.error = undefined;
    },
    cleanDisciplina() {
      this.clearClick();
      this.disciplinaGradeForm.periodo = undefined;
      this.disciplinaGradeForm.Disciplina = undefined;
    },
    showGrade(gradeId) {
      this.cleanGradeForm();
      const grade = _.find(this.$store.state.grade.Grades, ["id", gradeId]);
      this.gradeForm = _.clone(grade);
      this.disciplinaGradeForm.Grade = this.gradeForm.id;
    },
    changeCurso() {
      ///Curso foi selecionado mas grade ainda não foi selecionada
      this.cleanDisciplina();
      this.cleanGradeForm();
      this.currentGradeId = undefined;
    },
    changeGrade() {
      this.cleanDisciplina();
      if (this.currentGradeId != undefined) this.showGrade(this.currentGradeId);
    },
    addDisciplinaGrade() {
      let nome_disciplina = null;
      for (const key in this.Disciplinas) {
        if (this.Disciplinas[key].id == this.disciplinaGradeForm.Disciplina) {
          nome_disciplina = this.Disciplinas[key].nome;
          break;
        }
      }
      disciplinaGradeService
        .create(this.disciplinaGradeForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina <b>${nome_disciplina}</b> foi adicionada à Grade <b>${this.gradeForm.nome}</b>!`,
            type: "success",
          });
          // this.disciplinaGradeForm.Disciplina = undefined; //Limpa campo de disciplina apos adicionar
        })
        .catch((error) => {
          this.error = "<b>Erro ao incluir Disciplina</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },
    editDisciplinaGrade() {
      disciplinaGradeService
        .update(
          this.disciplinaGradeForm.Disciplina,
          this.disciplinaGradeForm.Grade,
          this.disciplinaGradeForm
        )
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina <b>${this.nomeDisciplinaAtual}</b> foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Disciplina</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },
    deleteDisciplinaGrade() {
      disciplinaGradeService
        .delete(
          this.disciplinaGradeForm.Disciplina,
          this.disciplinaGradeForm.Grade,
          this.disciplinaGradeForm
        )
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina <b>${this.nomeDisciplinaAtual}</b> foi excluída!`,
            type: "warn",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Disciplina</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
      //this.cleanDisciplina();
    },
    showDisciplina(disciplinaGrade) {
      this.cleanDisciplina;
      this.disciplinaGradeForm = _.clone(disciplinaGrade);
    },
    isEven(number) {
      return number % 2 === 0;
    },
  },
  computed: {
    hasCursoSelected() {
      return this.currentCursoId != undefined;
    },
    hasGradeSelected() {
      return this.currentGradeId != undefined;
    },
    isNotEditDisciplina() {
      return this.disciplinaSelectedId !== this.disciplinaGradeForm.Disciplina;
    },
    DisciplinaGradesOrdered() {
      return _.orderBy(
        this.DisciplinaGradesFiltred,
        this.ordenacao.order,
        this.ordenacao.type
      );
    },
    DisciplinaGradesFiltred() {
      return _.filter(
        this.$store.state.disciplinaGrade.DisciplinaGrades,
        (disciplinaGrade) => {
          return _.find(this.Disciplinas, (disciplina) => {
            if (
              this.currentGradeId === disciplinaGrade.Grade &&
              disciplina.id === disciplinaGrade.Disciplina
            ) {
              disciplinaGrade.disciplina_nome = disciplina.nome;
              disciplinaGrade.disciplina_codigo = disciplina.codigo;
              return true;
            }
            return false;
          });
        }
      );
    },
    GradesFiltredByCurrentCurso() {
      return _.filter(
        this.Grades,
        (grade) => grade.Curso == this.currentCursoId
      );
    },
    Grades() {
      return this.$store.state.grade.Grades;
    },
    Cursos() {
      return this.$store.state.curso.Cursos;
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },

    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.DashboardGradesEdit {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}

.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}
/* ====== CARD ====== */
.div-card {
  margin-left: auto;
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.card {
  width: 342px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-left: auto;
}
.card-body {
  font-size: 12px !important;
  padding-top: 15px;
}
.card label {
  line-height: 1.2;
  font-size: 12px;
  text-align: start;
  padding-top: 0 !important;
}
select {
  height: 25px !important;
  font-size: 11px !important;
  padding: 0px 5px 0px 5px !important;
  min-width: 100px;
  max-width: 100px;
  text-align: center;
}
.selectMenor {
  min-width: 80px;
  max-width: 80px;
  text-align: start !important;
}
.selectMaior {
  min-width: 200px;
  max-width: 200px;
  text-align: start !important;
}
input {
  height: 25px !important;
  padding: 0px 5px 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}
.inputMenor {
  max-width: 60px;
  min-width: 60px;
  text-align: center;
}
.inputMenor2 {
  max-width: 40px;
  min-width: 40px;
  margin-right: 10px;
  text-align: center;
}
.selectMaior2 {
  max-width: 300px;
  min-width: 300px;
  text-align: start;
}
/* main-table */
.divTable {
  overflow: hidden;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
.main-table {
  display: block !important;
  overflow-y: scroll !important;
  overflow-x: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: -webkit-calc(100vh - 95px);
  height: -moz-calc(100vh - 95px);
  height: calc(100vh - 95px);
}
.main-table .p-header {
  height: 18px;
}
.main-table p {
  padding: 0 5px 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
}
tbody {
  max-height: 100% !important;
  width: 100% !important;
}
.main-table td {
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  height: 22px !important;
}
.main-table tr thead {
  display: block !important;
}
.main-table thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
.main-table input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0 !important;
  margin-top: 4px !important;
}
/* fim table */
.sticky {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
  display: block !important;
  overflow: hidden !important;
  z-index: 3;
}
.even {
  background-color: #c8c8c8;
}
.notEven {
  background-color: white;
}
.listas {
  line-height: 30px;
  font-size: 12px;
  text-align: justify;
  line-height: inherit;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
strong {
  color: #007bff;
}

.btn-disable {
  background-color: white;
  color: #cfcfc4;
  cursor: default !important;
  outline: none !important;
}
.btn-disable::-moz-focus-inner {
  border: 0;
}

.modal-header {
  background-color: rgba(0, 0, 0, 0.03);
  text-align: center;
}
header {
  text-align: center;
}
.modal-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.form-inline .input-group,
.form-inline {
  width: auto;
}

.form-group-top {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 0;
}

@media screen and (max-width: 885px) {
  .div-card {
    margin-left: 0px !important;
    margin-right: 50px !important;
    margin-top: 20px !important;
    top: 0 !important;
  }
  .card {
    margin-left: 0px !important;
  }
}
</style>
