<template>
    <v-container fluid>
      <!-- Header Section -->
      <v-row align="center" justify="space-between" class="mb-4">
        <v-col cols="auto">
          <v-btn icon @click="goBack" color="primary">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-card-title class="text-h6 font-weight-bold text-center">Add New Invoice</v-card-title>
        </v-col>
        <v-col cols="auto"></v-col>  <!-- Empty column for spacing -->
      </v-row>
  
      <!-- Stepper -->
      <v-stepper v-model="currentStep">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1">Invoice Details</v-stepper-step>
          <v-stepper-step :active="currentStep === 2" step="2">Transaction Details</v-stepper-step>
          <v-stepper-step :disabled="currentStep < 3" step="3">Preview</v-stepper-step>
        </v-stepper-header>
  
        <v-stepper-items>
          <!-- Step 1: Invoice Details (Placeholder) -->
          <v-stepper-content step="1">
            <v-card class="pa-5" elevation="2">
              <v-card-title class="text-h5 font-weight-bold">Invoice Details</v-card-title>
              <v-divider></v-divider>
              <p>Invoice details form goes here...</p>
              <v-btn color="primary" class="mt-3" @click="nextStep">Next</v-btn>
            </v-card>
          </v-stepper-content>
  
          <!-- Step 2: Transaction Details -->
          <v-stepper-content step="2">
            <v-card class="pa-5" elevation="2">
              <v-card-title class="text-h5 font-weight-bold primary--text">Transaction Details</v-card-title>
              <v-divider></v-divider>
  
              <!-- Transaction Table -->
              <v-table class="mt-3">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Rate</th>
                    <th>Quantity</th>
                    <th>Discount (Rs.)</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td>
                      <v-text-field v-model="item.product" placeholder="Enter Product" outlined dense></v-text-field>
                    </td>
                    <td>
                      <v-text-field v-model.number="item.rate" placeholder="Enter Rate" type="number" outlined dense></v-text-field>
                    </td>
                    <td>
                      <v-text-field v-model.number="item.quantity" placeholder="Enter Quantity" type="number" outlined dense></v-text-field>
                    </td>
                    <td>
                      <v-text-field v-model.number="item.discount" placeholder="Enter Discount" type="number" outlined dense></v-text-field>
                    </td>
                    <td>
                      <span class="font-weight-bold">Rs. {{ calculateTotal(item) }}</span>
                    </td>
                    <td>
                      <v-btn icon color="red" @click="removeItem(index)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
  
              <v-btn class="mt-3" color="primary" @click="addItem">
                <v-icon>mdi-plus</v-icon> Add Product
              </v-btn>
  
              <v-divider class="my-3"></v-divider>
  
              <!-- Total Calculation -->
              <v-row align="center" justify="space-between">
                <v-col cols="6" class="text-left">  <!-- Moved text to the left -->
                  <h3 class="font-weight-bold">Total:</h3>
                </v-col>
                <v-col cols="6" class="text-right">  <!-- Aligned amount to the right -->
                  <h3 class="font-weight-bold">Rs. {{ grandTotal }}</h3>
                </v-col>
              </v-row>
  
              <v-divider class="my-3"></v-divider>
  
              <!-- Navigation Buttons -->
              <v-row>
                <v-col cols="6">
                  <v-btn outlined color="primary" @click="prevStep">Back</v-btn>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-btn color="primary" @click="nextStep">Next</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-stepper-content>
  
          <!-- Step 3: Preview -->
          <v-stepper-content step="3">
            <v-card class="pa-5" elevation="2">
              <v-card-title class="text-h5 font-weight-bold">Invoice Preview</v-card-title>
              <v-divider></v-divider>
              <p>Company: <strong>XYZ Pvt Ltd</strong></p>
              <p>Client: <strong>ABC Corp</strong></p>
              <p>Amount: <strong>Rs. {{ grandTotal }}</strong></p>
              <p>Payment Date: <strong>mm/dd/yyyy</strong></p>
              <v-divider class="my-3"></v-divider>
              <v-btn outlined color="primary" class="mt-3" @click="prevStep">Back</v-btn>
              <v-btn color="success" class="mt-3">Submit</v-btn>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </template>
  
  <script>
  import { reactive, ref, computed } from 'vue';
  
  export default {
    setup() {
      const currentStep = ref(1);
      const items = reactive([
        { product: 'Product A', rate: 10, quantity: 2, discount: 0 },
        { product: '', rate: 0, quantity: 0, discount: 0 }
      ]);
  
      const grandTotal = computed(() => {
        let total = 0;
        for (const item of items) {
          total += (item.rate * item.quantity) - item.discount;
        }
        return total;
      });
  
      const addItem = () => {
        items.push({ product: '', rate: 0, quantity: 0, discount: 0 });
      };
  
      const removeItem = (index) => {
        items.splice(index, 1);
      };
  
      const calculateTotal = (item) => {
        return (item.rate * item.quantity) - item.discount;
      };
  
      const nextStep = () => {
        if (currentStep.value < 3) {
          currentStep.value++;
        }
      };
  
      const prevStep = () => {
        if (currentStep.value > 1) {
          currentStep.value--;
        }
      };
  
      const goBack = () => {
    
        alert('Go Back to previous page!');
      };
  
  
      return {
        currentStep,
        items,
        grandTotal,
        addItem,
        removeItem,
        nextStep,
        prevStep,
        calculateTotal,
        goBack
      };
    },
  };
  </script>
  
  <style scoped>
  
  .v-text-field >>> label {
    font-size: 0.9rem;
    color: #777; 
  }
  
  .v-text-field >>> input {
    font-size: 1rem;
  }
  
  .primary--text {
      color: #1976D2 !important;  
  }
  
  </style>