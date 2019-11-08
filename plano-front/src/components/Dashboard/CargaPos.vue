<template>
    <div class="CargaPos" style="height: calc(100vh - 48px); font-size:11px;">
        <b-container fluid class="d-flex center-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom container-fluid" style="overflow: auto; width: 100%; padding-right:20px;">
            <b-row style="width:100%">
            <!-- <b-col cols=""> -->
            <h1 class="h2 col" style="padding:0">Cargas Pós</h1>
            </b-col>
            <!-- <b-col cols="5" ></b-col> -->
            <b-col class="col-sm-3 col-4 col-lg-2 col-md-3" >
            <b-form-select v-model="periodos" style="margin-right: 10px; min-width: max-content;"> 
                <option value = "1">Primeiro</option>
                <option value = "2">Segundo</option>
                <option value = "3">Ambos</option>
            </b-form-select>
            </b-col>
            <!-- <b-col cols="2"> -->
            <template v-if="isAdd">
                <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="addCarga" style="float: right; margin-right: 10px;"> Confirmar </button>
                <button type="button" class="btn btn-danger col-sm-1"  v-on:click.prevent="toggleAdd" style="float:right; margin-bottom:10px;">Cancelar </button>

            </template>
            <template v-else>
                <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="toggleAdd" style="float:right; margin-right: 10px;">Adicionar </button>
                <button type="button" class="btn btn-danger col-sm-1" v-b-modal.modalConfirma>Deletar </button>
                <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
                    <p class="my-4">Tem certeza que deseja deletar as cargas selecionadas?</p>
                    <template v-for="carga in Deletar">
                        <template v-for="docente in Docentes">
                            <template v-if="docente.id===carga.Docente">
                                <p :key="'carga'+carga.id+'docente'+docente.id" style="width:80px">Docente:{{docente.apelido}}<br>Programa:{{carga.programa}}</p>
                            </template>
                        </template>
                    </template>

                </b-modal>
            </template>
            </b-col>
            </b-row>
        </b-container>

        <div id="loading" v-if="isLoading">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>

        <div style="width: 380px; overflow: hidden; margin:auto;" v-if="!isLoading">
            <table class="table table-hover table-bordered table-sm">
                <thead class="thead-light sticky">
                <tr>
                    <div style="display: block; overflow: hidden; width: 376px;" class="sticky">
                        <th scope="col"> <p class="p-header" style="width:25px!important;" > </p> </th>
                        <th scope="col"> <p class="p-header" style="width:30px!important;" >T.</p> </th>
                        <th scope="col"> <p class="p-header" style="width:160px!important;" >Docente</p> </th>
                        <th scope="col"> <p class="p-header" style="width:101px!important;" >Programa</p> </th>
                        <th scope="col"> <p  class="p-header" style="width:40px!important;" >C.</p> </th>
                    </div>
                </tr>
                </thead>

                <tbody>
                <template v-if="isAdd">
                    <tr>
                        <div style="width: 376px; height:40px">
                            <td style="min-width:25px; height:40px"></td>
                            <td style="min-width:30px;">
                                <input type="text" style="width: 15px; text-align: center;"  id="trimestre" v-model="cargaPosForm.trimestre">
                            </td>
                            <td>
                                <select type="text" style="width:160px" id="docente1" v-model="cargaPosForm.Docente">
                                    <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                                    <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
                                </select>
                            </td>
                            <td>
                                <input type="text" style="width: 108px" id="programa" v-model="cargaPosForm.programa">
                            </td>
                            <td>
                                <input type="text" style="width: 40px" id="creditos" v-model="cargaPosForm.creditos">
                            </td>
                        </div>
                    </tr>
                </template>
                <!-- LINHAS -->
                <template v-if="CargasPos.length>0">
                        <template v-for="t in [1,  2, 3, 4]">
                            <template v-for="docente in Docentes">
                            <tr v-for="carga in CargasPos" :key="'docente'+docente.id+'carga'+carga.id" v-if="(carga.Docente === docente.id) && (carga.trimestre == (t))">
                                <template v-if="((carga.trimestre == 1 || carga.trimestre == 2) && (periodos == 1 || periodos == 3))">
                                    <cargadata :key="'1docente'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                                </template>
                                <template v-if="((carga.trimestre == 3 || carga.trimestre == 4) && (periodos == 2 || periodos == 3))">
                                    <cargadata :key="'2docente'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                                </template>
                            </tr>
                            </template>
                    </template>
                </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import cargaPosService from '../../common/services/cargaPos'
    import cargadata from './CargaPosRow.vue'

    const emptyCarga = {
        id:undefined,
        trimestre:undefined,
        Docente:undefined,
        programa:undefined,
        creditos:undefined
    }

    export default {

        name: 'DashboardCargaPos',

        data () {
            return {
                cargaPosForm: _.clone(emptyCarga),
                error: undefined,
                isAdd:false,
                atual:undefined,
                trimestre: 1,
                programa: 'PGCC',
                periodos: 3,
            }
        },

        components: {
            cargadata
        },
        /*
        mounted () {
            this.$store.commit('emptyDelete')
            console.log(this.$store.state.turma.Deletar)
            this.$store.commit(COMPONENT_LOADED)
        },
        */

        methods: {
            deleteCarga(carga) {
                cargaPosService.delete(carga.id).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Carga ${response.CargaPos.programa} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Carga</b>'
                })
            },

            deleteSelected: function() {
                var cargas = this.$store.state.cargaPos.Deletar
                for (var i = 0; i< cargas.length;i++) {
                    this.deleteCarga(cargas[i])
                }
                this.$store.commit('emptyDeleteCarga')
            },

            addCarga() {
                cargaPosService.create(this.cargaPosForm).then((response) => {
                    console.log(response.CargaPos)
                    console.log(this.$store.state.cargaPos.Cargas)
                    this.trimestre = response.CargaPos.trimestre
                    this.programa = response.CargaPos.programa
                    this.cleanCarga()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Carga ${response.CargaPos.programa} foi criada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Carga</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            cleanCarga() {
                this.cargaPosForm = _.clone(emptyCarga)
                this.cargaPosForm.trimestre = this.trimestre
                this.cargaPosForm.programa = this.programa
                this.error = undefined
            },

            toggleAdd() {
                this.cleanCarga()
                this.isAdd = !this.isAdd;
            },

        },


        computed: {
            Docentes () {
                return _.orderBy(_.filter(this.$store.state.docente.Docentes, ['ativo', true]),'apelido')
            },

            Deletar () {
                return this.$store.state.cargaPos.Deletar
            },

            CargasPos () {
                return _.orderBy(this.$store.state.cargaPos.Cargas, 'trimestre')
            },

            isLoading () {
                return this.$store.state.isLoading
            }


        }
    }
</script>
<style scoped>

    .CargaPos{
        max-height: 100%;
        overflow: hidden;
    }
    .p-header {
        padding: 0px 0 0px 0;
        margin: 0;
        font-size: 11px;
        text-align: center;
        height:18px;
    }
    table {
        display: block;
        overflow-x: hidden;
        overflow-y: scroll;
        height: calc(100vh - 140px);
        font-size: 11px;
        background-color: #f5f5f5;
        border: #808080 solid 2px;
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
    height: 15px!important;
    text-align:left;
    }
    table input{
    height: 18px!important;
    text-align:center!important;
    }

    .sticky{
        position: sticky;
        position: -webkit-sticky;
        top: 0px;
        z-index: 10;
    }
    .btn{
        min-width: max-content;
        max-width: max-content;
        max-height: 38px;
    }

    .cube1, .cube2 {
        background-color: #333;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        left: 0;

        -webkit-animation: cubemove 1.8s infinite ease-in-out;
        animation: cubemove 1.8s infinite ease-in-out;
    }

    .cube2 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    @-webkit-keyframes cubemove {
        25% {
            -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5)
        }
        50% {
            -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg)
        }
        75% {
            -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)
        }
        100% {
            -webkit-transform: rotate(-360deg)
        }
    }

    @keyframes cubemove {
        25% {
            transform: translateX(42px) rotate(-90deg) scale(0.5);
            -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
        }
        50% {
            transform: translateX(42px) translateY(42px) rotate(-179deg);
            -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
        }
        50.1% {
            transform: translateX(42px) translateY(42px) rotate(-180deg);
            -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
        }
        75% {
            transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
            -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
        }
        100% {
            transform: rotate(-360deg);
            -webkit-transform: rotate(-360deg);
        }
    }
</style>
