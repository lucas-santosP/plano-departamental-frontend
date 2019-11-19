<template>
  <div class="DashboardCursos row pr-2" v-if="Admin">
    <div class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap pt-0 pb-0 pr-0 pl-0 mb-0">
      <div class="form-inline col-12 pl-0 mb-2 pr-1">
        <h1 class="titulo">Lista Cursos</h1>
      </div>
    </div>

	  <div class="w-100 mb-2 border-bottom"></div>

    <!-- Grid Esquerdo -->
    <div class="col">
      <!-- Inicio da Tabela -->
      <div class="divTable">
        <table class="table table-hover table-sm">
          <thead class="thead-light">
            <tr>
              <div style="display: block; overflow: hidden; width: 570px" class="sticky">
                <th scope="col">Nome</th>
                <th scope="col">Código</th>
                <th scope="col">Turno</th>
                <th scope="col">1º Sem.</th>
                <th scope="col">2º Sem.</th>
                <th scope="col">
                  <input type="checkbox" v-model="selectAll" v-on:click.prevent="toggleAllCursos" />
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <template v-if="Cursos.length > 0">
              <tr v-for="curso in Cursos" :key="curso.id" v-on:click.prevent="showCurso(curso)">
                <div style="width: 570px">
                  <td>{{ curso.nome }}</td>
                  <td>{{ curso.codigo }}</td>
                  <td>{{ curso.turno }}</td>
                  <!-- 1 = 1º semestre, 2 = 2º semestre, 3 = Ambos-->
                  <td
                    v-if="curso.semestreInicial == 1 || curso.semestreInicial == 3"
                  >{{ curso.alunosEntrada }}</td>
                  <td v-else>0</td>
                  <td
                    v-if="curso.semestreInicial == 2 || curso.semestreInicial == 3"
                  >{{ curso.alunosEntrada }}</td>
                  <td v-else>0</td>
                  <td>
                    <input
                      type="checkbox"
                      v-model="CursosAtivos[curso.id]"
                      v-on:click.prevent="toggleCurso(curso.id)"
                    />
                  </td>
                </div>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="2" class="text-center">
                  <i class="fas fa-exclamation-triangle"></i> Nenhum curso
                  encontrado!
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <!-- Fim da Tabela -->
      </div>
    </div>
    <!-- Fim do Grid Esquerdo -->
	 
    <!-- Grid Direito -->
    <div class="cartao-inteiro col ml-auto pl-0">
      <div
        class="col col-lg-12 col-md-12 col-sm-12 col-12 card cartao"
        style="width: 100%; max-width: 350px; max-height: 79vh;"
      >
        <div class="card-body">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom"
          >
            <template v-if="isEdit">
              <h1 style="font-size:14px; font-weight: bold; padding-left: 10px;">Editar Curso</h1>
            </template>
            <template v-else>
              <h1 style="font-size:14px; font-weight: bold; padding-left: 10px;">Adicionar Curso</h1>
            </template>
          </div>
          <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error"></b-alert>
          <form>
            <div class="form-group row">
              <label
                for="nome"
                class="col-form-label col-sm-3 col-3"
                style="text-align: end; padding: 0"
              >Nome</label>
              <div class="col-9" style="padding-left: 10px;">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="nome"
                  v-model="cursoForm.nome"
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="codigo"
                class="col-form-label col-sm-3 col-3"
                style="text-align: end; padding: 0"
              >Código</label>
              <div class="col-9" style="padding-left: 10px;">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="codigo"
                  v-model="cursoForm.codigo"
                />
              </div>
            </div>

            <div class="form-group row">
              <label for="alunosEntrada" class="col-sm-2 col-form-label">Alunos 1º semestre</label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="alunosEnrada"
                  v-model="cursoForm.alunosEntrada"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="alunosEntrada" class="col-sm-2 col-form-label">Alunos 2º semestre</label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="alunosEnrada"
                  v-model="cursoForm.alunosEntrada2"
                />
              </div>
            </div>

            <div class="form-group row">
              <label
                for="turno"
                class="col-lg-3 col-md-3 col-sm-3 col-3 col-form-label"
                style="text-align:end; padding: 0"
              >Turno</label>
              <div class="col-sm-6 col-6">
                <div class="radio" id="turno">
                  <input type="radio" name="turno" value="Diurno" v-model="cursoForm.turno" />
                  Diurno
                  <br />
                  <input type="radio" name="turno" value="Integral" v-model="cursoForm.turno" />
                  Integral
                  <br />
                  <input type="radio" name="turno" value="Noturno" v-model="cursoForm.turno" />
                  Noturno
                  <br />
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-10">
                <template v-if="isEdit">
                  <button
                    type="button"
                    class="btn btn-warning m-2 botao-estilo"
                    v-on:click.prevent="editCurso"
                    :key="1"
                  >Editar</button>
                  <button
                    type="button"
                    class="btn btn-danger m-2"
                    v-on:click.prevent="deleteCurso"
                    :key="3"
                  >Excluir</button>
                  <button
                    type="button"
                    class="btn btn-secondary m-2"
                    v-on:click.prevent="cleanCurso"
                    :key="2"
                  >Cancelar</button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="btn btn-success m-2"
                    v-on:click.prevent="addCurso"
                    :key="1"
                  >Adicionar</button>
                  <button
                    type="button"
                    class="btn btn-secondary m-2"
                    v-on:click.prevent="cleanCurso"
                    :key="2"
                  >Resetar</button>
                </template>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Fim do Grid Direito -->
  </div>
</template>
<script>
import _ from "lodash";
import cursoService from "../../common/services/curso";
import pedidoService from "../../common/services/pedido";
import ls from "local-storage";
const emptyCurso = {
  id: undefined,
  nome: undefined,
  codigo: undefined,
  turno: undefined,
  semestreInicial: undefined,
  alunosEntrada: undefined,
  alunosEntrada2: undefined,
  posicao: undefined
};
const emptyPedido = {
  vagasPeriodizadas: 0,
  vagasNaoPeriodizadas: 0,
  Curso: undefined,
  Turma: undefined,
  ultimo: undefined,
  selectAll: undefined
};
export default {
  name: "DashboardCursos",
  data() {
    return {
      cursoForm: _.clone(emptyCurso),
      error: undefined
    };
  },
  created() {
    this.ultimo =
      this.$store.state.curso.Cursos[this.$store.state.curso.Cursos.length - 1]
        .id + 1;
    this.selectAll = true;
  },
  methods: {
    toggleCurso(id) {
      var state = ls.get(`${id}`);
      this.$store.dispatch("toggleCurso", id);
      ls.set(`${id}`, !state);
    },
    toggleAllCursos() {
      if (this.selectAll === true) {
        this.$store.dispatch("toggleAllCursosFalse");
        this.selectAll = false;
        ls.set("toggle", false);
      } else {
        this.$store.dispatch("toggleAllCursosTrue");
        this.selectAll = true;
        ls.set("toggle", true);
      }
    },
    addCurso() {
      this.cursoForm.posicao = this.ultimo;
      this.ultimo = this.ultimo + 1;
      if (
        this.cursoForm.alunosEntrada == 0 ||
        this.cursoForm.alunosEntrada === undefined
      )
        if (
          this.cursoForm.alunosEntrada2 == 0 ||
          this.cursoForm.alunosEntrada2 === undefined
        )
          this.cursoForm.semestreInicial = 3;
        else this.cursoForm.semestreInicial = 2;
      else if (
        this.cursoForm.alunosEntrada2 == 0 ||
        this.cursoForm.alunosEntrada2 === undefined
      )
        this.cursoForm.semestreInicial = 1;
      else this.cursoForm.semestreInicial = 3;
      cursoService
        .create(this.cursoForm)
        .then(response => {
          for (var i = 0; i < this.$store.state.turma.Turmas.length; i++) {
            var pedido = _.clone(emptyPedido);
            pedido.Curso = response.Curso.id;
            pedido.Turma = this.$store.state.turma.Turmas[i].id;
            console.log(pedido);
            pedidoService
              .create(pedido)
              .then(response => {})
              .catch(error => {
                console.log("erro ao criar pedido: " + error);
              });
          }
          this.cleanCurso();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Curso ${response.Curso.nome} foi criado!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Curso</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },
    editCurso() {
      if (
        this.cursoForm.alunosEntrada == 0 ||
        this.cursoForm.alunosEntrada === undefined
      )
        if (
          this.cursoForm.alunosEntrada2 == 0 ||
          this.cursoForm.alunosEntrada2 === undefined
        )
          this.cursoForm.semestreInicial = 3;
        else this.cursoForm.semestreInicial = 2;
      else if (
        this.cursoForm.alunosEntrada2 == 0 ||
        this.cursoForm.alunosEntrada2 === undefined
      )
        this.cursoForm.semestreInicial = 1;
      else this.cursoForm.semestreInicial = 3;
      cursoService
        .update(this.cursoForm.id, this.cursoForm)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Curso ${response.Curso.nome} foi atualizado!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Curso</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },
    deleteCurso() {
      cursoService
        .delete(this.cursoForm.id, this.cursoForm)
        .then(response => {
          this.cleanCurso();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Curso ${response.Curso.nome} foi excluído!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Curso</b>";
        });
    },
    cleanCurso() {
      this.cursoForm = _.clone(emptyCurso);
      this.error = undefined;
    },
    showCurso(curso) {
      this.cleanCurso();
      this.cursoForm = _.clone(curso);
    }
  },
  computed: {
    Cursos() {
      return this.$store.state.curso.Cursos;
    },
    CursosAtivos() {
      return this.$store.state.curso.Ativos;
    },
    isEdit() {
      return this.cursoForm.id !== undefined;
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

.DashboardCursos {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.btn {
  height: 25px;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  font-size: 12px;
  padding: 0 5px 0 5px;
  max-width: 65px;
}
.botao-estilo {
  background-color: #faca4d !important;
  border-color: #faca4d !important;
  color: white;
}

.botao-estilo:hover {
  background-color: #f8ac51 !important;
  border-color: #f8ac51 !important;
}

.botao-estilo:focus {
  box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
}
.custom-select {
  height: 26px !important;
  font-size: 12px !important;
  padding: 0px 0px 0px 10px !important;
  min-width: 85px;
  max-width: 85px;
  text-align: center;
}
.input-group-text {
  max-width: 70px;
  min-width: 70px;
  height: 26px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
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
  border: #808080 solid 2px;
  height: max-content;
  width: max-content;
}
table {
  display: block;
  overflow-y: scroll;
  height: -webkit-calc(100vh - 100px);
  height: -moz-calc(100vh - 100px);
  height: calc(100vh - 100px);
  font-size: 11px;
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
table select {
  height: 15px !important;
  text-align: left;
}
table input {
  height: 18px !important;
  text-align: center !important;
}

/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
  select {
    height: 15px !important;
    text-align: left;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(133, 133, 133);
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  input {
    height: 18px !important;
    text-align: center;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(92, 92, 92);
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}

.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}

.radio {
  font-size: 11px;
}

.form-group {
  margin-bottom: 8px !important;
}
.col-form-label {
  font-size: 11px;
  padding-top: 0;
  padding-bottom: 0;
}

input[type="text"] {
  height: 25px;
}

input[type="radio"],
input[type="checkbox"] {
  height: 13px;
}

.cartao {
  width: 300px !important;
  height: 370px !important;
  padding: 0 0 0 5px;
}

</style>
