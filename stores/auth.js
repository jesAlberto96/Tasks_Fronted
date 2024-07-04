export const useAuthStore = defineStore("auth", {
  state: () => (
    { user: {} }
  ),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    async login({ email, password }) {
      const token = useTokenStore();
      const data = await $fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      });

      if (data.success){
        this.commonSetter(data.data);
      }

      return data;
    },
    async logout() {
      const tokenStore = useTokenStore();
      const response = await $fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          "Cache-Control": "no-cache",
          Authorization: `Bearer ${tokenStore.getToken}`,
        }
      });

      tokenStore.removeToken();

      return navigateTo('/auth/login');
    },

    commonSetter(data){
      const tokenStore = useTokenStore();
      tokenStore.setToken(data.token);
      this.user = data.user;
      return navigateTo('/dashboard');
    }
  },
});
