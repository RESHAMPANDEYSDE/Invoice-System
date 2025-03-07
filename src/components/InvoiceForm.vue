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
        <v-col cols="auto"></v-col>
      </v-row>
  
      <!-- Stepper -->
      <v-stepper v-model="currentStep">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1">Invoice Details</v-stepper-step>
          <v-stepper-step :complete="currentStep > 2" :active="currentStep === 2" step="2">Transaction Details</v-stepper-step>
          <v-stepper-step :disabled="currentStep < 3" step="3">Preview</v-stepper-step>
        </v-stepper-header>
  
        <v-stepper-items>
          <!-- Step 1: Invoice Details  -->
          <v-stepper-content step="1">
            <v-card class="pa-5" elevation="2">
              <v-card-title class="text-h5 font-weight-bold">Invoice Details</v-card-title>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="invoice.companyName" label="Company Name" outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="invoice.companyMobile" label="Mobile No." outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="invoice.clientName" label="Client Name" outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="invoice.clientEmail" label="Client Email" outlined dense></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="invoice.clientAddress" label="Client Address" outlined dense></v-textarea>
                </v-col>
              </v-row>
              <v-btn color="primary" class="mt-3" @click="nextStep">Next</v-btn>
            </v-card>
          </v-stepper-content>
  
          <!-- Step 2: Transaction Details -->
          <v-stepper-content step="2">
            <transaction-details
              :items="items"
              @add-item="addItem"
              @remove-item="removeItem"
            />
            <v-row>
              <v-col cols="6">
                <v-btn outlined color="primary" @click="prevStep">Back</v-btn>
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn color="primary" @click="nextStep">Next</v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
  
          <!-- Step 3: Preview -->
          <v-stepper-content step="3">
            <invoice-preview
              :invoice="invoice"
              :items="items"
              @goBack="prevStep"
              @submitInvoice="handleSubmit"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </template>
  
  <script>
  import { reactive, ref } from 'vue';
  import InvoicePreview from '../views/InvoicePreview.vue';
  import TransactionDetails from '../views/TransactionDetails.vue';
  
  export default {
    components: {
      InvoicePreview, 
      TransactionDetails
    },
    setup() {
      const currentStep = ref(1);
      const invoice = reactive({
        companyName: "",
        companyMobile: "",
        clientName: "",
        clientEmail: "",
        clientAddress: "",
      });
      const items = reactive([
        { product: 'Product A', rate: 10, quantity: 2, discount: 0 },
        { product: '', rate: 0, quantity: 0, discount: 0 }
      ]);
  
      const addItem = () => {
        items.push({ product: '', rate: 0, quantity: 0, discount: 0 });
      };
  
      const removeItem = (index) => {
        items.splice(index, 1);
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
  
      const handleSubmit = () => {
       
        console.log('Invoice submitted:', invoice, items);
        alert('Invoice Submitted!'); 
      };
  
      return {
        currentStep,
        invoice,
        items,
        addItem,
        removeItem,
        nextStep,
        prevStep,
        goBack,
        handleSubmit,
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