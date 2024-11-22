<template>
  <div class="relative h-screen w-full">
    <img src="/homeWallpaper.jpg" alt="Background Image" class="absolute inset-0 w-full h-full object-cover filter blur-sm">
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
        <h1 class="text-4xl text-white font-bold animate-jump animate-once animate-duration-[2000ms] animate-ease-in-out animate-alternate animate-fill-both">Welcome to Content Management System</h1>
        <p class="text-xl text-white mt-4 animate-jump animate-once animate-duration-[2000ms] animate-delay-1000 animate-ease-in-out animate-alternate animate-fill-both">Web</p>
    </div>
</div>
</template>
<script>
import { useAuthStore } from "../Stores/authStore";

export default {
  setup() {
    const authStore = useAuthStore();
    const user = authStore.user;

    return { user };
  },
};
</script>
