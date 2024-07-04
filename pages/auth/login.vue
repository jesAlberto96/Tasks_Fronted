<template>
  <div class="min-h-screen flex items-center">
    <div class="w-full">
        <div class="card bg-white p-8 rounded-lg shadow-xl md:w-3/4 mx-auto lg:w-1/3">
            <h3 class="text-center text-2xl font-semibold">User Login</h3>

            <form @submit.prevent="login" method="post" class="max-w-sm mx-auto">
              <div class="mb-5">
                <FormLabel for="email">Email</FormLabel>
                <FormTextInput id="email" type="email" placeholder="Email" v-model="email"/>
                <span class="text-red-500" v-if="errors.email" v-text="errors.email[0]"></span>
              </div>
              <div class="mb-5">
                <FormLabel for="password">Password</FormLabel>
                <FormTextInput id="password" type="password" placeholder="Password" v-model="password" />
              </div>
              <div class="flex items-start mb-5">
                <div class="flex items-center h-5">
                    <input
                        id="remember"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                    />
                    <span class="text-red-500" v-if="errors.password" v-text="errors.password[0]"></span>
                </div>
                <FormLabel class="ml-2" for="remember">Remember me</FormLabel>
              </div>
              <ButtonPrimary>Login</ButtonPrimary>
            </form>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  middleware: ["guest"],
});

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const errors = ref([]);

const login = async () => {
    try {
        const response = await auth.login({
            email: email.value,
            password: password.value,
        });
    } catch (error) {
        errors.value = response.errors;
    }
}
</script>
