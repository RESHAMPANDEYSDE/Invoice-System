// src/components/InvoiceStatistics.vue (or StatisticsCard.vue)
<template>
  <v-row>
    <v-col cols="4">
      <v-card>
        <v-card-title>Total Invoices</v-card-title>
        <v-card-text>{{ totalInvoices }}</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>User Generated Invoices</v-card-title>
        <v-card-text>{{ userGeneratedInvoices }}</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>Panel Generated Invoices</v-card-title>
        <v-card-text>{{ panelGeneratedInvoices }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InvoiceStatistics', // Changed component name
  props: {
    totalInvoices: {
      type: Number,
      required: true,
    },
    userGeneratedInvoices: {
      type: Number,
      required: true,
    },
    panelGeneratedInvoices: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>