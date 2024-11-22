<template>
  <div class="flex h-screen">
    <div
      class="bg-login-wallpaper bg-cover sm:hidden md:flex md:w-1/2 animate-fade animate-once animate-duration-[1200ms] animate-ease-in"
    ></div>
    <div class="flex bg-green-300 sm:w-screen md:w-1/2">
      <div
        class="bg-[#F1F1F1] sm:w-1/4 md:hidden lg:flex lg:w-1/4 xl:w-1/3"
      ></div>
      <div class="flex flex-col bg-[#F1F1F1] sm:w-1/2 md:w-full lg:w-1/2">
        <div class="bg-[#F1F1F1] h-1/3"></div>
        <div
          class="bg-[#FFFFFF] h-auto animate-fade animate-once animate-duration-[1200ms] animate-ease-in"
        >
          <div class="p-2.5">
            <form @submit.prevent="login">
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-[#6F6F6F] dark:text-[#6F6F6F]"
                  >Username</label
                >
                <input
                  v-model="credentials.username"
                  placeholder="Username"
                  type="text"
                  id="username"
                  name="username"
                  autocomplete="username"
                  required
                  class="block w-full p-2 text-[#6F6F6F] border border-[#0087BA] rounded-lg bg-[#FBFBFB] text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-[#FBFBFB] dark:border-[#0087BA] dark:placeholder-gray-400 dark:text-[#6F6F6F] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <br />
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-[#6F6F6F] dark:text-[#6F6F6F]"
                  >Password</label
                >
                <input
                  v-model="credentials.password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  name="password"
                  autocomplete="current-password"
                  required
                  class="block w-full p-2 text-[#6F6F6F] border border-[#0087BA] rounded-lg bg-[#FBFBFB] text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-[#FBFBFB] dark:border-[#0087BA] dark:placeholder-gray-400 dark:text-[#6F6F6F] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <br />
              <div v-if="status === 'error'" class="error bg-[#FFFFFF] text-red-600">Login failed. Please try again.</div>
              <br>
              <button
                type="submit"
                class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div class="bg-[#F1F1F1] h-1/3"></div>
      </div>
      <div class="bg-[#F1F1F1] sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/3"></div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../Stores/authStore";
import { computed } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const credentials = { username: "", password: "" };
    const status = computed( () => authStore.status);

    const login = async () => {
      try {
        await authStore.login(credentials);
        if (authStore.accessToken) {
          window.location.href = "/home/view";
        }
      } catch (error) {
        console.error("Login error: ", error);
      }
    };
    return { credentials, login, status };
  },
};
</script>
