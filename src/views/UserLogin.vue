<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4 text-center">
          <v-img :width="300" aspect-ratio="16/9" cover src="@/assets/codenicely.png"></v-img>
          <h1 class="text-h5 font-weight-bold">Authentication</h1>

          <v-form ref="form" @submit.prevent="login">
          
            <v-alert v-if="errorMessage" type="error" prominent dismissible class="mb-3">
              {{ errorMessage }}
            </v-alert>

           
            <v-text-field v-model="email" label="Email" outlined prepend-icon="mdi-email" :rules="emailRules"
              required aria-label="Email Address"></v-text-field>

           
            <v-text-field v-model="password" label="Password" outlined prepend-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="showPassword = !showPassword" :rules="passwordRules" required aria-label="Password">
            </v-text-field>

            
            <transition name="fade">
              <v-btn type="submit" color="primary" block large :loading="loading" :disabled="loading">
                Log In
              </v-btn>
            </transition>
          </v-form>

          <v-divider class="my-3"></v-divider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      errorMessage: null,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Valid email required'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Minimum 6 characters'
      ]
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    return { store, router };
  },
  methods: {
    async login() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;
      this.errorMessage = null;

      try {
        
        await this.store.dispatch('login', {
          email: this.email,
          password: this.password,
        });

     
        if (this.store.state.loginError) {
          this.errorMessage = this.store.state.loginError;
        } else {
          // Redirect to the invoice list page after successful login
          this.router.push('/invoices');
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.errorMessage = "Something went wrong. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #1877f2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>