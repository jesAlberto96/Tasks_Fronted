export const useTokenStore = defineStore("token", {
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
        setToken(token) {
            console.log(token)
            this.token = token;
            this.loggedIn = true;
        },
        removeToken() {
            const auth = useAuthStore();
            auth.$reset();
            this.$reset();
        },
    },
});