<template>
    <v-container>
      <v-card class="pa-5">
        <v-card-title class="text-h5 font-weight-bold">Add New Invoice</v-card-title>
  
        <!-- Stepper -->
        <v-stepper v-model="currentStep">
          <v-stepper-header>
            <v-stepper-step :complete="currentStep > 1" step="1">Invoice Details</v-stepper-step>
            <v-stepper-step :complete="currentStep > 2" step="2">Transaction Details</v-stepper-step>
            <v-stepper-step step="3">Preview</v-stepper-step>
          </v-stepper-header>
  
          <v-stepper-items>
            <!-- Step 1: Invoice Details -->
            <v-stepper-content step="1">
              <v-card class="pa-5">
                <!-- Company Details Section -->
                <v-card-title>Company Details</v-card-title>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.companyName"
                      label="Company Name"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.companyMobile"
                      label="Mobile No."
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule, mobileRule]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.gstin"
                      label="GSTIN"
                      outlined
                      dense
                      class="custom-input"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.companyEmail"
                      label="Email"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule, emailRule]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="invoice.companyAddress"
                      label="Company Address"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule]"
                    ></v-textarea>
                  </v-col>
                </v-row>
  
                <v-divider class="my-3"></v-divider>
  
                <!-- Invoice To Details Section -->
                <v-card-title>Invoice To Details</v-card-title>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.clientName"
                      label="Client Name"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.clientMobile"
                      label="Client Mobile No."
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule, mobileRule]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.clientEmail"
                      label="Client Email"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule, emailRule]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.pincode"
                      label="Pincode"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule, pincodeRule]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="invoice.clientAddress"
                      label="Client Address"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule]"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.clientCity"
                      label="City"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.clientState"
                      label="State"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule]"
                    ></v-text-field>
                  </v-col>
                </v-row>
  
                <v-btn color="primary" class="mt-3" @click="nextStep">Next</v-btn>
              </v-card>
            </v-stepper-content>
  
            <!-- Step 2: Transaction Details -->
            <v-stepper-content step="2">
              <v-card class="pa-5">
                <v-card-title>Transaction Details</v-card-title>
                <v-divider></v-divider>
  
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.invoiceNumber"
                      label="Invoice Number"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.invoiceDate"
                      label="Invoice Date"
                      type="date"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule]"
                    ></v-text-field>
                  </v-col>
  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="invoice.dueDate"
                      label="Due Date"
                      type="date"
                      outlined
                      dense
                      class="custom-input"
                      :rules="[requiredRule]"
                    ></v-text-field>
                  </v-col>
  
                  <!-- Dynamic Items List -->
                  <v-col cols="12">
                    <v-card elevation="2">
                      <v-card-title>Items</v-card-title>
                      <v-divider></v-divider>
                      <v-list>
                        <v-list-item v-for="(item, index) in invoice.items" :key="index">
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                v-model="item.name"
                                label="Item Name"
                                outlined
                                dense
                                class="custom-input"
                                :rules="[requiredRule]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                              <v-text-field
                                v-model.number="item.quantity"
                                label="Quantity"
                                type="number"
                                outlined
                                dense
                                class="custom-input"
                                :rules="[requiredRule]"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                              <v-text-field
                                v-model.number="item.rate"
                                label="Rate"
                                type="number"
                                outlined
                                dense
                                class="custom-input"
                                :rules="[requiredRule]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-btn icon color="error" @click="removeItem(index)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item>
                      </v-list>
                      <v-card-actions class="pa-4">
                        <v-btn color="success" @click="addItem">Add Item</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
  
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.number="invoice.taxRate"
                      label="Tax Rate (%)"
                      type="number"
                      outlined
                      dense
                      class="custom-input"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="invoice.paymentTerms"
                      label="Payment Terms"
                      outlined
                      dense
                      class="custom-input"
                    ></v-textarea>
                  </v-col>
                </v-row>
  
                <v-btn color="primary" class="mt-3" @click="nextStep">Next</v-btn>
                <v-btn text class="mt-3" @click="previousStep">Back</v-btn>
              </v-card>
            </v-stepper-content>
  
            <!-- Step 3: Preview -->
            <v-stepper-content step="3">
              <v-card class="pa-5">
                <v-card-title>Invoice Preview</v-card-title>
                <v-divider></v-divider>
  
                <!-- Display Invoice Data Here -->
                <v-card-text>
                  <p><strong>Company Name:</strong> {{ invoice.companyName }}</p>
                  <p><strong>Company Address:</strong> {{ invoice.companyAddress }}</p>
                  <p><strong>Client Name:</strong> {{ invoice.clientName }}</p>
                  <p><strong>Client Address:</strong> {{ invoice.clientAddress }}</p>
                  <p><strong>Invoice Number:</strong> {{ invoice.invoiceNumber }}</p>
                  <p><strong>Invoice Date:</strong> {{ invoice.invoiceDate }}</p>
                  <p><strong>Due Date:</strong> {{ invoice.dueDate }}</p>
  
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">Item</th>
                        <th class="text-left">Quantity</th>
                        <th class="text-left">Rate</th>
                        <th class="text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in invoice.items" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.rate }}</td>
                        <td>{{ item.quantity * item.rate }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-text>
  
                <v-btn color="success" class="mt-3" @click="submitInvoice">Submit Invoice</v-btn>
                <v-btn text class="mt-3" @click="previousStep">Back</v-btn>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { reactive, ref } from "vue";
  
  export default {
    setup() {
      const currentStep = ref(1);
  
      const invoice = reactive({
        companyName: "",
        companyMobile: "",
        gstin: "",
        companyEmail: "",
        companyAddress: "",
        clientName: "",
        clientMobile: "",
        clientEmail: "",
        pincode: "",
        clientAddress: "",
        clientCity: "",
        clientState: "",
        invoiceNumber: "",
        invoiceDate: "",
        dueDate: "",
        items: [
          { name: "Product A", quantity: 1, rate: 100 }, // Initial item
        ],
        taxRate: 0,
        paymentTerms: "",
      });
  
      // Validation Rules
      const requiredRule = (value) => !!value || "This field is required";
      const emailRule = (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      };
      const mobileRule = (value) => {
        return /^[0-9]{10}$/.test(value) || "Invalid Mobile Number";
      };
      const pincodeRule = (value) => {
        return /^[0-9]{6}$/.test(value) || "Invalid Pincode";
      };
  
      const nextStep = () => {
        if (currentStep.value < 3) {
         
          currentStep.value++;
        }
      };
  
      const previousStep = () => {
        if (currentStep.value > 1) currentStep.value--;
      };
  
      const submitInvoice = () => {
        
        console.log("Invoice submitted:", invoice);
      
        alert("Invoice Submitted!");
      };
  
      const addItem = () => {
        invoice.items.push({ name: "", quantity: 1, rate: 0 });
      };
  
      const removeItem = (index) => {
        invoice.items.splice(index, 1);
      };
  
      return {
        currentStep,
        invoice,
        nextStep,
        previousStep,
        submitInvoice,
        requiredRule,
        emailRule,
        mobileRule,
        pincodeRule,
        addItem,
        removeItem,
      };
    },
  };
  </script>
  
  <style scoped>
  .custom-input >>> input {
    color: #333;
    font-weight: 500;
  }
  
  .custom-input >>> label {
    color: #666;
    font-weight: bold;
  }
  
  .v-card-title {
    color: #1976d2;
  }
  
  .v-btn {
    min-width: 100px;
  }
  
  /* Improve overall card styling */
  .v-card {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Style the Stepper */
  .v-stepper-header {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
  }
  
  .v-stepper-step {
    margin-right: 8px; 
  }
  
  .v-stepper-step--active {
    color: #1976d2; 
  }
  

  .v-card-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .v-divider {
    margin: 0.75rem 0;
  }
  </style>