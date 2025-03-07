import { createRouter, createWebHistory } from 'vue-router';
import InvoiceList from '../views/InvoiceList.vue';
import UserLogin from '../views/UserLogin.vue';
import InvoiceDetails from "@/views/InvoiceDetails.vue";
import TransactionDetails from "@/views/TransactionDetails.vue";
import InvoicePreview from "@/views/InvoicePreview.vue";
import InvoiceForm from "@/components/InvoiceForm.vue";


import store from '../store';

const routes = [
  { path: '/', redirect: '/invoices' },
  { path: '/invoices', name: 'Invoices', component: InvoiceList, meta: { requiresAuth: false} },
  { path: '/login', name: 'Login', component: UserLogin },
  { path: "/invoice-details", component: InvoiceDetails },
  { path: "/transaction-details", component: TransactionDetails },
  { path: "/Invoice-Preview", component: InvoicePreview.vue },
  { path: "/Invoice-Form", component: InvoiceForm.vue },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    console.log("Running 1 - Redirecting to Login");
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else if (to.path === '/login' && isLoggedIn) {
    console.log("Running 2 - Redirecting to Invoices");
    next('/invoices');
  } else {
    console.log("Running 3 - Proceeding to Route");
    next();
  }
});

export default router;