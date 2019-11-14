<template>
  <div class="DashboardDocentes row" v-if="Admin">
    <!-- Titulo -->
    <div class="col-12">
      <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" style="height:45px">
        <h1 style="font-size: 25px; font-weight:normal ">Lista Docentes</h1>
      </div>
    </div>
    <!-- Fim do Titulo -->
    <!-- Grid Esquerdo -->
    <div class="col">
     <div style="overflow-y: auto; position:relative; height: 80vh;">
        <!-- Inicio da Tabela -->
        <table class="table table-hover table-sm">
        <thead class="thead-light">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Apelido</th>
          <th scope="col">Ativo</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="Docentes.length > 0">
          <tr v-for="docente in Docentes" :key="docente.id" v-on:click.prevent="showDocentes(docente, DocentePerfis)">
            <td>{{docente.nome}}</td>
            <td>{{docente.apelido}}</td>
            <td><b-form-checkbox disabled v-model="docente.ativo"></b-form-checkbox></td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="2" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhum docente encontrado!
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
    <div class="col-lg-5 col-md-10 col-sm-12 col-12 mt-3 ml-auto mr-auto pl-0">
      <div class="col card cartao" style="top: 0px; width: 90%; max-width: 500px; margin-left:auto;margin-right:auto;">
        <div class="card-body" style="padding:25px;">
      <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <template v-if="isEdit">
          <h1 class="h2">Editar Docente</h1>
        </template>
        <template v-else>
          <h1 class="h2">Adicionar Docente</h1>
        </template>
      </div>
      <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
      </b-alert>
      <form>
        <div class="form-group row">
          <label for="nome" class="col-sm-3 col-form-label" style="text-align: center;">Nome</label>
          <div class="col-lg-8 col-md-9 col-sm-9 col-12" style="margin-top:auto;margin-bottom:auto;">
            <input type="text" class="form-control form-control-sm col-lg-12 col-md-12 col-sm-12" id="nome" v-model="docenteForm.nome">
          </div>
        </div>
        <div class="form-group row">
          <label for="apelido" class="col-sm-3 col-form-label" style="text-align: center;">Apelido</label>
          <div class="col-lg-8 col-md-9 col-sm-9 col-12" style="margin-top:auto;margin-bottom:auto;">
            <input type="text" class="form-control form-control-sm col-lg-12 col-md-12 col-sm-12" id="apelido" v-model="docenteForm.apelido">
          </div>
        </div>
        <div class="form-group row">
          <label for="perfis" class="col-sm-3 col-form-label" style="text-align: center;">Perfis</label>
          <template v-if="docenteForm.id!=undefined">
          <div class="col-sm-9" id="perfis">
            <b-form-checkbox-group stacked v-model="perfisAssociados">
              <b-form-checkbox v-for="perfil in Perfis" :value="perfil.id" v-on:change="managePerfil(perfil.id)">{{perfil.nome}}</b-form-checkbox>
            </b-form-checkbox-group>
          </div>
          </template>
        </div>
        <div class="form-group row">
          <div class="col-sm-12" style="padding-left:45px;">
            <label for="ativo" class="col-form-label">
              <input type="checkbox" id="ativo" value="1" v-model="docenteForm.ativo">
          Ativo</label>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <template v-if="isEdit">
              <button type="button" class="btn btn-success m-2 botao-estilo" v-on:click.prevent="editDocente" :key="1">Editar</button>
              <button type="button" class="btn btn-danger m-2" v-on:click.prevent="deleteDocente" :key="3">Excluir
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanDocente" :key="2">Cancelar
              </button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="addDocente" :key="1">Adicionar
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanDocente" :key="2">Resetar
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
    import docenteService from '../../common/services/docente'
    import docentePerfilService from '../../common/services/docentePerfil'

    const emptyDocente = {
        id:undefined,
        nome:undefined,
        apelido:undefined,
        creditos:0,
        ativo:1
    }

    const emptyPerfil = {
        Doncente:undefined,
        Perfil:undefined
    }

    export default {
        name: 'DashboardDocente',

        data () {
            return {
                docenteForm: _.clone(emptyDocente),
                perfisAssociados: [],
                error: undefined,
                docentePerfil: _.clone(emptyPerfil)
            }
        },

        methods: {
            addDocente() {
                docenteService.create(this.docenteForm).then((response) => {
                    this.cleanDocente()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Docente ${response.Docente.nome} foi criada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Docente</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            editDocente() {
                docenteService.update(this.docenteForm.id, this.docenteForm).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Docente ${response.Docente.nome} foi atualizada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao atualizar Docente</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            deleteDocente() {
                docenteService.delete(this.docenteForm.id, this.docenteForm).then((response) => {
                    this.cleanDocente()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Docente ${response.Docente.nome} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Docente</b>'
                })
            },

            cleanDocente() {
                this.docenteForm = _.clone(emptyDocente)
                this.error = undefined
            },

            showDocentes(docente, docentes) {
                this.cleanDocente()
                this.docenteForm = _.clone(docente);
                this.perfisAssociados = [];
                console.log(docentes)
                for (var i = 0;i < docentes.length;i++) {
                    console.log(docentes[i])
                    if(docentes[i].DocenteId===docente.id) {
                        console.log("ack")
                        this.perfisAssociados.push(docentes[i].Perfil)
                    }
                }
                (function smoothscroll(){
                    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                    if (currentScroll > 0) {
                        window.requestAnimationFrame(smoothscroll);
                        window.scrollTo (0,currentScroll - (currentScroll/5));
                    }
                })();
            },

            addPerfil(perfil) {
                this.docentePerfil.Docente = this.docenteForm.id
                this.docentePerfil.Perfil = perfil
                docentePerfilService.create(this.docentePerfil).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `O Perfil ${response.Perfil} foi associado ao Docente ${this.docenteForm.apelido}!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao associar Perfil</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            deletePerfil(perfil) {
                docentePerfilService.delete(this.docenteForm.id, perfil).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `O Perfil ${response.Perfil} foi exluído do Docente ${this.docenteForm.apelido}!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Perfil</b>'
                })

            },

            managePerfil(perfil) {
                if (_.indexOf(this.perfisAssociados, perfil) === -1){
                    this.addPerfil(perfil)
                }else{
                    this.deletePerfil(perfil)
                }
            }



        },

        computed: {
            Docentes () {
                return _.orderBy(this.$store.state.docente.Docentes, 'nome')
            },

            Perfis () {
                return this.$store.state.perfil.Perfis
            },

            DocentePerfis () {
                return this.$store.state.docentePerfil.DocentePerfis
            },

            isEdit () {
                return this.docenteForm.id !== undefined
            },

            Admin () {
                if(this.$store.state.auth.Usuario.admin===1){
                    return true
                }else{
                    return false
                }
            }
        }
    }
</script>

<style scoped>
    table th{
      position:-webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 3;
      font-size: 11px;
      height: 20px;
      padding: 0;
      vertical-align: middle;
    }
    td{
      font-size: 11px;
      padding: 0;
      height: 24px !important;
      vertical-align: middle;
    }
    label{
      font-size: 12px !important;
    }
    input[type="text"]{
      height: 25px;
    }
    input[type="checkbox"]{
      height: 20px;
      vertical-align: middle;
    }
    .h2{
      font-size: 14px;
      font-weight: bold;
    }
    .custom-control{
      font-size: 12px;
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
    .btn {
      height:25px;
      min-width: -webkit-max-content;
      min-width: -moz-max-content;
      min-width: max-content;
      font-size:12px;
      padding: 0 5px 0 5px;
      max-width:65px;
    }
    .form-group {
      margin-bottom: 13px !important;
    }
    .col-form-label{
      padding-top:0;
      padding-bottom:0;
    }
    
    @media screen and (max-width:575px) {
        .col-form-label{
            text-align:start !important;
        }
    }

</style>