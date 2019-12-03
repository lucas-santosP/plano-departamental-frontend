<template>
    <div class="DashboardLaboratoriosAlocacao row">
        <div class="col-12">
             <div class="col-12" style="padding-left: 0; height: 45px;">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pl-0 pt-3 pb-2 mb-3  " style="height: 45px;" >
        <h1 class="col-12 titulo">Laboratórios - Alocação</h1>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>

            
            <h6>1º SEMESTRE</h6>
            <div class="flex-container">
                <div v-for="lab in Laboratorios">
                    <h5 class="lab-num">{{lab.nome}}</h5>
                    <div class="row">
                        
                            <table class="tg">
                                <tr>
                                    <th class="tg-0lax">hora</th>
                                    <th class="tg-0lax">Seg</th>
                                    <th class="tg-0lax">Ter</th>
                                    <th class="tg-0lax">Qua</th>
                                    <th class="tg-0lax">Qui</th>
                                    <th class="tg-0lax">Sex</th>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">08-10</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">10-12</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">14-16</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">16-18</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">17-19</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 32)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 34)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 36)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 38)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 40)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">19-21</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">21-23</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas1" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                            </table>
                    </div>
                </div>
            </div>
            
            <h6>2º SEMESTRE</h6>

             <div class="flex-container">
                <div v-for="lab in Laboratorios">
                    <h5 class="lab-num">{{lab.nome}}</h5>
                        <div class="row">
                        
                            
                            <table class="tg">
                                <tr>
                                    <th class="tg-0lax">hora</th>
                                    <th class="tg-0lax">Seg</th>
                                    <th class="tg-0lax">Ter</th>
                                    <th class="tg-0lax">Qua</th>
                                    <th class="tg-0lax">Qui</th>
                                    <th class="tg-0lax">Sex</th>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">08-10</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 1)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 7)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 13)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 19)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 25)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">10-12</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 2)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 8)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 14)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 20)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 26)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">14-16</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 3)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 9)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 15)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 21)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 27)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">16-18</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 4)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 10)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 16)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 22)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 28)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">17-19</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 32)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 34)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 36)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 38)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 40)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">19-21</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 5)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 11)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 17)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 23)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 29)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>

                                <tr>
                                    <td class="tg-0lax">21-23</td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 6)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 12)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 18)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 24)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                    <td class="tg-0lax"><template v-for="turma in Turmas2" v-if="(turma.Sala1 === lab.id || turma.Sala2 === lab.id) && checkTurmaHorario(turma, 30)"><template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">{{disciplina.codigo}} {{turma.letra}}   </template></template></td>
                                </tr>
                            </table>
                            <br>
                        </div>
                </div>
             </div>
        </div>

    </div>
</template>

<script>
    import _ from 'lodash'
    import pdfs from '../../common/services/pdfs'
    export default {
        name: 'DashboardLaboratoriosAlocacao',
        data () {
            return {
                value:0
            }
        },
        created : function() {
          console.log(this.$store.state.sala.Salas)
          console.log(_.filter(this.$store.state.sala.Salas, ['laboratorio', true]))
        },

        methods : {

            checkTurmaLab (turma){
                let labs = _.filter(this.$store.state.sala.Salas, ['laboratorio', true])
                let result = 0
                labs.forEach(lab => {
                    if (lab.id === turma.Sala1)
                        result += 1
                    if (lab.id === turma.Sala2)
                        result += 2
                })

                if(result === 1) {
                    if (_.isNull(turma.Sala2)) {
                        return 4
                    }
                }
                return result

            },

            checkTurmaHorario (turma, horario) {
                if(turma.Horario1==horario || turma.Horario2==horario) {
                    let sala = this.checkTurmaLab(turma)
                    switch(sala){
                        case 0: return false
                                break
                        case 1: if(turma.Horario1==horario)
                                    return true
                                else
                                    return false
                                break
                        case 2: if(turma.Horario2==horario)
                                    return true
                                else
                                    return false
                                break
                        case 3:
                        case 4: return true
                                break

                    }
                    return true
                }else
                    return false
            },

            pdf() {
                pdfs.pdfAlocacaoLabs()
            },

        },
        computed : {
            Laboratorios () {
                return _.filter(this.$store.state.sala.Salas, ['laboratorio', true])
            },

            Turmas1 () {
                return _.filter(this.$store.state.turma.Turmas, ['periodo', 1])
            },

            Turmas2 () {
                return _.filter(this.$store.state.turma.Turmas, ['periodo', 3])
            },

            Disciplinas () {
                return this.$store.state.disciplina.Disciplinas
            }
        }
    }
</script>

<style scoped>
   .titulo {
        font-size: 25px;
        font-weight: normal;
        padding-left: 0;
    }

    h5{
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        margin-top: 15px;
    }
    h6{
        margin-top: 15px;
        font-weight:bold; 
        font-size: 20px;
        text-align: center;
    }
    td {
        width:65px !important;
        text-align: center !important;
    }

    th{
        text-align:center !important;
    }
    
    .flex-container{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .tg  {
        border-collapse:collapse;
        border-spacing:0;
        border-color:#ccc;
        margin-bottom: 20px;
    }
    .tg td{
        font-family:Arial, sans-serif;
        font-size:11px;
        padding:0px;
        border-style:solid;
        border-width:1px;
        overflow:hidden;
        word-break:normal;
        border-color:rgba(189, 189, 189, 0.644);
        color:#333;
        background-color:#fff;
    }
    .tg th{
        font-family:Arial, sans-serif;
        font-size:10px;
        font-weight:normal;
        padding:0px;
        border-style:solid;
        border-width:1px;
        overflow:hidden;
        word-break:normal;
        border-color:rgba(189, 189, 189, 0.623);
        color:#333;
        background-color:#e9ecef;
    }
    .tg .tg-0lax{
        vertical-align:center;
        height: 18px;
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
    .botao-estilo{
        margin-top: -8px;
        background-color: #0079fa !important;
        border-color: #0079fa !important;
        min-width: max-content;
        max-width: max-content;
    }

    .botao-estilo:hover{
        background-color: #0055af !important;
        border-color: #0055af !important;
    }
    
    .botao-estilo:focus{
        box-shadow: 0 0 0 0.2rem rgba(108, 136, 166, 0.5) !important;
    }

    @media screen and (max-width: 575px){
        .botao-estilo{
            min-width: max-content;
            max-width: max-content;
            float: right;
        }
        .lab-num{
            font-size: 22px !important;
        }
    }
</style>