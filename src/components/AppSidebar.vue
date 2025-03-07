<template>
  <v-navigation-drawer app permanent>
    <v-list nav dense>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :width="300" aspect-ratio="16/9" cover src="@/assets/codenicely.png"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :class="{ 'active-menu': $route.path === item.path }"
      >
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <div class="logout-container">
      <v-footer class="pa-3">
        <v-btn class="logout-button" outlined @click="logout">Logout</v-btn>
      </v-footer>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const logout = () => {
      store.dispatch('logout'); // Dispatch the logout action
      router.push('/login');
    };

    // const menuItems = [
    //   { path: "/team", label: "Team" },
    //   { path: "/invoices", label: "Invoice" },
    //   { path: "/login", label: "Login" },
    //   { path: "/invoice/create", label: "Invoice Create" }
    // ];

    return {
      router,
      store,
      logout,
      menuItems
    };
  },
};
</script>

<style scoped>
.logout-container {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.active-menu {
  background-color: #2e81ee !important;
  color: white !important;
  font-weight: bold;
  border-radius: 4px;
}
</style>
