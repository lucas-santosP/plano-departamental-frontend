<template>
    <div class="cargarow" style="width: 345px;">
        <td style="max-width:25px !important;  height:40px">
            <div style="width: 25px;">
                <input type="checkbox" name="ativa" value="true" v-on:click="checkDelete(carga)" v-model="ativo" style="width:16px;height: 16px;padding:0;">
            </div>
        </td>

        <td>
            <div style="width: 30px; text-align: center;">
                <input type="text" style="width: 15px; text-align: center;" id="trimestre" v-model="carga.trimestre" v-on:blur="editCarga(carga)">
            </div>
        </td>

        <td style="max-width: 160px;">
            <div style="width: 160px; padding-left:10px; padding-right:10px">
                <label>
                <select type="text" style="width:130px" id="docente" v-model="carga.Docente"
                        v-on:change="editCarga(carga)">
                    <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                    <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
                </select>
                </label>
            </div>
        </td>

        <td style="max-width: 100px;">
            <div style="width: 100px;">
                <input type="text" style="width: 108px" v-model="carga.programa" v-on:blur="editCarga(carga)">
             </div>
        </td>
        <td style="max-width: 30px">
            <div style="width:30px">
                <input type="text" style="width: 30px" id="creditos" v-model="carga.creditos" v-on:blur="editCarga(carga)">
            </div>
        </td>

    </div>
</template>
<script>
    import cargaPosService from '../../common/services/cargaPos'
    import _ from 'lodash'

    export default {
        name:'CargaPosRow',
        props: {
            carga:Object,
        },

        data () {
            return {
                ativo: false
            }
        },

        methods: {

            editCarga(carga) {
                cargaPosService.update(carga.id, carga).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Carga ${response.Turma.programa} foi atualizada!`,
                        type: 'success'
                    })
                }).catch(error => {
                    this.error = '<b>Erro ao atualizar Carga</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },
            checkDelete(carga) {
                this.$store.commit('checkDeleteCarga', {CargaPos:carga})
                console.log(this.$store.state.cargaPos.Deletar)
            }
        },
        computed: {
            Docentes () {
                return _.orderBy(_.filter(this.$store.state.docente.Docentes, ['ativo', true]),'apelido')
            },
        }
    }
</script>
<style scoped>
    td {
        padding: 0!important;
        text-align: center;
        vertical-align:middle;
    }
    p {
        margin-bottom: 0;
        text-align: center;
    }

    input[type="text"] {
        height: 30px;
        width:auto;
        text-align: left;;
        border: 1px solid #cccccc;
        margin-left:1px;
    }
    select{
        border: 1px solid #cccccc;
        appearance:none;
        cursor:pointer;
        height: 25px;
        margin-bottom: 0;
        margin-left:1px;
        
    }
    label {position:relative; margin-bottom:0;}
    label:after {
        content:'>';
        font:14px "Consolas", monospace;
        color:#aaa;
        -webkit-transform:rotate(90deg);
        -moz-transform:rotate(90deg);
        -ms-transform:rotate(90deg);
        transform:rotate(90deg);
        right:8px; top:4px;
        padding:0 0 2px;
        position:absolute;
        pointer-events:none;
    }
    label:before {
        content:'';
        right:6px; top:0px;
        width:20px; height:20px;
        position:absolute;
        pointer-events:none;
        display:block;
    }
</style>