<template>
    <div class="cargarow" style="width: 358px;">
        <td style="width: 20px;">
            <input type="checkbox" name="ativa" value="true" v-on:click="checkDelete(carga)" v-model="ativo" style="width:16px;height: 16px;padding:0;">
        </td>
        <td style="width: 20px;">
            <input type="text" style="width: 20px;" id="trimestre" v-model="carga.trimestre" v-on:blur="editCarga(carga)">
            
        </td>
        <td style="width: 160px;">
            <label>
            <select type="text" style="width:160px" id="docente" v-model="carga.Docente"
                    v-on:change="editCarga(carga)">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
            </select>
            </label>
        </td>
        <td style="width: 108px;">
            <input type="text" style="width: 108px" v-model="carga.programa" v-on:blur="editCarga(carga)">
        </td>
        <td style="width: 30px">
            <input type="text" style="width: 30px" id="creditos" v-model="carga.creditos" v-on:blur="editCarga(carga)">
        </td>
        <td style="width: 20px;">

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
        text-align: center;
        padding: 0!important;
    }

    p {
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
        height: 30px;
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