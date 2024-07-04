export const useTaskStore = defineStore("task", {
    state: () => ({ 
        token: null,
        loggedIn: false,
    }),
    persist: true,
    getters: {
        getToken: (state) => state.token,
        getStatus: (state) => state.loggedIn,
    },
    actions: {
        async getAllTasks(body) {
            const tokenStore = useTokenStore();
            return await $fetch("http://127.0.0.1:8000/api/tasks/getAll", {
              method: "POST",
              body,
              headers: {
                Accept: 'application/json',
                "Cache-Control": "no-cache",
                Authorization: `Bearer ${tokenStore.getToken}`,
              }
            });
        },
        async create(body) {
            const tokenStore = useTokenStore();
            return await $fetch("http://127.0.0.1:8000/api/tasks", {
              method: "POST",
              body,
              headers: {
                Accept: 'application/json',
                "Cache-Control": "no-cache",
                Authorization: `Bearer ${tokenStore.getToken}`,
              }
            });
        },
        async update(id, body) {
            const tokenStore = useTokenStore();
            return await $fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
              method: "PUT",
              body,
              headers: {
                Accept: 'application/json',
                "Cache-Control": "no-cache",
                Authorization: `Bearer ${tokenStore.getToken}`,
              }
            });
        },
        async delete(id) {
            const tokenStore = useTokenStore();
            return await $fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
              method: "DELETE",
              headers: {
                Accept: 'application/json',
                "Cache-Control": "no-cache",
                Authorization: `Bearer ${tokenStore.getToken}`,
              }
            });
        },
    },
});