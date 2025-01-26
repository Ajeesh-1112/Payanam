<template>
  <v-container :fluid="true" class="px-0 py-0">
    <v-card
      height="100vh"
      style="background: url('/bus2.jpeg'); background-size: cover"
    >
      <v-container
        style="margin-top: 150px"
        class="bg-white py-16 px-6 rounded-xl"
      >
        <v-card-text class="text-center py-0 text-subtitle-1">
          {{ $t("bookQuotes") }}
        </v-card-text>
        <v-card-title class="text-center font-weight-bold">
          {{ $t("bookSeat") }}
        </v-card-title>
        <v-row class="my-4 border rounded-xl" dense>
          <v-col class="rounded-xl">
            <v-autocomplete
              v-model="from"
              :items="filteredDistrictsForFrom"
              clearable
              label="From"
              variant="plain"
              hide-details
              style="height: 100%"
              prepend-inner-icon="mdi-location-enter"
            ></v-autocomplete>
          </v-col>
          <v-col class="border">
            <v-autocomplete
              v-model="to"
              variant="plain"
              clearable
              :items="filteredDistrictsForTo"
              label="To"
              hide-details
              style="height: 100%"
              prepend-inner-icon="mdi-location-exit"
            ></v-autocomplete>
          </v-col>
          <v-col class="border">
            <v-menu
              v-model="isDate"
              :close-on-content-click="false"
              :nudge-width="200"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ props }">
                <v-card-text v-bind="props">
                  <v-icon>mdi-calendar-range</v-icon> Date
                </v-card-text>
                <v-card-text v-if="date" class="py-0 text-h6">{{
                  date
                }}</v-card-text>
                <v-card-text v-else class="py-0"></v-card-text>
              </template>
              <v-date-picker
                v-model="selectedDate"
                :min="new Date().toISOString().substr(0, 10)"
                Ensure
                no
                past
                dates
              >
                @change="menu = false" ></v-date-picker
              >
            </v-menu>
          </v-col>

          <v-col class="py-0 px-0">
            <v-btn
              @click="searchBuses"
              block
              
              height="100%"
              class="rounded-te-xl rounded-be-xl buttoncolor text-white"
            >
              Search Busses</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <!-- Popular Cities -->
    <v-card color="#F2F2F2">
      <v-container>
        <v-list style="background-color: #f2f2f2">
          <v-list-item class="my-2" v-for="(text, i) in description" :key="i">
            <v-list-item-title
              style="font-size: 14px"
              class="font-weight-bold mb-2"
              >{{ text.title.toUpperCase() }}</v-list-item-title
            >
            <v-list-item-text  style="font-size: 11px">{{
              text.subtitle
            }}</v-list-item-text>
          </v-list-item>
        </v-list>
        <v-card-title class="text-h6 font-weight-bold"
          >Popular Cities</v-card-title
        >
        <v-slide-group
          center-active
          v-model="model"
          class="pa-0 px-10"
          show-arrows
        >
          <v-slide-group-item v-for="(place, i) in popularCites" :key="i">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                class="ma-8 elevation-4 hover-image rounded-xl"
                width="260"
                @click="toggle"
              >
                <v-img :src="place.img" cover height="250">
                  <v-expand-transition>
                    <div
                      class="text-white text-center"
                      v-if="isHovering"
                      style="height: 100%; background-color: rgba(0, 0, 0, 0.8)"
                    >
                      <v-card-text
                        class="pt-16 text-h5 text-yellow font-weight-bold"
                      >
                        {{ place.place }}
                      </v-card-text>
                      <v-btn
                        variant="outlined"
                        color="yellow"
                        class="rounded-lg"
                        >Book Now</v-btn
                      >
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-slide-group-item>
        </v-slide-group>
      </v-container>
    </v-card>
    <!-- Description -->
    <v-card  color="#F2F2F2" >
      <v-container class="py-0">
        <v-row class="border-b mt-10">
          <v-col
            v-for="(item, index) in chooseUs.slice(0, 2)"
            :key="index"
            cols="12"
            md="6"
          >
            <v-card-title class="font-weight-bold ">{{
              item.title
            }}</v-card-title>
            <v-card-text class="text-black" style="font-size: 13px">
              {{ item.subtitle }}
            </v-card-text>
          </v-col>
        </v-row>
        <v-row class="border-b pb-10">
          <v-col
            v-for="(item, index) in chooseUs.slice(2, 4)"
            :key="index"
            cols="12"
            md="6"
          >
            <v-card-title class="font-weight-bold">{{
              item.title
            }}</v-card-title>
            <v-card-text class="text-black" style="font-size: 13px">
              {{ item.subtitle }}
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <!-- About us -->
    <v-footer class="py-6 text-center d-flex flex-column" color="#E9E9E9">
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          class="mx-4 my-4 hover-footer-icon"
          variant="text"
        ></v-btn>
      </div>

      <div class="pt-0">
        Thank you for visiting our bus booking platform, where convenience and
        innovation come together to redefine travel planning. Our mission is to
        make your journey smoother, whether you're commuting daily, planning a
        getaway, or embarking on an adventure. With features like real-time bus
        schedules, secure payment options, and our upcoming 3D seat selection
        experience, we ensure that you have complete control over your travel
        preferences. We're here to make your booking process simple, reliable,
        and enjoyable. Stay connected with us through our social media channels
        for updates, promotions, and travel tips. If you have any questions or
        need assistance, our support team is just a call or email away. Your
        journey is our priority—travel smarter, travel better with us. Thank you
        for trusting us, and we look forward to serving you again. Wishing you
        safe and memorable travels!.
      </div>

      <v-divider></v-divider>

      <div class="text-red mt-4">{{ new Date().getFullYear() }} — <strong class="text-red">Payanam</strong></div>
    </v-footer>
  </v-container>
</template>
<script>
import district from "../District/district.json";
export default {
  name: "loginPage",
  data() {
    return {
      isDate: false,
      selectedDate: null,
      districtList: [],

      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],

      from: null,
      to: null,
      date: null,
      description: [
        {
          title: "PAYANAM",
          subtitle:
            "About Us, Investor Relations, Careers, MMT Foundation, CSR Policy & Committee, myPartner - Travel Agent Portal, Foreign Exchange, List your hotel, Partners- Redbus, Partners- Goibibo, Partners- BookMyForex",
        },
        {
          title: "ABOUT THE SITE",
          subtitle:
            "Welcome to our bus booking platform, designed to make your travel planning seamless and convenient. Our website allows you to browse available bus routes, check schedules, and book your seats effortlessly. We are dedicated to enhancing your booking experience by introducing innovative features.",
        },
        {
          title: "Interactive 3D Seat Selection",
          subtitle:
            "We are excited to introduce a unique 3D seat selection feature powered by Three.js. This interactive tool lets you visualize the bus interior and select your preferred seat with just a click. Whether you prefer a window seat or an aisle seat, our 3D interface ensures a user-friendly and immersive experience",
        },
      ],
      chooseUs: [
        {
          title: "Make Your Bus Booking Smoother With Payanam",
          subtitle:
            "At Payanam, we are committed to making your bus booking experience effortless and enjoyable. Whether you're planning a quick trip or a long-distance journey, our platform is designed to cater to all your travel needs. With real-time bus schedules and an intuitive booking process, you can plan your journey with confidence and convenience.Choose Payanam for your next journey and discover the difference. We're here to make every step of your travel as smooth as possible, from booking to boarding. Experience convenience, reliability, and innovation like never before.",
        },
        {
          title: "Advantages of booking bus tickets online on Payanam",
          subtitle:
            "Booking bus tickets online on Payanam makes your travel planning simple, convenient, and hassle-free. With real-time bus schedule updates, secure payment options, and a user-friendly interface, you can book tickets anytime, anywhere, without the need to visit physical counters. What sets Payanam apart is its commitment to innovation, including an upcoming 3D seat selection feature that lets you visualize the bus interior and choose your preferred seat effortlessly. Combined with responsive customer support and reliable service, Payanam ensures a smooth and modern booking experience tailored to your travel needs.",
        },
        {
          title: "Reasons to Choose Payanam for Bus Booking:",
          subtitle:
            " When it comes to booking your bus tickets, Payanam stands out as the top choice for convenience, security, and innovation. Our platform offers a simple and seamless booking process, allowing you to reserve tickets anytime, anywhere. With real-time bus schedules and instant updates, you can plan your travel with confidence. Payanam also ensures secure payment options, giving you peace of mind with every transaction.In addition to reliability, we are committed to enhancing your experience with innovative features like 3D seat selection, where you can visually choose your seat in the bus for a more personalized journey. Our customer support team is always ready to assist you at every step, ensuring a smooth and hassle-free experience from booking to boarding. Choose Payanam for its ease of use, cutting-edge technology, and reliable service—making your bus travel experience more enjoyable than ever before.",
        },
        {
          title: "MySafety Assurance on Bus Bookings:",
          subtitle:
            "At Payanam, your safety is our top priority. We understand that traveling, especially by bus, requires confidence in the quality and reliability of the service, which is why we’ve implemented MySafety Assurance to ensure that every booking you make is safe and secure. From the moment you book your ticket to the time you board your bus, we guarantee a reliable and comfortable journey.Our platform carefully selects trusted bus operators who meet strict safety standards, and we continuously monitor the vehicles to ensure they are well-maintained and fully equipped. We also provide you with real-time updates, so you are always informed about your journey. Whether it’s secure online payment, safe travel conditions, or responsive customer support, Payanam is committed to offering you peace of mind throughout your travel experience.",
        },
      ],
      popularCites: [
        {
          place: "Kanya Kumari",
          img: "/kanyakumari.jpeg",
        },
        {
          place: "Bangalore",
          img: "bangalore.jpeg",
        },
        {
          place: "Chennai",
          img: "/chennai.jpg",
        },
        {
          place: "Delhi",
          img: "/delhi.webp",
        },
        {
          img: "/madurai.jpg",
          place: "Madurai",
        },
      ],
    };
  },
  watch: {
    selectedDate(newValue) {
      if (newValue) {
        const date = new Date(newValue);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
        this.date = `${day}/${month}/${year}`;
      } else {
        this.date = null;
      }
    },
  },
  methods: {
    searchBuses() {
      if (!this.from || !this.to || !this.date) {
        alert("Please fill in both 'From' and 'To' fields.");
        return;
      }
      this.$router.push({
        name: "availableBus",
        query: {
          from: this.from,
          to: this.to,
          date: this.date,
        },
      });
    },
  },
  computed: {
    filteredDistrictsForFrom() {
      return this.districtList.filter((district) => district !== this.to);
    },
    filteredDistrictsForTo() {
      return this.districtList.filter((district) => district !== this.from);
    },
  },
  mounted() {
    this.districtList = district.states.flatMap((state) => state.districts);
  },
};
</script>

<style scoped>
.hover-image:hover {
  transition: transform 0.3s ease-in-out;
  transform: scale(1.2);
  z-index: 1;
}
.hover-footer-icon:hover {
  transform: rotate(90deg);
  color:#D84E55;
}
.buttoncolor{
  background-color: #D84E55;
}

</style>
