<template>
  <div class="sticky top-0 z-50">
    <nav
      class="bg-[#032B5F] border-gray-200 dark:bg-gray-900 dark:border-gray-700 animate-fade animate-once animate-duration-[1200ms] animate-ease-in">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href=" " class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../assets/733.jpg" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">Content
            Management System</span>
        </a>
        <button data-collapse-toggle="navbar-dropdown" type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#032B5F] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#032B5F] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <router-link :to="{ name: 'view-home' }"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
                aria-current="page">Home</router-link>
            </li>
            <li>
              <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
                class="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:bg-[#3889CC] md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-[#3889CC] md:dark:hover:bg-transparent">
                Document Upload
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <!-- Dropdown menu -->
              <div id="dropdownNavbar"
                class="z-10 hidden font-normal bg-[#032B5F] divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-[#032B5F] dark:divide-gray-600">
                <ul class="py-2 text-sm text-white dark:text-white" aria-labelledby="dropdownLargeButton">
                  <li>
                    <router-link :to="{ name: 'action-home' }"
                      class="block px-4 py-2 hover:bg-[#3889CC] dark:hover:bg-[#3889CC] dark:hover:text-white">Action
                      Plan</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'performance-home' }"
                      class="block px-4 py-2 hover:bg-[#3889CC] dark:hover:bg-[#3889CC] dark:hover:text-white">Performance
                      Report</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'hardware-specification' }"
                      class="block px-4 py-2 hover:bg-[#3889CC] dark:hover:bg-[#3889CC] dark:hover:text-white">Hardware Specification
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <router-link :to="{ name: 'event-home' }"
                class="block py-2 px-3 text-white rounded hover:bg-[#3889CC] md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-[#3889CC] dark:hover:text-white md:dark:hover:bg-transparent">Events</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'news-home' }"
                class="block py-2 px-3 text-white rounded hover:bg-[#3889CC] md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-[#3889CC] dark:hover:text-white md:dark:hover:bg-transparent">News</router-link>
            </li>
            <li>
              <button @click="logout" class="bg-red-700 hover:bg-red-800 text-white py-1 px-1 rounded">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useAuthStore } from "../Stores/authStore";

export default {
  setup() {
    const authStore = useAuthStore();

    const logout = () => {
      if (confirm("Are you sure you want to logout?")) {
        authStore.logout();
        window.location.href = "/login";
      }
    };
    return { logout };
  },
};
</script>
