<template>
  <div class="bg-[#00204A] p-3 h-full">
    <div class="flex flex-col bg-[#00204A]">
      <div class="bg-[#00204A] h-20 self-center">
        <div>
          <h1
            class="text-4xl text-white font-extrabold dark:text-white mt-4 animate-bounce animate-infinite animate-duration-[1500ms]"
          >
            News
          </h1>
        </div>
      </div>
      <div class="flex flex-row bg-[#00204A] mx-8">
        <div class="bg-[#00204A] w-1/2">
          <div
            class="bg-[#00204A] sm:w-2/3 md:w-1/2 text-lg text-white place-self-center"
          >
            <div
              class="animate-jump-in animate-once animate-duration-[1200ms] underline"
            >
              Upload New News
            </div>
          </div>
        </div>
        <div class="bg-[#00204A] w-1/2 px-8">
          <div
            class="bg-[#00204A] sm:w-2/3 md:w-1/2 text-lg text-white place-self-center"
          >
            <div
              class="animate-jump-in animate-once animate-duration-[1200ms] underline"
            >
              Update Existing News
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="flex flex-row">
        <div class="bg-[#00204A] w-1/2">
          <form
            @submit.prevent="addNews"
            class="max-w-sm mx-8 animate-fade-left animate-once animate-ease-linear"
          >
            <div>
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-white dark:text-white"
                >News Title</label
              >
              <textarea
                v-model="news.title"
                id="title"
                type="text"
                rows="2"
                maxlength="199"
                required
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Maximum charactors 200..."
              ></textarea>
            </div>
            <br />
            <div>
              <label
                for="content"
                class="block mb-2 text-sm font-medium text-white dark:text-white"
                >News Content</label
              >
              <textarea
                v-model="news.content"
                id="content"
                type="text"
                rows="4"
                maxlength="999"
                required
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Maximum charactors 1000..."
              ></textarea>
            </div>
            <br />
            <button
              type="submit"
              class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Upload
            </button>
          </form>
        </div>
        <div class="bg-[#00204A] w-1/2">
          <form
            @submit.prevent="editNews"
            class="animate-fade-left animate-once animate-ease-linear"
          >
            <div class="max-w-sm mx-8">
              <label
                for="newsId"
                class="block mb-2 text-sm font-medium text-white dark:text-white"
                >Select news Id</label
              >
              <select
                v-model="selectedNewsId"
                @change="getNews"
                id="newsId"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>Click to select Event</option>
                <option v-for="news in allNews" :key="news.id" :value="news.id">
                  {{ news.id }} - {{ news.title.slice(0, 40) }}...
                </option>
              </select>
            </div>
            <br />
            <div v-if="selectedNews" class="max-w-sm mx-8">
              <div>
                <label
                  for="editing_title"
                  class="block mb-2 text-sm font-medium text-white dark:text-white"
                  >News Title</label
                >
                <textarea
                  v-model="selectedNews.title"
                  id="editing_title"
                  type="text"
                  maxlength="199"
                  rows="2"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Maximum charactors 200..."
                ></textarea>
              </div>
              <br />
              <div>
                <label
                  for="editing_content"
                  class="block mb-2 text-sm font-medium text-white dark:text-white"
                  >News Content</label
                >
                <textarea
                  v-model="selectedNews.content"
                  id="editing_content"
                  type="text"
                  maxlength="999"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Maximum charactors 1000..."
                ></textarea>
              </div>
              <br />
              <button
                type="submit"
                class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="bg-[#00204A] h-16"></div>
      <div
        class="bg-[#00204A] h-12 text-lg text-white place-self-center animate-jump-in animate-once animate-duration-[1200ms]"
      >
        Existing News
      </div>
    </div>
    <div v-if="allNews.length > 0" class="grid gap-8 grid-cols-3 bg-[#00204A]">
      <div
        v-for="news in allNews"
        :key="news.id"
        class="animate-bounce animate-twice"
      >
        <div
          class="max-w-sm p-6 bg-blue-600 border border-gray-200 rounded-lg shadow dark:bg-blue-600 dark:border-gray-700"
        >
          <h1>
            <span v-if="news.status === 1">Current Status: Active</span>
            <span v-else-if="news.status === 0">Current Status: Inactive</span>
          </h1>
          <a href="#">
            <h5
              class="mb-2 text-lg font-bold tracking-tight text-white dark:text-white"
            >
              News ID: {{ news.id }} ({{
                news.createdAt.slice(0, 10) +
                " " +
                news.createdAt.slice(11, 19)
              }})
            </h5>
            <h5
              class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ news.title }}
            </h5>
          </a>
          <p class="mb-3 font-normal text-white dark:text-white">
            {{ news.content }}
          </p>
          <h2>
            Latest Update:
            {{
              news.latestUpdateAt.slice(0, 10) +
              " " +
              news.latestUpdateAt.slice(11, 19)
            }}
          </h2>
          <div class="flex space-x-2">
            <button
              v-if="news.status === 0"
              @click="activeNews(news.id)"
              class="transition ease-in-out delay-150 bg-fuchsia-700 hover:-translate-y-1 hover:scale-110 hover:bg-fuchsia-700 duration-300 text-white bg-[#ff0808] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#ff0808] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Active
            </button>
            <button
              v-else-if="news.status === 1"
              @click="inactiveNews(news.id)"
              class="transition ease-in-out delay-150 bg-violet-700 hover:-translate-y-1 hover:scale-110 hover:bg-violet-700 duration-300 text-white bg-[#ff0808] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#ff0808] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Inactive
            </button>
            <button v-if="authStore.roles.includes('ROLE_SUPER_ADMIN')"
              @click="deleteNews(news.id)"
              class="transition ease-in-out delay-150 bg-[#ff0808] hover:-translate-y-1 hover:scale-110 hover:bg-red-700 duration-300 text-white bg-[#ff0808] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#ff0808] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="h-64 text-white">No news uploaded yet.</p>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "vue";
import instance from "../axiosInstance";

import { useAuthStore } from "@/Stores/authStore";

export default {
  setup() {
    const news = reactive({
      title: "",
      content: "",
    });
    const allNews = ref([]);
    const selectedNewsId = ref("");
    const selectedNews = ref("");
    const authStore = useAuthStore();

    const addNews = async () => {
      try {
        const response = await instance.post("/api/admin/news", news);
        alert("News added succesfully!");
        news.title = "";
        news.content = "";
        await getAllNews();
      } catch (error) {
        console.error("Error adding news:", error);
        alert("Failed to add news!");
      }
    };

    const getAllNews = async () => {
      try {
        const response = await instance.get("/api/admin/news");
        allNews.value = response.data;
      } catch (error) {
        console.error("Error get all news");
      }
    };

    const getNews = async () => {
      if (!selectedNewsId.value) return;
      try {
        const response = await instance.get(
          `/api/admin/news/${selectedNewsId.value}`
        );
        selectedNews.value = response.data;
      } catch (error) {
        console.error("Error getting news by id:", error);
      }
    };

    const editNews = async () => {
      if (!selectedNewsId.value) return;
      try {
        await instance.put(
          `/api/admin/news/${selectedNewsId.value}`,
          selectedNews.value
        );
        alert("News updated succesfully!");
        selectedNewsId.value = "";
        selectedNews.value = "";
        await getAllNews();
      } catch (error) {
        console.error("Error updating news:", error);
        alert("Error updating news");
      }
    };

    const deleteNews = async (id) => {
      if (confirm(`Are you sure you want to delete news id:${id}?`)) {
        try {
          await instance.delete(`/api/admin/news/${id}`);
          allNews.value = allNews.value.filter((news) => news.id !== id);
        } catch (error) {
          console.error("error deleting news:", error);
          alert("Failed to delete news.");
        }
      }
    };

    const activeNews = async (id) => {
      if (confirm(`Are you sure you want active news id: ${id}?`)) {
        try {
          const updateStatusDTO = { status: 1 };
          await instance.put(`api/admin/news/status/${id}`, updateStatusDTO);
          alert(`News id ${id} has been activated successfully!`);
          await getAllNews();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to active this news!");
        }
      }
    };

    const inactiveNews = async (id) => {
      if (confirm(`Are you sure you want inactive news id: ${id}?`)) {
        try {
          const updateStatusDTO = { status: 0 };
          await instance.put(`api/admin/news/status/${id}`, updateStatusDTO);
          alert(`News id: ${id} has been activated successfully!`);
          await getAllNews();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to inactive this news!");
        }
      }
    };

    onMounted(getAllNews);

    return {
      news,
      addNews,
      allNews,
      deleteNews,
      selectedNewsId,
      selectedNews,
      getNews,
      editNews,
      activeNews,
      inactiveNews,
      authStore,
    };
  },
};
</script>
