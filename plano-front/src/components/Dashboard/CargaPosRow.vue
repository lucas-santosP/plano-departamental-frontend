<template>
    <div class="cargarow" style="width: 376px;">
        <td style="min-width:25px;  height:40px">
            <div style="width: 25px;">
                <input type="checkbox" name="ativa" value="true" v-on:click="checkDelete(carga)" v-model="ativo" style="width:16px;height: 16px;padding:0;">
            </div>
        </td>

        <td style="min-width:30px;">
            <div style="width: 30px; text-align: center;">
                <input type="text" style="width: 15px; text-align: center;" id="trimestre" v-model="carga.trimestre" v-on:blur="editCarga(carga)">
            </div>
        </td>

        <td style="min-width: 160px;" >
            <div style="width: 160px;">
                <select type="text" style="width:140px; padding-left:5px;" id="docente" v-model="carga.Docente" v-on:change="editCarga(carga)">
                    <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                    <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
                </select>
            </div>
        </td>

        <td style="min-width:101px">
            <div style="min-width: 101px;">
                <input type="text" style="width: 80px; text-align:center" v-model="carga.programa" v-on:blur="editCarga(carga)">
             </div>
        </td>
        <td style="max-width: 40px">
            <div style="width:40px">
                <input type="text" style="width: 25px; text-align:center" id="creditos" v-model="carga.creditos" v-on:blur="editCarga(carga)">
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
        text-align: center;
        vertical-align:middle;
        padding: 0;
        height:40px;
    }
    p {
        margin-bottom: 0;
        text-align: center;
    }

    input {
        height: 18px;
        text-align: center!important;
    }
    select{
        height:18px;
    }

    @-moz-document url-prefix() {
    select {
            height: 18px!important;
            text-align:left;
            box-sizing: border-box;
            
            line-height: 8px;
            border: 0.5px solid rgb(160, 160, 160);
            border-radius: 2px;
            background-color: rgb(245, 245, 245);
        }
        input{
            height: 18px!important;
            text-align:center;
            box-sizing: border-box;
            
            line-height: 8px;
            border: 0.5px solid rgb(160, 160, 160);
            border-radius: 2px;
            background-color:rgb(245, 245, 245);
        }
    }
    
</style>