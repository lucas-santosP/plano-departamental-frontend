/* eslint-disable no-redeclare */
import store from "@/vuex/store";
import { isNull, filter, some } from "lodash-es";
import { imageToDataUrl } from "@/common/utils";
import urlLogoUfjf from "@/assets/images/logo-ufjf.png";
import urlLogoDcc from "@/assets/images/logo-dcc.png";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function pdfHorariosCursos({ horariosAtivos, cursosAtivos, periodosAtivos, plano }) {
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);
  const tables = [];
  const periodos = filter(periodosAtivos, (periodo) => periodo.id === 1 || periodo.id === 3); //Somente aceita periodo 1 e 3 por enquanto

  if (!cursosAtivos.length || !periodos.length) {
    tables.push(
      makePageHeader({ images: [logoDcc, logoUfjf], plano, title: "Horários dos cursos" })
    );
    tables.push(makeEmptyPageWarning());
  } else {
    periodos.forEach((periodo, index) => {
      tables.push(
        makePageHeader({
          images: [logoDcc, logoUfjf],
          plano,
          title: "Horários dos cursos",
          subtitle: `${periodo.id}º Período Letivo`,
        })
      );

      let cursosIndex = 0;
      let seg = "",
        ter = "",
        qua = "",
        qui = "",
        sex = "";

      //Ciencia compt Diurno
      if (some(cursosAtivos, ["codigo", "65C"])) {
        tables.push({
          text: "Ciência da Computação - Integral",
          bold: true,
          fontSize: 10,
        });
        const periodosCCD = horariosAtivos[`periodo${periodo.id}`].CCD;
        const indexInicial = periodo.id === 1 ? 0 : 1; //Determinado pelo periodo inicial da grade

        for (let i = indexInicial; i < 9; i += 2) {
          tables.push({
            text: i + 1 + "º Período",
            fontSize: 8,
            bold: true,
            margin: [0, 5, 0, 5],
          });
          const tableHorarios = [makeTableHorarioHeader()];

          for (let d = 0; d < 4; d++) {
            periodosCCD[i].forEach((turma) => {
              if (checkTurmaHorario(turma, 1 + d)) {
                if (seg !== "") seg = seg + "\n";
                seg = seg + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 7 + d)) {
                if (ter != "") ter = ter + "\n";
                ter = ter + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 13 + d)) {
                if (qua != "") qua = qua + "\n";
                qua = qua + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 19 + d)) {
                if (qui != "") qui = qui + "\n";
                qui = qui + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 25 + d)) {
                if (sex != "") sex = sex + "\n";
                sex = sex + turma.disciplina.codigo + " " + turma.letra;
              }
            });

            tableHorarios.push(makeTableHorariosBody(d, { seg, ter, qua, qui, sex }, "diurno"));
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorarios,
            },
          });
        }

        if (cursosIndex + 1 !== cursosAtivos.length || index + 1 !== periodos.length) {
          tables.push({ text: "", pageBreak: "after" });
        }
        cursosIndex++;
      }
      //Ciencia compt Noturno
      if (some(cursosAtivos, ["codigo", "35A"])) {
        tables.push({
          text: "Ciência da Computação - Noturno",
          bold: true,
          fontSize: 10,
        });
        const periodosCCN = horariosAtivos[`periodo${periodo.id}`].CCN;
        const indexInicial = periodo.id === 1 ? 1 : 0;

        for (let i = indexInicial; i < 9; i += 2) {
          tables.push({
            text: i + 1 + "º Período",
            fontSize: 8,
            bold: true,
            margin: [0, 5, 0, 5],
          });
          const tableHorarios = [makeTableHorarioHeader()];

          for (let d = 4; d < 6; d++) {
            periodosCCN[i].forEach((turma) => {
              if (checkTurmaHorario(turma, 1 + d)) {
                if (seg !== "") seg = seg + "\n";
                seg = seg + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 7 + d)) {
                if (ter != "") ter = ter + "\n";
                ter = ter + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 13 + d)) {
                if (qua != "") qua = qua + "\n";
                qua = qua + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 19 + d)) {
                if (qui != "") qui = qui + "\n";
                qui = qui + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 25 + d)) {
                if (sex != "") sex = sex + "\n";
                sex = sex + turma.disciplina.codigo + " " + turma.letra;
              }
            });

            tableHorarios.push(makeTableHorariosBody(d, { seg, ter, qua, qui, sex }, "noturno"));
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorarios,
            },
          });
        }

        if (cursosIndex + 1 !== cursosAtivos.length || index + 1 !== periodos.length) {
          tables.push({ text: "", pageBreak: "after" });
        }
        cursosIndex++;
      }
      //Sistemas de informacao
      if (some(cursosAtivos, ["codigo", "76A"])) {
        tables.push({
          text: "Sistemas de Informação",
          bold: true,
          fontSize: 10,
        });
        const periodosSI = horariosAtivos[`periodo${periodo.id}`].SI;
        const indexInicial = periodo.id === 1 ? 1 : 0;

        for (let i = indexInicial; i < 8; i += 2) {
          tables.push({
            text: i + 1 + "º Período",
            fontSize: 8,
            bold: true,
            margin: [0, 5, 0, 5],
          });
          let tableHorarios = [makeTableHorarioHeader()];

          for (let d = 4; d < 6; d++) {
            periodosSI[i].forEach((turma) => {
              if (checkTurmaHorario(turma, 1 + d)) {
                if (seg !== "") seg = seg + "\n";
                seg = seg + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 7 + d)) {
                if (ter != "") ter = ter + "\n";
                ter = ter + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 13 + d)) {
                if (qua != "") qua = qua + "\n";
                qua = qua + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 19 + d)) {
                if (qui != "") qui = qui + "\n";
                qui = qui + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 25 + d)) {
                if (sex != "") sex = sex + "\n";
                sex = sex + turma.disciplina.codigo + " " + turma.letra;
              }
            });

            tableHorarios.push(makeTableHorariosBody(d, { seg, ter, qua, qui, sex }, "noturno"));
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorarios,
            },
          });
        }

        if (cursosIndex + 1 !== cursosAtivos.length || index + 1 !== periodos.length) {
          tables.push({ text: "", pageBreak: "after" });
        }
        cursosIndex++;
      }
      //Engenharia compt
      if (some(cursosAtivos, ["codigo", "65B"])) {
        tables.push({
          text: "Engenharia Computacional",
          bold: true,
          fontSize: 10,
        });
        const periodosEC = horariosAtivos[`periodo${periodo.id}`].EC;
        const indexInicial = periodo.id === 1 ? 0 : 1;

        for (let i = indexInicial; i < 10; i += 2) {
          tables.push({
            text: i + 1 + "º Período",
            fontSize: 8,
            bold: true,
            margin: [0, 5, 0, 5],
          });
          let tableHorarios = [makeTableHorarioHeader()];

          for (let d = 0; d < 4; d++) {
            periodosEC[i].forEach((turma) => {
              if (checkTurmaHorario(turma, 1 + d)) {
                if (seg !== "") seg = seg + "\n";
                seg = seg + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 7 + d)) {
                if (ter != "") ter = ter + "\n";
                ter = ter + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 13 + d)) {
                if (qua != "") qua = qua + "\n";
                qua = qua + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 19 + d)) {
                if (qui != "") qui = qui + "\n";
                qui = qui + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 25 + d)) {
                if (sex != "") sex = sex + "\n";
                sex = sex + turma.disciplina.codigo + " " + turma.letra;
              }
            });

            tableHorarios.push(makeTableHorariosBody(d, { seg, ter, qua, qui, sex }, "diurno"));
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorarios,
            },
          });
        }

        if (cursosIndex + 1 !== cursosAtivos.length || index + 1 !== periodos.length) {
          tables.push({ text: "", pageBreak: "after" });
        }
        cursosIndex++;
      }
      //Eletivas
      if (some(cursosAtivos, ["codigo", "-"])) {
        tables.push({
          text: "Eletivas",
          bold: true,
          fontSize: 10,
        });
        const turmasEletivas = horariosAtivos[`periodo${periodo.id}`].Eletivas;

        if (turmasEletivas.length) {
          let tableHorarios = [makeTableHorarioHeader()];

          for (let d = 0; d < 8; d++) {
            const horarioSeg = (d === 4 || d === 5 ? 28 : 1) + (d > 5 ? d - 2 : d);
            const horarioTer = (d === 4 || d === 5 ? 30 : 7) + (d > 5 ? d - 2 : d);
            const horarioQua = (d === 4 || d === 5 ? 32 : 13) + (d > 5 ? d - 2 : d);
            const horarioQui = (d === 4 || d === 5 ? 34 : 19) + (d > 5 ? d - 2 : d);
            const horarioSex = (d === 4 || d === 5 ? 36 : 25) + (d > 5 ? d - 2 : d);

            turmasEletivas.forEach((turma) => {
              if (checkTurmaHorario(turma, horarioSeg)) {
                if (seg !== "") seg = seg + "\n";
                seg = seg + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, horarioTer)) {
                if (ter != "") ter = ter + "\n";
                ter = ter + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, horarioQua)) {
                if (qua != "") qua = qua + "\n";
                qua = qua + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, horarioQui)) {
                if (qui != "") qui = qui + "\n";
                qui = qui + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, horarioSex)) {
                if (sex != "") sex = sex + "\n";
                sex = sex + turma.disciplina.codigo + " " + turma.letra;
              }
            });

            tableHorarios.push(makeTableHorariosBody(d, { seg, ter, qua, qui, sex }, "eletiva"));
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorarios,
            },
          });
        }

        if (cursosIndex + 1 !== cursosAtivos.length || index + 1 !== periodos.length) {
          tables.push({ text: "", pageBreak: "after" });
        }
        cursosIndex++;
      }
    });
  }

  const docDefinition = {
    content: tables,
    info: {
      title: "Horários - Cursos",
    },
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: new Date(Date.now()).toLocaleString(),
            margin: [30, 10, 0, 0],
            fontSize: 8,
            alignment: "left",
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

async function pdfHorariosLabs({ laboratorios, turmas, periodosAtivos, plano }) {
  const tables = [];
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);

  if (!laboratorios.length || !periodosAtivos.length) {
    tables.push(
      makePageHeader({
        images: [logoDcc, logoUfjf],
        plano,
        title: "Relação de horários das turmas em laboratórios",
      })
    );
    tables.push(makeEmptyPageWarning());
  } else {
    periodosAtivos.forEach((periodo, index) => {
      let periodoNome = "";
      if (periodo.id === 2 || periodo.id === 4) {
        periodoNome = periodo.nome.includes("(") ? " " + periodo.nome.split(" ")[1] : ""; //Pega texto entre parênteses
      }
      tables.push(
        makePageHeader({
          images: [logoDcc, logoUfjf],
          plano,
          title: "Relação de horários das turmas em laboratórios",
          subtitle: `${periodo.id}º Período Letivo${periodoNome}`,
        })
      );

      const turmasDoPeriodo = filter(turmas, ["periodo", periodo.id]);
      if (!turmasDoPeriodo.length) {
        tables.push(makeEmptyPageWarning());
      } else {
        let numeroDeTabelas = 0;

        laboratorios.forEach((laboratorio) => {
          //Verifica quando possuir 4 tabelas na mesma pagina adiciona pageBreak antes da quinta tabela
          if (numeroDeTabelas % 4 === 0 && numeroDeTabelas !== 0) {
            tables.push({ text: "", pageBreak: "before" });
          }

          tables.push({
            text: laboratorio.nome,
            bold: true,
            margin: [0, 10],
            fontSize: 9,
          });
          const tableLabsBody = [
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
          const turmasDoLaboratorio = getTurmasDaSala(turmasDoPeriodo, laboratorio.id);

          for (let d = 0; d < 8; d++) {
            let seg = "",
              ter = "",
              qua = "",
              qui = "",
              sex = "";
            turmasDoLaboratorio.forEach((turma) => {
              if (d < 4) {
                if (checkTurmaHorarioLabs(turma, 1 + d, laboratorio.id)) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 7 + d, laboratorio.id)) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 13 + d, laboratorio.id)) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 19 + d, laboratorio.id)) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 25 + d, laboratorio.id)) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + turma.disciplina.codigo + " " + turma.letra;
                }
              } else if (d === 4 || d === 5) {
                if (checkTurmaHorarioLabs(turma, 28 + d, laboratorio.id)) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 30 + d, laboratorio.id)) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 32 + d, laboratorio.id)) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 34 + d, laboratorio.id)) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 36 + d, laboratorio.id)) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + turma.disciplina.codigo + " " + turma.letra;
                }
              } else if (d > 5) {
                if (checkTurmaHorarioLabs(turma, d - 1)) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 5 + d, laboratorio.id)) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 11 + d, laboratorio.id)) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 17 + d, laboratorio.id)) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 23 + d, laboratorio.id)) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + turma.disciplina.codigo + " " + turma.letra;
                }
              }
            });

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
          }

          numeroDeTabelas++;
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableLabsBody,
            },
          });
        });
      }

      if (index + 1 != periodosAtivos.length) {
        tables.push({ text: "", pageBreak: "before" }); //page break;
      }
    });
  }

  const docDefinition = {
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
            alignment: "left",
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

export { pdfHorariosCursos, pdfHorariosLabs };

//Funções auxiliares
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
    case 1:
      if (turma.Horario1 == horario) return true;
      else return false;
    case 2:
      if (turma.Horario2 == horario) return true;
      else return false;
    case 3:
      if (turma.Sala1 === lab) {
        if (turma.Horario1 == horario) return true;
      } else if (turma.Sala2 === lab) {
        if (turma.Horario2 == horario) return true;
      }
      return false;
    case 4:
      return true;
    }
    return true;
  } else return false;
}

function checkTurmaHorario(turma, horario) {
  if (turma.Horario1 === horario || turma.Horario2 === horario) return true;
  else return false;
}

function getTurmasDaSala(turmas, salaId) {
  return filter(turmas, (turma) => turma.Sala1 === salaId || turma.Sala2 === salaId);
}

//Pdfmake aux
function makeTableHorarioHeader() {
  return [
    { text: "Horário", alignment: "center", fontSize: 8, bold: true },
    { text: "Segunda", alignment: "center", fontSize: 8, bold: true },
    { text: "Terça", alignment: "center", fontSize: 8, bold: true },
    { text: "Quarta", alignment: "center", fontSize: 8, bold: true },
    { text: "Quinta", alignment: "center", fontSize: 8, bold: true },
    { text: "Sexta", alignment: "center", fontSize: 8, bold: true },
  ];
}

function makeTableHorariosBody(d, dias, turno) {
  const body = [];
  //Horarios possiveis para Diurno
  if (turno === "diurno") {
    if (d === 0) body.push({ text: "08 - 10", alignment: "center", fontSize: 8 });
    else if (d === 1) body.push({ text: "10 - 12", alignment: "center", fontSize: 8 });
    else if (d === 2) body.push({ text: "14 - 16", alignment: "center", fontSize: 8 });
    else if (d === 3) body.push({ text: "16 - 18", alignment: "center", fontSize: 8 });
  }
  //Horarios possiveis para Noturno
  else if (turno === "noturno") {
    if (d === 4) body.push({ text: "19 - 21", alignment: "center", fontSize: 8 });
    else if (d === 5) body.push({ text: "21 - 23", alignment: "center", fontSize: 8 });
  }
  //Horarios possiveis para Eletivas
  else if (turno === "eletiva") {
    if (d === 0) body.push({ text: "08 - 10", alignment: "center", fontSize: 8 });
    else if (d === 1) body.push({ text: "10 - 12", alignment: "center", fontSize: 8 });
    else if (d === 2) body.push({ text: "14 - 16", alignment: "center", fontSize: 8 });
    else if (d === 3) body.push({ text: "16 - 18", alignment: "center", fontSize: 8 });
    else if (d === 4) body.push({ text: "17 - 19", alignment: "center", fontSize: 8 });
    else if (d === 5) body.push({ text: "18 - 20", alignment: "center", fontSize: 8 });
    else if (d === 6) body.push({ text: "19 - 21", alignment: "center", fontSize: 8 });
    else if (d === 7) body.push({ text: "21 - 23", alignment: "center", fontSize: 8 });
  }

  body.push(
    { text: dias.seg, alignment: "center", fontSize: 8 },
    { text: dias.ter, alignment: "center", fontSize: 8 },
    { text: dias.qua, alignment: "center", fontSize: 8 },
    { text: dias.qui, alignment: "center", fontSize: 8 },
    { text: dias.sex, alignment: "center", fontSize: 8 }
  );
  return body;
}

function makePageHeader({ images, plano, title, subtitle }) {
  return [
    {
      columns: [
        { image: images[0] || "", fit: [60, 60], alignment: "left", width: "16%" },
        [
          {
            text: "Departamento de Ciência da Computação",
            alignment: "center",
            bold: true,
            fontSize: 10,
          },
          { text: title, alignment: "center", bold: true, fontSize: 10 },
          {
            text: plano ? `Plano ${plano.ano} - ${plano.nome}` : "",
            alignment: "center",
            bold: true,
            fontSize: 10,
          },
        ],
        { image: images[1] || "", fit: [60, 60], alignment: "right", width: "16%" },
      ],
    },
    { text: "", margin: [0, 0, 0, 10] },
    { text: subtitle, alignment: "center", bold: true, fontSize: 10, margin: [0, 0, 0, 10] },
  ];
}

function makeEmptyPageWarning(text) {
  return {
    style: "tableExample",
    table: {
      widths: ["*"],
      headerRows: 1,
      color: "#426",
      body: [
        [
          {
            text: text ? text.toUpperCase() : "Nenhuma turma para ser exibida".toUpperCase(),
            alignment: "center",
            bold: true,
            fontSize: 9,
          },
        ],
      ],
    },
    layout: { vLineWidth: () => 0 },
  };
}
