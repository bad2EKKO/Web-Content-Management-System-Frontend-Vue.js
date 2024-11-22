<template>
  <div class="flex flex-col bg-[#00204A] p-3 h-dvh">
    <div class="bg-[#00204A] h-20 self-center">
      <div>
        <h1
          class="text-4xl text-white font-extrabold dark:text-white mt-4 animate-bounce animate-infinite animate-duration-[1500ms]"
        >
          Performance Report
        </h1>
      </div>
    </div>
    <div class="flex bg-[#00204A]">
      <div class="bg-[#00204A] sm:w-full md:w-1/2">
        <form
          @submit.prevent="uploadPerformanceFile"
          class="animate-fade-left animate-once animate-ease-linear"
        >
          <div>
            <label
              class="block mb-2 text-sm font-medium text-white dark:text-white"
              for="performane_input"
              >Upload Performance Report Pdf</label
            >
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="performane_input"
              type="file"
              ref="performanceFileUpload"
              @change="handleFileUpload"
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
      Existing Performance Reports
    </div>
    <div class="bg-[#00204A]">
      <div>
        <div
          class="relative overflow-x-auto shadow-md sm:rounded-lg animate-jump-in animate-once animate-duration-[1200ms]"
        >
          <table
            v-if="performanceFiles.length > 0"
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
                v-for="file in performanceFiles"
                :key="file.id"
                class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  {{ file.performancePdfName.slice(0, -4) }}
                </th>
                <td class="px-6 py-4">
                  {{
                    file.addedPdfAt.slice(0, 10) +
                    " " +
                    file.addedPdfAt.slice(11, 19)
                  }}
                </td>
                <td class="px-6 py-4 text-blue-50">
                  <span v-if="file.performanceStatus === 1">Active</span>
                  <span v-else-if="file.performanceStatus === 0">Inactive</span>
                </td>
                <td class="px-6 py-4">
                  {{
                    file.latestUpdateAt.slice(0, 10) +
                    " " +
                    file.latestUpdateAt.slice(11, 19)
                  }}
                </td>
                <td class="px-6 py-4">
                  <button
                    v-if="file.performanceStatus === 0"
                    @click="
                      activePerformancePdf(file.id, file.performancePdfName)
                    "
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    To Active
                  </button>
                  <button
                    v-else-if="file.performanceStatus === 1"
                    @click="
                      inactivatePerformancePdf(file.id, file.performancePdfName)
                    "
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    To Inactive
                  </button>
                </td>
                <td class="px-6 py-4">
                  <button
                    v-if="authStore.roles.includes('ROLE_SUPER_ADMIN')"
                    @click="
                      deletePerformanceReport(file.id, file.performancePdfName)
                    "
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p class="h-64 text-white">No performance report uploaded yet.</p>
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
    const performanceFiles = ref([]);
    const performanceFileUpload = ref(null);
    const authStore = useAuthStore();

    const handleFileUpload = (Performance) => {
      selectedFile.value = Performance.target.files[0];
    };

    const uploadPerformanceFile = async () => {
      if (!selectedFile.value) {
        message.value = "Please select a Performance report!";
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile.value);

      try {
        const response = await instance.post(
          "/api/admin/performance-pdf",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Perfrmance report upload successfull!");
        message.value = "";
        performanceFileUpload.value.value = "";
        selectedFile.value = "";
        await getAllPerfomaceReports();
      } catch (error) {
        message.value = error.response
          ? error.response.data
          : "Performance report upload failed!";
      }
    };

    const getAllPerfomaceReports = async () => {
      try {
        const response = await instance.get(
          "/api/public/performance-pdfs"
        );
        performanceFiles.value = response.data;
      } catch (error) {
        console.error("Error get performance reports", error);
      }
    };

    const deletePerformanceReport = async (id, performancePdfName) => {
      if (confirm(`Are you sure you want to delete ${performancePdfName}?`)) {
        try {
          await instance.delete(`/api/admin/performance-pdf/${id}`);
          performanceFiles.value = performanceFiles.value.filter(
            (file) => file.id !== id
          );
        } catch (error) {
          console.error("error deleting file:", error);
          alert("Failed to delete file.");
        }
      }
    };

    const activePerformancePdf = async (id, performancePdfName) => {
      if (confirm(`Are you sure you want active ${performancePdfName}?`)) {
        try {
          const updateStatusDTO = { status: 1 };
          await instance.put(
            `api/admin/performance-pdf/status/${id}`,
            updateStatusDTO
          );
          alert(`${performancePdfName} has been activated successfully!`);
          await getAllPerfomaceReports();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to active this pdf!");
        }
      }
    };

    const inactivatePerformancePdf = async (id, performancePdfName) => {
      if (confirm(`Are you sure you want Inactive ${performancePdfName}?`)) {
        try {
          const updateStatusDTO = { status: 0 };
          await instance.put(
            `api/admin/performance-pdf/status/${id}`,
            updateStatusDTO
          );
          alert(`${performancePdfName} has been deactivated!`);
          await getAllPerfomaceReports();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to inactive this pdf!");
        }
      }
    };

    onMounted(getAllPerfomaceReports);

    return {
      selectedFile,
      message,
      handleFileUpload,
      uploadPerformanceFile,
      performanceFiles,
      deletePerformanceReport,
      performanceFileUpload,
      activePerformancePdf,
      inactivatePerformancePdf,
      authStore,
    };
  },
};
</script>
