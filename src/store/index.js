import { createStore } from 'vuex';
import axios from 'axios'; // Import axios

const store = createStore({
  state: {
    token: localStorage.getItem('token') || null, // Initialize token from localStorage
    loginError: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token); // Store token in localStorage
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
    SET_LOGIN_ERROR(state, error) {
      state.loginError = error;
    },
    CLEAR_LOGIN_ERROR(state) {
      state.loginError = null;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit('CLEAR_LOGIN_ERROR'); // Clear any previous errors
        // Make an API call to your backend's login endpoint (replace with your actual endpoint)
        const response = await axios.post('/api/login', credentials);
        const token = response.data.token; // Assuming the API returns a token
        commit('SET_TOKEN', token); // Commit the token to the state
      } catch (error) {
        console.error('Login failed:', error);
        let errorMessage = "Login failed. Please check your credentials.";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; // Get the error message from the API
        }
        commit('SET_LOGIN_ERROR', errorMessage); // Set the error message in the store
        throw error; // Re-throw the error to be caught in the component
      }
    },
    logout({ commit }) {
      commit('CLEAR_TOKEN'); // Clear the token from the state
    }
  },
  getters: {
    isLoggedIn: state => !!state.token, // Check if a token exists in the state
    getToken: state => state.token //return the token,
  }
});

export default store;