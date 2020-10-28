<template>
  <div class="main-component row">
    <PageHeader :title="'Buscar Turmas DCC'">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th-ordination
            :orderFixed="true"
            :currentOrder="ordenacaoMain.planos"
            orderToCheck="plano.ano"
            width="120"
            align="start"
            title="Ano/nome"
          >
            Plano
          </v-th-ordination>
          <v-th width="30" title="Período letivo">P.</v-th>
          <v-th-ordination
            :orderFixed="true"
            :currentOrder="ordenacaoMain.perfis"
            orderToCheck="disciplina.perfil.abreviacao"
            width="80"
          >
            Perfil
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoMain.turmas"
            orderToCheck="disciplina.codigo"
            width="80"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoMain.turmas"
            orderToCheck="disciplina.nome"
            width="330"
            align="start"
          >
            Disciplina
          </v-th-ordination>
          <v-th width="35" title="Turma">T.</v-th>
          <v-th width="200" align="start">Docente</v-th>
          <v-th width="80">Turno</v-th>
          <v-th width="120" align="start">Horário</v-th>
          <v-th width="100" align="start">Sala</v-th>
        </template>

        <template #tbody>
          <tr v-for="turma in TurmasRetornadasOrdered" :key="turma.id + turma.letra">
            <v-td
              width="120"
              align="start"
              :title="turma.plano.ano + '-' + turma.plano.nome"
            >
              <template v-if="turma.plano.ano">
                {{ turma.plano.ano }} {{ turma.plano.nome }}
              </template>
              <template v-else>
                -
              </template>
            </v-td>
            <v-td width="30">{{ turma.periodo }}</v-td>
            <v-td
              width="80"
              paddinX="0"
              :style="{ backgroundColor: turma.disciplina.perfil.cor }"
            >
              {{ turma.disciplina.perfil.abreviacao }}
            </v-td>
            <v-td width="80">{{ turma.disciplina.codigo }}</v-td>
            <v-td width="330" align="start">{{ turma.disciplina.nome }}</v-td>
            <v-td width="35" paddinX="0">{{ turma.letra }}</v-td>
            <v-td width="200" align="start">
              {{ generateDocentesText(turma.Docente1, turma.Docente2) }}
            </v-td>
            <v-td width="80">{{ turma.turno1 }}</v-td>
            <v-td width="120" align="start">
              {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
            </v-td>
            <v-td
              width="100"
              align="start"
              :title="generateSalasText(turma.Sala1, turma.Sala2)"
            >
              {{ generateSalasText(turma.Sala1, turma.Sala2) }}
            </v-td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <BaseTable
        type="modal"
        v-show="modalFiltrosTabs.current === 'Disciplinas'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <InputSearch
            v-model="searchDisciplinasModal"
            placeholder="Pesquise nome ou codigo de uma disciplina..."
          />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th width="70" align="start">Código</v-th>
          <v-th width="355" align="start">Nome</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasOptionsOrdered"
            :key="disciplina.id + disciplina.nome"
            @click="toggle('Disciplinas', disciplina.id)"
            v-prevent-click-selection
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="searchConditions.Disciplinas"
                :value="disciplina.id"
              />
            </v-td>
            <v-td width="70" align="start">{{ disciplina.codigo }}</v-td>
            <v-td width="355" align="start" :title="disciplina.nome">
              {{ disciplina.nome }}
            </v-td>
          </tr>

          <tr v-if="!DisciplinasOptionsOrdered.length">
            <v-td colspan="3" width="450">NENHUMA DISCIPLINA ENCONTRADA.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable
        type="modal"
        v-show="modalFiltrosTabs.current === 'Docentes'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <InputSearch
            v-model="searchDocentesModal"
            placeholder="Pesquise nome ou apelido de um docente..."
          />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th width="120" align="start">Apelido</v-th>
          <v-th width="305" align="start">Nome</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="docente in DocentesFiltredModal"
            :key="docente.id + docente.nome"
            @click="toggle('Docentes', docente.id)"
            v-prevent-click-selection
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="searchConditions.Docentes"
                :value="docente.id"
              />
            </v-td>
            <v-td width="120" align="start">{{ docente.apelido }}</v-td>
            <v-td width="305" align="start">{{ docente.nome }}</v-td>
          </tr>

          <tr v-if="!AllDocentes.length">
            <v-td colspan="3" width="450">NENHUM DOCENTE ENCONTRADO.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Horários'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Horário</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="horario in AllHorarios"
            :key="horario.id + horario.horario"
            @click="toggle('Horarios', horario.id)"
            v-prevent-click-selection
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="searchConditions.Horarios"
                :value="horario.id"
              />
            </v-td>
            <v-td width="425" class="t-start">{{ horario.horario }}</v-td>
          </tr>

          <tr v-if="!AllHorarios.length">
            <v-td colspan="2" width="450">NENHUM HORÁRIO ENCONTRADO.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Salas'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Nome</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="sala in AllSalas"
            :key="sala.id + sala.nome"
            @click="toggle('Salas', sala.id)"
            v-prevent-click-selection
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="searchConditions.Salas"
                :value="sala.id"
              />
            </v-td>
            <v-td width="425" class="t-start">{{ sala.nome }}</v-td>
          </tr>

          <tr v-if="!AllSalas.length">
            <v-td colspan="2" width="450">NENHUMA SALA ENCONTRADA.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Planos'">
        <template #thead>
          <v-th width="25" />
          <v-th width="70" align="start">Ano</v-th>
          <v-th width="355" align="start">Nome</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="plano in AllPlanos"
            :key="plano.id + plano.ano + plano.nome"
            @click="toggle('Planos', plano.id)"
            v-prevent-click-selection
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="searchConditions.Planos"
                :value="plano.id"
              />
            </v-td>
            <v-td width="70" align="start">{{ plano.ano }}</v-td>
            <v-td width="355" align="start">{{ plano.nome }}</v-td>
          </tr>

          <tr v-if="!AllPlanos.length">
            <v-td colspan="3" width="450">NENHUM PLANO ENCONTRADO.</v-td>
          </tr>
        </template>
      </BaseTable>
    </ModalFiltros>

    <ModalAjuda ref="modalAjuda"></ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import turmaService from "@/common/services/turma";
import { normalizeText, generateEmptyTurma } from "@/common/utils";
import {
  toggleItemInArray,
  toggleAsideModal,
  preventClickSelection,
  generateDocentesText,
  generateHorariosText,
  generateSalasText,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalFiltros, ModalAjuda } from "@/components/modals";

export default {
  name: "BuscarTurmas",
  mixins: [
    toggleItemInArray,
    toggleAsideModal,
    preventClickSelection,
    generateDocentesText,
    generateHorariosText,
    generateSalasText,
  ],
  components: {
    ModalAjuda,
    ModalFiltros,
    InputSearch,
  },
  data() {
    return {
      asideModalsRefs: ["modalFiltros", "modalAjuda"],
      turmaClicked: generateEmptyTurma(),
      searchDocentesModal: "",
      searchDisciplinasModal: "",
      searchConditions: {
        Planos: [],
        Disciplinas: [],
        Docentes: [],
        Horarios: [],
        Salas: [],
      },
      modalFiltrosTabs: {
        current: "Disciplinas",
        array: ["Disciplinas", "Docentes", "Horários", "Salas", "Planos"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Disciplinas: () => {
            this.searchConditions.Disciplinas = [
              ...this.$_.map(this.DisciplinasInPerfis, function(d) {
                return d.id;
              }),
            ];
          },
          Docentes: () => {
            this.searchConditions.Docentes = [
              ...this.$_.map(this.AllDocentes, function(d) {
                return d.id;
              }),
            ];
          },
          Horarios: () => {
            this.searchConditions.Horarios = [
              ...this.$_.map(this.AllHorarios, function(d) {
                return d.id;
              }),
            ];
          },
          Salas: () => {
            this.searchConditions.Salas = [
              ...this.$_.map(this.AllSalas, function(d) {
                return d.id;
              }),
            ];
          },
          Planos: () => {
            this.searchConditions.Planos = [
              ...this.$_.map(this.AllPlanos, function(d) {
                return d.id;
              }),
            ];
          },
        },
        selectNone: {
          Disciplinas: () => {
            this.searchConditions.Disciplinas = [];
          },
          Docentes: () => {
            this.searchConditions.Docentes = [];
          },
          Horarios: () => {
            this.searchConditions.Horarios = [];
          },
          Salas: () => {
            this.searchConditions.Salas = [];
          },
          Planos: () => {
            this.searchConditions.Planos = [];
          },
        },
        btnOk: async () => {
          await this.search();
        },
      },
      ordenacaoModal: {
        cursos: { order: "codigo", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
        perfis: { order: "nome", type: "asc" },
      },
      ordenacaoMain: {
        turmas: { order: "disciplina.codigo", type: "asc" },
        planos: { order: "plano.ano", type: "asc" },
        perfis: { order: "disciplina.perfil.abreviacao", type: "asc" },
      },
      TurmasRetornadas: null,
    };
  },

  methods: {
    search() {
      turmaService
        .search(this.searchConditions)
        .then((turmas) => {
          this.TurmasRetornadas = turmas.Turmas;
        })
        .catch((error) => console.log(error));
    },

    toggle(fieldName, fieldValue) {
      let i = this.$_.findIndex(this.searchConditions[fieldName], (v) => v == fieldValue);
      if (i === -1) this.searchConditions[fieldName].push(fieldValue);
      else this.searchConditions[fieldName].splice(i, 1);
    },
  },

  computed: {
    ...mapGetters([
      "PerfisDCC",
      "AllDisciplinas",
      "AllPlanos",
      "AllDocentes",
      "AllHorarios",
      "AllSalas",
      "DisciplinasInPerfis",
    ]),

    AllPlanos() {
      return this.$store.state.plano.Plano;
    },

    TurmasRetornadasOrdered() {
      const { turmas, perfis, planos } = this.ordenacaoMain;

      return this.$_.orderBy(
        this.TurmasRetornadasMapped,
        ["periodo", planos.order, perfis.order, turmas.order],
        ["asc", planos.type, perfis.type, turmas.type]
      );
    },
    TurmasRetornadasMapped() {
      return this.$_.map(this.TurmasRetornadas, (turma) => {
        return {
          ...turma,
          disciplina: this.$_.find(this.DisciplinasInPerfis, ["id", turma.Disciplina]),
          plano: this.$_.find(this.AllPlanos, ["id", turma.Plano]) || {},
        };
      });
    },
    /*
    TurmasOrdered() {
      const { turmas, perfis } = this.ordenacaoMain;

      //Se não possui ordenação de perfil fixada
      if (this.ordenacaoMain.perfis.order === null) {
        return this.$_.orderBy(
          this.TurmasFiltredByDisciplinas,
          ["periodo", turmas.order],
          ["asc", turmas.type]
        );
      } else
        return this.$_.orderBy(
          this.TurmasFiltredByDisciplinas,
          ["periodo", perfis.order, turmas.order],
          ["asc", perfis.type, turmas.type]
        );
    },
    TurmasFiltredByDisciplinas() {
      return this.$_.filter(this.TurmasFiltredByPeriodos, (turma) =>
        this.$_.some(
          this.filtroDisciplinas.ativadas,
          (disciplinaId) => disciplinaId === turma.Disciplina
        )
      );
    },
    TurmasFiltredByPeriodos() {
      return this.$_.filter(this.TurmasRetornadas, (turma) =>
        this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
      );
    },
    */
    PerfisOrderedModal() {
      return this.$_.orderBy(
        this.PerfisDCC,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    DisciplinasOptionsOrdered() {
      return this.$_.orderBy(
        this.DisciplinasOptionsFiltered,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasOptionsFiltered() {
      if (this.searchDisciplinasModal === "") return this.DisciplinasInPerfis;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return this.$_.filter(this.DisciplinasInPerfis, (disciplina) => {
        const nome = normalizeText(disciplina.nome);
        const codigo = normalizeText(disciplina.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
    DocentesFiltredModal() {
      if (this.searchDocentesModal === "") return this.AllDocentes;

      const searchNormalized = normalizeText(this.searchDocentesModal);

      return this.$_.filter(this.AllDocentes, (docente) => {
        const nome = normalizeText(docente.nome);
        const apelido = normalizeText(docente.apelido);

        return nome.match(searchNormalized) || apelido.match(searchNormalized);
      });
    },
  },
};
</script>
