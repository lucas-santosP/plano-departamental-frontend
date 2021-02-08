<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="table-div">
        <BaseTable>
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoConflitos"
              orderToCheck="disciplina.codigo"
              width="80"
              align="start"
              title="Código da Disciplina"
            >
              Código
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoConflitos"
              orderToCheck="disciplina.nome"
              width="300"
              align="start"
            >
              Disciplina
            </v-th-ordination>
            <v-th width="30" title="Turma">T.</v-th>
            <v-th width="55" title="Código do Curso">Curso</v-th>
            <v-th width="180" align="start" title="Valor do pedido no SIGA">Conflito</v-th>
            <v-th width="120" paddingX="0" title="Valor do pedido no SIGA">Valor SIGA</v-th>
            <v-th width="120" paddingX="0" title="Valor do pedido no Sistema">Valor Sistema</v-th>
          </template>

          <template #tbody>
            <template v-for="turmaConflito in turmasConflitosOrdered">
              <tr :key="turmaConflito.id" class="bg-custom">
                <v-td width="80" align="start">{{ turmaConflito.disciplina.codigo }}</v-td>
                <v-td width="300" align="start">{{ turmaConflito.disciplina.nome }}</v-td>
                <v-td width="30">{{ turmaConflito.letra }}</v-td>
                <v-td width="55" />
                <v-td width="180" />
                <v-td width="120" />
                <v-td width="120" />
              </tr>

              <tr
                v-for="conflito in turmaConflito.conflitos"
                :key="turmaConflito.id + conflito.label + conflito.curso.id"
              >
                <v-td width="80" />
                <v-td width="300" />
                <v-td width="30" />
                <v-td width="55" :title="conflito.curso.nome">
                  {{ conflito.curso.codigo }}
                </v-td>
                <v-td width="180" align="start">{{ conflito.label }}</v-td>
                <v-td width="120" paddingX="0" :title="conflito.siga">{{ conflito.siga }}</v-td>
                <v-td width="120" paddingX="0" :title="conflito.sistema">
                  {{ conflito.sistema }}
                </v-td>
              </tr>
            </template>

            <tr v-if="!turmasConflitosOrdered.length">
              <v-td width="870">
                <b>Nenhum conflito encontrado.</b>
                Certifiqui-se de selecionar um arquivo correspondente com o plano atual e o periodo
                selecionado.
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card :title="'Validar pedidos'">
        <template #body>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="periodoPlano" class="col-form-label">Período</label>
              <select
                id="periodoPlano"
                v-model.number="periodoForm"
                class="input-lg form-control form-control-sm"
              >
                <option
                  v-for="periodo in PeriodosLetivos"
                  :key="periodo.id + periodo.nome"
                  :value="periodo.id"
                >
                  {{ periodo.nome }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="turmaFile" class="col-form-label">
                Arquivo .csv do plano SIGA
              </label>
              <input
                type="file"
                id="turmaFile"
                ref="inputFileForm"
                class="form-control-file mt-1"
                accept=".csv"
              />
            </div>
          </div>
        </template>

        <template #footer>
          <BaseButton template="Salvar" :title="'Iniciar'" @click="handleCompareTurmas" />
          <BaseButton template="cancelar" @click="clearCardForm" />
        </template>
      </Card>
    </div>

    <ModalAjuda ref="modalAjuda">
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
import { mapGetters } from "vuex";
import { some, orderBy } from "lodash-es";
import { parseCSVFileToArray } from "@utils";
import { makeEmptyCurso } from "@utils/factories";
import { generateDocentesText, generateHorariosText } from "@mixins";
import { Card } from "@/components/ui";
import { ModalAjuda } from "@/components/modals";
import {
  parseTurmaSIGAToTurma,
  parseTurmaSIGAToPedido,
  getKeysTurmaSIGA,
  validateTurmasSIGA,
} from "@/common/utils/turmasSIGA";

export default {
  name: "ValidaçãoLançamentoSIGA",
  components: { Card, ModalAjuda },
  mixins: [generateDocentesText, generateHorariosText],
  data() {
    return {
      periodoForm: 1,
      turmasConflitos: [],
      ordenacaoConflitos: {
        order: "disciplina.codigo",
        type: "asc",
      },
    };
  },

  methods: {
    clearCardForm() {
      this.periodoForm = 1;
      this.$refs.inputFileForm.value = "";
    },
    async handleCompareTurmas() {
      if (!this.periodoForm) {
        this.pushNotification({
          type: "error",
          text: "Nenhum período selecionado",
        });
        return;
      }
      const [fileTurmas] = this.$refs.inputFileForm.files;
      if (!fileTurmas) {
        this.pushNotification({
          type: "error",
          text: "Nenhum arquivo selecionado",
        });
        return;
      }

      try {
        this.setLoading({ type: "partial", value: true });
        const turmasFile = await parseCSVFileToArray(fileTurmas);
        validateTurmasSIGA(turmasFile);
        const turmasSIGANormalized = this.normalizeTurmasEPedidosSIGA(turmasFile, this.periodoForm);
        this.searchConflitos(turmasSIGANormalized, this.periodoForm);
      } catch (error) {
        console.log(error);
        this.pushNotification({
          type: "error",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    normalizeTurmasEPedidosSIGA(turmasSIGA, periodo) {
      const keysTurmaSIGA = getKeysTurmaSIGA(turmasSIGA[0]);
      const turmasNormalized = [];
      let currentTurma = {};

      for (const turmaSIGA of turmasSIGA) {
        const newTurma = parseTurmaSIGAToTurma(turmaSIGA, keysTurmaSIGA, null, periodo);
        if (!newTurma) continue;
        newTurma.pedidosOferecidos = []; //Array com todos pedidos da turmas

        const pedidoOferecido = parseTurmaSIGAToPedido(turmaSIGA, keysTurmaSIGA, null);
        if (pedidoOferecido) {
          const { vagasOferecidas, vagasOcupadas } = pedidoOferecido;
          pedidoOferecido.totalVagas = vagasOferecidas + vagasOcupadas;
        }

        // Se turma igual ao currentTurma apenas adiciona o pedido na turma anterior
        if (this.turmasAreEqual(currentTurma, newTurma)) {
          if (pedidoOferecido) {
            const index = turmasNormalized[turmasNormalized.length - 1].pedidosOferecidos.findIndex(
              (pedido) => pedido.Curso === pedidoOferecido.Curso
            );
            if (index === -1) {
              turmasNormalized[turmasNormalized.length - 1].pedidosOferecidos.push(pedidoOferecido);
            }
          }
        } else {
          // Se é uma turma nova então adiciona a turma e o pedido
          if (pedidoOferecido) newTurma.pedidosOferecidos.push(pedidoOferecido);
          turmasNormalized.push(newTurma);
          currentTurma = { ...newTurma };
        }
      }

      return turmasNormalized;
    },
    searchConflitos(turmasSIGA, periodo) {
      this.turmasConflitos = [];
      const turmasConflitosFound = [];
      //Turmas do periodo selecionado, exclui perfil MAC que existe no arquivo SIGA
      const turmasSistema = this.AllTurmas.filter(
        (turma) => turma.periodo === periodo && turma.disciplina.Perfil != 15
      );

      turmasSistema.forEach((turmaSistema) => {
        const turmaSIGAFound = turmasSIGA.find(
          (turmaFile) =>
            turmaSistema.Disciplina == turmaFile.Disciplina && turmaSistema.letra == turmaFile.letra
        );
        const turmaConflitos = { ...turmaSistema, conflitos: [] };

        if (!turmaSIGAFound) {
          turmaConflitos.conflitos.push({
            label: "Turma existe apenas no sistema",
            siga: "-",
            sistema: "-",
            curso: makeEmptyCurso({ codigo: "-" }),
          });
          turmasConflitosFound.push(turmaConflitos);
          return;
        }
        // Conflitos de turmas
        if (!this.docentesAreEqual(turmaSistema, turmaSIGAFound)) {
          turmaConflitos.conflitos.push({
            label: "Docentes diferentes",
            siga: this.generateDocentesText(turmaSIGAFound.Docente1, turmaSIGAFound.Docente2),
            sistema: this.generateDocentesText(turmaSistema.Docente1, turmaSistema.Docente2),
            curso: makeEmptyCurso({ codigo: "-" }),
          });
        }
        if (!this.horariosAreEqual(turmaSistema, turmaSIGAFound)) {
          turmaConflitos.conflitos.push({
            label: "Horarios diferentes",
            siga: this.generateHorariosText(turmaSIGAFound.Horario1, turmaSIGAFound.Horario2),
            sistema: this.generateHorariosText(turmaSistema.Horario1, turmaSistema.Horario2),
            curso: makeEmptyCurso({ codigo: "-" }),
          });
        }
        // Conflitos de pedidos - exclui as disciplinas que são do 1 periodo de alguma gradeDCC
        if (!some(this.disciplinasGradeDCC1Periodo, ["Disciplina", turmaSistema.Disciplina])) {
          const pedidosDaTurmaSistema = this.Pedidos[turmaSistema.id] || [];

          turmaSIGAFound.pedidosOferecidos.forEach((pedidoSIGA) => {
            const pedidoSistemaFound = pedidosDaTurmaSistema.find(
              (pedidoSis) => pedidoSis.Curso == pedidoSIGA.Curso
            );

            if (!pedidoSistemaFound) {
              turmaConflitos.conflitos.push({
                label: "Pedido não existe no sistema",
                siga: pedidoSIGA.totalVagas,
                sistema: "-",
                curso: this.AllCursos.find((curso) => curso.id === pedidoSIGA.Curso),
              });
              return;
            }

            const totalVagasSistema =
              pedidoSistemaFound.vagasPeriodizadas + pedidoSistemaFound.vagasNaoPeriodizadas;

            if (totalVagasSistema != pedidoSIGA.totalVagas) {
              turmaConflitos.conflitos.push({
                label: "Pedido com valores diferentes",
                siga: pedidoSIGA.totalVagas,
                sistema: totalVagasSistema == 0 ? "-" : totalVagasSistema,
                curso: this.AllCursos.find((curso) => curso.id === pedidoSistemaFound.Curso),
              });
              return;
            }
          });

          pedidosDaTurmaSistema
            .filter((pedido) => pedido.vagasPeriodizadas != 0 || pedido.vagasNaoPeriodizadas != 0)
            .forEach((pedidoSistema) => {
              const pedidoSIGA = turmaSIGAFound.pedidosOferecidos.find(
                (pedidoArq) => pedidoSistema.Curso == pedidoArq.Curso
              );

              if (!pedidoSIGA) {
                turmaConflitos.conflitos.push({
                  label: "Pedido não existe no SIGA",
                  siga: "-",
                  sistema: pedidoSistema.vagasPeriodizadas + pedidoSistema.vagasNaoPeriodizadas,
                  curso: this.AllCursos.find((curso) => curso.id === pedidoSistema.Curso),
                });
                return;
              }
            });
        }

        if (turmaConflitos.conflitos.length) turmasConflitosFound.push(turmaConflitos);
      });

      this.turmasConflitos = turmasConflitosFound;
    },
    turmasAreEqual(turma1, turma2) {
      return (
        turma1.letra === turma2.letra &&
        turma1.Disciplina === turma2.Disciplina &&
        turma1.Horario1 === turma2.Horario1 &&
        turma1.Horario2 === turma2.Horario2
      );
    },
    docentesAreEqual(turma1, turma2) {
      if (turma1.Docente1 == turma2.Docente1 && turma1.Docente2 == turma2.Docente2) return true;
      if (turma1.Docente1 == turma2.Docente2 && turma1.Docente2 == turma2.Docente1) return true;
      return false;
    },
    horariosAreEqual(turma1, turma2) {
      if (
        (turma1.Horario1 == turma2.Horario1 && turma1.Horario2 == turma2.Horario2) ||
        (turma1.Horario1 == turma2.Horario2 && turma1.Horario2 == turma2.Horario1)
      )
        return true;
      if (
        turma1.Horario1 == null &&
        (turma1.Horario2 == turma2.Horario1 || turma1.Horario2 == turma2.Horario2)
      )
        return true;
      if (
        turma2.Horario1 == null &&
        (turma2.Horario2 == turma1.Horario1 || turma2.Horario2 == turma1.Horario2)
      )
        return true;
      if (
        turma1.Horario2 == null &&
        (turma1.Horario1 == turma2.Horario1 || turma1.Horario1 == turma2.Horario2)
      )
        return true;
      if (
        turma2.Horario2 == null &&
        (turma2.Horario1 == turma1.Horario1 || turma2.Horario1 == turma1.Horario2)
      )
        return true;

      return false;
    },
  },

  computed: {
    ...mapGetters(["AllCursos", "AllTurmas", "PeriodosLetivos", "Pedidos", "DisciplinasGrades"]),

    turmasConflitosOrdered() {
      const { order, type } = this.ordenacaoConflitos;
      return orderBy(this.turmasConflitos, order, type);
    },
    disciplinasGradeDCC1Periodo() {
      const disciplinasGradeFiltered = this.DisciplinasGrades.filter(
        (disciplinaGrade) => disciplinaGrade.periodo === 1
      );

      const disciplinasGradeUnique = [];
      disciplinasGradeFiltered.forEach((disciplinaGrade) => {
        const alredyExist = disciplinasGradeUnique.find(
          (disciplinaGrade2) => disciplinaGrade2.Disciplina === disciplinaGrade.Disciplina
        );

        if (!alredyExist) disciplinasGradeUnique.push({ ...disciplinaGrade });
      });

      return disciplinasGradeUnique;
    },
  },
};
</script>
