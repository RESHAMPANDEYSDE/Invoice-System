<template>
    <v-container>
      <v-card class="pa-5" elevation="2">
        <!-- Header Section -->
        <v-row align="center" justify="space-between" class="mb-4">
          <v-col cols="auto">
            <v-btn icon @click="$emit('goBack')" color="primary">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-card-title class="text-h6 font-weight-bold text-center">Add New Invoice</v-card-title>
          </v-col>
          <v-col cols="auto"></v-col> <!-- Empty column for spacing -->
        </v-row>
  
        <!-- Stepper Navigation -->
        <v-row class="mb-4">
          <v-col>
            <v-stepper v-model="step">
              <v-stepper-header>
                <v-stepper-step complete step="1">Invoice Details</v-stepper-step>
                <v-stepper-step complete step="2">Transaction Details</v-stepper-step>
                <v-stepper-step active color="primary" step="3">
                  Preview
                  <small>(Active)</small>
                </v-stepper-step>
              </v-stepper-header>
            </v-stepper>
          </v-col>
        </v-row>
  
        <!-- Company Information -->
        <v-row>
          <v-col cols="12" class="text-right">
            <v-card flat>
              <v-card-text>
                <div>Mobile: +91-9837589372</div>
                <div>Email: company.email@gmail.com</div>
                <div>GSTIN: 09AAACH7409R1ZZ</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
  
        <!-- Invoice Heading -->
        <v-row class="mt-4">
          <v-col cols="6">
            <div class="text-h4 font-weight-bold">{{ invoice.companyName }}</div>
            <div>
              Invoice: <strong class="green--text">HIGHLIGHTED</strong>
            </div>
            <div>Date: {{ invoiceDate }}</div>
          </v-col>
          <v-col cols="6" class="text-right">
            <div class="text-h6 font-weight-bold">Invoice Number: #{{ invoiceNumber }}</div>
          </v-col>
        </v-row>
  
        <!-- Client Information -->
        <v-row class="mt-4">
          <v-col cols="6">
            <div>
              <strong>INVOICE TO:</strong>
            </div>
            <div><strong>{{ invoice.clientName }}</strong></div>
            <div>Mobile: +91-9837589372</div>
            <div>Email: {{ invoice.clientEmail }}</div>
            <div>Address: {{ invoice.clientAddress }}, {{ invoice.clientCity }}, {{ invoice.clientState }} {{ invoice.pincode }}</div>
          </v-col>
          <v-col cols="6"></v-col>
        </v-row>
  
        <!-- Transaction Table -->
        <v-row>
          <v-col>
            <v-table class="mt-3 invoice-table" style="background-color: #ffffe0;">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Rate</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ item.product }}</td>
                  <td>Rs. {{ item.rate }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>Rs. {{ item.discount }}</td>
                  <td>Rs. {{ calculateTotal(item) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
  
        <!-- Grand Total -->
        <v-row justify="end" class="mt-4">
          <v-col cols="6"></v-col> 
          <v-col cols="6">
            <v-row align="center" justify="space-between">
              <v-col cols="auto" class="text-left">
                <strong>Total</strong>
              </v-col>
              <v-col cols="auto">
                <v-divider vertical></v-divider>
              </v-col>
              <v-col cols="auto" class="text-right">
                <strong>Rs. {{ grandTotal }}</strong>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
  
        <!-- Navigation Buttons -->
        <v-row class="mt-4">
          <v-col cols="6"></v-col> <!-- Empty col for spacing -->
          <v-col cols="6" class="text-right">
            <v-btn outlined color="primary" class="mr-2" @click="$emit('goBack')">Back</v-btn>
            <v-btn color="primary" @click="$emit('submitInvoice')">Done</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { computed, ref } from "vue";
  
  export default {
    props: ["invoice", "items"],
    setup(props) {
      const invoiceNumber = "3456789"; // Static, can be dynamic
      const invoiceDate = new Date().toLocaleDateString();
      const step = ref(3); // Active Preview step
  
      const calculateTotal = (item) => item.rate * item.quantity - item.discount;
      const grandTotal = computed(() => props.items.reduce((sum, item) => sum + calculateTotal(item), 0));
  
      return { invoiceNumber, invoiceDate, calculateTotal, grandTotal, step };
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  .invoice-table th {
    font-weight: bold;
    border: 1px solid #ddd;
  }
  
  .invoice-table td {
    border: 1px solid #ddd;
  }
  </style>