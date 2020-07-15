import Vue from "vue";
import VueRouter from "vue-router";
import store from "./vuex/store";

// Dashboard
import Login from "@/pages/dashboard/TheLogin";
import Dashboard from "@/pages/dashboard/TheDashboard";
import DashboardHome from "@/pages/home/Home";
// Plano
import DashboardTurmasDCC from "@/pages/plano/turmas-dcc/TurmasDCC";
import DashboardTurmasExternas from "@/pages/plano/turmas-externas/TurmasExternas";
import DashboardCargaPos from "@/pages/plano/turmas-pos/CargaPos";
import DashboardValidacoes from "@/pages/plano/validacoes/Validacoes";
// Relatorios
import DashboardCargaProfessores from "@/pages/relatorios/CargaProfessores";
import DashboardGradeDisciplinas from "@/pages/relatorios/GradeDisciplinas";
import DashboardHorarios from "@/pages/relatorios/horarios-cursos/Horarios";
import DashboardHorariosLaboratorios from "@/pages/relatorios/horarios-labs/HorariosLabs";
import DashboardRelatorioDisciplinas from "@/pages/relatorios/RelatorioDisciplinas";
// Gerenciar
import DashboardCursos from "@/pages/gerenciar/Cursos";
import DashboardDocentes from "@/pages/gerenciar/Docentes";
import DashboardGradesEdit from "@/pages/gerenciar/GradesEdit";
import DashboardGrades from "@/pages/gerenciar/Grades";
import DashboardPerfis from "@/pages/gerenciar/Perfis";
import DashboardDisciplinas from "@/pages/gerenciar/Disciplinas";
import DashboardSalas from "@/pages/gerenciar/Salas";
import DashboardHistory from "@/pages/gerenciar/History";
import DashboardUsuarios from "@/pages/gerenciar/Usuarios";
import DashboardPlanos from "@/pages/gerenciar/planos/Planos";

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
        component: DashboardTurmasDCC,
        beforeEnter: requireAdmin,
      },
      {
        path: "plano/turmasExternas",
        name: "turmasExternas",
        component: DashboardTurmasExternas,
        beforeEnter: requireAdmin,
      },
      {
        path: "plano/cargaPos",
        name: "cargaPos",
        component: DashboardCargaPos,
        beforeEnter: requireAdmin,
      },
      {
        path: "plano/validacoes",
        name: "validacoes",
        component: DashboardValidacoes,
        beforeEnter: requireAdmin,
      },

      //relatorios
      {
        path: "relatorios/cargaProfessores",
        name: "cargaProfessores",
        component: DashboardCargaProfessores,
      },
      {
        path: "relatorios/gradeDisciplinas",
        name: "gradeDisciplinas",
        component: DashboardGradeDisciplinas,
      },
      {
        path: "relatorios/horariosCursos",
        name: "horariosCursos",
        component: DashboardHorarios,
      },
      {
        path: "relatorios/horariosLaboratorios",
        name: "horariosLaboratorios",
        component: DashboardHorariosLaboratorios,
      },
      {
        path: "relatorios/relatorioDisciplinas",
        name: "relatorioDisciplinas",
        component: DashboardRelatorioDisciplinas,
      },

      //gerenciar
      {
        path: "gerenciar/cursos",
        name: "cursos",
        component: DashboardCursos,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/disciplinas",
        name: "disciplinas",
        component: DashboardDisciplinas,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/docentes",
        name: "docentes",
        component: DashboardDocentes,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/grades",
        name: "grades",
        component: DashboardGrades,
        beforeEnter: requireAdmin,
      },

      {
        path: "gerenciar/perfis",
        name: "perfis",
        component: DashboardPerfis,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/gradesEdit",
        name: "gradesEdit",
        component: DashboardGradesEdit,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/history",
        name: "history",
        component: DashboardHistory,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/planos",
        name: "planos",
        component: DashboardPlanos,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/salas",
        name: "salas",
        component: DashboardSalas,
        beforeEnter: requireAdmin,
      },
      {
        path: "gerenciar/usuarios",
        name: "usuarios",
        component: DashboardUsuarios,
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
  //Adicionar loading apenas nas paginas que necessitam
  store.commit("SHOW_LOADING_VIEW");
  next();
});

router.afterEach(() => {
  setTimeout(() => store.commit("HIDE_LOADING_VIEW"), 500);
});

export default router;
