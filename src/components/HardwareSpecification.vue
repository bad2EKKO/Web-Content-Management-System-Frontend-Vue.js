<template>
  <div class="flex flex-col bg-[#00204A] p-3 h-full">
    <div class="bg-[#00204A] h-20 self-center">
      <div>
        <h1
          class="text-4xl text-white font-extrabold dark:text-white mt-4 animate-bounce animate-infinite animate-duration-[1500ms]"
        >
          Hardware Specifications
        </h1>
      </div>
    </div>
    <div class="flex bg-[#00204A] mx-8">
      <div
        class="bg-[#00204A] sm:w-2/3 md:w-1/2 text-lg text-white place-self-center"
      >
        <div class="animate-jump-in animate-once animate-duration-[1200ms]">
          Create New Specification
        </div>
      </div>
      <div
        class="bg-[#00204A] sm:w-2/3 md:w-1/2 px-8 text-lg text-white place-self-center"
      >
        <div class="animate-jump-in animate-once animate-duration-[1200ms]">
          Upload Document for Specification
        </div>
      </div>
    </div>
    <div class="flex bg-[#00204A]">
      <div class="bg-[#00204A] sm:w-2/3 md:w-1/2 pt-3">
        <form
          @submit.prevent="createSpecification"
          class="max-w-sm mx-8 animate-fade-left animate-once animate-ease-linear"
        >
          <div>
            <label
              for="specification_name"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
              >Specification Name</label
            >
            <input
              v-model="specification.specificationType"
              type="text"
              id="specification_name"
              maxlength="300"
              required
              placeholder="Enter the specification name"
              class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <br />
          <button
            type="submit"
            class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </form>
      </div>
      <div class="bg-[#00204A] sm:w-1/3 md:w-1/2 pt-3">
        <form
          @submit.prevent="uploadDocFiles"
          class="max-w-sm mx-8 animate-fade-left animate-once animate-ease-linear"
        >
          <div class="max-w-sm">
            <label
              for="specId"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
              >Select Specification</label
            >
            <select
              v-model="selectedSpecificationId"
              id="specId"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>Click to select Specification</option>
              <option
                v-for="specification in allSpecification"
                :key="specification.id"
                :value="specification.id"
              >
                {{ specification.specificationType }}
              </option>
            </select>
          </div>
          <br />
          <div>
            <label
              class="block mb-2 text-sm font-medium text-white dark:text-white"
              for="multiple_files"
              >Upload Specification Documents</label
            >
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              type="file"
              name="docs"
              multiple
              @change="handleDocumentUpload"
              ref="filesInput"
            />
            <p
              v-if="message"
              class="mt-1 text-sm text-red-500 dark:text-red-500"
              id="file_input_message"
            >
              {{ message }}
            </p>
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
    </div>
    <div class="bg-[#00204A] h-16"></div>
    <div
      class="bg-[#00204A] h-12 text-lg text-white place-self-center animate-jump-in animate-once animate-duration-[1200ms]"
    >
      Existing Specifications
    </div>
    <div class="bg-[#00204A]">
      <div>
        <div
          class="relative overflow-x-auto shadow-md sm:rounded-lg animate-jump-in animate-once animate-duration-[1200ms]"
        >
          <table
            v-if="allSpecification.length > 0"
            class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100"
          >
            <thead
              class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Specification Name</th>
                <th scope="col" class="px-6 py-3">Documents Quantity</th>
                <th scope="col" class="px-6 py-3">Added Date And Time</th>
                <th scope="col" class="px-6 py-3">Current Status</th>
                <th scope="col" class="px-6 py-3">Latest Update</th>
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
                v-for="specification in allSpecification"
                :key="specification.id"
                class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  {{ specification.specificationType }}
                </th>
                <td class="px-6 py-4">
                  {{ specification.specifyDocs.length }}
                </td>
                <td class="px-6 py-4">
                  {{
                    specification.speCreatedAt.slice(0, 10) +
                    " " +
                    specification.speCreatedAt.slice(11, 19)
                  }}
                </td>
                <td class="px-6 py-4">
                  <span v-if="specification.status === 1">Active</span>
                  <span v-else-if="specification.status === 0">Inactive</span>
                </td>
                <td class="px-6 py-4">
                  {{
                    specification.latestUpdateAt.slice(0, 10) +
                    " " +
                    specification.latestUpdateAt.slice(11, 19)
                  }}
                </td>
                <td class="px-6 py-4">
                  <button
                    v-if="specification.status === 0"
                    @click="
                      activeSpecification(
                        specification.id,
                        specification.specificationType
                      )
                    "
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    To Active
                  </button>
                  <button
                    v-else-if="specification.status === 1"
                    @click="
                      inactiveSpecification(
                        specification.id,
                        specification.specificationType
                      )
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
                      deleteSpecification(
                        specification.id,
                        specification.specificationType
                      )
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
            <p class="h-64 text-white">No Event uploaded yet.</p>
          </div>
        </div>
      </div>
    </div>
    <br /><br />
    <div
      class="bg-[#00204A] h-12 text-lg text-white place-self-center animate-jump-in animate-once animate-duration-[1200ms]"
    >
      Existing Documents in Specification
    </div>

    <div class="max-w-sm mx-8 mx-auto">
      <label
        for="specificationId"
        class="block mb-2 text-sm font-medium text-white dark:text-white"
        >Select Specification Type</label
      >
      <select
        v-model="selectedIdForDocs"
        @change="getAllDocuments"
        id="specificationId"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>Click to select Specification</option>
        <option
          v-for="specification in allSpecification"
          :key="specification.id"
          :value="specification.id"
        >
          {{ specification.specificationType }}
        </option>
      </select>
    </div>
    <br />
    <div class="bg-[#00204A]">
      <div v-if="selectedIdForDocs != ''">
        <div
          class="relative overflow-x-auto shadow-md sm:rounded-lg animate-jump-in animate-once animate-duration-[1200ms]"
        >
          <table
            v-if="allDocuments.length > 0"
            class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100"
          >
            <thead
              class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Document Name</th>
                <th scope="col" class="px-6 py-3">Document Type</th>
                <th scope="col" class="px-6 py-3">Added Date And Time</th>
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
                v-for="document in allDocuments"
                :key="document.id"
                class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  {{ document.docName }}
                </th>
                <td class="px-6 py-4">
                  {{ document.docType }}
                </td>
                <td class="px-6 py-4">
                  {{
                    document.createdAt.slice(0, 10) +
                    " " +
                    document.createdAt.slice(11, 19)
                  }}
                </td>
                <td class="px-6 py-4">
                  <span v-if="document.docStatus === 1">Active</span>
                  <span v-else-if="document.docStatus === 0">Inactive</span>
                </td>
                <td class="px-6 py-4">
                  {{
                    document.latestUpdateAt.slice(0, 10) +
                    " " +
                    document.latestUpdateAt.slice(11, 19)
                  }}
                </td>
                <td class="px-6 py-4">
                  <button
                    v-if="document.docStatus === 0"
                    @click="activeDocument(document.id, document.docName)"
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    To Active
                  </button>
                  <button
                    v-else-if="document.docStatus === 1"
                    @click="inactiveDocument(document.id, document.docName)"
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    To Inactive
                  </button>
                </td>
                <td class="px-6 py-4">
                  <button
                    v-if="authStore.roles.includes('ROLE_SUPER_ADMIN')"
                    @click="deleteDocument(document.id, document.docName)"
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <p class="h-64 text-white">No Document uploaded yet.</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="h-64 text-white">Please select specification type.</p>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "vue";
import instance from "../axiosInstance";

import { useAuthStore } from "@/Stores/authStore";

export default {
  setup() {
    const specification = reactive({
      specificationType: "",
    });
    const allSpecification = ref([]);
    const allDocuments = ref([]);
    const message = ref("");
    const selectedDocs = ref([]);
    const selectedSpecificationId = ref("");
    const selectedIdForDocs = ref("");
    const filesInput = ref(null);
    const authStore = useAuthStore();

    const handleDocumentUpload = (doc) => {
      const files = doc.target.files;
      const selectedFiles = [...files];
      selectedDocs.value = selectedFiles;
    };

    const uploadDocFiles = async () => {
      if (selectedDocs.value.length === 0) {
        message.value = "Please select Document files!";
        return;
      }

      const formData = new FormData();
      selectedDocs.value.forEach((file) => {
        formData.append("docs", file);
      });

      try {
        const response = await instance.post(
          `/api/admin/hardware-specification/specify-doc/${selectedSpecificationId.value}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Uploading docs succesfull!");
        message.value = "";
        filesInput.value.value = "";
        selectedDocs.value = [];
        selectedSpecificationId.value = "";
        await getAllSpecification();
        await getAllDocuments();
      } catch (error) {
        message.value = error.response
          ? error.response.data
          : "Specification docs upload failed!";
      }
    };

    const createSpecification = async () => {
      try {
        const response = await instance.post(
          "/api/admin/hardware-specification",
          specification
        );
        alert("Specification Type created succesfully!");
        specification.specificationType = "";
        await getAllSpecification();
      } catch (error) {
        console.error("Error creating specification:", error);
        alert("Faild to create specification!");
      }
    };

    const getAllDocuments = async () => {
      try {
        const response = await instance.get(
          `/api/public/hardware-specification/${selectedIdForDocs.value}/specify-docs`
        );
        allDocuments.value = response.data;
      } catch (error) {
        console.error("Error getting all documents:", error);
      }
    };

    const getAllSpecification = async () => {
      try {
        const response = await instance.get(
          "/api/public/hardware-specifications"
        );
        allSpecification.value = response.data;
      } catch (error) {
        console.error("Error getting all specification:", error);
      }
    };

    const deleteDocument = async (id, docName) => {
      if (confirm(`Are you sure you want to delete document ${docName}`)) {
        try {
          await instance.delete(`api/admin/hardware-specification/specify-doc/${id}`);
          allDocuments.value = allDocuments.value.filter(
            (document) => document.id !== id
          );
          await getAllSpecification();
        } catch (error) {
          console.error("error deleting document:", error);
          alert("Failed delete document!");
        }
      }
    };

    const deleteSpecification = async (id, specificationType) => {
      if (
        confirm(`Are you sure you want to delete event ${specificationType}`)
      ) {
        try {
          await instance.delete(`api/admin/hardware-specification/${id}`);
          allSpecification.value = allSpecification.value.filter(
            (specification) => specification.id !== id
          );
        } catch (error) {
          console.error("error deleting specification:", error);
          alert("Failed delete specification!");
        }
      }
    };

    const activeSpecification = async (id, specificationType) => {
      if (confirm(`Are you sure you want active ${specificationType}?`)) {
        try {
          const updateStatusDTO = { status: 1 };
          await instance.put(
            `api/admin/hardware-specification/status/${id}`,
            updateStatusDTO
          );
          alert(`${specificationType} has been activated successfully!`);
          await getAllSpecification();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to active this specification!");
        }
      }
    };

    const inactiveSpecification = async (id, specificationType) => {
      if (confirm(`Are you sure you want inactive ${specificationType}?`)) {
        try {
          const updateStatusDTO = { status: 0 };
          await instance.put(
            `api/admin/hardware-specification/status/${id}`,
            updateStatusDTO
          );
          alert(`${specificationType} has been deactivated successfully!`);
          await getAllSpecification();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to inactive this specification!");
        }
      }
    };

    const activeDocument = async (id, docName) => {
      if (confirm(`Are you sure you want active ${docName}?`)) {
        try {
          const updateStatusDTO = { status: 1 };
          await instance.put(
            `api/admin/hardware-specification/specify-doc/status/${id}`,
            updateStatusDTO
          );
          alert(`${docName} has been activated successfully!`);
          await getAllSpecification();
          await getAllDocuments();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to active this document!");
        }
      }
    };

    const inactiveDocument = async (id, docName) => {
      if (confirm(`Are you sure you want inactive ${docName}?`)) {
        try {
          const updateStatusDTO = { status: 0 };
          await instance.put(
            `api/admin/hardware/specification/specify-doc/status/${id}`,
            updateStatusDTO
          );
          alert(`${docName} has been deactivated successfully!`);
          await getAllSpecification();
          await getAllDocuments();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to inactive this document!");
        }
      }
    };

    onMounted(getAllSpecification);

    return {
      specification,
      createSpecification,
      allSpecification,
      allDocuments,
      deleteSpecification,
      deleteDocument,
      handleDocumentUpload,
      uploadDocFiles,
      selectedSpecificationId,
      selectedIdForDocs,
      message,
      filesInput,
      getAllDocuments,
      activeSpecification,
      inactiveSpecification,
      activeDocument,
      inactiveDocument,
      authStore,
    };
  },
};
</script>
