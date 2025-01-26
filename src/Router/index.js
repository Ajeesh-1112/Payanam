import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Bus from "@/components/Bus.vue";
import Availablebus from "@/components/availablebus.vue";
import Booking from "@/components/Booking.vue";
import Payment from "@/components/Payment.vue";
import Pnrstatus from "@/components/Pnrstatus.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/bus",
    children: [
      {
        path: "bus",
        name: "Bus",
        component: Bus,
      },
      {
        path: "pnrstatus",
        name: "Pnrstatus",
        component: Pnrstatus,
      },
      
      {
        path: "availabelbus",
        name: "availableBus",
        component: Availablebus,
      },
    ],
  },
  {
    path: "/booking",
    name: "bookingPage",
    component: Booking,
  },
  {
    path: "/payment",
    name: "payment",
    component: Payment,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
