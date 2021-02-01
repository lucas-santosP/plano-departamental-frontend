import { getKeysTurmaSIGA } from "./index";

export default function validateTurmasSIGA(turmasSIGA) {
  if (!turmasSIGA.length) return;

  const keysTurmaSIGA = getKeysTurmaSIGA(turmasSIGA);
  if (Object.keys(turmasSIGA[0]).length < Object.keys(keysTurmaSIGA).length) {
    throw new Error("Verifique a integridade e o formato do(s) arquivo(s)");
  }
}
