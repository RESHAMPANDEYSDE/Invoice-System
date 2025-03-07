<template>
    <v-app>
      <Header />
      <Sidebar />
      <v-main>
        <v-container>
          <router-view /><template>
    <v-app>
      <Header />
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </template>
  
  <script>
  import Header from '@/components/AppHeader.vue';
  import Footer from '@/components/AppFooter.vue';
  
  export default {
    components: {
      Header,
      Footer,
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </template>
  
  <script>
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    components: {
      Header,
      Sidebar,
      Footer,
    },
  };
  </script>
  
  <style scoped>
  </style>