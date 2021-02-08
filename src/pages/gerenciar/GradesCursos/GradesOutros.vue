<template>
  <div class="div-table">
    <BaseTable :styles="'height:max-content'">
      <template #thead>
        <v-th width="220">Cursos</v-th>
        <v-th width="100">Grades</v-th>
      </template>

      <template #tbody>
        <template v-for="curso in CursosExternosComGrades">
          <tr class="bg-custom" :key="curso.id + curso.nome">
            <v-td width="220" :title="curso.nome">{{ curso.nome }}</v-td>
            <v-td width="100" />
          </tr>
          <tr
            v-for="grade in gradesCurso(curso.id)"
            :key="grade.id + grade.nome + grade.Curso"
            :class="['clickable', { 'bg-selected': gradeSelected === grade.id }]"
            @click="showGrade(grade)"
          >
            <v-td width="220" />
            <v-td width="100">{{ grade.nome }}</v-td>
          </tr>
        </template>

        <tr v-if="!GradesOrdered.length">
          <v-td width="320" colspan="2">Nenhuma grade encontrada</v-td>
        </tr>
      </template>
    </BaseTable>

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeleteGrade">
      <li v-if="isEditing" class="list-group-item">
        <span>
          Tem certeza que deseja excluír a grade
          <b>{{ gradeForm.periodoInicio }} - {{ gradeForm.nome }}</b>
          ?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhuma grade selecionada.</li>
    </ModalDelete>

    <portal to="page-content-gradesOutros">
      <Card
        :title="'Curso'"
        width="380"
        :key="'card-outros'"
        :toggleFooter="isEditing"
        @btn-salvar="handleEditGrade"
        @btn-delete="openModalDelete"
        @btn-add="handleCreateGrade"
        @btn-clean="cleanGrade"
      >
        <template #body>
          <div class="row mb-2 mx-0">
            <div class="form-group col-8 m-0 px-0">
              <label required for="gradeNome" class="col-form-label">Nome</label>
              <input
                id="gradeNome"
                type="text"
                class="form-control form-control-sm"
                @change="gradeForm.nome = normalizeInputText($event)"
                :value="gradeForm.nome"
              />
            </div>

            <div class="form-group col-4 m-0 px-0">
              <label required for="periodoInicio" class="col-form-label">Período de Início</label>
              <input
                type="text"
                id="periodoInicio"
                class="form-control form-control-sm"
                v-model="gradeForm.periodoInicio"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col-8 m-0 px-0">
              <label required for="gradeCurso" class="col-form-label">Curso</label>
              <select
                id="gradeCurso"
                class="form-control form-control-sm"
                :title="getCursoNome(gradeForm.Curso)"
                v-model.number="gradeForm.Curso"
              >
                <option v-for="curso in CursosExternos" :key="curso.id" :value="curso.id">
                  {{ curso.nome }}
                </option>
              </select>
            </div>

            <div class="form-group col-4 m-0 px-0">
              <label required for="gradeCursoCodigo" class="col-form-label">Código</label>
              <select
                id="gradeCursoCodigo"
                class="form-control form-control-sm"
                v-model.number="gradeForm.Curso"
              >
                <option v-for="curso in CursosExternos" :key="curso.id" :value="curso.id">
                  {{ curso.codigo }}
                </option>
              </select>
            </div>
          </div>
        </template>
      </Card>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { clone, orderBy, some, filter } from "lodash-es";
import { normalizeInputText } from "@/common/mixins";
import { ModalDelete } from "@/components/modals";
import { Card } from "@/components/ui";
const emptyGrade = {
  id: null,
  periodoInicio: null,
  Curso: null,
  nome: null,
};

export default {
  name: "GerenciarGradesCursosExternos",
  mixins: [normalizeInputText],
  components: { Card, ModalDelete },
  data() {
    return {
      gradeForm: clone(emptyGrade),
      gradeSelected: null,
    };
  },

  methods: {
    ...mapActions(["createGradeCursoExterno", "editGradeCursoExterno", "deleteGradeCursoExterno"]),

    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    cleanGrade() {
      this.gradeForm = clone(emptyGrade);
      this.gradeSelected = null;
    },
    showGrade(grade) {
      this.cleanGrade();
      this.gradeSelected = grade.id;
      this.gradeForm = clone(grade);
    },
    gradesCurso(curso) {
      return filter(this.GradesOrdered, (g) => {
        return g.Curso === curso;
      });
    },
    cursoComGrade(c) {
      let check = false;
      this.AllGradesCursosExternos.forEach((g) => {
        if (g.Curso === c.id) {
          check = true;
          return;
        }
      });
      return check;
    },
    getCursoNome(cursoId) {
      if (!cursoId) return "";

      const cursoFound = this.CursosExternos.find((curso) => curso.id === cursoId);
      return cursoFound ? cursoFound.nome : "";
    },
    async handleCreateGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.createGradeCursoExterno(this.gradeForm);
        this.cleanGrade();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar nova grade!",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleEditGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.editGradeCursoExterno(this.gradeForm);
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar grade!",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeleteGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.deleteGradeCursoExterno(this.gradeForm);
        this.cleanGrade();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao excluir grade!",
          text: error.response
            ? "Grade não pode possuir disciplinas cadastradas para ser excluída"
            : "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    ...mapGetters(["AllGradesCursosExternos", "AllCursos"]),

    GradesOrdered() {
      return orderBy(this.AllGradesCursosExternos, "nome");
    },
    CursosExternos() {
      return filter(this.AllCursos, (c) => {
        return c.id > 4 && c.id != 18 && c.id != 19;
      });
    },
    CursosExternosComGrades() {
      return filter(this.CursosExternos, (curso) =>
        some(this.AllGradesCursosExternos, ["Curso", curso.id])
      );
    },
    isEditing() {
      return this.gradeSelected != null;
    },
  },
};
</script>
