/* eslint-disable */
import store from "../../vuex/store";
import { isNull, filter, find, orderBy, sortBy, some } from "lodash-es";
import { imageToDataUrl } from "../utils";
import urlLogoUfjf from "../../assets/logo-ufjf.png";
import urlLogoDcc from "../../assets/logo-dcc.png";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function pdfDisciplinasTurmas({ disciplinasInTurmas, periodosAtivados, plano }) {
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);
  const tables = [];
  const disciplinasOrdered = orderBy(disciplinasInTurmas, "codigo");
  const semestre1Ativo = semestreEstaAtivo(periodosAtivados, 1);
  const semestre2Ativo = semestreEstaAtivo(periodosAtivados, 2);

  if (semestre1Ativo) {
    tables.push({
      columns: [
        {
          image: logoDcc,
          fit: [60, 60],
          alignment: "left",
          width: "16%",
          margin: [0, 0, 0, 10],
        },
        [
          {
            text:
              "Relação de turmas oferecidas pelo Departamento de Ciência da Computação",
            alignment: "center",
            bold: true,
            fontSize: 10,
          },
          {
            text: "1º Semestre - " + plano.ano + " - " + plano.nome,
            alignment: "center",
            bold: true,
            fontSize: 10,
            margin: [0, 0, 0, 5],
          },
        ],
        {
          image: logoUfjf,
          fit: [60, 60],
          alignment: "right",
          width: "16%",
          margin: [0, 0, 0, 10],
        },
      ],
    });

    for (let i = 0; i < disciplinasOrdered.length; i++) {
      const turmas1Semestre = disciplinasOrdered[i].turmas.filter(
        (turma) => turma.periodo === 1 || turma.periodo === 2
      );

      if (turmas1Semestre.length) {
        tables.push({
          style: "tableExample",
          table: {
            widths: [60, "*", 72, 40],
            headerRows: 1,
            color: "#426",
            body: [
              [
                {
                  text: disciplinasOrdered[i].codigo,
                  alignment: "left",
                  bold: true,
                  fontSize: 9,
                },
                {
                  text: disciplinasOrdered[i].nome,
                  alignment: "left",
                  bold: true,
                  fontSize: 9,
                },
                {
                  text: perfilDisciplina(disciplinasOrdered[i]),
                  alignment: "center",
                  bold: true,
                  fontSize: 9,
                },
                {
                  text: horasAula(disciplinasOrdered[i]) + " horas",
                  alignment: "center",
                  bold: true,
                  fontSize: 9,
                },
              ],
            ],
          },

          layout: {
            vLineWidth: function() {
              return 0;
            },
          },
        });

        for (let j = 0; j < turmas1Semestre.length; j++) {
          let docentes = docentesRelatorioDisciplina(turmas1Semestre[j]);
          let horario1 = find(store.state.horario.Horarios, {
            id: turmas1Semestre[j].Horario1,
          });
          let horario2 = find(store.state.horario.Horarios, {
            id: turmas1Semestre[j].Horario2,
          });
          let horarioTotal = undefined;
          if (horario1 === undefined && horario2 === undefined) {
            horarioTotal = "";
          } else if (horario2 === undefined) {
            horarioTotal = horario1.horario;
          } else if (horario1 === undefined) {
            horarioTotal = horario2.horario;
          } else {
            horarioTotal = horario1.horario + "\n" + horario2.horario;
          }
          let sala1 = find(store.state.sala.Salas, {
            id: turmas1Semestre[j].Sala1,
          });
          let sala2 = find(store.state.sala.Salas, {
            id: turmas1Semestre[j].Sala2,
          });
          let salaTotal = undefined;
          if (sala1 === undefined && sala2 === undefined) {
            salaTotal = "";
          } else if (sala2 === undefined) {
            salaTotal = sala1.nome;
          } else if (sala1 === undefined) {
            salaTotal = sala2.nome;
          } else {
            salaTotal = sala1.nome + "\n" + sala2.nome;
          }

          tables.push({
            style: "tableExample",
            table: {
              widths: [36, 35, "*", 18, 36, 28, 32, 42],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  {
                    text: "Turma: " + turmas1Semestre[j].letra,
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: "Docentes: ",
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: docentes,
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: "Sala: ",
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: salaTotal,
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: "Horário: ",
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: horarioTotal,
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: "Vagas: " + vagasTurma(turmas1Semestre[j], 1),
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                ],
              ],
            },
            layout: {
              hLineWidth: function(i) {
                return i === 0 ? (j === 0 ? 0 : 0.5) : 0;
              },
              vLineWidth: function() {
                return 0;
              },
            },
          });
          let pedidosTurma = getPedidosDaTurma(turmas1Semestre[j]);
          // console.log(pedidosTurma)
          if (pedidosTurma.length > 0) {
            let tabelaCursosBody = [
              [
                { text: "" },
                { text: "Cód.", alignment: "left", bold: "true", fontSize: 8 },
                { text: "Curso", alignment: "left", bold: "true", fontSize: 8 },
                {
                  text: "Grade",
                  alignment: "center",
                  bold: "true",
                  fontSize: 8,
                },
                {
                  text: "Extra",
                  alignment: "center",
                  bold: "true",
                  fontSize: 8,
                },
                {
                  text: "Total",
                  alignment: "center",
                  bold: "true",
                  fontSize: 8,
                },
              ],
            ];
            for (let k = 0; k < pedidosTurma.length; k++) {
              tabelaCursosBody.push([
                { text: "" },
                {
                  text: curso(pedidosTurma[k]).codigo,
                  alignment: "left",
                  fontSize: 6,
                },
                {
                  text: curso(pedidosTurma[k]).nome,
                  alignment: "left",
                  fontSize: 6,
                },
                {
                  text: pedidosTurma[k].vagasPeriodizadas,
                  alignment: "center",
                  fontSize: 6,
                },
                {
                  text: pedidosTurma[k].vagasNaoPeriodizadas,
                  alignment: "center",
                  fontSize: 6,
                },
                {
                  text:
                    pedidosTurma[k].vagasPeriodizadas +
                    pedidosTurma[k].vagasNaoPeriodizadas,
                  alignment: "center",
                  fontSize: 6,
                },
              ]);
            }
            tables.push({
              style: "tableExample",
              table: {
                widths: [20, 24, "*", 24, 24, 24],
                color: "#426",
                body: tabelaCursosBody,
              },
              layout: {
                hLineWidth: function() {
                  return 0;
                },
                vLineWidth: function() {
                  return 0;
                },
              },
              margin: [0, 0, 0, j === turmas1Semestre.length - 1 ? 10 : 5],
            });
          }
        }
      }
    }
  }

  if (semestre1Ativo && semestre2Ativo) tables.push({ text: "", pageBreak: "before" }); //page break;

  if (semestre2Ativo) {
    tables.push({
      columns: [
        {
          image: logoDcc,
          fit: [60, 60],
          alignment: "left",
          width: "16%",
          margin: [0, 0, 0, 10],
        },
        [
          {
            text:
              "Relação de turmas oferecidas pelo Departamento de Ciência da Computação",
            alignment: "center",
            bold: true,
            fontSize: 10,
          },
          {
            text: "2º Semestre - " + plano.ano + " - " + plano.nome,
            alignment: "center",
            bold: true,
            fontSize: 10,
            margin: [0, 0, 0, 5],
          },
        ],
        {
          image: logoUfjf,
          fit: [60, 60],
          alignment: "right",
          width: "16%",
          margin: [0, 0, 0, 10],
        },
      ],
    });

    for (let i = 0; i < disciplinasOrdered.length; i++) {
      const turmas2Semestre = disciplinasOrdered[i].turmas.filter(
        (turma) => turma.periodo === 3 || turma.periodo === 4
      );

      if (turmas2Semestre.length) {
        tables.push({
          style: "tableExample",
          table: {
            widths: [60, "*", 72, 40],
            headerRows: 1,
            color: "#426",
            body: [
              [
                {
                  text: disciplinasOrdered[i].codigo,
                  alignment: "left",
                  bold: true,
                  fontSize: 9,
                },
                {
                  text: disciplinasOrdered[i].nome,
                  alignment: "left",
                  bold: true,
                  fontSize: 9,
                },
                {
                  text: perfilDisciplina(disciplinasOrdered[i]),
                  alignment: "center",
                  bold: true,
                  fontSize: 9,
                },
                {
                  text: horasAula(disciplinasOrdered[i]) + " horas",
                  alignment: "center",
                  bold: true,
                  fontSize: 9,
                },
              ],
            ],
          },

          layout: {
            vLineWidth: function() {
              return 0;
            },
          },
        });

        for (let j = 0; j < turmas2Semestre.length; j++) {
          let docentes = docentesRelatorioDisciplina(turmas2Semestre[j]);
          let horario1 = find(store.state.horario.Horarios, {
            id: turmas2Semestre[j].Horario1,
          });
          let horario2 = find(store.state.horario.Horarios, {
            id: turmas2Semestre[j].Horario2,
          });
          let horarioTotal = undefined;
          if (horario1 === undefined && horario2 === undefined) {
            horarioTotal = "";
          } else if (horario2 === undefined) {
            horarioTotal = horario1.horario;
          } else if (horario1 === undefined) {
            horarioTotal = horario2.horario;
          } else {
            horarioTotal = horario1.horario + "\n" + horario2.horario;
          }
          let sala1 = find(store.state.sala.Salas, {
            id: turmas2Semestre[j].Sala1,
          });
          let sala2 = find(store.state.sala.Salas, {
            id: turmas2Semestre[j].Sala2,
          });
          let salaTotal = undefined;
          if (sala1 === undefined && sala2 === undefined) {
            salaTotal = "";
          } else if (sala2 === undefined) {
            salaTotal = sala1.nome;
          } else if (sala1 === undefined) {
            salaTotal = sala2.nome;
          } else {
            salaTotal = sala1.nome + "\n" + sala2.nome;
          }

          tables.push({
            style: "tableExample",
            table: {
              widths: [40, 35, "*", 18, 44, 28, 42, 65],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  {
                    text: "Turma: " + turmas2Semestre[j].letra,
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: "Docentes: ",
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: docentes,
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: "Sala: ",
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: salaTotal,
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: "Horário: ",
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: horarioTotal,
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                  {
                    text: "Vagas: " + vagasTurma(turmas2Semestre[j], 2),
                    alignment: "left",
                    fontSize: 8,
                    bold: true,
                  },
                ],
              ],
            },
            layout: {
              hLineWidth: function(i) {
                return i === 0 ? (j === 0 ? 0 : 0.5) : 0;
              },
              vLineWidth: function() {
                return 0;
              },
            },
          });
          let pedidosTurma = getPedidosDaTurma(turmas2Semestre[j]);
          // console.log(pedidosTurma);
          if (pedidosTurma.length > 0) {
            let tabelaCursosBody = [
              [
                { text: "" },
                { text: "Cód.", alignment: "left", bold: "true", fontSize: 8 },
                { text: "Curso", alignment: "left", bold: "true", fontSize: 8 },
                {
                  text: "Grade",
                  alignment: "center",
                  bold: "true",
                  fontSize: 8,
                },
                {
                  text: "Extra",
                  alignment: "center",
                  bold: "true",
                  fontSize: 8,
                },
                {
                  text: "Total",
                  alignment: "center",
                  bold: "true",
                  fontSize: 8,
                },
              ],
            ];
            for (let k = 0; k < pedidosTurma.length; k++) {
              tabelaCursosBody.push([
                { text: "" },
                {
                  text: curso(pedidosTurma[k]).codigo,
                  alignment: "left",
                  fontSize: 6,
                },
                {
                  text: curso(pedidosTurma[k]).nome,
                  alignment: "left",
                  fontSize: 6,
                },
                {
                  text: pedidosTurma[k].vagasPeriodizadas,
                  alignment: "center",
                  fontSize: 6,
                },
                {
                  text: pedidosTurma[k].vagasNaoPeriodizadas,
                  alignment: "center",
                  fontSize: 6,
                },
                {
                  text:
                    pedidosTurma[k].vagasPeriodizadas +
                    pedidosTurma[k].vagasNaoPeriodizadas,
                  alignment: "center",
                  fontSize: 6,
                },
              ]);
            }
            tables.push({
              style: "tableExample",
              table: {
                widths: [20, 24, "*", 24, 24, 24],
                headerRows: 1,
                color: "#426",
                body: tabelaCursosBody,
              },
              layout: {
                hLineWidth: function() {
                  return 0;
                },
                vLineWidth: function() {
                  return 0;
                },
              },
              margin: [0, 0, 0, j === turmas2Semestre.length - 1 ? 10 : 5],
            });
          }
        }
      }
    }
  }

  let docDefinition = {
    info: {
      title: "Plano Departamental",
    },
    content: tables,
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: new Date(Date.now()).toLocaleString(),
            margin: [30, 10, 0, 0],
            fontSize: 8,
            alignment: `left`,
          },
          {
            text: currentPage.toString() + " de " + pageCount,
            alignment: "right",
            margin: [0, 10, 30, 0],
            fontSize: 8,
          },
        ],
      };
    },
  };
  pdfMake.createPdf(docDefinition).open();
}

async function pdfHorariosLabs(data) {
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);

  var tables = [];
  tables.push({
    columns: [
      {
        image: logoDcc,
        fit: [60, 60],
        alignment: "left",
        width: "16%",
      },
      [
        {
          text: "Relação de horários das turmas em laboratórios do",
          alignment: "center",
          bold: true,
          fontSize: 10,
        },
        {
          text: "Departamento de Ciência da Computação",
          alignment: "center",
          bold: true,
          fontSize: 10,
        },
      ],
      {
        image: logoUfjf,
        fit: [60, 60],
        alignment: "right",
        width: "16%",
      },
    ],
  });
  tables.push({
    text: "1º Semestre " + data.plano.ano + " - " + data.plano.nome,
    alignment: "center",
    bold: true,
    fontSize: 10,
    margin: [0, 0, 0, 5],
  });
  var laboratorios = data.laboratorios;
  var disciplinas = orderBy(store.state.disciplina.Disciplinas, ["nome"]);
  var turmas1 = filter(store.state.turma.Turmas, ["periodo", 1]);
  var turmas2 = filter(store.state.turma.Turmas, ["periodo", 3]);
  var seg = "",
    ter = "",
    qua = "",
    qui = "",
    sex = "";
  for (let i = 0; i < laboratorios.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      tables.push({
        text: laboratorios[i].nome,
        bold: true,
        margin: [0, 10, 0, 10],
        fontSize: 9,
        pageBreak: "before",
      });
    } else {
      tables.push({
        text: laboratorios[i].nome,
        bold: true,
        margin: [0, 10, 0, 10],
        fontSize: 9,
      });
    }
    let tableLabsBody = [
      [
        { text: "Horário", alignment: "center", bold: true, fontSize: 8 },
        {
          text: "Segunda",
          alignment: "center",
          bold: true,
          fontSize: 8,
        },
        {
          text: "Terça",
          alignment: "center",
          bold: true,
          fontSize: 8,
        },
        {
          text: "Quarta",
          alignment: "center",
          bold: true,
          fontSize: 8,
        },
        {
          text: "Quinta",
          alignment: "center",
          bold: true,
          fontSize: 8,
        },
        {
          text: "Sexta",
          alignment: "center",
          bold: true,
          fontSize: 8,
        },
      ],
    ];

    for (var d = 0; d < 8; d++) {
      for (var j = 0; j < turmas1.length; j++) {
        if (
          turmas1[j].Sala1 === laboratorios[i].id ||
          turmas1[j].Sala2 === laboratorios[i].id
        ) {
          if (d < 4) {
            if (checkTurmaHorarioLabs(turmas1[j], 1 + d, laboratorios[i].id)) {
              for (var k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 7 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 13 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 19 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 25 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
          } else if (d === 4 || d === 5) {
            if (checkTurmaHorarioLabs(turmas1[j], 28 + d, laboratorios[i].id)) {
              for (var k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 30 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 32 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 34 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 36 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
          } else if (d > 5) {
            if (checkTurmaHorarioLabs(turmas1[j], d - 1)) {
              for (var k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 5 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 11 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 17 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas1[j], 23 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas1[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + turmas1[j].letra;
                }
              }
            }
          }
        }
      }
      switch (d) {
        case 0:
          tableLabsBody.push([
            { text: "08 - 10", alignment: "center", fontSize: 8 },
            {
              text: seg,
              alignment: "center",
              fontSize: 8,
            },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            {
              text: qui,
              alignment: "center",
              fontSize: 8,
            },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 1:
          tableLabsBody.push([
            { text: "10 - 12", alignment: "center", fontSize: 8 },
            {
              text: seg,
              alignment: "center",
              fontSize: 8,
            },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            {
              text: qui,
              alignment: "center",
              fontSize: 8,
            },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 2:
          tableLabsBody.push([
            { text: "14 - 16", alignment: "center", fontSize: 8 },
            {
              text: seg,
              alignment: "center",
              fontSize: 8,
            },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            {
              text: qui,
              alignment: "center",
              fontSize: 8,
            },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 3:
          tableLabsBody.push([
            { text: "16 - 18", alignment: "center", fontSize: 8 },
            {
              text: seg,
              alignment: "center",
              fontSize: 8,
            },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            {
              text: qui,
              alignment: "center",
              fontSize: 8,
            },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 4:
          tableLabsBody.push([
            { text: "17 - 19", alignment: "center", fontSize: 8 },
            {
              text: seg,
              alignment: "center",
              fontSize: 8,
            },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            {
              text: qui,
              alignment: "center",
              fontSize: 8,
            },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 5:
          tableLabsBody.push([
            { text: "18 - 20", alignment: "center", fontSize: 8 },
            {
              text: seg,
              alignment: "center",
              fontSize: 8,
            },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            {
              text: qui,
              alignment: "center",
              fontSize: 8,
            },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 6:
          tableLabsBody.push([
            { text: "19 - 21", alignment: "center", fontSize: 8 },
            {
              text: seg,
              alignment: "center",
              fontSize: 8,
            },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            {
              text: qui,
              alignment: "center",
              fontSize: 8,
            },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 7:
          tableLabsBody.push([
            { text: "21 - 23", alignment: "center", fontSize: 8 },
            {
              text: seg,
              alignment: "center",
              fontSize: 8,
            },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            {
              text: qui,
              alignment: "center",
              fontSize: 8,
            },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
      }
      seg = ter = qua = qui = sex = "";
    }
    tables.push({
      table: {
        widths: ["*", "*", "*", "*", "*", "*"],
        headerRows: 1,
        color: "#426",
        body: tableLabsBody,
      },
    });
  }
  tables.push({
    columns: [
      {
        image: logoDcc,
        fit: [60, 60],
        alignment: "left",
        width: "16%",
        pageBreak: "before",
      },
      [
        {
          text: "Relação de horários das turmas em laboratórios do",
          alignment: "center",
          bold: true,
          fontSize: 10,
          pageBreak: "before",
        },
        {
          text: "Departamento de Ciência da Computação",
          alignment: "center",
          bold: true,
          fontSize: 10,
        },
      ],
      {
        image: logoUfjf,
        fit: [60, 60],
        alignment: "right",
        width: "16%",
        pageBreak: "before",
      },
    ],
  });
  tables.push({
    text: "2º Semestre " + data.plano.ano + " - " + data.plano.nome,
    alignment: "center",
    bold: true,
    fontSize: 10,
    margin: [0, 0, 0, 5],
  });
  for (let i = 0; i < laboratorios.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      tables.push({
        text: laboratorios[i].nome,
        bold: true,
        margin: [0, 10, 0, 10],
        fontSize: 9,
        pageBreak: "before",
      });
    } else {
      tables.push({
        text: laboratorios[i].nome,
        bold: true,
        margin: [0, 10, 0, 10],
        fontSize: 9,
      });
    }
    let tableLabsBody = [
      [
        { text: "Horário", alignment: "center", bold: true, fontSize: 8 },
        {
          text: "Segunda",
          alignment: "center",
          bold: true,
          fontSize: 8,
        },
        {
          text: "Terça",
          alignment: "center",
          bold: true,
          fontSize: 8,
        },
        {
          text: "Quarta",
          alignment: "center",
          bold: true,
          fontSize: 8,
        },
        {
          text: "Quinta",
          alignment: "center",
          bold: true,
          fontSize: 8,
        },
        {
          text: "Sexta",
          alignment: "center",
          bold: true,
          fontSize: 8,
        },
      ],
    ];

    for (var d = 0; d < 8; d++) {
      for (var j = 0; j < turmas2.length; j++) {
        if (
          turmas2[j].Sala1 === laboratorios[i].id ||
          turmas2[j].Sala2 === laboratorios[i].id
        ) {
          if (d < 4) {
            if (checkTurmaHorarioLabs(turmas2[j], 1 + d, laboratorios[i].id)) {
              for (var k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 7 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 13 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 19 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 25 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
          } else if (d === 4 || d === 5) {
            if (checkTurmaHorarioLabs(turmas2[j], 28 + d, laboratorios[i].id)) {
              for (var k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 30 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 32 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 34 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 36 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
          } else if (d > 5) {
            if (checkTurmaHorarioLabs(turmas2[j], d - 1)) {
              for (var k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 5 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 11 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 17 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
            if (checkTurmaHorarioLabs(turmas2[j], 23 + d, laboratorios[i].id)) {
              for (k = 0; k < disciplinas.length; k++) {
                if (turmas2[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + turmas2[j].letra;
                }
              }
            }
          }
        }
      }
      switch (d) {
        case 0:
          tableLabsBody.push([
            { text: "08 - 10", alignment: "center", fontSize: 8 },
            { text: seg, alignment: "center", fontSize: 8 },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            { text: qui, alignment: "center", fontSize: 8 },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 1:
          tableLabsBody.push([
            { text: "10 - 12", alignment: "center", fontSize: 8 },
            { text: seg, alignment: "center", fontSize: 8 },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            { text: qui, alignment: "center", fontSize: 8 },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 2:
          tableLabsBody.push([
            { text: "14 - 16", alignment: "center", fontSize: 8 },
            { text: seg, alignment: "center", fontSize: 8 },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            { text: qui, alignment: "center", fontSize: 8 },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 3:
          tableLabsBody.push([
            { text: "16 - 18", alignment: "center", fontSize: 8 },
            { text: seg, alignment: "center", fontSize: 8 },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            { text: qui, alignment: "center", fontSize: 8 },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 4:
          tableLabsBody.push([
            { text: "17 - 19", alignment: "center", fontSize: 8 },
            { text: seg, alignment: "center", fontSize: 8 },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            { text: qui, alignment: "center", fontSize: 8 },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 5:
          tableLabsBody.push([
            { text: "18 - 20", alignment: "center", fontSize: 8 },
            { text: seg, alignment: "center", fontSize: 8 },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            { text: qui, alignment: "center", fontSize: 8 },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 6:
          tableLabsBody.push([
            { text: "19 - 21", alignment: "center", fontSize: 8 },
            { text: seg, alignment: "center", fontSize: 8 },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            { text: qui, alignment: "center", fontSize: 8 },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
        case 7:
          tableLabsBody.push([
            { text: "21 - 23", alignment: "center", fontSize: 8 },
            { text: seg, alignment: "center", fontSize: 8 },
            { text: ter, alignment: "center", fontSize: 8 },
            { text: qua, alignment: "center", fontSize: 8 },
            { text: qui, alignment: "center", fontSize: 8 },
            { text: sex, alignment: "center", fontSize: 8 },
          ]);
          break;
      }
      seg = ter = qua = qui = sex = "";
    }

    tables.push({
      table: {
        widths: ["*", "*", "*", "*", "*", "*"],
        headerRows: 1,
        color: "#426",
        body: tableLabsBody,
      },
    });
  }

  var docDefinition = {
    info: {
      title: "Horários - Laborátorios",
    },
    content: tables,
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: new Date(Date.now()).toLocaleString(),
            margin: [30, 10, 0, 0],
            fontSize: 8,
            alignment: `left`,
          },
          {
            text: currentPage.toString() + " de " + pageCount,
            alignment: "right",
            margin: [0, 10, 30, 0],
            fontSize: 8,
          },
        ],
      };
    },
  };
  pdfMake.createPdf(docDefinition).open();
}

async function pdfCargaProfessores(data) {
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);

  let tables = [];
  tables.push({
    columns: [
      {
        image: logoDcc,
        fit: [60, 60],
        alignment: "left",
        width: "16%",
        margin: [0, 0, 0, 10],
      },
      [
        {
          text: "Relação de disciplinas ministradas pelos professores do",
          alignment: "center",
          bold: true,
          fontSize: 10,
        },
        {
          text:
            "Departamento de Ciência da Computação - " +
            data.plano.ano +
            " - " +
            data.plano.nome,
          alignment: "center",
          bold: true,
          fontSize: 10,
          margin: [0, 0, 0, 5],
        },
      ],
      {
        image: logoUfjf,
        fit: [60, 60],
        alignment: "right",
        width: "16%",
        margin: [0, 0, 0, 10],
      },
    ],
  });
  let professores = orderBy(filter(data.Docentes, ["ativo", true]), "nome");
  let turmasProf1, turmasProf2;
  let posProf1, posProf2;
  for (let i = 0; i < professores.length; i++) {
    turmasProf1 = filter(getTurmasDoDocente(professores[i]), function(t) {
      return t.periodo == 1 || t.periodo == 2;
    });
    turmasProf2 = filter(getTurmasDoDocente(professores[i]), function(t) {
      return t.periodo == 3 || t.periodo == 4;
    });
    posProf1 = filter(getCargaPosDoDocente(professores[i]), function(p) {
      return p.trimestre == 1 || p.trimestre == 2;
    });
    posProf2 = filter(getCargaPosDoDocente(professores[i]), function(p) {
      return p.trimestre == 3 || p.trimestre == 4;
    });
    if (
      turmasProf1.length > 0 ||
      turmasProf2.length > 0 ||
      posProf1.length > 0 ||
      posProf2.length > 0
    ) {
      tables.push({
        style: "tableExample",
        table: {
          widths: ["*", 75],
          headerRows: 1,
          color: "#426",
          body: [
            [
              {
                text: professores[i].nome,
                alignment: "left",
                fontSize: 9,
                bold: true,
              },
              {
                text:
                  "Carga total: " +
                  (creditos1(professores[i]) + creditos2(professores[i])),
                alignment: "center",
                fontSize: 9,
                bold: true,
              },
            ],
          ],
        },
        layout: {
          vLineWidth: function() {
            return 0;
          },
        },
      });
      let tableDocenteBody = [
        [
          "",
          {
            text: "S.",
            fontSize: 8,
            bold: true,
          },
          {
            text: "Cód.",
            fontSize: 8,
            bold: true,
          },
          {
            text: "Disciplina",
            fontSize: 8,
            bold: true,
          },
          {
            text: "Turma",
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
          {
            text: "Horário",
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
          {
            text: "CS1",
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
          {
            text: "CS2",
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
        ],
      ];
      for (var j = 0; j < turmasProf1.length; j++) {
        var disciplina = undefined;
        var horario1 = undefined;
        var horario2 = undefined;
        var c1 = 0;
        var c2 = 0;
        for (var k = 0; k < store.state.disciplina.Disciplinas.length; k++) {
          if (turmasProf1[j].Disciplina === store.state.disciplina.Disciplinas[k].id) {
            disciplina = store.state.disciplina.Disciplinas[k];
          }
        }
        for (var l = 0; l < store.state.horario.Horarios.length; l++) {
          if (turmasProf1[j].Horario1 === store.state.horario.Horarios[l].id) {
            horario1 = store.state.horario.Horarios[l];
          }
        }

        for (var m = 0; m < store.state.horario.Horarios.length; m++) {
          if (turmasProf1[j].Horario2 === store.state.horario.Horarios[m].id) {
            horario2 = store.state.horario.Horarios[m];
          }
        }
        if (horario1 === undefined && horario2 === undefined) {
          horarioTotal = "";
        } else if (horario2 === undefined) {
          var horarioTotal = horario1.horario;
        } else if (horario1 === undefined) {
          var horarioTotal = horario2.horario;
        } else {
          var horarioTotal = horario1.horario + "/" + horario2.horario;
        }
        if (turmasProf1[j].periodo == 1) {
          if (turmasProf1[j].Docente1 > 0 && turmasProf1[j].Docente2 > 0)
            c1 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
          else c1 = disciplina.cargaTeorica + disciplina.cargaPratica;
        } else {
          if (turmasProf1[j].Docente1 > 0 && turmasProf1[j].Docente2 > 0)
            c2 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
          else c2 = disciplina.cargaTeorica + disciplina.cargaPratica;
        }
        tableDocenteBody.push([
          "",
          {
            text: turmasProf1[j].periodo,
            fontSize: 6,
            alignment: "left",
          },
          {
            text: disciplina.codigo,
            fontSize: 6,
            alignment: "left",
          },
          {
            text: disciplina.nome,
            fontSize: 6,
            alignment: "left",
          },
          {
            text: turmasProf1[j].letra,
            fontSize: 6,
            alignment: "center",
          },
          {
            text: horarioTotal,
            fontSize: 6,
            alignment: "center",
          },
          {
            text: c1 === 0 ? "" : c1,
            fontSize: 6,
            alignment: "center",
          },
          {
            text: c2 === 0 ? "" : c2,
            fontSize: 6,
            alignment: "center",
          },
        ]);
      }
      for (var n = 0; n < posProf1.length; n++) {
        var c1 = 0;
        var c2 = 0;
        if (posProf1[n].trimestre === 1 || posProf1[n].trimestre === 2) {
          c1 = posProf1[n].creditos;
        } else {
          c2 = posProf1[n].creditos;
        }
        tableDocenteBody.push([
          "",
          {
            text: posProf1[n].trimestre,
            fontSize: 6,
            alignment: "left",
          },
          "",
          {
            text: "DISCIPLINA DO " + posProf1[n].programa,
            fontSize: 6,
            alignment: "left",
          },
          "",
          "",
          {
            text: c1 === 0 ? "" : c1,
            fontSize: 6,
            alignment: "center",
          },
          {
            text: c2 === 0 ? "" : c2,
            fontSize: 6,
            alignment: "center",
          },
        ]);
      }
      for (var j = 0; j < turmasProf2.length; j++) {
        var disciplina = undefined;
        var horario1 = undefined;
        var horario2 = undefined;
        var c1 = 0;
        var c2 = 0;
        for (var k = 0; k < store.state.disciplina.Disciplinas.length; k++) {
          if (turmasProf2[j].Disciplina === store.state.disciplina.Disciplinas[k].id) {
            disciplina = store.state.disciplina.Disciplinas[k];
          }
        }
        for (var l = 0; l < store.state.horario.Horarios.length; l++) {
          if (turmasProf2[j].Horario1 === store.state.horario.Horarios[l].id) {
            horario1 = store.state.horario.Horarios[l];
          }
        }

        for (var m = 0; m < store.state.horario.Horarios.length; m++) {
          if (turmasProf2[j].Horario2 === store.state.horario.Horarios[m].id) {
            horario2 = store.state.horario.Horarios[m];
          }
        }
        if (horario1 === undefined && horario2 === undefined) {
          horarioTotal = "";
        } else if (horario2 === undefined) {
          var horarioTotal = horario1.horario;
        } else if (horario1 === undefined) {
          var horarioTotal = horario2.horario;
        } else {
          var horarioTotal = horario1.horario + "/" + horario2.horario;
        }
        if (turmasProf2[j].periodo == 1) {
          if (turmasProf2[j].Docente1 > 0 && turmasProf2[j].Docente2 > 0)
            c1 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
          else c1 = disciplina.cargaTeorica + disciplina.cargaPratica;
        } else {
          if (turmasProf2[j].Docente1 > 0 && turmasProf2[j].Docente2 > 0)
            c2 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
          else c2 = disciplina.cargaTeorica + disciplina.cargaPratica;
        }
        tableDocenteBody.push([
          "",
          {
            text: turmasProf2[j].periodo,
            fontSize: 6,
            alignment: "left",
          },
          {
            text: disciplina.codigo,
            fontSize: 6,
            alignment: "left",
          },
          {
            text: disciplina.nome,
            fontSize: 6,
            alignment: "left",
          },
          {
            text: turmasProf2[j].letra,
            fontSize: 6,
            alignment: "center",
          },
          {
            text: horarioTotal,
            fontSize: 6,
            alignment: "center",
          },
          {
            text: c1 === 0 ? "" : c1,
            fontSize: 6,
            alignment: "center",
          },
          {
            text: c2 === 0 ? "" : c2,
            fontSize: 6,
            alignment: "center",
          },
        ]);
      }
      for (var n = 0; n < posProf2.length; n++) {
        var c1 = 0;
        var c2 = 0;
        if (posProf2[n].trimestre === 1 || posProf2[n].trimestre === 2) {
          c1 = posProf2[n].creditos;
        } else {
          c2 = posProf2[n].creditos;
        }
        tableDocenteBody.push([
          "",
          {
            text: posProf2[n].trimestre,
            fontSize: 6,
            alignment: "left",
          },
          "",
          {
            text: "DISCIPLINA DO " + posProf2[n].programa,
            fontSize: 6,
            alignment: "left",
          },
          "",
          "",
          {
            text: c1 === 0 ? "" : c1,
            fontSize: 6,
            alignment: "center",
          },
          {
            text: c2 === 0 ? "" : c2,
            fontSize: 6,
            alignment: "center",
          },
        ]);
      }
      tableDocenteBody.push([
        "",
        "",
        "",
        "",
        "",
        {
          text: "CARGA POR SEMESTRE:",
          fontSize: 6,
          alignment: "right",
          bold: true,
          margin: [0, 5, 0, 0],
        },
        {
          text: creditos1(professores[i]),
          fontSize: 6,
          alignment: "center",
          bold: true,
          margin: [0, 5, 0, 0],
        },
        {
          text: creditos2(professores[i]),
          fontSize: 6,
          alignment: "center",
          bold: true,
          margin: [0, 5, 0, 0],
        },
      ]);
      tables.push({
        style: "tableExample",
        table: {
          widths: [20, 8, 40, "*", 24, 104, 32, 32],
          headerRows: 1,
          color: "#426",
          body: tableDocenteBody,
        },
        layout: {
          vLineWidth: function() {
            return 0;
          },
          hLineWidth: function() {
            return 0;
          },
        },
        margin: [0, 0, 0, 5],
      });
    }
  }

  let turmasSemAlocacao = getTurmasSemAlocacao();
  if (data.SemAlocacao && turmasSemAlocacao.length > 0) {
    tables.push({
      style: "tableExample",
      table: {
        widths: ["*", 32, 32],
        headerRows: 1,
        color: "#426",
        body: [
          [
            {
              text: "SEM ALOCAÇÃO",
              alignment: "left",
              fontSize: 9,
              bold: true,
            },
            "",
            "",
          ],
        ],
      },
      layout: {
        vLineWidth: function() {
          return 0;
        },
      },
    });
    let tableSemAlocacaoBody = [
      [
        "",
        {
          text: "S.",
          fontSize: 8,
          bold: true,
        },
        {
          text: "Cód.",
          fontSize: 8,
          bold: true,
        },
        {
          text: "Disciplina",
          fontSize: 8,
          bold: true,
        },
        {
          text: "Turma",
          alignment: "center",
          fontSize: 8,
          bold: true,
        },
        {
          text: "Horário",
          alignment: "center",
          fontSize: 8,
          bold: true,
        },
        {
          text: "C1",
          alignment: "center",
          fontSize: 8,
          bold: true,
        },
        {
          text: "C2",
          alignment: "center",
          fontSize: 8,
          bold: true,
        },
      ],
    ];
    for (var j = 0; j < turmasSemAlocacao.length; j++) {
      var disciplina = undefined;
      var horario1 = undefined;
      var horario2 = undefined;
      var c1 = 0;
      var c2 = 0;
      for (var k = 0; k < store.state.disciplina.Disciplinas.length; k++) {
        if (
          turmasSemAlocacao[j].Disciplina === store.state.disciplina.Disciplinas[k].id
        ) {
          disciplina = store.state.disciplina.Disciplinas[k];
        }
      }
      for (var l = 0; l < store.state.horario.Horarios.length; l++) {
        if (turmasSemAlocacao[j].Horario1 === store.state.horario.Horarios[l].id) {
          horario1 = store.state.horario.Horarios[l];
        }
      }

      for (var m = 0; m < store.state.horario.Horarios.length; m++) {
        if (turmasSemAlocacao[j].Horario2 === store.state.horario.Horarios[m].id) {
          horario2 = store.state.horario.Horarios[m];
        }
      }
      if (horario1 === undefined && horario2 === undefined) {
        horarioTotal = "";
      } else if (horario2 === undefined) {
        var horarioTotal = horario1.horario;
      } else if (horario1 === undefined) {
        var horarioTotal = horario2.horario;
      } else {
        var horarioTotal = horario1.horario + "/" + horario2.horario;
      }
      if (turmasSemAlocacao[j].periodo == 1) {
        if (turmasSemAlocacao[j].Docente1 > 0 && turmasSemAlocacao[j].Docente2 > 0)
          c1 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
        else c1 = disciplina.cargaTeorica + disciplina.cargaPratica;
      } else {
        if (turmasSemAlocacao[j].Docente1 > 0 && turmasSemAlocacao[j].Docente2 > 0)
          c2 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
        else c2 = disciplina.cargaTeorica + disciplina.cargaPratica;
      }
      tableSemAlocacaoBody.push([
        "",
        {
          text: turmasSemAlocacao[j].periodo,
          fontSize: 6,
          alignment: "left",
        },
        {
          text: disciplina.codigo,
          fontSize: 6,
          alignment: "left",
        },
        {
          text: disciplina.nome,
          fontSize: 6,
          alignment: "left",
        },
        {
          text: turmasSemAlocacao[j].letra,
          fontSize: 6,
          alignment: "center",
        },
        {
          text: horarioTotal,
          fontSize: 6,
          alignment: "center",
        },
        {
          text: c1 === 0 ? "" : c1,
          fontSize: 6,
          alignment: "center",
        },
        {
          text: c2 === 0 ? "" : c2,
          fontSize: 6,
          alignment: "center",
        },
      ]);
      tables.push({
        style: "tableExample",
        table: {
          widths: [20, 8, 40, "*", 24, 104, 32, 32],
          headerRows: 1,
          color: "#426",
          body: tableSemAlocacaoBody,
        },
        layout: {
          vLineWidth: function() {
            return 0;
          },
          hLineWidth: function() {
            return 0;
          },
        },
        margin: [0, 0, 0, 5],
      });
    }
  }

  var docDefinition = {
    info: {
      title: "Carga Professores",
    },
    content: tables,
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: new Date(Date.now()).toLocaleString(),
            margin: [30, 10, 0, 0],
            fontSize: 8,
            alignment: `left`,
          },
          {
            text: currentPage.toString() + " de " + pageCount,
            alignment: "right",
            margin: [0, 10, 30, 0],
            fontSize: 8,
          },
        ],
      };
    },
  };
  pdfMake.createPdf(docDefinition).open();
}

async function pdfTurmasCursos(cursos) {
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);

  let tables = [];
  tables.push({
    columns: [
      {
        image: logoDcc,
        fit: [60, 60],
        alignment: "left",
        width: "16%",
        margin: [0, 0, 0, 10],
      },
      [
        {
          text:
            "Relação de turmas oferecidas para cada curso pelo Departamento de Ciência da Computação",
          alignment: "center",
          bold: true,
          fontSize: 10,
        },
      ],
      {
        image: logoUfjf,
        fit: [60, 60],
        alignment: "right",
        width: "16%",
        margin: [0, 0, 0, 10],
      },
    ],
  });
  for (let i = 0; i < cursos.length; i++) {
    const turmas = getTurmasDoCurso(cursos[i].id);
    if (turmas.length > 0) {
      tables.push({
        style: "tableExample",
        table: {
          widths: [60, "*"],
          headerRows: 1,
          color: "#426",
          body: [
            [
              {
                text: cursos[i].codigo,
                alignment: "left",
                bold: true,
                fontSize: 9,
              },
              {
                text: cursos[i].nome,
                alignment: "left",
                bold: true,
                fontSize: 9,
              },
            ],
          ],
        },

        layout: {
          vLineWidth: function() {
            return 0;
          },
        },
      });

      let tabelaTurmasBody = [
        [
          { text: "Período", alignment: "left", bold: "true", fontSize: 8 },
          { text: "Cód. Disc.", alignment: "left", bold: "true", fontSize: 8 },
          { text: "Nome Disciplina", alignment: "left", bold: "true", fontSize: 8 },
          {
            text: "Turma",
            alignment: "center",
            bold: "true",
            fontSize: 8,
          },
          { text: "Horário", alignment: "center", bold: "true", fontSize: 8 },
          {
            text: "Grade",
            alignment: "center",
            bold: "true",
            fontSize: 8,
          },
          {
            text: "Não Grade",
            alignment: "center",
            bold: "true",
            fontSize: 8,
          },
        ],
      ];

      for (let j = 0; j < turmas.length; j++) {
        let horario1 = find(store.state.horario.Horarios, {
          id: turmas[j].turma.Horario1,
        });
        let horario2 = find(store.state.horario.Horarios, {
          id: turmas[j].turma.Horario2,
        });
        let horarioTotal = undefined;
        if (horario1 === undefined && horario2 === undefined) {
          horarioTotal = "";
        } else if (horario2 === undefined) {
          horarioTotal = horario1.horario;
        } else if (horario1 === undefined) {
          horarioTotal = horario2.horario;
        } else {
          horarioTotal = horario1.horario + "/" + horario2.horario;
        }
        tabelaTurmasBody.push([
          {
            text: turmas[j].turma.periodo,
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
          {
            text: turmas[j].turma.disciplina.codigo,
            alignment: "left",
            fontSize: 8,
            bold: true,
          },
          {
            text: turmas[j].turma.disciplina.nome,
            alignment: "left",
            fontSize: 8,
            bold: true,
          },
          {
            text: turmas[j].turma.letra,
            alignment: "center",
            fontSize: 8,
            bold: true,
          },

          {
            text: horarioTotal,
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
          {
            text: turmas[j].pedido.vagasPeriodizadas
              ? turmas[j].pedido.vagasPeriodizadas
              : "",
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
          {
            text: turmas[j].pedido.vagasNaoPeriodizadas
              ? turmas[j].pedido.vagasNaoPeriodizadas
              : "",
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
        ]);
      }
      tables.push({
        style: "tableExample",
        table: {
          widths: [28, 48, "*", 24, 68, 40, 40],
          headerRows: 1,
          color: "#426",
          body: tabelaTurmasBody,
        },
        layout: {
          hLineWidth: function() {
            return 0;
          },
          vLineWidth: function() {
            return 0;
          },
        },
      });
    }
  }

  var docDefinition = {
    info: {
      title: "Turmas - Cursos",
    },
    content: tables,
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: new Date(Date.now()).toLocaleString(),
            margin: [30, 10, 0, 0],
            fontSize: 8,
            alignment: `left`,
          },
          {
            text: currentPage.toString() + " de " + pageCount,
            alignment: "right",
            margin: [0, 10, 30, 0],
            fontSize: 8,
          },
        ],
      };
    },
  };
  pdfMake.createPdf(docDefinition).open();
}

export { pdfDisciplinasTurmas, pdfHorariosLabs, pdfCargaProfessores, pdfTurmasCursos };

//Funções auxiliares
function semestreEstaAtivo(periodos, semestreToCheck) {
  return some(periodos, (periodo) => {
    if (semestreToCheck === 1) return periodo.id === 1 || periodo.id === 2;
    else if (semestreToCheck === 2) return periodo.id === 3 || periodo.id === 4;
    else return false;
  });
}

function checkTurmaLab(turma) {
  let result = 0;
  store.getters.Laboratorios.forEach((lab) => {
    if (lab.id === turma.Sala1) result += 1;
    if (lab.id === turma.Sala2) result += 2;
  });

  if (result === 1) {
    if (isNull(turma.Sala2)) {
      return 4;
    }
  }
  return result;
}

function checkTurmaHorarioLabs(turma, horario, lab) {
  if (turma.Horario1 == horario || turma.Horario2 == horario) {
    let sala = checkTurmaLab(turma);
    switch (sala) {
      case 0:
        return false;
        break;
      case 1:
        if (turma.Horario1 == horario) return true;
        else return false;
        break;
      case 2:
        if (turma.Horario2 == horario) return true;
        else return false;
        break;
      case 3:
        if (turma.Sala1 === lab) {
          if (turma.Horario1 == horario) return true;
        } else if (turma.Sala2 === lab) {
          if (turma.Horario2 == horario) return true;
        }
        return false;
      case 4:
        return true;
        break;
    }
    return true;
  } else return false;
}

function getTurmasDoDocente(docente) {
  const turmasFiltered = filter(
    store.state.turma.Turmas,
    (turma) => turma.Docente1 === docente.id || turma.Docente2 === docente.id
  );

  return orderBy(turmasFiltered, ["periodo", "Disciplina", "letra"]);
}

function getTurmasSemAlocacao() {
  return orderBy(
    filter(store.state.turma.Turmas, (turma) => {
      return turma.Docente1 == null && turma.Docente2 == null && turma.Disciplina != null;
    }),
    ["periodo", "Disciplina", "letra"]
  );
}

function getCargaPosDoDocente(professor) {
  const cargaposFiltered = filter(
    store.state.cargaPos.Cargas,
    (turma) => turma.Docente === professor.id
  );

  return orderBy(cargaposFiltered, "trimestre");
}

function creditos1(professor) {
  var c = 0;
  for (var t = 0; t < store.state.turma.Turmas.length; t++) {
    if (
      store.state.turma.Turmas[t].periodo === 1 &&
      (store.state.turma.Turmas[t].Docente1 === professor.id ||
        store.state.turma.Turmas[t].Docente2 === professor.id)
    ) {
      for (var d = 0; d < store.state.disciplina.Disciplinas.length; d++) {
        if (
          store.state.disciplina.Disciplinas[d].id ===
          store.state.turma.Turmas[t].Disciplina
        ) {
          if (
            store.state.turma.Turmas[t].Docente1 > 0 &&
            store.state.turma.Turmas[t].Docente2 > 0
          ) {
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica) / 2;
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica) / 2;
          } else {
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica);
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica);
          }
        }
      }
    }
  }
  for (var t = 0; t < store.state.cargaPos.Cargas.length; t++) {
    if (store.state.cargaPos.Cargas[t].Docente === professor.id) {
      if (
        store.state.cargaPos.Cargas[t].trimestre == 1 ||
        store.state.cargaPos.Cargas[t].trimestre == 2
      ) {
        c += parseFloat(store.state.cargaPos.Cargas[t].creditos);
      }
    }
  }
  return c;
}

function creditos2(professor) {
  var c = 0;
  for (var t = 0; t < store.state.turma.Turmas.length; t++) {
    if (
      store.state.turma.Turmas[t].periodo === 3 &&
      (store.state.turma.Turmas[t].Docente1 === professor.id ||
        store.state.turma.Turmas[t].Docente2 === professor.id)
    ) {
      for (var d = 0; d < store.state.disciplina.Disciplinas.length; d++) {
        if (
          store.state.disciplina.Disciplinas[d].id ===
          store.state.turma.Turmas[t].Disciplina
        ) {
          if (
            store.state.turma.Turmas[t].Docente1 > 0 &&
            store.state.turma.Turmas[t].Docente2 > 0
          ) {
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica) / 2;
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica) / 2;
          } else {
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica);
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica);
          }
        }
      }
    }
  }
  for (var t = 0; t < store.state.cargaPos.Cargas.length; t++) {
    if (store.state.cargaPos.Cargas[t].Docente === professor.id) {
      if (store.state.cargaPos.Cargas[t].trimestre == 3) {
        c += parseFloat(store.state.cargaPos.Cargas[t].creditos);
      }
    }
  }
  return c;
}

function docentesRelatorioDisciplina(turma) {
  let d1 = find(store.state.docente.Docentes, { id: turma.Docente1 });
  let d2 = find(store.state.docente.Docentes, { id: turma.Docente2 });
  if (d1 === undefined && d2 === undefined) {
    return "";
  } else if (d2 === undefined) {
    return `${d1.nome}`;
  } else if (d1 === undefined) {
    return `${d2.nome}`;
  } else {
    return `${d1.nome} \n ${d2.nome}`;
  }
}

function vagasTurma(turma, semestre) {
  if (
    (semestre === 1 && (turma.periodo == 3 || turma.periodo == 4)) ||
    (semestre === 2 && (turma.periodo == 1 || turma.periodo == 2))
  )
    return 0;
  let pedidos = store.state.pedido.Pedidos[turma.id];
  let vagasP = 0;
  let vagasNP = 0;
  pedidos.forEach((p) => {
    vagasP += p.vagasPeriodizadas;
    vagasNP += p.vagasNaoPeriodizadas;
  });
  return vagasP + vagasNP;
}

function horasAula(disciplina) {
  return (parseInt(disciplina.cargaPratica) + parseInt(disciplina.cargaTeorica)) * 15;
}

function perfilDisciplina(disciplina) {
  let perfil = find(store.state.perfil.Perfis, { id: disciplina.Perfil });
  return perfil.abreviacao;
}

function curso(pedido) {
  return find(store.state.curso.Cursos, { id: pedido.Curso });
}

function getPedidosDaTurma(turma) {
  const pedidosFiltered = filter(
    store.state.pedido.Pedidos[turma.id],
    (pedido) => pedido.vagasPeriodizadas > 0 || pedido.vagasNaoPeriodizadas > 0
  );
  return sortBy(pedidosFiltered, (pedido) => curso(pedido).codigo);
}

function getTurmasDoCurso(cursoId) {
  const turmas = [];
  store.getters.TurmasInDisciplinasPerfis.forEach((turma) => {
    const pedido = find(store.getters.Pedidos[turma.id], ["Curso", cursoId]);

    if (pedido.vagasPeriodizadas > 0 || pedido.vagasNaoPeriodizadas > 0) {
      turmas.push({ turma: turma, pedido: pedido });
    }
  });

  return orderBy(
    orderBy(
      orderBy(turmas, (t) => {
        return t.turma.letra;
      }),
      (t) => {
        return t.turma.disciplina.codigo;
      }
    ),
    (t) => {
      return t.turma.periodo;
    }
  );
}
