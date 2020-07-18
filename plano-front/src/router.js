import Vue from "vue";
import VueRouter from "vue-router";
import store from "./vuex/store";

// Dashboard
import Login from "@/pages/dashboard/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import DashboardHome from "@/pages/dashboard/Home";
// Plano
import PlanoTurmasDCC from "@/pages/plano/TurmasDCC";
import PlanoTurmasExternas from "@/pages/plano/TurmasExternas";
import PlanoCargaPos from "@/pages/plano/CargaPos";
import PlanoValidacoes from "@/pages/plano/validacoesRename";
// Relatorios
import RelatoriosCargaProfessores from "@/pages/relatorios/CargaProfessores";
import RelatoriosGradeDisciplinas from "@/pages/relatorios/GradeDisciplinas";
import RelatoriosHorarios from "@/pages/relatorios/HorariosCursos";
import RelatoriosHorariosLabs from "@/pages/relatorios/HorariosLabs";
import RelatoriosPlanoDepartamental from "@/pages/relatorios/PlanoDepartamental";
// Gerenciar
import GerenciarCursos from "@/pages/gerenciar/Cursos";
import GerenciarDocentes from "@/pages/gerenciar/Docentes";
import GerenciarGradesEdit from "@/pages/gerenciar/GradesEdit";
import GerenciarGrades from "@/pages/gerenciar/Grades";
import GerenciarPerfis from "@/pages/gerenciar/Perfis";
import GerenciarDisciplinas from "@/pages/gerenciar/Disciplinas";
import GerenciarSalas from "@/pages/gerenciar/Salas";
import GerenciarHistory from "@/pages/gerenciar/History";
import GerenciarUsuarios from "@/pages/gerenciar/Usuarios";
import GerenciarPlanos from "@/pages/gerenciar/Planos";

import { USER_LOGGED_OUT } from "./vuex/mutation-types";
Vue.use(VueRouter);

function requireAuth(to, from, next) {
  store
    .dispatch("fetchUsuario")
    .then(() => {
      next();
    })
    .catch(() => {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    });
}

function requireAdmin(to, from, next) {
  if (!store.getters.Admin) next("/");
  else next();
}

const routes = [
  { path: "/", name: "home", redirect: "/dashboard", beforeEnter: requireAuth },
  { path: "/login", name: "login", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: requireAuth,
    children: [
      { path: "", name: "dashboardHome", component: DashboardHome },

      //plano
      {
        path: "plano/turmasDcc",
        name: "turmasDcc",
        component: PlanoTurmasDCC,
        beforeEnter: requireAdmin,
      },
      {
        path: "plano/turmasExternas",
        name: "turmasExternas",
        component: PlanoTurmasExternas,
        beforeEnter: requireAdmin,
      },
      {
        path: "plano/cargaPos",
        name: "cargaPos",
        component: PlanoCargaPos,
        beforeEnter: requireAdmin,
      },
      {
        path: "plano/validacoes",
        name: "validacoes",
        component: PlanoValidacoes,
        beforeEnter: requireAdmin,
      },

      //relatorios
      {
        path: "relatorios/cargaProfessores",
        name: "cargaProfessores",
        component: RelatoriosCargaProfessores,
      },
      {
        path: "relatorios/gradeDisciplinas",
        name: "gradeDisciplinas",
        component: RelatoriosGradeDisciplinas,
      },
      {
        path: "relatorios/horariosCursos",
        name: "horariosCursos",
        component: RelatoriosHorarios,
      },
      {
        path: "relatorios/horariosLaboratorios",
        name: "horariosLaboratorios",
        component: RelatoriosHorariosLabs,
      },
      {
        path: "relatorios/relatorioDisciplinas",
        name: "relatorioDisciplinas",
        component: RelatoriosPlanoDepartamental,
      },

      //gerenciar
      {
        path: "gerenciar/cursos",
        name: "cursos",
        component: GerenciarCursos,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/disciplinas",
        name: "disciplinas",
        component: GerenciarDisciplinas,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/docentes",
        name: "docentes",
        component: GerenciarDocentes,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/grades",
        name: "grades",
        component: GerenciarGrades,
        beforeEnter: requireAdmin,
      },

      {
        path: "gerenciar/perfis",
        name: "perfis",
        component: GerenciarPerfis,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/gradesEdit",
        name: "gradesEdit",
        component: GerenciarGradesEdit,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/history",
        name: "history",
        component: GerenciarHistory,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/planos",
        name: "planos",
        component: GerenciarPlanos,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/salas",
        name: "salas",
        component: GerenciarSalas,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/usuarios",
        name: "usuarios",
        component: GerenciarUsuarios,
        beforeEnter: requireAdmin,
      },
    ],
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: function(to, from, next) {
      store.commit(USER_LOGGED_OUT);
      next("/login");
    },
  },
  { path: "/*", redirect: "/" },
];

const router = new VueRouter({
  routes,
  mode: "history",
  linkExactActiveClass: "active",
  saveScrollPosition: true,
});

router.beforeEach((to, from, next) => {
  store.commit("SHOW_LOADING_VIEW");
  next();
});

router.afterEach(() => {
  setTimeout(() => store.commit("HIDE_LOADING_VIEW"), 500);
});

export default router;
