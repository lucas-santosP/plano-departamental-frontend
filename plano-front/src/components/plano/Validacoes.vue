<template>
  <!-- Titulo -->
  <div class="DashboardValidacoes row pr-2">
    <div
      class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height: 38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-xl-6 col-lg-6 col-md-7 col-sm-7 col-8 px-0 pr-1">
          Validações do Plano
        </h1>

        <div
          class="form-group col-xl-6 col-lg-6 col-md-5 col-sm-5 col-4 mb-0 p-0"
          style="justify-content: flex-end !important;"
        >
          <b-button v-b-modal.modalFiltros title="Filtros" class="cancelbtn">
            <i class="fas fa-list-ul"></i>
          </b-button>
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div class="pl-0 divTable" ref="mainTable">
      <table class="table main-table table-hover table-sm table-bordered">
        <thead class="thead-light sticky">
          <tr>
            <div style="font-size: 11px !important;" class=" max-content">
              <th>
                <p
                  style="width: 35px; text-align: center;"
                  class="p-header clickable"
                  @click="toggleOrdValidacoes('turma_periodo')"
                >
                  S.
                  <i
                    style="font-size: 0.6rem; text-align: right;"
                    :class="
                      OrdemValidacao.order == 'turma_periodo'
                        ? OrdemValidacao.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>
              <th>
                <p
                  style="width: 70px; text-align: start;"
                  class="p-header clickable"
                  @click="toggleOrdValidacoes('disciplina_perfil')"
                >
                  Perfil
                  <i
                    style="font-size: 0.6rem; text-align: right;"
                    :class="
                      OrdemValidacao.order == 'disciplina_perfil'
                        ? OrdemValidacao.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>
              <th>
                <p
                  style="width: 70px; text-align: start;"
                  class="p-header clickable"
                  @click="toggleOrdValidacoes('disciplina_codigo')"
                >
                  Cód.
                  <i
                    style="font-size: 0.6rem; text-align: right;"
                    :class="
                      OrdemValidacao.order == 'disciplina_codigo'
                        ? OrdemValidacao.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>
              <th>
                <p
                  style="width: 300px; text-align: start;"
                  class="p-header clickable"
                  @click="toggleOrdValidacoes('disciplina_nome')"
                >
                  Disciplina
                  <i
                    style="font-size: 0.6rem; text-align: right;"
                    :class="
                      OrdemValidacao.order == 'disciplina_nome'
                        ? OrdemValidacao.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>
              <th>
                <p style="width: 35px; text-align: start;" class="p-header">
                  Letra
                </p>
              </th>
              <th>
                <p style="width: 100px; text-align: start;" class="p-header">
                  Docentes
                </p>
              </th>

              <th>
                <p style="width: 350px; text-align: start;" class="p-header">
                  Conflito
                </p>
              </th>
            </div>
          </tr>
        </thead>
        <tbody style="text-transform: uppercase">
          <template v-for="validacao in Turmas_validacoes_filtred">
            <tr
              :key="
                'modal-validacoes' +
                  validacao.turma_id +
                  validacao.disciplina_codigo
              "
              style="background-color:rgba(0, 0, 0, 0.089);"
            >
              <div class="max-content">
                <td>
                  <p style="width: 35px; text-align: center;">
                    {{ validacao.turma_periodo }}
                  </p>
                </td>
                <td>
                  <p style="width: 70px; text-align: start;">
                    {{ validacao.disciplina_perfil }}
                  </p>
                </td>
                <td>
                  <p style="width: 70px; text-align: start;">
                    {{ validacao.disciplina_codigo }}
                  </p>
                </td>
                <td>
                  <p style="width: 300px; text-align: start;">
                    {{ validacao.disciplina_nome }} --
                    {{ validacao.pedidos_totais }}
                  </p>
                </td>
                <td>
                  <p style="width: 35px; text-align: center;">
                    {{ validacao.turma_letra }}
                  </p>
                </td>
                <td>
                  <p style="width: 100px; text-align: center;">
                    {{ validacao.turma_docente1 }}
                    <br />
                    {{ validacao.turma_docente2 }}
                  </p>
                </td>

                <td>
                  <p style="width: 350px; text-align: start;"></p>
                </td>
              </div>
            </tr>
            <tr
              v-for="erro in validacao.conflitos"
              :key="validacao.turma_id + erro.msg"
            >
              <div class="max-content">
                <td>
                  <p style="width: 35px; text-align: center;"></p>
                </td>
                <td>
                  <p style="width: 70px; text-align: start;"></p>
                </td>
                <td>
                  <p style="width: 70px; text-align: center;"></p>
                </td>
                <td>
                  <p style="width: 300px; text-align: start;"></p>
                </td>
                <td>
                  <p style="width: 35px; text-align: center;"></p>
                </td>
                <td>
                  <p style="width: 100px; text-align: center;"></p>
                </td>

                <td>
                  <p style="width: 350px; text-align: start;">
                    {{ erro.msg }}
                  </p>
                </td>
              </div>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      OrdemValidacao: { order: "periodo", type: "asc" },
      semestreAtual: 1,
    };
  },
  methods: {
    //Ordem Validacoes
    toggleOrdValidacoes(ord) {
      if (this.OrdemValidacao.order != ord) {
        this.OrdemValidacao.order = ord;
        this.OrdemValidacao.type = "asc";
      } else {
        this.OrdemValidacao.type =
          this.OrdemValidacao.type == "asc" ? "desc" : "asc";
      }
    },
    //Encontra o nome do perfil pelo ID
    findPerfilById(id) {
      let perfil = _.find(this.Perfis, (p) => p.id == id);
      return perfil != undefined ? perfil : null;
    },
    //Encontra o nome do docente pelo ID
    findDocenteById(id) {
      let docente = _.find(this.Docentes, (d) => d.id == id);
      return docente != undefined ? docente.apelido : null;
    },
    //Encontra disciplina pelo ID
    findDisciplinaById(id) {
      let disciplina = _.find(this.Disciplinas, (d) => d.id == id);
      return disciplina != undefined ? disciplina : null;
    },
    totalPedidos(turma_id) {
      let result = 0;
      let pedidos = this.$store.state.pedido.Pedidos[turma_id];
      for (let p = 0; p < pedidos.length; p++) {
        result += parseInt(pedidos[p].vagasPeriodizadas, 10);
        result += parseInt(pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return result;
    },
    createValidacao(turma, disciplina) {
      return {
        //Turmas
        turma_id: turma.id,
        turma_periodo: turma.periodo,
        turma_letra: turma.letra,
        turma_turno1: turma.turno1,
        turma_Horario1: turma.Horario1,
        turma_Horario2: turma.Horario2,
        turma_docente1: this.findDocenteById(turma.Docente1),
        turma_docente2: this.findDocenteById(turma.Docente2),
        pedidos_totais: this.totalPedidos(turma.id),
        //Disciplinas
        disciplina_nome: disciplina.nome,
        disciplina_codigo: disciplina.codigo,
        disciplina_ead: disciplina.ead,
        disciplina_perfil: this.findPerfilById(disciplina.Perfil).abreviacao,
        conflitos: [],
        // disciplina: {
        //   nome: disciplina.nome,
        //   codigo: disciplina.codigo,
        //   ead: disciplina.ead,
        //   perfil: this.findPerfilById(disciplina.Perfil).abreviacao,
        // },
        //sala1_nome: fazer função para pegar sala pelo ID
      };
    },
    checkAllValidations(turma, disciplina) {
      let validation = this.createValidacao(turma, disciplina);
      let check;
      //Letra
      // check = this.checkLetra(turma.letra);
      // if (check) erros.push(check);
      // //Turno
      // check = this.checkTurno(turma.turno1);
      // if (check) erros.push(check);
      //Turno com disciplina
      check = this.checkTurnoEAD(disciplina.ead, turma.turno1);
      if (check) validation.erros.push(check);

      return validation;
    },
    checkLetra(letra) {
      return letra != null && !letra.match(/[A-Z]/i)
        ? { type: 1, msg: "Letra da turma invalida!" }
        : null;
    },
    checkTurno(turno) {
      return turno === null ? { type: 2, msg: "Turno invalido" } : null;
    },
    checkTurnoEAD(isEAD, turno) {
      return (isEAD && turno != "EAD") || (!isEAD && turno === "EAD")
        ? {
            type: 3,
            msg: "Incompatbilidade entre turno e cadastro EAD da disciplina",
          }
        : false;
    },
    checkHorarios(isEAD, horario1, horario2) {
      if (!isEAD) {
        return horario1 === null
          ? {
              type: 4,
              msg: "Horarios incompletos ou invalidos",
            }
          : false;
      }
      return false;
    },
    checkDocente(docente1, docente2) {
      return docente1 === null && docente2 == null
        ? { type: 5, msg: "Docentes invalidos" }
        : false;
    },
    checkSala(disciplina_lab, sala1, sala2) {
      return disciplina_lab && (!this.isLab(sala1) || !this.isLab(sala2));
    },
    checkVagasSalas(turma_sala, pedidosTotais) {
      if (turma_sala != null) {
        let sala = _.find(this.Salas, (s) => turma_sala == s.id);

        if (sala != undefined && sala.lotacao_maxima != 0) {
          if (sala.lotacao_maxima < pedidosTotais) {
            return {
              sala: sala.nome,
              lotacao: sala.lotacao_maxima,
              vagastotais: pedidosTotais,
            };
          }
        }
      }
      return false;
    },

    //Verifica se a sala é laboratorio
    isLab(turma_sala) {
      let cond = _.find(
        this.Salas,
        (sala) => turma_sala == sala.id && sala.laboratorio
      );
      if (cond != undefined) return true;
      else return false;
    },
    isNull(variavel) {
      return variavel == null;
    },
  },
  computed: {
    //Turmas validacoes ordenadas
    Turmas_validacoes_filtred() {
      return _.orderBy(
        this.Turmas_validacoes,
        this.OrdemValidacao.order,
        this.OrdemValidacao.type
      );
    },
    Turmas_table() {
      let result = [];
      this.Perfis.forEach((perfil) => {
        result = this.Turmas.filter((turma) => {
          if (_.isNull(turma.Disciplina)) return false;
          //Encontra a disciplina da turma
          let disciplina = this.findDisciplinaById(turma.Disciplina);
          return disciplina.Perfil === perfil.id;
        });
      });
      return result;
    },
    //Verifica validações das turmas
    Turmas_validacoes() {
      console.log(this.Turmas[0]);
      let turmas_result = [];

      this.Turmas.forEach((turma) => {
        //Encontra a disciplina da turma
        let disciplina = this.findDisciplinaById(turma.Disciplina);

        if (disciplina && turma.periodo === 1) {
          let validacao = this.createValidacao(turma, disciplina);
          let check;

          //Letra
          check = this.checkLetra(validacao.turma_letra);
          if (check) validacao.conflitos.push(check);
          //Turno
          check = this.checkTurno(validacao.turma_turno1);
          if (check) validacao.conflitos.push(check);
          //Compatibilidade do turno com disciplina
          check = this.checkTurnoEAD(
            validacao.disciplina_ead,
            validacao.turma_turno1
          );
          if (check) validacao.conflitos.push(check);
          //Horarios
          check = this.checkHorarios(
            validacao.disciplina_ead,
            validacao.turma_Horario1
          );
          if (check) validacao.conflitos.push(check);
          //Docente
          check = this.checkDocente(
            validacao.turma_docente1,
            validacao.turma_docente2
          );
          if (check) validacao.conflitos.push(check);

          //Se houve conflito adiciona na turma resultante
          if (validacao.conflitos.length) turmas_result.push(validacao);
        }
      });
      return turmas_result;
    },
    Turmas() {
      return _.orderBy(
        _.orderBy(this.$store.state.turma.Turmas, "letra"),
        "Disciplina"
      );
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    Perfis() {
      return _.orderBy(this.$store.state.perfil.Perfis, "nome");
    },
    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },
    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    },
  },
};
//Verifica letra
// if (this.checkLetra(turma.letra)) {
//   obj.erros.push({ mensagem: "Letra da turma invalida" });
// }
// //Verifica turno
// if (this.checkTurno(turma.turno1)) {
//   obj.erros.push({ mensagem: "Turno Invalido" });
// }
// //Verifica compatibilidade do turno com disciplina EAD
// if (this.checkTurnoEAD(disciplina.ead, turma.turno1)) {
//   obj.erros.push({
//     mensagem:
//       "Incompatibilidade entre cadastro da disciplina e o turno alocado",
//   });
// }
// //Verifica Horarios das disciplinas que não são EAD
// if (!disciplina.ead && turma.turno1 != "EAD") {
//   if (
//     this.isNull(turma.Horario1) ||
//     (turma.cargaTeorica > 2 && this.isNull(turma.Horario2))
//   ) {
//     obj.erros.push({
//       mensagem: "Horarios incompletos ou invalidos",
//     });
//   }
// }
// //Verifica Docente
// if (this.isNull(turma.Docente1) && this.isNull(turma.Docente2)) {
//   obj.erros.push({ mensagem: "Docentes incompletos ou invalidos" });
// }
// //Verifica alocação de Lab e salas
// if (!this.isNull(turma.Sala1) || !this.isNull(turma.Sala2)) {
//   //Se possui sala alocada verifica se possui lab alocado
//   if (this.checkSala(disciplina.ead, turma.Sala1, turma.Sala2)) {
//     obj.erros.push({
//       mensagem:
//         "Disciplina de laboratorio porem não possui uma sala laboratorio alocada",
//     });
//   }
//   //Verifica as vagas com capacidade das salas
//   //Sala 1
//   let vagasInSala1 = this.checkVagasSalas(
//     turma.Sala1,
//     turmaPedidosTotais
//   );
//   //Sala 2
//   let vagasInSala2 = this.checkVagasSalas(
//     turma.Sala1,
//     turmaPedidosTotais
//   );

//   if (vagasInSala1) {
//     obj.erros.push({
//       mensagem:
//         "Limite da 1º sala excedido: " +
//         vagasInSala1.sala +
//         " possui capacidade de " +
//         vagasInSala1.lotacao +
//         " vagas e foram alocadas " +
//         vagasInSala1.vagastotais,
//     });
//   }
//   if (vagasInSala2) {
//     obj.erros.push({
//       mensagem:
//         "Limite da 2ª sala excedido: " +
//         vagasInSala2.sala +
//         " possui capacidade de " +
//         vagasInSala2.lotacao +
//         " vagas e foram alocadas " +
//         vagasInSala2.vagastotais,
//     });
//   }
// }
// if (turmaPedidosTotais == 0) {
//   obj.erros.push({
//     mensagem: "Turma não possui nenhuma vaga alocada",
//   });
// } else if (turmaPedidosTotais <= 4) {
//   obj.erros.push({
//     mensagem: "Turma possui apenas 4 vagas alocadas",
//   });
// }

// if (obj.erros.length) {
//   result.push(obj);
// }
</script>

<style scoped>
.DashboardValidacoes {
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
/* Botoes */
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: 32px !important;
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 0px;
  line-height: 50%;
  margin-bottom: 0px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  text-align: center !important;
}
i.fas,
i.far {
  font-size: 25px;
}

.cancelbtn {
  background-color: white !important;
  color: #cfcfc4;
}

.cancelbtn:hover {
  background-color: white;
  color: #b8b4a8;
}

.cancelbtn:focus {
  background-color: white;
  color: #b8b8a8;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ada89a;
}
</style>
