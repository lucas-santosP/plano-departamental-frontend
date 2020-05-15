<template>
  <div style="font-size:11px;" class="max-content">
    <td>
      <div style="width: 25px;"></div>
    </td>
    <td>
      <div style="width: 40px;">
        <select style="width: 35px;" v-model="turmaForm.periodo">
          <option value="1">1</option>
          <option value="3">3</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width:70px">
        <select
          type="text"
          style="width:65px;"
          id="disciplinaCod"
          v-model="turmaForm.Disciplina"
        >
          <option v-if="DisciplinasOrederedByCod.length === 0" type="text" value
            >Nenhuma Disciplina Encontrada</option
          >
          <option
            v-for="disciplina in DisciplinasOrederedByCod"
            :key="'1-' + disciplina.id"
            :value="disciplina.id"
            >{{ disciplina.codigo }}</option
          >
        </select>
      </div>
    </td>

    <td>
      <div style="width: 330px;">
        <select
          type="text"
          style="width:325px;"
          id="disciplina"
          v-model="turmaForm.Disciplina"
          v-on:change="checkDisciplina()"
        >
          <option v-if="Disciplinas.length === 0" type="text" value
            >Nenhuma Disciplina Encontrada</option
          >
          <option
            v-for="disciplina in Disciplinas"
            :key="'2-' + disciplina.id"
            :value="disciplina.id"
            >{{ disciplina.nome }}</option
          >
        </select>
      </div>
    </td>
    <td>
      <div style="width: 18px">
        <p style="width:20px">
          <template v-for="disciplina in Disciplinas">
            <template v-if="disciplina.id === turmaForm.Disciplina">{{
              disciplina.cargaPratica + disciplina.cargaTeorica
            }}</template>
          </template>
        </p>
      </div>
    </td>
    <td>
      <div style="width: 40px">
        <input
          class="input-letra"
          type="text"
          style="text-transform: uppercase"
          id="turma"
          v-model="turmaForm.letra"
          @keypress="onlyA_Z"
        />
      </div>
    </td>
    <td>
      <div style="width:130px">
        <select
          type="text"
          style="width:125px; margin-bottom:1px;"
          id="docente1"
          v-model="turmaForm.Docente1"
        >
          <option type="text" value=""></option>
          <option
            v-for="docente in Docentes"
            :key="'1-' + docente.id"
            :value="docente.id"
            >{{ docente.apelido }}</option
          >
        </select>

        <select
          v-if="hasMoreThan4Creditos"
          type="text"
          style="width:125px;"
          id="docente2"
          v-model="turmaForm.Docente2"
        >
          <option type="text" value=""></option>
          <option
            v-for="docente in Docentes"
            :key="'2-' + docente.id"
            :value="docente.id"
            >{{ docente.apelido }}</option
          >
        </select>
      </div>
    </td>
    <td>
      <div style="width: 80px">
        <template v-if="currentDisciplina">
          <select
            type="text"
            style="width: 75px; margin-bottom:1px"
            id="horario1"
            v-model="turmaForm.Horario1"
            v-on:change="setTurnoByHorario(1)"
          >
            <option v-if="isNotEAD" type="text" value=""></option>
            <option
              v-for="horario in HorariosFiltredByDisciplina"
              :key="'1-horarioEAD-id' + horario.id"
              :value="horario.id"
              >{{ horario.horario }}</option
            >
          </select>
          <br />

          <select
            v-if="hasMoreThan4Creditos"
            type="text"
            style="width: 75px"
            id="horario2"
            v-model="turmaForm.Horario2"
            v-on:change="setTurnoByHorario(2)"
          >
            <template v-if="isParcialEAD">
              <option
                v-for="horario in HorariosEAD"
                :key="'2-horarioEAD-id' + horario.id"
                :value="horario.id"
                >{{ horario.horario }}</option
              >
            </template>
            <template v-else>
              <option v-if="isNotEAD" type="text" value=""></option>
              <option
                v-for="horario in HorariosFiltredByDisciplina"
                :key="'1-horarioEAD-id' + horario.id"
                :value="horario.id"
                >{{ horario.horario }}</option
              >
            </template>
          </select>
        </template>
      </div>
    </td>
    <td>
      <div style="width:80px">
        <template v-if="currentDisciplina">
          <input
            type="text"
            style="width: 75px"
            id="turno1"
            v-model="turmaForm.turno1"
            class="input-turno"
            readonly
          />
        </template>
      </div>
    </td>
    <td>
      <div style="width: 100px">
        <template v-if="currentDisciplina ? currentDisciplina.ead != 1 : false">
          <select
            type="text"
            style="width:95px;"
            id="sala1"
            v-model="turmaForm.Sala1"
          >
            <option type="text" value=""></option>
            <option
              v-for="sala in Salas"
              :key="'3-' + sala.id"
              :value="sala.id"
              >{{ sala.nome }}</option
            >
          </select>
          <br />
          <select
            v-if="hasMoreThan4Creditos && currentDisciplina.ead != 2"
            type="text"
            style="width: 95px; margin-bottom:1px"
            id="sala2"
            v-model="turmaForm.Sala2"
          >
            <option type="text" value=""></option>
            <option
              v-for="sala in Salas"
              :key="'4-' + sala.id"
              :value="sala.id"
              >{{ sala.nome }}</option
            >
          </select>
        </template>
      </div>
    </td>
    <td>
      <div style="width:40px"></div>
    </td>
    <template v-for="c in cursos_length">
      <td :key="c + 'cursos-ativados'">
        <div style="width:32px">{{ c.codigo }}</div>
      </td>
    </template>
  </div>
</template>
<script>
import _ from "lodash";
import turmaService from "@/common/services/turma";
import { EventBus } from "@/event-bus.js";

const emptyTurma = {
  id: undefined,
  periodo: undefined,
  letra: undefined,
  turno1: undefined,
  turno2: undefined,
  Disciplina: undefined,
  Docente1: undefined,
  Docente2: undefined,
  Horario1: undefined,
  Horario2: undefined,
  Sala1: undefined,
  Sala2: undefined,
};
export default {
  name: "NovaTurma",
  props: { cursos_length: Number },
  data() {
    return {
      turmaForm: _.clone(emptyTurma),
      semestre: 1,
      error: undefined,
    };
  },
  mounted() {
    EventBus.$on("addTurma", () => {
      this.addTurma();
    });
    this.turmaForm.periodo = this.semestre;
    this.turmaForm.letra = "A";
  },
  beforeDestroy() {
    EventBus.$off("addTurma");
  },
  methods: {
    findDisciplinaById(id) {
      return _.find(this.Disciplinas, (disciplina) => disciplina.id == id);
    },
    checkDisciplina() {
      this.clearInputs();
      this.checkEad(this.currentDisciplina);
    },
    clearInputs() {
      this.turmaForm.turno1 = undefined;
      this.turmaForm.Horario1 = undefined;
      this.turmaForm.Docente2 = undefined;
      this.turmaForm.Horario2 = undefined;
    },
    checkEad(disciplina) {
      if (disciplina.ead === 1) {
        this.turmaForm.turno1 = "EAD";
        this.turmaForm.Horario1 = 31;
        this.turmaForm.Horario2 = 31;
      } else if (disciplina.ead === 2) {
        this.turmaForm.Horario2 = 31;
      }
    },
    onlyA_Z($event) {
      let key = $event.key ? $event.key.toUpperCase() : $event.which;
      if (!key.match(/[A-Z]/i)) $event.preventDefault();
    },
    setTurnoByHorario(horarioAtual) {
      if (horarioAtual === 1) this.adjustTurno(this.turmaForm.Horario1);
      else this.adjustTurno(this.turmaForm.Horario2);
    },
    adjustTurno(horario) {
      if (horario == undefined || horario == "")
        this.turmaForm.turno1 = undefined;
      else if (horario == 31) this.turmaForm.turno1 = "EAD";
      else if (
        horario == 1 ||
        horario == 2 ||
        horario == 7 ||
        horario == 8 ||
        horario == 13 ||
        horario == 14 ||
        horario == 19 ||
        horario == 20 ||
        horario == 25 ||
        horario == 26 ||
        horario == 3 ||
        horario == 4 ||
        horario == 9 ||
        horario == 10 ||
        horario == 15 ||
        horario == 16 ||
        horario == 21 ||
        horario == 22 ||
        horario == 27 ||
        horario == 28
      ) {
        this.turmaForm.turno1 = "Diurno";
      } else {
        this.turmaForm.turno1 = "Noturno";
      }
    },
    addTurma() {
      let turmasLivres = _.filter(
        this.$store.state.turma.Turmas,
        (turma) => turma.Disciplina === null
      );

      this.turmaForm.id = turmasLivres[0].id;
      console.log("Nova turma adiciona:", this.turmaForm);
      this.editTurma(this.turmaForm);
      this.semestre = this.turmaForm.periodo;
      this.cleanTurma();
    },
    editTurma(turma) {
      turmaService
        .update(turma.id, turma)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi atualizada!`,
            type: "success",
            position: "bottom right",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Turma</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },
    cleanTurma() {
      this.turmaForm = _.clone(emptyTurma);
      this.turmaForm.periodo = this.semestre;
      this.turmaForm.letra = "A";
      this.error = undefined;
    },
  },
  computed: {
    currentDisciplina() {
      return _.find(this.$store.state.disciplina.Disciplinas, {
        id: this.turmaForm.Disciplina,
      });
    },

    totalCarga() {
      if (this.currentDisciplina != undefined) {
        return (
          parseInt(this.currentDisciplina.cargaTeorica) +
          parseInt(this.currentDisciplina.cargaPratica)
        );
      }
      return;
    },

    hasMoreThan4Creditos() {
      return this.totalCarga >= 4;
    },
    isNotEAD() {
      return this.currentDisciplina ? this.currentDisciplina.ead != 1 : false;
    },
    isParcialEAD() {
      return this.currentDisciplina ? this.currentDisciplina.ead === 2 : false;
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    DisciplinasOrederedByCod() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "codigo");
    },
    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    },
    Horarios() {
      return _.orderBy(this.$store.state.horario.Horarios, "horario");
    },
    HorariosEAD() {
      return _.filter(this.Horarios, { id: 31 });
    },
    HorariosFiltredByDisciplina() {
      let horarioResultante = [];

      if (this.currentDisciplina != undefined) {
        horarioResultante = _.filter(this.Horarios, (horario) => {
          switch (this.currentDisciplina.ead) {
            case 1:
              return horario.id == 31;
              break;
            default:
              return horario.id != 31;
              break;
          }
        });
      }
      return _.orderBy(horarioResultante, "horario");
    },
    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },
    Perfis() {
      return this.$store.state.perfil.Perfis;
    },
  },
};
</script>
<style scoped>
td {
  text-align: center !important;
  vertical-align: middle !important;
  padding: 0 !important;
  height: 40px !important;
}
p {
  margin-bottom: 0 !important;
  text-align: center !important;
}

.input-letra {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 25px;
  width: 20px;
  text-align: center !important;
}
.input-turno {
  height: 18px;
  text-align: center;
  padding: 0 2px;
  cursor: default;
}

select {
  height: 18px;
}

@-moz-document url-prefix() {
  table select {
    height: 50px !important;
    text-align: left;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 8px;
    border: 0.5px solid rgb(160, 160, 160);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  input {
    height: 18px !important;
    text-align: center;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(160, 160, 160);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
.max-content {
  width: -webkit-max-content !important;
  width: -moz-max-content !important;
  width: max-content !important;
}
</style>
