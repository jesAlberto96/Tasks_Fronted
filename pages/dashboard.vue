<template>
    <div
        class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        style="position: relative;">
        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Home Page</h5>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">This is our home Page</p>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Name: <strong>{{ auth.getUser?.name }}</strong></p>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Email: <strong>{{ auth.getUser?.email }}</strong></p>
    </div>
</template>

<script setup>
    const auth = useAuthStore();

    definePageMeta({
        middleware: ["auth"],
    });
</script>