<template>
  <v-container>
    <v-row no-gutters class="my-4">
      <v-col cols="12">
        <strong>Popular Routes</strong>
      </v-col>
      <v-col cols="12">
        <span class="text-subtitle-2 mt-2"
          >You can check popular bus routes, compare bus schedules, timings and
          their prices to book bus tickets online. AbhiBus offers you low-cost
          bus fares for your travel across India. For a seamless travel
          experience, book bus tickets online with AbhiBus for your bus
          journey.</span
        >
      </v-col>
    </v-row>
    <v-row no-gutters class="text-center mt-5">
      <v-col cols="3" class="text-start">
        <v-list class="custom-list">
          <v-list-item
            v-for="(route, index) in busRoutes1"
            :key="index"
            @click="selectedRoute(route)"
          >
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-2">
                <span class="list-dot">•</span> {{ route.from }} ➝
                {{ route.to }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="3" class="text-start">
        <v-list class="custom-list">
          <v-list-item
            @click="selectedRoute(route)"
            v-for="(route, index) in busRoutes2"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-2">
                <span class="list-dot">•</span> {{ route.from }} ➝
                {{ route.to }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="3" class="text-start">
        <v-list class="custom-list">
          <v-list-item
            @click="selectedRoute(route)"
            v-for="(route, index) in busRoutes1"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-2">
                <span class="list-dot">•</span> {{ route.from }} ➝
                {{ route.to }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "popularRoutes",
  methods: {
    selectedRoute(route) {
      this.$emit("route-selected", route);
    },
  },
  data() {
    return {
      busRoutes1: [
        { from: "Chennai", to: "Coimbatore" },
        { from: "Madurai", to: "Trichy" },
        { from: "Salem", to: "Erode" },
        { from: "Tirunelveli", to: "Thoothukudi" },
        { from: "Vellore", to: "Pondicherry" },
      ],
      busRoutes2: [
        { from: "Chennai", to: "Bangalore" },
        { from: "Coimbatore", to: "Mysore" },
        { from: "Madurai", to: "Hyderabad" },
        { from: "Trichy", to: "Pune" },
        { from: "Salem", to: "Mumbai" },
      ],
    };
  },
};
</script>
<style scoped>
.list-dot {
  color: #000;
  font-size: 14px;
  margin-right: 8px;
}
</style>
