<template>
    <div class="DashboardDisciplinas row" style="overflow-y:hidden;" v-if="Admin">
        <!-- Grid Esquerdo -->
            <!-- Titulo -->
            <div class="col-12">
                <div
                        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-3 mb-3 border-bottom" style="height: 45px;">
                    <h1>Lista Disciplinas</h1>
                </div>
            </div>
            <!-- Inicio da Tabela -->
            
        <div class="col col-sm col-lg">
            <div style="overflow:hidden auto; position:relative; height: 82vh;">
            <table class="table table-hover table-sm">
                <thead class="thead-light">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Código</th>
                    <th scope="col" style="text-align: center">Carga Teórica</th>
                    <th scope="col" style="text-align: center">Carga Prática</th>
                    <th scope="col">Perfil</th>
                    <th scope="col">EAD</th>
                </tr>
                </thead>
                <tbody>
                <template v-if="Disciplinas.length > 0">
                    <tr v-for="disciplina in Disciplinas" :key="disciplina.id" v-on:click.prevent="showDisciplina(disciplina)">
                        <td>{{disciplina.nome}}</td>
                        <td>{{disciplina.codigo}}</td>
                        <td style="text-align: center">{{disciplina.cargaTeorica}}</td>
                        <td style="text-align:center">{{disciplina.cargaPratica}}</td>
                        <template v-for="perfil in Perfis">
                            <td v-if="perfil.id===disciplina.Perfil" :key="perfil.id">{{perfil.nome}}</td>
                        </template>
                        <td><b-form-checkbox disabled v-model="disciplina.ead"></b-form-checkbox></td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="3" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhuma disciplina encontrada!
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
            <!-- Fim da tabela -->
            </div>
        </div>
        <!-- Fim do Grid Esquerdo -->
        <!-- Grid Direito -->
       <div class="cartao-inteiro col-lg-5 col-md-5 col-sm-12 col-12 mt-3 pl-0 ml-auto">
      <div class="col card cartao ml-auto"style="margin-right:20px; max-width: 350px;">
        <div class="card-body" style="padding:20px; padding-bottom:0;">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom">
                <template v-if="isEdit">
                    <h2>Editar Disciplina</h2>
                </template>
                <template v-else>
                    <h2>Adicionar Disciplina</h2>
                </template>
            </div>
            <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
            </b-alert>
            <form>
                <div class="form-group row">
                    <label for="nome" class="col-3 col-sm-3 col-form-label texto-cartao" style="padding-bottom: 0;">Nome</label>
                    <div class="col-sm-9 col-9">
                        <input type="text" class="form-control form-control-sm col-lg-11 col-md-11 col-sm-12" id="nome" v-model="disciplinaForm.nome">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="codigo" class="col-3 col-sm-3 col-form-label texto-cartao" style="padding-bottom: 0;">Código</label>
                    <div class="col-sm-9 col-9">
                        <input type="text" class="form-control form-control-sm col-lg-11 col-md-11 col-sm-11" id="codigo" v-model="disciplinaForm.codigo">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="cargaTeorica" class="col-3 col-sm-3 col-form-label texto-cartao" style="padding-bottom: 0;">Carga Teórica</label>
                    <div class="col-sm-9 col-9">
                        <input type="text" class="form-control form-control-sm col-lg-11 col-md-11 col-sm-11" id="cargaTeorica" v-model="disciplinaForm.cargaTeorica">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="cargaPratica" class="col-3 col-sm-3 col-form-label texto-cartao" style="padding-bottom: 0;">Carga Prática</label>
                    <div class="col-sm-9 col-9">
                        <input type="text" class="form-control form-control-sm col-lg-11 col-md-11 col-sm-11" id="cargaPratica" v-model="disciplinaForm.cargaPratica">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="perfil" class="col-3 col-sm-3 col-form-label texto-cartao" style="padding-bottom: 0;">Perfil</label>
                    <div class="col-sm-9 col-9">
                        <select type="text" class="form-control form-control-sm col-lg-11 col-md-11 col-sm-11" style="height:25px" id="perfil" v-model="disciplinaForm.Perfil">
                            <option v-if="Perfis.length===0" type="text" value="">Nenhum Perfil Encontrado</option>
                            <option v-for="perfil in Perfis" :key="perfil.id" :value="perfil.id">{{perfil.nome}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col">
                        <label for="ead" class="col-lg-12 col-md-12 col-sm-12 col-form-label ead-texto" style="padding-bottom: 0; padding-left: 20px;">
                            <input type="checkbox" id="ead" value="1" v-model="disciplinaForm.ead">
                            EAD</label>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                        <template v-if="isEdit">
                            <button type="button" class="col-2 btn btn-sm btn-success m-2 botao-estilo" v-on:click.prevent="editDisciplina" :key="1">Editar</button>
                            <button type="button" class="col-2 btn btn-sm btn-danger m-2" v-on:click.prevent="deleteDisciplina" :key="3">Excluir
                            </button>
                            <button type="button" class="col-2 btn btn-sm btn-secondary m-2" v-on:click.prevent="cleanDisciplina" :key="3">Cancelar
                            </button>
                        </template>
                        <template v-else>
                            <button type="button" class="col-2 btn btn-sm btn-success m-2" v-on:click.prevent="addDisciplina" :key="1">Adicionar
                            </button>
                            <button type="button" class="col-2 btn btn-sm btn-secondary m-2" v-on:click.prevent="cleanDisciplina" :key="3">Resetar
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
    import disciplinaService from '../../common/services/disciplina'

    const emptyDisciplina = {
        id:undefined,
        nome:undefined,
        codigo:undefined,
        cargaTeorica:undefined,
        cargaPratica:undefined,
        Perfil:undefined,
        ead:undefined
    }

    export default {
        name: 'DashboardDisciplina',

        data () {
            return {
                disciplinaForm: _.clone(emptyDisciplina),
                error: undefined
            }
        },

        methods: {
            addDisciplina() {
                disciplinaService.create(this.disciplinaForm).then((response) => {
                    this.cleanDisciplina()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Disciplina ${response.Disciplina.nome} foi criada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Disciplina</b>'
                    console.log(error.response)
                    if (error.response.data.fullMessage) {
                        for (var e = 0; e < error.response.data.errors.length; e++){
                            if(error.response.data.errors[e].message.search("null") !== -1)
                                this.error += '<br/>' + error.response.data.errors[e].field + ' não pode ser vazio'
                            else if((error.response.data.errors[e].message.search("unique")!==-1) && (error.response.data.errors[e].field.search("codigo")!==-1))
                                this.error += '<br/>Disciplina já existe'
                        }
                    }
                })
            },

            editDisciplina() {
                disciplinaService.update(this.disciplinaForm.id, this.disciplinaForm).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Disciplina ${response.Disciplina.nome} foi atualizada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao atualizar Disciplina</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            deleteDisciplina() {
                disciplinaService.delete(this.disciplinaForm.id, this.disciplinaForm).then((response) => {
                    this.cleanDisciplina()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Disciplina ${response.Disciplina.nome} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Disciplina</b>'
                })
            },

            cleanDisciplina() {
                this.disciplinaForm = _.clone(emptyDisciplina)
                this.error = undefined
            },

            showDisciplina(disciplina) {
                this.cleanDisciplina()
                this.disciplinaForm = _.clone(disciplina);
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
            Disciplinas () {
                return _.orderBy(this.$store.state.disciplina.Disciplinas, 'codigo')
            },

            Perfis () {
                return this.$store.state.perfil.Perfis
            },

            isEdit () {
                return this.disciplinaForm.id !== undefined
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
    table{height:80vh;max-width:900px !important;}
    table th{
      position:-webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 3;
      font-size: 11px;
      height: 20px;
      padding: 0 0 0 5px !important;
      vertical-align: middle;
    }
    td{font-size:11px}
    h1{font-size: 25px; font-weight: normal;}
    h2{font-size:14px; font-weight:bold; padding-left:10px}
    input[type="text"],select[type="text"]{
      height: 25px;
      font-size: 11px;
    }
    input[type="checkbox"]{
      height: 20px;
      vertical-align: middle;
    }
    .cartao{
      width: 330px !important;
      height:auto !important;
      top: -20px !important;
      padding: 0 0 0 5px;
    } 
    .cartao-inteiro{
      padding-right:15px;
    }
    .custom-control{
      font-size: 11px;
    }
    .custom-control-inline{
      margin-right: 0 !important;
    }
    .botao-estilo{
    background-color: #f0852e !important;
    border-color: #f0852e !important;
    color: white;
    }

    .botao-estilo:hover{
    background-color: #e86c07 !important;
    border-color: #e86c07 !important;
    }
   
    .botao-estilo:focus{
        box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
    }
    .form-group {
      margin-bottom: 15px !important;
    }
    .texto-cartao{
        line-height:1.2;
        padding-top: 5px !important;
        padding-left: 20px;
        font-size: 12px;
        text-align: end;
        
    }
    .ead-texto{
        text-align:start;
        padding-left:20px;
        line-height:1.2;
        padding-top: 5px;
        font-size: 12px;
    }
    .col-form-label{
      padding-top:0;
      padding-bottom:0;
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
    

    @media screen and (max-width:767px) {
        .cartao{
          margin-right:auto !important;
          top:0 !important;
        }
    }
</style>