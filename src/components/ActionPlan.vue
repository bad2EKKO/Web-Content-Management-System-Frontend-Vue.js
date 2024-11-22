<template>
  <div class="flex flex-col bg-[#00204A] p-3 h-dvh">
    <div class="bg-[#00204A] h-20 self-center">
      <div>
        <h1
          class="text-4xl text-white font-extrabold dark:text-white mt-4 animate-bounce animate-infinite animate-duration-[1500ms]"
        >
          Action Plan
        </h1>
      </div>
    </div>
    <div class="flex bg-[#00204A]">
      <div class="bg-[#00204A] sm:w-full md:w-1/2">
        <form
          @submit.prevent="uploadFile"
          class="animate-fade-left animate-once animate-ease-linear"
        >
          <div>
            <label
              class="block mb-2 text-sm font-medium text-white dark:text-white"
              for="action_input"
              >Upload Action Plan Pdf</label
            >
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="action_input"
              type="file"
              @change="handleFileUpload"
              ref="actionFileUpload"
            />
            <p
              class="mt-1 text-sm text-white dark:text-white"
              id="file_input_help"
            >
              PDF only (Max file size:50MB)
            </p>
            <p
              v-if="message"
              class="mt-1 text-sm text-red-500 dark:text-red-500"
              id="file_input_message"
            >
              {{ message }}
            </p>
          </div>
          <button
            type="submit"
            class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Upload
          </button>
        </form>
      </div>
      <div class="bg-[#00204A] sm:hidden md:flex md:w-1/2"></div>
    </div>
    <div class="bg-[#00204A] h-20"></div>
    <div
      class="bg-[#00204A] h-12 text-lg text-white place-self-center animate-jump-in animate-once animate-duration-[1200ms]"
    >
      Existing Action Plans
    </div>
    <div class="bg-[#00204A]">
      <div>
        <div
          class="relative overflow-x-auto shadow-md sm:rounded-lg animate-jump-in animate-once animate-duration-[1200ms]"
        >
          <table
            v-if="actionFiles.length > 0"
            class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100"
          >
            <thead
              class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Added Date and Time</th>
                <th scope="col" class="px-6 py-3">Current Status</th>
                <th scope="col" class="px-6 py-3">Latest Status Update</th>
                <th scope="col" class="px-6 py-3">Change Status</th>
                <th
                  v-if="authStore.roles.includes('ROLE_SUPER_ADMIN')"
                  scope="col"
                  class="px-6 py-3"
                >
                  Action
                </th>
                <th v-else scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="file in actionFiles"
                :key="file.id"
                class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  {{ file.actionPdfName.slice(0, -4) }}
                </th>
                <td class="px-6 py-4 text-blue-50">
                  {{
                    file.addedPdfAt.slice(0, 10) +
                    " " +
                    file.addedPdfAt.slice(11, 19)
                  }}
                </td>
                <td class="px-6 py-4 text-blue-50">
                  <span v-if="file.actionStatus === 1">Active</span>
                  <span v-else-if="file.actionStatus === 0">Inactive</span>
                </td>
                <td class="px-6 py-4 text-blue-50">
                  {{
                    file.latestStatusUpdateAt.slice(0, 10) +
                    " " +
                    file.latestStatusUpdateAt.slice(11, 19)
                  }}
                </td>
                <td class="px-6 py-4">
                  <button
                    v-if="file.actionStatus === 0"
                    @click="activeActionPdf(file.id, file.actionPdfName)"
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    To Active
                  </button>
                  <button
                    v-else-if="file.actionStatus === 1"
                    @click="inactivateActionPdf(file.id, file.actionPdfName)"
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    To Inactive
                  </button>
                </td>
                <td class="px-6 py-4">
                  <button
                    v-if="authStore.roles.includes('ROLE_SUPER_ADMIN')"
                    @click="deleteActionFile(file.id, file.actionPdfName)"
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p class="h-64 text-white">No action plans uploaded yet.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import instance from "../axiosInstance";

import { useAuthStore } from "@/Stores/authStore";

export default {
  setup() {
    const selectedFile = ref(null);
    const message = ref("");
    const actionFiles = ref([]);
    const actionFileUpload = ref(null);
    const authStore = useAuthStore();

    const handleFileUpload = (action) => {
      selectedFile.value = action.target.files[0];
    };

    const uploadFile = async () => {
      if (!selectedFile.value) {
        message.value = "Please select a Action plan!";
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile.value);

      try {
        const response = await instance.post(
          "/api/admin/action-pdf",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Action plan upload successfull!");
        message.value = "";
        actionFileUpload.value.value = "";
        selectedFile.value = "";
        await getAllActionFiles();
      } catch (error) {
        message.value = error.response
          ? error.response.data
          : "Action plan upload failed!";
      }
    };

    const getAllActionFiles = async () => {
      try {
        const response = await instance.get("/api/public/action-pdfs");
        actionFiles.value = response.data;
      } catch (error) {
        console.error("Error get action files:", error);
      }
    };

    const deleteActionFile = async (id, actionPdfName) => {
      if (confirm(`Are you sure you want to delete ${actionPdfName}?`)) {
        try {
          await instance.delete(`/api/admin/action-pdf/${id}`);
          actionFiles.value = actionFiles.value.filter(
            (file) => file.id !== id
          );
        } catch (error) {
          console.error("error deleting file:", error);
          alert("Failed to delete file.");
        }
      }
    };

    const activeActionPdf = async (id, actionPdfName) => {
      if (confirm(`Are you sure you want active ${actionPdfName}?`)) {
        try {
          const updateStatusDTO = { status: 1 };
          await instance.put(`api/admin/action-pdf/status/${id}`, updateStatusDTO);
          alert(`${actionPdfName} has been activated successfully!`);
          await getAllActionFiles();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to active this pdf!");
        }
      }
    };

    const inactivateActionPdf = async (id, actionPdfName) => {
      if (confirm(`Are you sure you want Inactive ${actionPdfName}?`)) {
        try {
          const updateStatusDTO = { status: 0 };
          await instance.put(`api/admin/action-pdf/status/${id}`, updateStatusDTO);
          alert(`${actionPdfName} has been deactivated!`);
          await getAllActionFiles();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to inactive this pdf!");
        }
      }
    };

    onMounted(getAllActionFiles);

    return {
      selectedFile,
      message,
      uploadFile,
      handleFileUpload,
      actionFiles,
      deleteActionFile,
      actionFileUpload,
      activeActionPdf,
      inactivateActionPdf,
      authStore,
    };
  },
};
</script>
