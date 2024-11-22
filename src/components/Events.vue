<template>
  <div class="flex flex-col bg-[#00204A] p-3 h-full">
    <div class="bg-[#00204A] h-20 self-center">
      <div>
        <h1
          class="text-4xl text-white font-extrabold dark:text-white mt-4 animate-bounce animate-infinite animate-duration-[1500ms]"
        >
          Events
        </h1>
      </div>
    </div>
    <div class="flex bg-[#00204A] mx-8">
      <div
        class="bg-[#00204A] sm:w-2/3 md:w-1/2 text-lg text-white place-self-center"
      >
        <div class="animate-jump-in animate-once animate-duration-[1200ms]">
          Create New Event
        </div>
      </div>
      <div
        class="bg-[#00204A] sm:w-2/3 md:w-1/2 px-8 text-lg text-white place-self-center"
      >
        <div class="animate-jump-in animate-once animate-duration-[1200ms]">
          Upload Photos for Event
        </div>
      </div>
    </div>
    <div class="flex bg-[#00204A]">
      <div class="bg-[#00204A] sm:w-2/3 md:w-1/2 pt-3">
        <form
          @submit.prevent="createEvent"
          class="max-w-sm mx-8 animate-fade-left animate-once animate-ease-linear"
        >
          <div>
            <label
              for="event_name"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
              >Event Name</label
            >
            <input
              v-model="event.eventName"
              type="text"
              id="event_name"
              maxlength="300"
              required
              placeholder="Enter the event name"
              class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <br />
          <div>
            <label
              for="more_content"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
              >More Content (eg: Google Drive Link)</label
            >
            <input
              v-model="event.moreContent"
              type="text"
              id="more_content"
              maxlength="300"
              placeholder="If have any google drive link or other link, drop here.."
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
          @submit.prevent="uploadImageFiles"
          class="max-w-sm mx-8 animate-fade-left animate-once animate-ease-linear"
        >
          <div class="max-w-sm">
            <label
              for="eventId"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
              >Select Event</label
            >
            <select
              v-model="selectedEventId"
              id="eventId"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>Click to select Event</option>
              <option
                v-for="event in allEvents"
                :key="event.id"
                :value="event.id"
              >
                {{ event.eventName }}
              </option>
            </select>
          </div>
          <br />
          <div>
            <label
              class="block mb-2 text-sm font-medium text-white dark:text-white"
              for="multiple_files"
              >Upload Event Media Files</label
            >
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              type="file"
              name="files"
              multiple
              @change="handleImageUpload"
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
      Existing Events
    </div>
    <div class="bg-[#00204A]">
      <div>
        <div
          class="relative overflow-x-auto shadow-md sm:rounded-lg animate-jump-in animate-once animate-duration-[1200ms]"
        >
          <table
            v-if="allEvents.length > 0"
            class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100"
          >
            <thead
              class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Event Name</th>
                <th scope="col" class="px-6 py-3">Image Quantity</th>
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
                v-for="event in allEvents"
                :key="event.id"
                class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                >
                  {{ event.eventName }}
                </th>
                <td class="px-6 py-4">
                  {{ event.media.length }}
                </td>
                <td class="px-6 py-4">
                  {{
                    event.addedEventAt.slice(0, 10) +
                    " " +
                    event.addedEventAt.slice(11, 19)
                  }}
                </td>
                <td class="px-6 py-4">
                  <span v-if="event.status === 1">Active</span>
                  <span v-else-if="event.status === 0">Inactive</span>
                </td>
                <td class="px-6 py-4">
                  {{
                    event.latestUpdateAt.slice(0, 10) +
                    " " +
                    event.latestUpdateAt.slice(11, 19)
                  }}
                </td>
                <td class="px-6 py-4">
                  <button
                    v-if="event.status === 0"
                    @click="activeEvent(event.id, event.eventName)"
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    To Active
                  </button>
                  <button
                    v-else-if="event.status === 1"
                    @click="inactiveEvent(event.id, event.eventName)"
                    class="font-medium text-[#fa1616] hover:underline"
                  >
                    To Inactive
                  </button>
                </td>
                <td class="px-6 py-4">
                  <button
                    v-if="authStore.roles.includes('ROLE_SUPER_ADMIN')"
                    @click="deleteEvent(event.id, event.eventName)"
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
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "vue";
import instance from "../axiosInstance";

import { useAuthStore } from "@/Stores/authStore";

export default {
  setup() {
    const event = reactive({
      eventName: "",
      moreContent: "",
    });
    const allEvents = ref([]);
    const message = ref("");
    const selectedImages = ref([]);
    const selectedEventId = ref("");
    const filesInput = ref(null);
    const authStore = useAuthStore();

    const handleImageUpload = (image) => {
      const files = image.target.files;
      const selectedFiles = [...files];
      selectedImages.value = selectedFiles;
    };

    const uploadImageFiles = async () => {
      if (selectedImages.value.length === 0) {
        message.value = "Please select image files!";
        return;
      }

      const formData = new FormData();
      selectedImages.value.forEach((file) => {
        formData.append("files", file);
      });

      try {
        const response = await instance.post(
          `/api/admin/event/${selectedEventId.value}/media`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Uploading images succesfull!");
        message.value = "";
        filesInput.value.value = "";
        selectedImages.value = [];
        selectedEventId.value = "";
        await getAllEvents();
      } catch (error) {
        message.value = error.response
          ? error.response.data
          : "Event images upload failed!";
      }
    };

    const createEvent = async () => {
      try {
        const response = await instance.post(
          "/api/admin/event",
          event
        );
        alert("Event title created succesfully!");
        event.eventName = "";
        event.moreContent = "";
        await getAllEvents();
      } catch (error) {
        console.error("Error creating event:", error);
        alert("Faild to create event!");
      }
    };

    const getAllEvents = async () => {
      try {
        const response = await instance.get("/api/public/events");
        allEvents.value = response.data;
      } catch (error) {
        console.error("Error getting all events:", error);
      }
    };

    const deleteEvent = async (id, eventName) => {
      if (confirm(`Are you sure you want to delete event ${eventName}`)) {
        try {
          await instance.delete(`/api/admin/event/${id}`);
          allEvents.value = allEvents.value.filter((event) => event.id !== id);
        } catch (error) {
          console.error("error deleting event:", error);
          alert("Failed delete event!");
        }
      }
    };

    const activeEvent = async (id, eventName) => {
      if (confirm(`Are you sure you want active event ${eventName}?`)) {
        try {
          const updateStatusDTO = { status: 1 };
          await instance.put(`/api/admin/event/status/${id}`, updateStatusDTO);
          alert(`${eventName} has been activated successfully!`);
          await getAllEvents();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to active this event!");
        }
      }
    };

    const inactiveEvent = async (id, eventName) => {
      if (confirm(`Are you sure you want inactive event ${eventName}?`)) {
        try {
          const updateStatusDTO = { status: 0 };
          await instance.put(`/api/admin/event/status/${id}`, updateStatusDTO);
          alert(`${eventName} has been deactivated successfully!`);
          await getAllEvents();
        } catch (error) {
          console.error("error change status: ", error);
          alert("Failed to inactive this event!");
        }
      }
    };

    onMounted(getAllEvents);

    return {
      event,
      createEvent,
      allEvents,
      deleteEvent,
      handleImageUpload,
      uploadImageFiles,
      selectedEventId,
      message,
      filesInput,
      activeEvent,
      inactiveEvent,
      authStore,
    };
  },
};
</script>
