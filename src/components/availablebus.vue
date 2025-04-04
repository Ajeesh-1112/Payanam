<template>
  <v-container
    :fluid="true"
    class="px-0 py-1 bg-grey-lighten-4"
    style="height: 91vh"
  >
    <!-- Chnage Place -->
    <v-container
      :fluid="true"
      height="84px"
      class="px-0 border bg-orange-lighten-2 mt-1"
      style="position: fixed; top: 70px; z-index: 10; left: 0; right: 0"
    >
      <v-container class="pa-0">
        <v-row no-gutters class="d-flex ga-5 align-center">
          <v-col cols="2">
            <v-autocomplete
              class="rounded-lg bg-white pa-1"
              v-model="serviceStartPlace"
              item-text="name"
              item-value="name"
              hide-details="auto"
              :items="filteredDistrictsForFrom"
              label="From"
              variant="plain"
            ></v-autocomplete>
          </v-col>
          <v-col cols="1" class="text-center ml-8">
            <div
              class="bg-orange-lighten-1 text-center"
              style="border-radius: 10px; width: 44px"
            >
              <v-icon size="40px" @click="swapValues" color="red"
                >mdi-swap-horizontal</v-icon
              >
            </div>
          </v-col>
          <v-col cols="2">
            <v-autocomplete
              class="rounded-lg bg-white pa-1"
              v-model="serviceEndPlace"
              item-text="name"
              item-value="name"
              :items="filteredDistrictsForTo"
              label="To"
              hide-details="auto"
              variant="plain"
            ></v-autocomplete>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="serviceDate"
              label="Date"
              class="bg-white rounded-lg pa-1"
              hide-details
              variant="plain"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn
              @click="getbusData()"
              class="bg-white text-orange px-10"
              color="red"
              size="large"
              variant="outlined"
            >
              <v-card-text class="py-0 font-weight-bold text-subtitle-2"
                >Modify</v-card-text
              >
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- <v-row class="d-flex align-center " no-gutters>
        <v-col  cols="2">
          <v-autocomplete
            v-model="serviceStartPlace"
            item-text="name"
            item-value="name"
            :items="filteredDistrictsForFrom"
            label="From"
            variant="outlined"
          ></v-autocomplete>
        </v-col>
        <v-col cols="1" class="text-center text-h5">
          <v-icon @click="swapValues" color="orange"
            >mdi-swap-horizontal</v-icon
          >
        </v-col>
        <v-col class="text-center" cols="2">
          <v-autocomplete
            v-model="serviceEndPlace"
            item-text="name"
            item-value="name"
            :items="filteredDistrictsForFrom"
            label="From"
            variant="outlined"
          ></v-autocomplete>
        </v-col>
        <v-col class="" cols="1">
          <v-text-field
            style="position: relative; z-index: 10"
            density="compact"
            v-model="serviceDate"
            label="Date"
            hide-details
            class="py-3"
            variant="plain"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="getbusData()" color="#FFB731" variant="outlined">
            <v-card-text
              class="py-0 text-black font-weight-bold text-subtitle-2"
              >Modify</v-card-text
            >
          </v-btn>
        </v-col>
      </v-row> -->
    </v-container>
    <v-container
      :fluid="true"
      class="px-6 py-0 d-flex"
      style="margin-top: 90px"
    >
      <div class="container" v-if="loading">
        <div class="row" style="background-color: ">
          <!-- Filters Section -->
          <div class="col-md-3">
            <div class="card p-3 shadow-sm">
              <div class="skeleton w-100 mb-3" style="height: 20px"></div>
              <div class="skeleton w-50 mb-3" style="height: 20px"></div>
              <div class="skeleton w-75 mb-3" style="height: 20px"></div>
              <div class="skeleton w-100 mb-3" style="height: 40px"></div>
              <div class="skeleton w-100 mb-3" style="height: 20px"></div>
              <div class="skeleton w-50 mb-3" style="height: 20px"></div>
              <div class="skeleton w-75 mb-3" style="height: 20px"></div>
              <div class="skeleton w-100 mb-3" style="height: 40px"></div>
            </div>
          </div>

          <!-- Bus Listings -->
          <div class="col-md-9">
            <div class="mb-3"></div>
            <div class="card p-3 mb-3 shadow-sm">
              <div class="row">
                <div class="col-md-3">
                  <div class="skeleton w-100 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
                <div class="col-md-3">
                  <div class="skeleton w-100 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-50" style="height: 15px"></div>
                </div>
                <div class="col-md-3">
                  <div class="skeleton w-50 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
                <div class="col-md-3 text-end">
                  <div class="skeleton w-50 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col text-end">
                  <div class="skeleton w-25" style="height: 35px"></div>
                </div>
              </div>
            </div>

            <div class="card p-3 mb-3 shadow-sm">
              <div class="row">
                <div class="col-md-3">
                  <div class="skeleton w-100 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
                <div class="col-md-3">
                  <div class="skeleton w-100 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-50" style="height: 15px"></div>
                </div>
                <div class="col-md-3">
                  <div class="skeleton w-50 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
                <div class="col-md-3 text-end">
                  <div class="skeleton w-50 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col text-end">
                  <div class="skeleton w-25" style="height: 35px"></div>
                </div>
              </div>
            </div>
            <div class="card p-3 mb-3 shadow-sm">
              <div class="row">
                <div class="col-md-3">
                  <div class="skeleton w-100 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
                <div class="col-md-3">
                  <div class="skeleton w-100 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-50" style="height: 15px"></div>
                </div>
                <div class="col-md-3">
                  <div class="skeleton w-50 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
                <div class="col-md-3 text-end">
                  <div class="skeleton w-50 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col text-end">
                  <div class="skeleton w-25" style="height: 35px"></div>
                </div>
              </div>
            </div>
            <div class="card p-3 mb-3 shadow-sm">
              <div class="row">
                <div class="col-md-3">
                  <div class="skeleton w-100 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
                <div class="col-md-3">
                  <div class="skeleton w-100 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-50" style="height: 15px"></div>
                </div>
                <div class="col-md-3">
                  <div class="skeleton w-50 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
                <div class="col-md-3 text-end">
                  <div class="skeleton w-50 mb-2" style="height: 20px"></div>
                  <div class="skeleton w-75" style="height: 15px"></div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col text-end">
                  <div class="skeleton w-25" style="height: 35px"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="container d-flex gap-3"
        v-else
        style="height: 78vh; overflow-y: scroll"
      >
        <template v-if="sortedBuses.length > 0">
          <!-- FILTER -->
          <v-container
            width="400px"
            height="fit-content"
            flat
            class="border bg-white pa-0"
          >
            <v-row
              no-gutters
              class="border-b pa-3 py-3 bg-grey-lighten-2 box-shadow"
            >
              <v-col class="font-weight-bold">
                <span class="text-subtitle-2 font-weight-bold">FILTER</span>
              </v-col>
            </v-row>
            <p class="pl-3 mt-1 font-weight-bold mb-0">Price</p>
            <v-row no-gutters class="pa-2 border-b">
              <v-col>
                <v-checkbox
                  append-icon="mdi-cash"
                  density="compact"
                  v-model="isPriceLowToHigh"
                  label="Price Low to High"
                ></v-checkbox>
                <v-checkbox
                  append-icon="mdi-cash-multiple"
                  density="compact"
                  v-model="isPriceHighToLow"
                  label="Price High to Low"
                ></v-checkbox>
              </v-col>
            </v-row>
            <p class="pl-3 mt-1 font-weight-bold mb-0">Bus Type</p>
            <v-row no-gutters class="pa-2 border-b">
              <v-col>
                <v-checkbox
                  append-icon="mdi-air-conditioner"
                  density="compact"
                  label="Ac"
                  v-model="isAC"
                ></v-checkbox>
                <v-checkbox
                  append-icon="mdi-close-circle-outline"
                  density="compact"
                  label="Non Ac"
                  v-model="isNonAC"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <!-- BUS DATA -->

          <v-container width="100%" class="pa-0 mb-10 bg-grey-lighten-4">
            <v-card class="bg-white pa-4 border" flat>
              <v-row no-gutters class="d-flex gap-4">
                <v-col
                  md="3"
                  sm="12"
                  cols="12"
                  style="border-radius: 20px"
                  class="pa-2"
                  v-for="(offer, i) in offers"
                  :key="i"
                  :style="{ background: offer.gradient }"
                >
                  <span class="text-subtitle-1 font-weight-bold">{{
                    offer.title
                  }}</span
                  ><br />
                  <span
                    style="font-size: 8px"
                    class="text-subtitle-2 text-grey-darken-2"
                    >{{ offer.subTitle }}</span
                  ><br />
                  <v-btn
                    width="30px"
                    class="mt-2 pa-1"
                    color="white"
                    variant="outlined"
                    rounded="lg"
                    density="compact"
                    append-icon="mdi-arrow-right"
                  >
                    <span>See</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-card v-for="(bus, i) in sortedBuses" :key="i" flat class="mb-2">
              <v-card class="bg-white d-flex">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-row no-gutters class="pa-4">
                      <v-col cols="3">
                        <strong class="d-block">{{ bus.companyName }}</strong>
                        <span class="d-block">Bharat Benz</span>
                        <span style="font-size: 12px"
                          >{{ bus.busType }} Seater
                        </span>
                      </v-col>
                      <v-col cols="2">
                        <strong class="d-block">{{ bus.departureTime }}</strong>
                        <span>{{ bus.serviceStartPlace }}</span>
                      </v-col>
                      <v-col class="d-flex align-center" cols="5">
                        <div
                          style="
                            width: 100%;
                            height: 1px;
                            background-color: grey;
                          "
                        ></div>
                        <div class="border rounded-pill pa-3">
                          <span
                            >{{
                              calculateTravelHours(
                                bus.departureTime,
                                bus.arrivalTime
                              )
                            }}
                            hrs</span
                          >
                        </div>
                        <div
                          style="
                            width: 100%;
                            height: 1px;
                            background-color: grey;
                          "
                        ></div>
                      </v-col>
                      <v-col cols="2" class="text-end">
                        <strong class="d-block">{{ bus.arrivalTime }}</strong>
                        <span>{{ bus.serviceEndPlace }}</span>
                      </v-col>
                    </v-row>
                  </v-col>

                  <!-- Ratings -->
                  <v-col class="pa-4" style="border-top: 1px dashed grey">
                    <v-row no-gutters>
                      <v-col class="d-flex align-center">
                        <div
                          class="bg-green text-center rounded-sm"
                          style="width: 56px"
                        >
                          <span>
                            4.3 <v-icon size="10px">mdi-star</v-icon>
                          </span>
                        </div>
                        <div class="bg-grey-lighten-4 pr-1 rounded-sm">
                          <span style="font-size: 10px; color: grey">
                            <v-icon size="16px" color="grey"
                              >mdi-account-outline</v-icon
                            >1234
                          </span>
                        </div>
                      </v-col>
                      <v-col>
                        <span style="font-size: 14px; color: grey">
                          Travel Policy <v-icon>mdi-menu-down</v-icon>
                        </span>
                      </v-col>
                      <v-col>
                        <span style="font-size: 14px; color: orange">
                          Cancellation Policy <v-icon>mdi-menu-down</v-icon>
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <!-- Price & Select Seat Button -->
                <v-row
                  no-gutters
                  style="border-left: 1px dashed grey"
                  class="pa-4"
                >
                  <v-col class="text-end">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <span
                          style="font-size: 16px"
                          class="d-block text-grey-darken-3"
                          >Starts at</span
                        >
                        <span class="text-h5">{{ bus.sleeperPrice }}</span>
                      </v-col>
                      <v-col class="mt-5">
                        <v-btn
                          block
                          flat
                          append-icon="mdi-menu-down"
                          color="#FEB62E"
                          class="text-white"
                          @click="toggleExpansion(i)"
                        >
                          Select Seat
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
              <v-expand-transition>
                <div v-if="expandedIndex === i" class="border-top">
                  <v-row flat class="pa-4 bg-white" no-gutters>
                    <!-- Left side seats (L1, L2) -->
                    <v-col cols="1">
                      <div
                        class="mt-16"
                        style="
                          display: grid;
                          grid-template-columns: 1fr 1fr;
                          row-gap: 10px;
                        "
                      >
                        <div
                          class="seat"
                          v-for="(seat, index) in bus.leftSeats"
                          :key="index"
                          :class="{
                            selected: seat.selected,
                            booked: seat.booked,
                          }"
                          @click="toggleSeatSelection(bus, seat)"
                        >
                          {{ seat.label }}
                        </div>
                      </div>
                    </v-col>

                    <!-- Right side seats (R1, R2) -->
                    <v-col cols="1" class="ml-4">
                      <div class="text-end mr-4 mb-1">
                        <v-icon class="text-end">mdi-tire</v-icon>
                      </div>
                      <div
                        style="
                          display: grid;
                          grid-template-columns: 1fr 1fr;
                          row-gap: 10px;
                        "
                      >
                        <div
                          class="seat"
                          v-for="(seat, index) in bus.rightSeats"
                          :key="index"
                          :class="{
                            selected: seat.selected,
                            booked: seat.booked,
                          }"
                          @click="toggleSeatSelection(bus, seat)"
                        >
                          {{ seat.label }}
                        </div>
                      </div>
                    </v-col>

                    <v-col cols="4" class="text-center">
                      <p class="mb-2">Selected Seats Numbers</p>

                      <span
                        class="mr-1"
                        v-for="(seat, i) in selectedSeats"
                        :key="i"
                      >
                        {{ seat }}</span
                      >
                      <v-btn
                        variant="outlined"
                        color="orange"
                        style="margin-top: 180px"
                        @click="bookingPage(bus)"
                        >Book your seat</v-btn
                      >
                    </v-col>
                    <v-col cols="5" class="text-end">
                      <div>
                        <p>
                          Experience a
                          <span class="font-weight-bold text-h5">3D</span>
                          Interactive Bus Seat Selection!
                        </p>
                        <p class="text-grey-darken-1" style="font-size: 13px">
                          Explore our immersive 3D seat selection feature that
                          lets you visualize and choose your preferred seat with
                          ease. Rotate, zoom, and click on any seat to select or
                          deselect in real time. Enjoy a seamless and
                          interactive booking experience like never before!
                        </p>

                        <v-dialog v-model="dialog" fullscreen>
                          <template
                            v-slot:activator="{ props: activatorProps }"
                          >
                            <v-btn
                              v-bind="activatorProps"
                              color="#FFB74D"
                              class="text-white"
                              flat
                            >
                              3D Experience
                            </v-btn>
                          </template>

                          <v-card>
                            <ThreeScene />
                          </v-card>
                        </v-dialog>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-expand-transition>
            </v-card>
          </v-container>
        </template>
        <template v-else>
          <v-container
            class="d-flex align-center justify-center"
            style="height: 100%"
          >
            <v-card class="pa-4 text-center" flat>
              <v-icon size="48" color="grey">mdi-bus-off</v-icon>
              <p class="text-h6 font-weight-bold mt-2">No Buses Available</p>
              <p class="text-body-2 text-grey">
                Please try searching for another route.
              </p>
            </v-card>
          </v-container>
        </template>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ThreeScene from "./ThreeScence.vue";
import district from "../District/district.json";

export default {
  name: "availableBus",
  components: {
    ThreeScene,
  },

  data() {
    return {
      rating: 3.5,
      isPriceLowToHigh: false,
      isPriceHighToLow: false,
      isAC: false, // Toggle for AC buses
      isNonAC: false, // Toggle for Non-AC buses
      dialog: false,
      isExpanded: false,
      districtList: [],
      selectedSeats: [],
      leftSeats: [
        "L1",
        "L2",
        "L3",
        "L4",
        "L5",
        "L6",
        "L7",
        "L8",
        "L9",
        "L10",
        "L11",
        "L12",
      ],
      rightSeats: [
        "R1",
        "R2",
        "R3",
        "R4",
        "R5",
        "R6",
        "R7",
        "R8",
        "R9",
        "R10",
        "R11",
        "R12",
        "R13",
        "R14",
      ],
      userSelectedSort: [],
      selectedDate: null,
      datesArray: [],
      offers: [
        {
          title: "Top Rated",
          subTitle: "Explore the world at the lowest Cost",
          companyName: "A1 Travels",
          gradient: "linear-gradient(to right, #ff7e5f, #feb47b)",
        },
        {
          title: "Feel Comfotable",
          subTitle: "feel the comfortable in our travel Experience",
          companyName: "Chakara Travels",
          gradient: "linear-gradient(to right, #00c6ff, #0072ff)",
        },
        {
          title: "Top Rated",
          subTitle: "Explore the world at the lowest Cost",
          companyName: "A1 Travels",
          gradient: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
        },
      ],
      availabelBus: [],
      serviceEndPlace: null,
      serviceStartPlace: null,
      serviceDate: null,
      totalPrice: null,
      totalSeats: null,
      totalTravelHrs: null,
      expandedIndex: null,
      loading: false,
    };
  },
  methods: {
    isSelected(seat) {
      return this.selectedSeats.includes(seat);
    },
    toggleSeatSelection(bus, seat) {
  if (seat.booked) return;

  seat.selected = !seat.selected;

  if (seat.selected) {
    this.selectedSeats.push(seat.label);
  } else {
    this.selectedSeats = this.selectedSeats.filter(s => s !== seat.label);
  }
},
    toggleExpansion(index) {
      this.expandedIndex = this.expandedIndex === index ? null : index;
    },
    swapValues() {
      [this.serviceStartPlace, this.serviceEndPlace] = [
        this.serviceEndPlace,
        this.serviceStartPlace,
      ];
    },

    calculateTravelHours(departureTime, arrivalTime) {
      const [depHours, depMinutes] = departureTime.split(":").map(Number);
      const [arrHours, arrMinutes] = arrivalTime.split(":").map(Number);

      const departureDate = new Date();
      departureDate.setHours(depHours, depMinutes, 0, 0); // Set departure time

      const arrivalDate = new Date();
      arrivalDate.setHours(arrHours, arrMinutes, 0, 0); // Set arrival time

      const diffInMs = Math.abs(arrivalDate - departureDate); // Always positive
      const diffInHours = diffInMs / (1000 * 60 * 60); // Convert from milliseconds to hours

      this.totalTravelHrs = diffInHours.toFixed(1);
      return diffInHours.toFixed(1);
    },

    filterSelected(type) {
      if (type === "ac") {
        this.isAcSelected = !this.isAcSelected;
      } else if (type === "nAc") {
        this.isNonAcSelected = !this.isNonAcSelected;
      } else if (type === "seater") {
        this.isSeater = !this.isSeater;
      } else {
        this.isSleeper = !this.isSleeper;
      }
    },

    selectSort(sort) {
      if (this.userSelectedSort.includes(sort.text)) {
        return;
      } else {
        this.userSelectedSort.push(sort);
        if (sort.value == "lowToHigh") {
          this.availabelBus.sort((a, b) => a.seaterPrice - b.seaterPrice);
        } else {
          this.availabelBus.sort((a, b) => b.seaterPrice - a.seaterPrice);
        }
      }
    },
    Unmounted() {
      this.userSelectedSort = [];
    },

    selectDate(date) {
      this.selectedDate = date;
    },
    totalTicketPrice(price) {
      this.totalPrice = this.selectedSeats.length * Number(price || 0); // Ensure `price` is numeric
      return this.totalPrice;
    },
    bookingPage(busDetails) {
      if (!this.selectedSeats.length > 0) {
        alert("Select atleast one seat to proceed");
        return;
      }
      const bookingDetails = {
        busdetails: busDetails,
        price: this.totalPrice,
        selectedSeats: this.selectedSeats,
        travelHrs: this.totalTravelHrs,
      };
      this.$store.commit("bookingDetails", bookingDetails);

      this.$router.push({
        name: "bookingPage",
        query: {
          from: this.serviceStartPlace,
          to: this.serviceEndPlace,
          date: this.date,
        },
      });
    },
    async getbusData() {
      this.loading = true;
      this.availabelBus = [];
      try {
        const response = await this.$axios.get(
          `https://payanam-backend.onrender.com/busServices`,
          {
            params: {
              from: this.serviceStartPlace,
              to: this.serviceEndPlace,
            },
          }
        );

        if (response.status === 200) {
          this.availabelBus = response.data;
        }

        this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.loading = false;
      }
    },
  },
  watch: {
    selectedSeats(newValue) {
      this.totalSeats = newValue;
    },
  },
  computed: {
    ...mapState(["count"]),

    filteredDistrictsForFrom() {
      return this.districtList.filter(
        (district) => district !== this.serviceEndPlace
      );
    },
    filteredDistrictsForTo() {
      return this.districtList.filter(
        (district) => district !== this.serviceStartPlace
      );
    },
    sortedBuses() {
      let filteredBuses = [...this.availabelBus];

      filteredBuses = filteredBuses.filter((bus) => {
        if (this.isAC && bus.busType === "AC") return true;
        if (this.isNonAC && bus.busType === "Non-AC") return true;
        if (!this.isAC && !this.isNonAC) return true;
        return false;
      });

      if (this.isPriceLowToHigh) {
        filteredBuses.sort((a, b) => a.sleeperPrice - b.sleeperPrice); // Low to High
      }
      if (this.isPriceHighToLow) {
        filteredBuses.sort((a, b) => b.sleeperPrice - a.sleeperPrice); // High to Low
      }

      return filteredBuses;
    },
  },

  async mounted() {
    this.districtList = district.states.flatMap((state) => state.districts);

    this.availabelBus = [];
    const { from, to, date } = this.$route.query;

    this.serviceStartPlace = from;
    this.serviceEndPlace = to;
    this.serviceDate = this.selectedDate = date;
    this.getbusData();
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i); // Increment date by `i`
      this.datesArray.push(nextDate.toDateString());
    }
  },
};
</script>

<style scoped>
.box-shadow {
  box-shadow: 0px 0px 10px 1px rgb(128, 128, 128, 0.3);
}
.selected-btn {
  color: red;
  border: 2px solid red; /* Match border to background */
}
.skeleton {
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite linear;
  border-radius: 4px;
}
.seat {
  border: 1px solid #ccc;
  font-size: 12px;
  padding: 4px;
  text-align: center;
  cursor: pointer;
  margin-right: 4px;
  transition: background 0.3s ease;
}

.seat.selected {
  background: #4caf50;
  color: white;
}
::v-deep(.v-input--density-compact) {
  --v-input-control-height: 0px;
  --v-input-padding-top: 0px !important;
}
@keyframes loading {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f5f5f5;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #feb62e;
}

.seat.booked {
  background-color: grey;
  color: white;
  cursor: not-allowed;
}

</style>
