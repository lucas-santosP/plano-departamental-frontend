// store.js
export const HTTP_REQUEST_INCREMENT = "HTTP_REQUEST_INCREMENT";
export const HTTP_REQUEST_DECREMENT = "HTTP_REQUEST_DECREMENT";

// auth.js
export const AUTHENTICATE = "AUTHENTICATE";
export const USER_FETCHED = "USER_FETCHED";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

// perfil.js
export const PERFIL_FETCHED = "PERFIL_FETCHED";
export const SOCKET_PERFIL_UPDATED = "SOCKET_PERFIL_UPDATED";
export const SOCKET_PERFIL_CREATED = "SOCKET_PERFIL_CREATED";
export const SOCKET_PERFIL_DELETED = "SOCKET_PERFIL_DELETED";

//curso.js
export const CURSO_FETCHED = "CURSO_FETCHED";
export const SOCKET_CURSO_UPDATED = "SOCKET_CURSO_UPDATED";
export const SOCKET_CURSO_CREATED = "SOCKET_CURSO_CREATED";
export const SOCKET_CURSO_DELETED = "SOCKET_CURSO_DELETED";
export const TOGGLE_CURSO_ATIVO = "TOGGLE_CURSO_ATIVO";
export const TOGGLE_ALL_CURSO_ATIVO_TRUE = "TOGGLE_ALL_CURSO_ATIVO_TRUE";
export const TOGGLE_ALL_CURSO_ATIVO_FALSE = "TOGGLE_ALL_CURSO_ATIVO_FALSE";

//disciplina.js
export const DISCIPLINA_FETCHED = "DISCIPLINA_FETCHED";
export const SOCKET_DISCIPLINA_UPDATED = "SOCKET_DISCIPLINA_UPDATED";
export const SOCKET_DISCIPLINA_CREATED = "SOCKET_DISCIPLINA_CREATED";
export const SOCKET_DISCIPLINA_DELETED = "SOCKET_DISCIPLINA_DELETED";

//pedido.js
export const PEDIDO_FETCHED = "PEDIDO_FETCHED";
export const SOCKET_PEDIDO_UPDATED = "SOCKET_PEDIDO_UPDATED";
export const SOCKET_PEDIDO_CREATED = "SOCKET_PEDIDO_CREATED";
export const SOCKET_PEDIDO_DELETED = "SOCKET_PEDIDO_DELETED";

//pedidoExterno.js
export const PEDIDO_EXTERNO_FETCHED = "PEDIDO_EXTERNO_FETCHED";
export const SOCKET_PEDIDO_EXTERNO_UPDATED = "SOCKET_PEDIDO_EXTERNO_UPDATED";
export const SOCKET_PEDIDO_EXTERNO_CREATED = "SOCKET_PEDIDO_EXTERNO_CREATED";
export const SOCKET_PEDIDO_EXTERNO_DELETED = "SOCKET_PEDIDO_EXTERNO_DELETED";

//pedidoOferecido.js
export const PEDIDO_OFERECIDO_FETCHED = "PEDIDO_OFERECIDO_FETCHED";
export const SOCKET_PEDIDO_OFERECIDO_UPDATED = "SOCKET_PEDIDO_OFERECIDO_UPDATED";
export const SOCKET_PEDIDO_OFERECIDO_CREATED = "SOCKET_PEDIDO_OFERECIDO_CREATED";
export const SOCKET_PEDIDO_OFERECIDO_DELETED = "SOCKET_PEDIDO_OFERECIDO_DELETED";

//grade.js
export const GRADE_FETCHED = "GRADE_FETCHED";
export const SOCKET_GRADE_UPDATED = "SOCKET_GRADE_UPDATED";
export const SOCKET_GRADE_CREATED = "SOCKET_GRADE_CREATED";
export const SOCKET_GRADE_DELETED = "SOCKET_GRADE_DELETED";

//disciplinaGrade.js
export const DISCIPLINA_GRADE_FETCHED = "DISCIPLINA_GRADE_FETCHED";
export const SOCKET_DISCIPLINA_GRADE_UPDATED = "SOCKET_DISCIPLINA_GRADE_UPDATED";
export const SOCKET_DISCIPLINA_GRADE_CREATED = "SOCKET_DISCIPLINA_GRADE_CREATED";
export const SOCKET_DISCIPLINA_GRADE_DELETED = "SOCKET_DISCIPLINA_GRADE_DELETED";

//docente.js
export const DOCENTE_FETCHED = "DOCENTE_FETCHED";
export const SOCKET_DOCENTE_UPDATED = "SOCKET_DOCENTE_UPDATED";
export const SOCKET_DOCENTE_CREATED = "SOCKET_DOCENTE_CREATED";
export const SOCKET_DOCENTE_DELETED = "SOCKET_DOCENTE_DELETED";

//docentePerfil.js
export const DOCENTE_PERFIL_FETCHED = "DOCENTE_PERFIL_FETCHED";
export const SOCKET_DOCENTE_PERFIL_UPDATED = "SOCKET_DOCENTE_PERFIL_UPDATED";
export const SOCKET_DOCENTE_PERFIL_CREATED = "SOCKET_DOCENTE_PERFIL_CREATED";
export const SOCKET_DOCENTE_PERFIL_DELETED = "SOCKET_DOCENTE_PERFIL_DELETED";

//turma.js
export const TURMA_FETCHED = "TURMA_FETCHED";
export const SOCKET_TURMA_UPDATED = "SOCKET_TURMA_UPDATED";
export const SOCKET_TURMA_CREATED = "SOCKET_TURMA_CREATED";
export const SOCKET_TURMA_DELETED = "SOCKET_TURMA_DELETED";
export const redefinirAtivas = "redefinirAtivas";
export const EMPTY_DELETE_TURMA = "EMPTY_DELETE_TURMA";
export const TOGGLE_TURMA_TO_DELETE = "TOGGLE_TURMA_TO_DELETE";

//turmaExterna.js
export const TURMA_EXTERNA_FETCHED = "TURMA_EXTERNA_FETCHED";
export const SOCKET_TURMA_EXTERNA_UPDATED = "SOCKET_TURMA_EXTERNA_UPDATED";
export const SOCKET_TURMA_EXTERNA_CREATED = "SOCKET_TURMA_EXTERNA_CREATED";
export const SOCKET_TURMA_EXTERNA_DELETED = "SOCKET_TURMA_EXTERNA_DELETED";
export const redefinirExternaAtivas = "redefinirExternaAtivas";
export const TOGGLE_TURMA_EXTERNA_TO_DELETE = "TOGGLE_TURMA_EXTERNA_TO_DELETE";
export const EMPTY_DELETE_TURMA_EXTERNA = "EMPTY_DELETE_TURMA_EXTERNA";

//cargaPos.js
export const CARGA_POS_FETCHED = "CARGA_POS_FETCHED";
export const SOCKET_CARGA_POS_UPDATED = "SOCKET_CARGA_POS_UPDATED";
export const SOCKET_CARGA_POS_CREATED = "SOCKET_CARGA_POS_CREATED";
export const SOCKET_CARGA_POS_DELETED = "SOCKET_CARGA_POS_DELETED";
export const EMPTY_DELETE_CARGA_POS = "EMPTY_DELETE_CARGA_POS";
export const TOGGLE_CARGA_POS_TO_DELETE = "TOGGLE_CARGA_POS_TO_DELETE";

//sala.js
export const SALA_FETCHED = "SALA_FETCHED";
export const SOCKET_SALA_UPDATED = "SOCKET_SALA_UPDATED";
export const SOCKET_SALA_CREATED = "SOCKET_SALA_CREATED";
export const SOCKET_SALA_DELETED = "SOCKET_SALA_DELETED";

//horario.js
export const HORARIO_FETCHED = "HORARIO_FETCHED";
export const SOCKET_HORARIO_UPDATED = "SOCKET_HORARIO_UPDATED";
export const SOCKET_HORARIO_CREATED = "SOCKET_HORARIO_CREATED";
export const SOCKET_HORARIO_DELETED = "SOCKET_HORARIO_DELETED";

//vaga.js
export const VAGA_FETCHED = "VAGA_FETCHED";
export const SOCKET_VAGA_UPDATED = "SOCKET_VAGA_UPDATED";
export const SOCKET_VAGA_CREATED = "SOCKET_VAGA_CREATED";
export const SOCKET_VAGA_DELETED = "SOCKET_VAGA_DELETED";

//plano.js
export const PLANO_FETCHED = "PLANO_FETCHED";
export const SOCKET_PLANO_CREATED = "SOCKET_PLANO_CREATED";
export const SOCKET_PLANO_UPDATED = "SOCKET_PLANO_UPDATED";
export const SOCKET_PLANO_DELETED = "SOCKET_PLANO_DELETED";
export const SET_CURRENT_PLANO_ID = "SET_CURRENT_PLANO_ID";

//vaga.js
export const DOCENTE_DISCIPLINA_FETCHED = "DOCENTE_DISCIPLINA_FETCHED";
export const SOCKET_DOCENTE_DISCIPLINA_UPDATED = "SOCKET_DOCENTE_DISCIPLINA_UPDATED";
export const SOCKET_DOCENTE_DISCIPLINA_CREATED = "SOCKET_DOCENTE_DISCIPLINA_CREATED";
export const SOCKET_DOCENTE_DISCIPLINA_DELETED = "SOCKET_DOCENTE_DISCIPLINA_DELETED";

//history.js
export const HISTORY_FETCHED = "HISTORY_FETCHED";
export const SOCKET_HISTORY_CREATED = "SOCKET_HISTORY_CREATED";

// usuario.js
export const USUARIO_FETCHED = "USUARIO_FETCHED";
export const SOCKET_USUARIO_UPDATED = "SOCKET_USUARIO_UPDATED";
export const SOCKET_USUARIO_CREATED = "SOCKET_USUARIO_CREATED";
export const SOCKET_USUARIO_DELETED = "SOCKET_USUARIO_DELETED";

//modals.js
export const SHOW_MODAL_OVERLAY = "SHOW_MODAL_OVERLAY";
export const HIDE_MODAL_OVERLAY = "HIDE_MODAL_OVERLAY";
export const TOGGLE_MODAL_AJUDA = "TOGGLE_MODAL_AJUDA";
export const SET_MODAL_OVERLAY_VISIBILITY = "SET_MODAL_OVERLAY_VISIBILITY";

//sidebar.js
export const SET_SIDEBAR_VISIBILITY = "SET_SIDEBAR_VISIBILITY";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

//loadingView.js
export const SET_LOADING = "SET_LOADING";

//notification.js
export const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
