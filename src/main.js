import "./assets/main.css";
import "flowbite";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Login from "./components/Login.vue";
import NavigationBar from "./components/NavigationBar.vue";
import Footer from "./components/Footer.vue";
import axios from "./axiosInstance";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties.$axios = axios;
app.component("Logging", Login);
app.component("NavBar", NavigationBar);
app.component("Footer", Footer);

app.mount("#app");

router.afterEach((to) => {
  document.title = to.meta.title || "Web CMS";
});
