import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../Stores/authStore";
import LoggingPage from "../components/Login.vue";
import HomePage from "../components/Home.vue";
import ActionPlan from "../components/ActionPlan.vue";
import PerformanceReport from "../components/PerformanceReport.vue";
import HomeView from "../components/HomeView.vue";
import Events from "../components/Events.vue";
import News from "../components/News.vue";
import HardwareSpecification from "../components/HardwareSpecification.vue";
import PageNotFound from "../components/PageNotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoggingPage,
      meta: {
        title: "Login|CMS",
      },
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/home",
      redirect: "/home/view",
    },
    {
      path: "/home",
      name: "homePage",
      component: HomePage,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "hardware_spec",
          name: "hardware-specification",
          component: HardwareSpecification,
          meta: {
            title: "Hardware Specification"
          },
        },
        {
          path: "view",
          name: "view-home",
          component: HomeView,
          meta: {
            title: "Home",
          },
        },
        {
          path: "action",
          name: "action-home",
          component: ActionPlan,
          meta: {
            title: "Action Plan",
          },
        },
        {
          path: "performance",
          name: "performance-home",
          component: PerformanceReport,
          meta: {
            title: "Performance Report",
          },
        },
        {
          path: "event",
          name: "event-home",
          component: Events,
          meta: {
            title: "Events",
          },
        },
        {
          path: "news",
          name: "news-home",
          component: News,
          meta: {
            title: "News",
          },
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: PageNotFound,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.accessToken) {
    next("/login");
  } else if (to.meta.requiresAuth && authStore.accessToken) {
    try {
      // await authStore.fetchUser();
      next();
    } catch (error) {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
