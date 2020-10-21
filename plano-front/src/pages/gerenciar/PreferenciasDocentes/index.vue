<template>
  <div class="main-component">
    <PageHeader :title="'Preferências dos docentes'">
      <BaseButton template="adicionar" @click="$refs.modalAddPreferencia.open()" />
      <BaseButton template="swap-modes" @click="toggleTableMode" />
      <BaseButton template="file-upload" @click="openModalUpload" />
    </PageHeader>

    <div class="div-table">
      <BaseTable v-if="tableMode">
        <template #thead>
          <v-th width="90">Código</v-th>
          <v-th width="420" align="start">Nome</v-th>
          <v-th width="80">Perfil</v-th>
          <v-th width="120" align="start">Docente</v-th>
          <v-th width="40" title="Preferência">Pref</v-th>
        </template>

        <template #tbody>
          <template v-for="disciplina in DocentesPorDisciplinas">
            <tr :key="disciplina[0].Disciplina" class="bg-custom">
              <v-td width="90">
                {{ findDisciplinaById(disciplina[0].Disciplina).codigo }}
              </v-td>
              <v-td width="420" align="start">
                {{ findDisciplinaById(disciplina[0].Disciplina).nome }}
              </v-td>
              <v-td width="80" paddingX="2">
                {{
                  findPerfilById(findDisciplinaById(disciplina[0].Disciplina).Perfil)
                    .abreviacao
                }}
              </v-td>
              <v-td width="120" />
              <v-td
                width="40"
                class="td-pref"
                @click="openModalAddDocente(disciplina[0].Disciplina)"
              >
                +
              </v-td>
            </tr>

            <tr
              v-for="preferencia in disciplina"
              :key="preferencia.Disciplina + '-' + preferencia.Docente"
            >
              <v-td width="90" />
              <v-td width="420" />
              <v-td width="80" />
              <v-td width="120" align="start">
                {{ findDocenteById(preferencia.Docente).apelido }}
              </v-td>
              <v-td width="40" @click="openModalEdit(preferencia)" class="td-pref">
                {{ preferencia.preferencia }}
              </v-td>
            </tr>
          </template>
        </template>
      </BaseTable>

      <BaseTable v-else>
        <template #thead>
          <v-th width="120" align="start">Docente</v-th>
          <v-th width="90">Código</v-th>
          <v-th width="420" align="start">Nome</v-th>
          <v-th width="80">Perfil</v-th>
          <v-th width="40" title="Preferência">Pref</v-th>
        </template>

        <template #tbody>
          <template v-for="docente in DisciplinasPorDocentes">
            <tr :key="docente[0].Docente" class="bg-custom">
              <v-td width="120" align="start">
                {{ findDocenteById(docente[0].Docente).apelido }}
              </v-td>
              <v-td width="90" />
              <v-td width="420" />
              <v-td width="80" />
              <v-td
                width="40"
                class="td-pref"
                @click="openModalAddDisciplina(docente[0].Docente)"
              >
                +
              </v-td>
            </tr>

            <tr
              v-for="preferencia in docente"
              :key="preferencia.Docente + '-' + preferencia.Disciplina"
            >
              <v-td width="120" />
              <v-td width="90">
                {{ findDisciplinaById(preferencia.Disciplina).codigo }}
              </v-td>
              <v-td width="420" align="start">
                {{ findDisciplinaById(preferencia.Disciplina).nome }}
              </v-td>
              <v-td width="80">
                {{
                  findPerfilById(findDisciplinaById(preferencia.Disciplina).Perfil)
                    .abreviacao
                }}
              </v-td>
              <v-td width="40" @click="openModalEdit(preferencia)" class="td-pref">
                {{ preferencia.preferencia }}
              </v-td>
            </tr>
          </template>
        </template>
      </BaseTable>
    </div>

    <BaseModal ref="modalEdit" :title="'Editar Preferência'" :hasFooter="true">
      <template #modal-body>
        <div class="row" :style="{ margin: '0' }">
          <p>Docente: {{ edit.docente ? edit.docente.nome : "" }}</p>
        </div>
        <div class="row" :style="{ margin: '0' }">
          <p>Disciplina: {{ edit.disciplina ? edit.disciplina.nome : "" }}</p>
        </div>
        <div class="row" :style="{ display: 'table-cell', verticalAlign: 'middle' }">
          <label for="inputPreferenciaDocentes">Preferência: </label>
          <input
            type="text"
            v-model="preferenciaForm.preferencia"
            id="inputPreferenciaDocentes"
            :style="{
              width: '25px',
              height: '20px',
              marginLeft: '10px',
              textAlign: 'center',
            }"
          />
        </div>
      </template>
      <template #modal-footer>
        <BaseButton
          type="text"
          color="lightblue"
          @click="handleEditPrefs()"
          class="ml-auto"
          >Confirmar</BaseButton
        >
      </template>
    </BaseModal>

    <BaseModal
      ref="modalAddDocente"
      :title="'Adicionar preferência'"
      :hasFooter="true"
      :styles="{ width: '400px' }"
      :hasBackground="true"
      class="modal-pref"
    >
      <template #modal-body>
        <div class="form-row w-100 m-0 mb-2">
          <span class="w-100">
            <b> Disciplina: </b>{{ add.Disciplina ? add.Disciplina.nome : "" }}
          </span>
        </div>

        <div class="form-row w-100">
          <div class="form-group col-7">
            <label for="addPrefDocente">Docente:</label>
            <select
              id="addPrefDocente"
              class="form-control"
              style="width:95%"
              v-model="add.Docente"
            >
              <option
                v-for="docente in AllDocentes"
                :key="docente.id + docente.apelido"
                :value="docente.id"
                >{{ docente.apelido }}
              </option>
            </select>
          </div>

          <div class="form-group col-5">
            <label for="addPref" style="margin-bottom:14px">
              Preferência: {{ add.preferencia }}
            </label>
            <input
              id="addPref"
              type="range"
              step="1"
              min="0"
              max="3"
              v-model.number="add.preferencia"
              style="width:100px"
            />
          </div>
        </div>
      </template>
      <template #modal-footer>
        <BaseButton
          type="text"
          color="lightblue"
          @click="addPreferencia"
          class="ml-auto"
          >Confirmar</BaseButton
        >
      </template>
    </BaseModal>

    <BaseModal
      ref="modalAddDisciplina"
      :title="'Adicionar Preferência'"
      :hasFooter="true"
    >
      <template #modal-body>
        <div class="row" :style="{ margin: '0' }">
          <p>Docente: {{ add.Docente ? add.Docente.apelido : "" }}</p>
        </div>
        <div class="row" :style="{ margin: '0' }">
          <label for="selectPreferenciaAdicionarDisciplinas">Disciplina: </label>
          <select
            v-model="add.Disciplina"
            id="selectPreferenciaAdicionarDisciplinas"
            style="width: 200px"
          >
            <option
              v-for="disciplina in AllDisciplinas"
              :key="`adicionarDisciplina${disciplina.id}`"
              :value="disciplina.id"
            >
              {{ disciplina.codigo }} - {{ disciplina.nome }}
            </option>
          </select>
        </div>
        <div class="row" :style="{ display: 'table-cell', verticalAlign: 'middle' }">
          <label for="inputPreferenciaAdicionarDisciplinas">Preferência: </label>
          <input
            type="text"
            v-model="add.preferencia"
            id="inputPreferenciaAdicionarDisciplinas"
            :style="{
              width: '25px',
              height: '20px',
              marginLeft: '10px',
              textAlign: 'center',
            }"
          />
        </div>
      </template>
      <template #modal-footer>
        <BaseButton
          type="text"
          color="lightblue"
          @click="addPreferencia"
          class="ml-auto"
          >Confirmar</BaseButton
        >
      </template>
    </BaseModal>

    <BaseModal
      ref="modalAddPreferencia"
      :title="'Adicionar Preferência'"
      :hasFooter="true"
    >
      <template #modal-body>
        <div class="row" :style="{ margin: '0' }">
          <label for="selectPreferenciaAdicionarPreferenciaDocentes"
            >Docente:
          </label>
          <select
            v-model="add.Docente"
            id="selectPreferenciaAdicionarPreferenciaDocentes"
            style="width: 200px; margin-left: auto"
          >
            <option
              v-for="docente in AllDocentes"
              :key="`adicionarPreferenciaDocente${docente.id}`"
              :value="docente.id"
            >
              {{ docente.apelido }}
            </option>
          </select>
        </div>
        <div class="row" :style="{ margin: '0' }">
          <label for="selectPreferenciaAdicionarPreferenciaDisciplinas"
            >Disciplina:
          </label>
          <select
            v-model="add.Disciplina"
            id="selectPreferenciaAdicionarPreferenciaDisciplinas"
            style="width: 200px; margin-left: auto"
          >
            <option
              v-for="disciplina in AllDisciplinas"
              :key="`adicionarPreferenciaDisciplina${disciplina.id}`"
              :value="disciplina.id"
            >
              {{ disciplina.codigo }} - {{ disciplina.nome }}
            </option>
          </select>
        </div>
        <div class="row" :style="{ display: 'table-cell', verticalAlign: 'middle' }">
          <label for="inputPreferenciaAdicionarPreferencia">Preferência: </label>
          <input
            type="text"
            v-model="add.preferencia"
            id="inputPreferenciaAdicionarPreferencia"
            :style="{
              width: '25px',
              height: '20px',
              marginLeft: '10px',
              textAlign: 'center',
            }"
          />
        </div>
      </template>
      <template #modal-footer>
        <BaseButton
          type="text"
          color="lightblue"
          @click="addPreferencia"
          class="ml-auto"
          >Confirmar</BaseButton
        >
      </template>
    </BaseModal>

    <BaseModal ref="modalUpload" :title="'Importar preferências'" :hasFooter="true">
      <template #modal-body>
        <input type="file" ref="xlsxPrefs" id="xlsxPrefs" />
      </template>

      <template #modal-footer>
        <BaseButton
          color="lightblue"
          class="ml-auto"
          text="Importar"
          @click="importPrefs"
        />
      </template>
    </BaseModal>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { mapGetters, mapActions } from "vuex";
import docenteDisciplinaService from "@/common/services/docenteDisciplina";
import { ModalAjuda } from "@/components/modals";
import { maskOnlyNumber } from "@/common/mixins";

export default {
  name: "DashboardPreferencias",
  components: { ModalAjuda },
  mixins: [maskOnlyNumber],
  data() {
    return {
      file: undefined,
      preferenciaForm: {
        Docente: undefined,
        Disciplina: undefined,
        preferencia: undefined,
      },
      edit: {
        docente: undefined,
        disciplina: undefined,
        isZero: undefined,
      },
      add: {
        Docente: undefined,
        Disciplina: undefined,
        preferencia: 0,
      },
      error: undefined,
      tableMode: true,
    };
  },

  methods: {
    ...mapActions(["setPartialLoading"]),

    toggleTableMode() {
      this.tableMode = !this.tableMode;
    },
    openModalEdit(preferencia) {
      this.edit.docente = this.findDocenteById(preferencia.Docente);
      this.edit.disciplina = this.findDisciplinaById(preferencia.Disciplina);
      let p = preferencia.preferencia;
      if (p === 0) {
        this.edit.isZero = true;
      } else {
        this.edit.isZero = false;
      }

      this.preferenciaForm = {
        Docente: preferencia.Docente,
        Disciplina: preferencia.Disciplina,
        preferencia: p,
      };
      this.$refs.modalEdit.open();
    },
    openModalAddDocente(disciplina) {
      this.add.Disciplina = this.findDisciplinaById(disciplina);
      this.$refs.modalAddDocente.open();
    },
    openModalAddDisciplina(docente) {
      this.add.Docente = this.findDocenteById(docente);
      this.$refs.modalAddDisciplina.open();
    },
    openModalUpload() {
      this.$refs.modalUpload.open();
    },

    findPreferencia(docente, disciplina) {
      let preferenciaFounded = this.$_.find(this.PreferenciaDosDocentes, {
        Docente: docente.id,
        Disciplina: disciplina.id,
      });

      return preferenciaFounded ? preferenciaFounded.preferencia : 0;
    },
    findDisciplinaById(disc) {
      return this.$_.find(this.AllDisciplinas, { id: disc });
    },
    findDocenteById(doce) {
      return this.$_.find(this.AllDocentes, { id: doce });
    },
    findPerfilById(perfil) {
      return this.$_.find(this.AllPerfis, { id: perfil });
    },

    addPreferencia() {
      console.log(this.add);
      if (this.add.Docente && this.add.Disciplina && this.add.preferencia) {
        if (this.add.Docente.id) this.add.Docente = this.add.Docente.id;
        if (this.add.Disciplina.id) this.add.Disciplina = this.add.Disciplina.id;
        console.log(this.add);

        docenteDisciplinaService
          .create(this.add)
          .then(() => {
            this.$notify({
              group: "general",
              title: `Sucesso!`,
              text: `Preferência adicionada com sucesso!`,
              type: "success",
            });
            this.$refs.modalAddDocente.close();
            this.$refs.modalAddDisciplina.close();

            this.add.Disciplina = undefined;
            this.add.Docente = undefined;
            this.add.preferencia = 0;
          })
          .catch((error) => {
            this.error = "<b>Erro ao atualizar Preferência</b>";
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
            this.add.Disciplina = undefined;
            this.add.Docente = undefined;
            this.add.preferencia = 0;
            this.$refs.modalAddDocente.close();
            this.$refs.modalAddDisciplina.close();
          });
      }
    },
    handleEditPrefs() {
      if (this.edit.isZero) {
        if (this.preferenciaForm.preferencia != 0) {
          docenteDisciplinaService
            .create(this.preferenciaForm)
            .then(() => {
              this.$notify({
                group: "general",
                title: `Sucesso!`,
                text: `Preferência atualizada com sucesso!`,
                type: "success",
              });
              this.$refs.modalEdit.close();
            })
            .catch((error) => {
              this.error = "<b>Erro ao atualizar Preferência</b>";
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
          this.edit.isZero = false;
        }
      } else {
        if (
          this.preferenciaForm.preferencia !=
          this.findPreferencia(this.edit.docente, this.edit.disciplina)
        ) {
          if (this.preferenciaForm.preferencia == 0) {
            docenteDisciplinaService
              .delete(this.preferenciaForm.Disciplina, this.preferenciaForm.Docente)
              .then(() => {
                this.$notify({
                  group: "general",
                  title: `Sucesso!`,
                  text: `Preferência atualizada com sucesso!`,
                  type: "success",
                });
                this.$refs.modalEdit.close();
              })
              .catch((error) => {
                this.error = "<b>Erro ao atualizar Preferência</b>";
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
            this.edit.isZero = true;
          } else {
            docenteDisciplinaService
              .update(
                this.preferenciaForm.Disciplina,
                this.preferenciaForm.Docente,
                this.preferenciaForm
              )
              .then(() => {
                this.$notify({
                  group: "general",
                  title: `Sucesso!`,
                  text: `Preferência atualizada com sucesso!`,
                  type: "success",
                });
                this.$refs.modalEdit.close();
              })
              .catch((error) => {
                this.error = "<b>Erro ao atualizar Preferência</b>";
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
          }
        }
      }
    },
    importPrefs() {
      console.log(this.PreferenciaDosDocentes);
      this.file = this.$refs.xlsxPrefs.files[0];
      const reader = new FileReader();

      const docentes = this.AllDocentes;
      const disciplinas = this.AllDisciplinas;
      const preferencias = this.PreferenciaDosDocentes;
      reader.onload = function(e) {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let prefs = XLSX.utils.sheet_to_json(first_worksheet);
        let disciplinasFields = this.$_.filter(
          this.$_.split(XLSX.utils.sheet_to_csv(first_worksheet), ","),
          function(p) {
            return p.substring(0, 11) === "Disciplinas";
          }
        );
        let disciplinasCods = [];
        for (let i = 0; i < disciplinasFields.length; i++) {
          let start = disciplinasFields[i].indexOf("[");
          let end = disciplinasFields[i].indexOf("\t");
          let disc = this.$_.find(disciplinas, {
            codigo: disciplinasFields[i].substring(start + 1, end),
          });
          disciplinasCods.push(disc);
          if (!disc) {
            console.log(disciplinasFields[i] + " não existe no sistema");
          }
        }
        for (let i = 0; i < prefs.length; i++) {
          let docente = this.$_.find(docentes, {
            nome: prefs[i].Nome.toUpperCase(),
          });
          if (docente) {
            for (let j = 0; j < disciplinasFields.length; j++) {
              if (disciplinasCods[j]) {
                let prefdisc = this.$_.find(preferencias, {
                  Docente: docente.id,
                  Disciplina: disciplinasCods[j].id,
                });
                if (
                  prefs[i][disciplinasFields[j]] &&
                  prefs[i][disciplinasFields[j]] != 0
                ) {
                  let prefDiscForm = {
                    Docente: docente.id,
                    Disciplina: disciplinasCods[j].id,
                    preferencia: prefs[i][disciplinasFields[j]],
                  };
                  if (prefdisc) {
                    if (prefdisc.preferencia != prefDiscForm.preferencia) {
                      docenteDisciplinaService.update(
                        prefdisc.Disciplina,
                        prefdisc.Docente,
                        prefDiscForm
                      );
                    }
                  } else {
                    docenteDisciplinaService.create(prefDiscForm);
                  }
                } else {
                  if (prefdisc) {
                    docenteDisciplinaService.delete(
                      prefdisc.Disciplina,
                      prefdisc.Docente
                    );
                  }
                }
              }
            }
          }
        }
      };
      reader.readAsBinaryString(this.file);
      this.$refs.modalUpload.close();
    },
  },

  computed: {
    ...mapGetters([
      "AllDocentes",
      "AllDisciplinas",
      "PreferenciaDosDocentes",
      "AllPerfis",
    ]),

    DocentesPorDisciplinas() {
      let prefs = {};
      let preferencias = this.$_.orderBy(this.PreferenciaDosDocentes, (p) => {
        return this.findDisciplinaById(p.Disciplina).codigo;
      });
      preferencias.forEach((p) => {
        let codigo = this.findDisciplinaById(p.Disciplina).codigo;
        if (prefs[codigo] === undefined) prefs[codigo] = [];
        prefs[codigo].push(p);
      });
      for (var disc in prefs) {
        if (Object.prototype.hasOwnProperty.call(prefs, disc)) {
          prefs[disc] = this.$_.orderBy(
            this.$_.orderBy(prefs[disc], (doce) => {
              return this.findDocenteById(doce.Docente).apelido;
            }),
            ["preferencia"],
            ["desc"]
          );
        }
      }
      return prefs;
    },

    DisciplinasPorDocentes() {
      let prefs = {};
      let preferencias = this.$_.orderBy(this.PreferenciaDosDocentes, (p) => {
        return this.findDocenteById(p.Docente).apelido;
      });
      preferencias.forEach((p) => {
        let apelido = this.findDocenteById(p.Docente).apelido;
        if (prefs[apelido] === undefined) prefs[apelido] = [];
        prefs[apelido].push(p);
      });
      for (var doce in prefs) {
        if (Object.prototype.hasOwnProperty.call(prefs, doce)) {
          prefs[doce] = this.$_.orderBy(
            this.$_.orderBy(prefs[doce], (disc) => {
              return this.findDisciplinaById(disc.Disciplina).codigo;
            }),
            ["preferencia"],
            ["desc"]
          );
        }
      }
      return prefs;
    },
  },
};
</script>

<style scoped>
.td-pref:hover {
  color: #1a79b2;
  text-decoration: underline;
  cursor: pointer;
}
.modal-pref {
  font-size: 14px;
}
.modal-pref span {
  text-align: start;
}

.modal-pref .form-control {
  height: 28px !important;
  font-size: 12px !important;
  padding: 0 5px !important;
  text-align: start;
}
.modal-pref label {
  font-weight: bold;
}
.flex-form {
  display: flex;
  justify-content: start;
  align-content: center;
  width: 100%;
}
.modal-pref input[type="range"] {
  border: 0 !important;
  box-shadow: none !important;
}
</style>
