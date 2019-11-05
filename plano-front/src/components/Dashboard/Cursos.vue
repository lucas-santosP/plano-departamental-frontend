<template>
  <div class="DashboardCursos row" v-if="Admin">
    <div class="col-12">
      <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Lista Cursos</h1>
      </div>
    </div>
    <!-- Grid Esquerdo -->
    <div style="overflow-y: scroll; height: 80vh; position: relative;">
    <div class="col">
      <!-- Inicio da Tabela -->
      <table class="table table-hover table-sm">
        <thead class="thead-light">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Código</th>
          <th scope="col">Turno</th>
          <th scope="col">1º Sem.</th>
          <th scope="col">2º Sem.</th>
          <th scope="col"><input type="checkbox" v-model="selectAll" v-on:click.prevent="toggleAllCursos"></th>
        </tr>
        </thead>
        <tbody>
        <template v-if="Cursos.length > 0">
          <tr v-for="curso in Cursos" :key="curso.id" v-on:click.prevent="showCurso(curso)">
            <td>{{curso.nome}}</td>
            <td>{{curso.codigo}}</td>
            <td>{{curso.turno}}</td>
            <!-- 1 = 1º semestre, 2 = 2º semestre, 3 = Ambos-->
            <td v-if="curso.semestreInicial == 1 || curso.semestreInicial==3">{{curso.alunosEntrada}}</td>
            <td v-else>0</td>
            <td v-if="curso.semestreInicial == 2|| curso.semestreInicial==3">{{curso.alunosEntrada}}</td>
            <td v-else>0</td>
            <td><input type="checkbox" v-model="CursosAtivos[curso.id]" v-on:click.prevent="toggleCurso(curso.id)"></td>


          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="2" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhum curso encontrado!
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
       <div class="cartao-inteiro col-lg-4 col-md-12 col-sm-12 col-12 mt-3 ml-auto mr-auto pl-0">
      <div class="col col-lg-12 col-md-12 col-sm-12 col-12 card cartao" style="top: -20px; margin-right:auto; margin-left:auto; width: 100%; max-width: 500px; max-height: 79vh;">
        <div class="card-body">
      <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom">
        <template v-if="isEdit">
          <h1 class="h2">Editar Curso</h1>
        </template>
        <template v-else>
          <h1 class="h2">Adicionar Curso</h1>
        </template>
      </div>
      <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
      </b-alert>
      <form>
        <div class="form-group row">
          <label for="nome" class="col-form-label col-sm-4 col-4" style="text-align: center; margin-bottom: 15px !important;">Nome</label>
          <div class="col-8">
            <input type="text" class="form-control form-control-sm" id="nome" v-model="cursoForm.nome">
          </div>
        </div>
        <div class="form-group row">
          <label for="codigo" class="col-form-label col-sm-4 col-4" style="text-align: center;">Código</label>
          <div class="col-8">
            <input type="text" class="form-control form-control-sm" id="codigo" v-model="cursoForm.codigo">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="alunosEntrada" class="col-form-label col-sm-4 col-4" style="text-align:center;">Alunos por Entrada</label>
          <div class="col-8" style="margin-top:auto;margin-bottom:auto;">
            <input type="text" class="form-control form-control-sm"  id="alunosEnrada" v-model="cursoForm.alunosEntrada">
          </div>
        </div>

        <div class="form-group row">
          <label for="turno" class="col-lg-4 col-md-4 col-sm-4 col-4 col-form-label" style="text-align:center;">Turno</label>
          <div class="col-sm-6 col-6">
            <div id="turno">
              <input type="radio" name="turno" value="Diurno" v-model="cursoForm.turno"> Diurno<br/>
              <input type="radio" name="turno" value="Integral" v-model="cursoForm.turno"> Integral<br/>
              <input type="radio" name="turno" value="Noturno" v-model="cursoForm.turno"> Noturno<br/>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="semestreInicial" class="col-lg-4 col-md-4 col-sm-4 col-4 col-form-label" style="text-align: center;">Semestre de Entrada </label>
          <div class="col-sm-6 col-6">
            <div id="semestreInicial">
              <input type="radio" name="semestreInicial" value="1" v-model="cursoForm.semestreInicial"> Primeiro<br/>
              <input type="radio" name="semestreInicial" value="2" v-model="cursoForm.semestreInicial"> Segundo<br/>
              <input type="radio" name="semestreInicial" value="3" v-model="cursoForm.semestreInicial"> Ambos<br/>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <template v-if="isEdit">
              <button type="button" class="btn btn-warning m-2 botao-estilo" v-on:click.prevent="editCurso" :key="1">Editar</button>
              <button type="button" class="btn btn-danger m-2" v-on:click.prevent="deleteCurso" :key="3">Excluir
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanCurso" :key="2">Cancelar
              </button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="addCurso" :key="1">Adicionar
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanCurso" :key="2">Resetar
              </button>
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
import _ from 'lodash'
import cursoService from '../../common/services/curso'
import pedidoService from '../../common/services/pedido'
import ls from 'local-storage'

const emptyCurso = {
    id:undefined,
    nome:undefined,
    codigo:undefined,
    turno:undefined,
    semestreInicial: undefined,
    alunosEntrada: undefined,
    posicao: undefined
}

const emptyPedido =  {
    vagasPeriodizadas: 0,
    vagasNaoPeriodizadas: 0,
    Curso: undefined,
    Turma: undefined,
    ultimo: undefined,
    selectAll: undefined
}

export default {
    name: 'DashboardCursos',

    data () {
        return {
            cursoForm: _.clone(emptyCurso),
            error: undefined
        }
    },

    created () {
        this.ultimo = this.$store.state.curso.Cursos[this.$store.state.curso.Cursos.length -1].id + 1
        this.selectAll = true
    },

    methods: {
        toggleCurso(id){
            var state = ls.get(`${id}`)
           this.$store.dispatch('toggleCurso', id)
            ls.set(`${id}`, !state)
        },

        toggleAllCursos(){
            if(this.selectAll === true) {
                this.$store.dispatch('toggleAllCursosFalse')
                this.selectAll = false
                ls.set('toggle', false)
            } else {
                this.$store.dispatch('toggleAllCursosTrue')
                this.selectAll = true
                ls.set('toggle', true)
            }
        },

        addCurso() {
            this.cursoForm.posicao = this.ultimo
            this.ultimo = this.ultimo + 1
            cursoService.create(this.cursoForm).then((response) => {
              for (var i = 0; i< this.$store.state.turma.Turmas.length; i++){
                var pedido = _.clone(emptyPedido)
                pedido.Curso = response.Curso.id
                pedido.Turma = this.$store.state.turma.Turmas[i].id
                console.log(pedido)
                pedidoService.create(pedido).then((response) => {
                }).catch(error => {console.log("erro ao criar pedido: "+error)})
              }
                  this.cleanCurso()
              this.$notify({
                  group: 'general',
                  title: `Sucesso!`,
                  text: `O Curso ${response.Curso.nome} foi criado!`,
                  type: 'success'
              })
            }).
            catch(error => {
                  this.error = '<b>Erro ao criar Curso</b>'
              if (error.response.data.fullMessage) {
                  this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
              }
            })

        },

        editCurso() {
            cursoService.update(this.cursoForm.id, this.cursoForm).then((response) => {
                this.$notify({
                group: 'general',
                title: `Sucesso!`,
                text: `O Curso ${response.Curso.nome} foi atualizado!`,
                type: 'success'
            })
        }).
            catch(error => {
                this.error = '<b>Erro ao atualizar Curso</b>'
            if (error.response.data.fullMessage) {
                this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
            }
        })
        },

        deleteCurso() {
            cursoService.delete(this.cursoForm.id, this.cursoForm).then((response) => {
                this.cleanCurso()
            this.$notify({
                group: 'general',
                title: `Sucesso!`,
                text: `O Curso ${response.Curso.nome} foi excluído!`,
                type: 'success'
            })
        }).
            catch(() => {
                this.error = '<b>Erro ao excluir Curso</b>'
        })
        },

        cleanCurso() {
            this.cursoForm = _.clone(emptyCurso)
            this.error = undefined
        },

        showCurso(curso) {
            this.cleanCurso()
            this.cursoForm = _.clone(curso);
            (function smoothscroll(){
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo (0,currentScroll - (currentScroll/5));
                }
            })();
        }
    },

    computed: {
        Cursos () {
            return this.$store.state.curso.Cursos
        },

        CursosAtivos () {
            return this.$store.state.curso.Ativos
        },

        isEdit () {
            return this.cursoForm.id !== undefined
        },

        Admin () {
            if(this.$store.state.auth.Usuario.admin===1){
                return true
            }else{
                return false
            }
        }
    },

}
</script>

<style scoped>
table th {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}
.botao-estilo{
    background-color: #faca4d !important;
    border-color: #faca4d !important;
    color: white;
}

.botao-estilo:hover{
    background-color: #f8ac51 !important;
    border-color: #f8ac51 !important;
}

.botao-estilo:focus{
    box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
}
.form-group {
  margin-bottom: 8px !important;
}
.col-form-label{
  padding-top:0;
  padding-bottom:0;
}
@media screen and (max-width: 1189px){
  .cartao{
    max-height: auto;
    top: 20px !important;
  }
}
@media screen and (min-width: 992px; max-width: 1189px){
  .cartao-inteiro{
    width:500px !important;
  }
  .cartao{
    width: 500px !important;
  }
}
</style>