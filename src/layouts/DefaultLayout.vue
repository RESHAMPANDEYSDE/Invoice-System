
<template>
    <div class="default-layout">
      <Sidebar />
      <div class="content">
        <Header />
        <router-view></router-view>
        <Footer />
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    components: {
      Sidebar,
      Header,
      Footer
    }
  };
  </script>
  
  <style>
  .default-layout {
    display: flex;
  }
  .content {
    flex: 1;
    padding: 20px;
  }
  </style>
  