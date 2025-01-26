<template>
  <v-container :fluid="true" class="px-0 py-0">
    <!-- Chnage Place -->
    <v-container
      :fluid="true"
      class="px-4 pt-6 border"
      style="
        background-color: #f9f9f9;
        position: fixed;
        top: 70px;
        z-index: 10;
        left: 0;
        right: 0;
      "
    >
      <v-row class="d-flex align-center px-6">
        <v-col class="py-0 px-4" cols="1">
          <v-text-field
            v-model="serviceStartPlace"
            density="compact"
            label="From"
            hide-details
            class="py-3"
            variant="plain"
          ></v-text-field>
        </v-col>
        <v-col cols="1" class="text-center text-h5">
          <v-icon color="red">mdi-swap-horizontal</v-icon>
        </v-col>
        <v-col class="py-0" cols="1">
          <v-text-field
            v-model="serviceEndPlace"
            density="compact"
            label="To"
            hide-details
            color="blue"
            class="py-3"
            variant="plain"
          ></v-text-field>
        </v-col>
        <v-col class="py-0 mx-10" cols="1">
          <v-text-field
            density="compact"
            v-model="serviceDate"
            label="Date"
            hide-details
            class="py-3"
            variant="plain"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn>
            <v-card-text class="py-0 font-weight-bold text-subtitle-2"
              >Modify</v-card-text
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      v-if="availabelBus && availabelBus.length > 0"
      :fluid="true"
      class="px-6 py-0 d-flex"
      style="background-color: #f9f9f9; margin-top: 80px"
    >
      <!-- Filter Section -->
      <v-skeleton-loader
        type=" article, actions"
        :loading="loadingBuses"
        class="mr-6"
        flat
        style="width: 400px"
      >
        <v-row>
          <v-col>
            <v-card-text class="text-subtitle-1 font-weight-bold"
              >Filters</v-card-text
            >
          </v-col>
          <v-col class="d-flex align-center justify-end">
            <v-icon color="grey">mdi-sort-variant</v-icon>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="d-flex flex-column">
          <v-col class="py-0">
            <v-card-text class="font-weight-bold">Ac</v-card-text>
          </v-col>
          <v-col class="d-flex py-0 justify-space-evenly">
            <v-btn
              variant="outlined"
              density="comfortable"
              prepend-icon="mdi-sun-snowflake"
              :class="{ 'selected-btn': isAcSelected }"
              @click="filterSelected('ac')"
            >
              AC
            </v-btn>
            <v-btn
              variant="outlined"
              density="comfortable"
              prepend-icon="mdi-sun-snowflake"
              :class="{ 'selected-btn': isNonAcSelected }"
              @click="filterSelected('nAc')"
            >
              Non-Ac
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="mt-8 mb-2"></v-divider>

        <v-row class="d-flex flex-column">
          <v-col class="py-0">
            <v-card-text class="text-subtitle-2 font-weight-bold"
              >Seat Type</v-card-text
            >
          </v-col>
          <v-col class="d-flex justify-space-evenly">
            <v-btn
              variant="outlined"
              density="comfortable"
              prepend-icon="mdi-sun-snowflake"
              :class="{ 'selected-btn': isSeater }"
              @click="filterSelected('seater')"
            >
              Seeter
            </v-btn>
            <v-btn
              density="comfortable"
              variant="outlined"
              prepend-icon="mdi-sun-snowflake"
              :class="{ 'selected-btn': isSleeper }"
              @click="filterSelected('sleeper')"
            >
              Sleeper
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="mt-8"></v-divider>
        <v-row class="d-flex flex-column">
          <v-col>
            <v-card-text class="font-weight-bold">Departure Time</v-card-text>
            <v-list>
              <v-list-item
                class="pa-0 pl-4 ma-0"
                v-for="(time, i) in departureTime"
                :key="i"
              >
                <v-checkbox
                  color="red"
                  density="compact"
                  :prepend-icon="time.icon"
                  class="custom-checkbox"
                  :label="time.text"
                ></v-checkbox>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-skeleton-loader>
      <v-card width="100%" color="#F5F5F5" flat>
        <v-container class="px-0 py-0 rounded-b-lg bg-white">
          <!-- Top Date -->
          <v-sheet max-width="1300">
            <v-slide-group hide-arrows class="ma-2">
              <v-slide-group-item v-for="(date, i) in datesArray" :key="i">
                <v-btn
                  :color="selectedDate === date ? 'primary' : 'grey'"
                  class="ma-2 px-0 py-0"
                  variant="plain"
                  size="small"
                  @click="selectDate(date)"
                >
                  <v-card-text class="px-0 py-0">{{ date }}</v-card-text>
                </v-btn>
                <v-divider vertical></v-divider>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
          <v-divider></v-divider>
          <!-- Offers Card -->
          <v-sheet>
            <v-skeleton-loader
              :loading="loadingBuses"
              class="my-2 mx-2"
              type="list-item-two-line,actions"
            >
              <v-slide-group show-arrows>
                <v-slide-group-item v-for="(offer, i) in offers" :key="i">
                  <v-card
                    class="py-4 px-2 rounded-xl my-2 mx-4"
                    :style="{
                      background: offer.gradient,
                      color: 'white',
                    }"
                  >
                    <v-row>
                      <v-col class="px-0">
                        <v-card-title>{{ offer.title }}</v-card-title>
                        <v-card-subtitle>
                          {{ offer.subTitle }}
                        </v-card-subtitle>
                        <v-btn
                          append-icon="mdi-arrow-right"
                          class="ml-4 my-2 rounded-lg"
                          color="white"
                          variant="outlined"
                        >
                          <v-card-text class="px-0 py-0 text-white"
                            >Book Seat</v-card-text
                          >
                        </v-btn>
                      </v-col>
                      <v-col class="px-0">
                        <v-card-text>
                          <v-icon>mdi-magnify</v-icon>
                          {{ offer.companyName }}
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-slide-group-item>
              </v-slide-group>
            </v-skeleton-loader>
          </v-sheet>
          <!-- Sort By  -->
          <v-sheet class="d-flex justify-space-between">
            <v-card-text class="font-weight-bold">
              {{ availabelBus ? availabelBus.length : 0 }} Bus available
            </v-card-text>
            <v-spacer></v-spacer>
            <v-chip-group
              class="text-end"
              v-for="(sort, i) in userSelectedSort"
              :key="i"
            >
              <v-chip
                @click:close="removeChip(index, sort.value)"
                closable
                class="bg-red"
                variant="tonal"
                >{{ sort.text }}</v-chip
              >
            </v-chip-group>
            <v-spacer></v-spacer>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-card-text class="text-end" v-bind="props"
                  >Sort By <v-icon>mdi-menu-down</v-icon>
                </v-card-text>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in sortItems"
                  :key="index"
                  @click="selectSort(item)"
                  :value="index"
                >
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-sheet>
        </v-container>
        <v-container class="px-0">
          <v-skeleton-loader
            type="card,actions"
            class="mt-4 px-2 py-2 rounded-lg"
            v-for="(bus, i) in availabelBus"
            :key="i"
            :loading="loadingBuses"
          >
            <v-row class="d-flex align-start">
              <v-col>
                <v-card-title>{{ bus.companyName }}</v-card-title>
                <v-card-subtitle
                  >{{ bus.busType }} sleeper/seater(2+1)</v-card-subtitle
                >
              </v-col>

              <v-col class="d-flex">
                <v-card-title class="text-subtitle-2">
                  <span class="text-h6 font-weight-bold">{{
                    bus.departureTime
                  }}</span>
                </v-card-title>
                <v-card-title class="text-h6 text-red">
                  ____{{
                    calculateTravelHours(bus.departureTime, bus.arrivalTime)
                  }}hrs_____
                </v-card-title>
                <v-card-title class="text-subtitle-2">
                  <span class="text-h6 font-weight-bold">{{
                    bus.arrivalTime
                  }}</span>
                </v-card-title>
              </v-col>
              <v-col class="text-end"
                ><v-card-text class="text-subtitle-1 font-weight-bold">{{
                  bus.seaterPrice
                }}</v-card-text>
                <v-card-text class="text-red py-0 pt-2"
                  >{{ bus.totalSeat }} Seats Left</v-card-text
                >
              </v-col>
            </v-row>
            <v-row style="width: 100%">
              <v-col>
                <v-rating
                  half-increments
                  readonly
                  v-model="rating"
                  active-color="primary"
                />
                <v-card-subtitle>{{ rating }}</v-card-subtitle>
              </v-col>

              <v-col class="text-end">
                <v-btn color="#D84E55" @click="toggleSeatLayout(i)">
                  {{ expandedIndex === i ? "Hide Seats" : "Select Seat" }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="ml-6">
              <v-expand-transition>
                <v-card flat v-if="expandedIndex === i" class="pt-4">
                  <v-row class="py-2 px-4">
                    <!-- LOwer Deck -->
                    <v-col cols="2">
                      <h4 class="mb-4">Lower Deck</h4>
                      <v-row
                        style="display: grid; grid-template-columns: 1fr 1fr"
                      >
                        <v-col
                          v-for="(seat, i) in lowerDeckSeats"
                          :key="i"
                          cols="auto"
                        >
                          <v-btn
                            :disabled="seat.booked"
                            :color="
                              seat.booked
                                ? 'blue'
                                : seat.selected
                                ? 'red'
                                : 'default'
                            "
                            @click="toggleSeatSelection(seat)"
                            outlined
                            size="small"
                          >
                            {{ seat.label }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- Upper Deck -->
                    <v-col cols="2">
                      <h4 class="mb-4">Upper Deck</h4>
                      <v-row
                        style="display: grid; grid-template-columns: 1fr 1fr"
                      >
                        <v-col
                          v-for="(seat, i) in upperDeckSeats"
                          :key="i"
                          cols="auto"
                        >
                          <v-btn
                            :disabled="seat.booked"
                            :color="
                              seat.booked
                                ? 'blue'
                                : seat.selected
                                ? 'red'
                                : 'default'
                            "
                            size="small"
                            @click="toggleSeatSelection(seat)"
                            outlined
                          >
                            {{ seat.label }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="2" class="d-flex align-end flex-column justify-center">
                      <v-card-text
                        >Seat No :{{ selectedSeats.join(", ") }}</v-card-text
                      >
                      <v-card-title
                        >Price:{{
                          totalTicketPrice(bus.seaterPrice)
                        }}</v-card-title
                      >
                      <v-btn
                        :disabled="!anySeatsSelected"
                        color="blue"
                        @click="bookingPage(bus)"
                        >Book ticket</v-btn
                      >
                    </v-col>
                    <v-col cols="6">
                      <ThreeScene />
                    </v-col>
                  </v-row>
                </v-card>
              </v-expand-transition>
            </v-row>
          </v-skeleton-loader>
        </v-container>
      </v-card>
    </v-container>
    <v-container v-else height="90vh">
      <v-img src="/Nobuses.webp"></v-img>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ThreeScene from "./ThreeScene.vue";
export default {
  name: "availableBus",
  components: {
    ThreeScene,
  },

  data() {
    return {
      rating: 3.5,
      isAcSelected: false,
      isNonAcSelected: false,
      isSeater: false,
      isSleeper: false,
      departureTime: [
        {
          text: "Before 6 AM",
          icon: "mdi-weather-sunset-up",
        },
        {
          text: "6 am to 12pm",
          icon: "mdi-weather-sunset",
        },

        {
          text: "12 pm to 6pm",
          icon: "mdi-sun-thermometer-outline",
        },
        {
          text: "After 6pm",
          icon: "mdi-moon-waning-crescent",
        },
      ],
      sortItems: [
        {
          text: "price Low to high",
          value: "lowToHigh",
        },
        {
          text: "Price High to Low",
          value: "highToLow",
        },
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
          subTitle: "feel the comfortable in our travel",
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
      lowerDeckSeats: [
        { label: "L1", selected: false, booked: false },
        { label: "L2", selected: false, booked: false },
        { label: "L3", selected: false, booked: false },
        { label: "L4", selected: false, booked: false },
        { label: "L5", selected: false, booked: false },
        { label: "L6", selected: false, booked: false },
        { label: "L7", selected: false, booked: false },
        { label: "L8", selected: false, booked: false },
        { label: "L9", selected: false, booked: false },
        { label: "L10", selected: false, booked: false },
        { label: "L11", selected: false, booked: false },
        { label: "L12", selected: false, booked: false },
        { label: "L13", selected: false, booked: false },
        { label: "L14", selected: false, booked: false },
      ],
      upperDeckSeats: [
        { label: "U1", selected: false, booked: false },
        { label: "U2", selected: false, booked: false },
        { label: "U3", selected: false, booked: false },
        { label: "U4", selected: false, booked: false },
        { label: "U5", selected: false, booked: false },
        { label: "U6", selected: false, booked: false },
        { label: "U7", selected: false, booked: false },
        { label: "U8", selected: false, booked: false },
        { label: "U9", selected: false, booked: true },
        { label: "U10", selected: false, booked: false },
        { label: "U11", selected: false, booked: false },
        { label: "U12", selected: false, booked: false },
        { label: "U13", selected: false, booked: false },
        { label: "U14", selected: false, booked: false },
      ],
      loadingBuses: false,
      availabelBus: [],
      serviceEndPlace: null,
      serviceStartPlace: null,
      serviceDate: null,
      totalPrice: null,
      totalSeats: null,
      totalTravelHrs: null,
      expandedIndex: null,
    };
  },
  methods: {
    toggleSeatLayout(index) {
      this.expandedIndex = this.expandedIndex === index ? null : index;
    },
    toggleSeatSelection(seat) {
      seat.selected = !seat.selected;
    },
    calculateTravelHours(departureTime, arrivalTime) {
      const [depHours, depMinutes] = departureTime.split(":").map(Number);
      const [arrHours, arrMinutes] = arrivalTime.split(":").map(Number);

      const departureDate = new Date();
      departureDate.setHours(depHours, depMinutes, 0, 0); // Set departure time

      const arrivalDate = new Date();
      arrivalDate.setHours(arrHours, arrMinutes, 0, 0); // Set arrival time

      const diffInMs = arrivalDate - departureDate;
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
    removeChip(index, sort) {
      this.userSelectedSort.splice(index, 1);
      this.selectSort(sort);
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
      const bookingDetails = {
        busdetails: busDetails,
        price: this.totalPrice,
        selectedSeats: this.totalSeats,
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
  },
  watch: {
    selectedSeats(newValue) {
      this.totalSeats = newValue;
    },
  },
  computed: {
    ...mapState(["count"]),
    // Computed property to get the selected seats
    selectedSeats() {
      const lowerSelected = this.lowerDeckSeats
        .filter((seat) => seat.selected)
        .map((seat) => seat.label);
      const upperSelected = this.upperDeckSeats
        .filter((seat) => seat.selected)
        .map((seat) => seat.label);
      return [...lowerSelected, ...upperSelected];
    },
    anySeatsSelected() {
      return this.selectedSeats.length > 0;
    },
  },

  async mounted() {
    this.availabelBus = [];
    this.loadingBuses = true;
    const { from, to, date } = this.$route.query;

    this.serviceStartPlace = from;
    this.serviceEndPlace = to;
    this.serviceDate = this.selectedDate = date;

    try {
      const response = await this.$axios.get("http://localhost:4000/");
      if (response.status == "200") {
        this.availabelBus = response.data.filter((bus) => {
          return (
            bus.serviceStartPlace === this.serviceStartPlace &&
            bus.serviceEndPlace === this.serviceEndPlace
          );
        });
        this.loadingBuses = false;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

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
.selected-btn {
  color: red;
  border: 2px solid red; /* Match border to background */
}
</style>
