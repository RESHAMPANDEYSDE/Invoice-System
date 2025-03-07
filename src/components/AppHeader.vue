<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>
      <v-img
        :width="100"
        src="@/assets/codenicely.png" // Replace with your logo path
        alt="Code Nicely"
        contain
      />
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped>
/* Add custom styles here */
</style>