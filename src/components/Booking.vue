<template>
  <v-container :fluid="true" class="px-0 py-0">
    <v-toolbar color="orange" class="elevation-2 py-2 text-white">
      <v-container class="d-flex align-center px-0 py-0">
        <v-card-title class="font-weight-bold text-h5"
          >Complete Your Booking</v-card-title
        >
        <v-spacer></v-spacer>
        <v-card-text class="text-end text-subtitle-1 text-capitalize"
          >{{ serviceStartPlace }} to {{ serviceEndPlace }}</v-card-text
        >
      </v-container>
    </v-toolbar>
    <!-- Main Details -->
    <v-container color="#F4F4F4" class="d-flex">
      <!-- Left Side -->
      <v-card flat width="65%" class="mr-6">
        <!-- bus details -->
        <v-card flat class="border my-4 py-4 rounded-lg flat">
          <v-row class="d-flex">
            <v-col>
              <v-card-title>{{
                bookingdata.busdetails.companyName
              }}</v-card-title>
              <v-card-subtitle class="py-0"
                >{{
                  bookingdata.busdetails.busType
                }}
                Sleeper(2+1)</v-card-subtitle
              >
            </v-col>

            <v-col class="text-end">
              <v-card-text
                >Seat No :
                {{ bookingdata.selectedSeats.join(", ") }}</v-card-text
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-subtitle>
                <span class="text-h6 font-weight-bold">{{
                  bookingdata.busdetails.departureTime
                }}</span>
              </v-card-subtitle>
              <v-card-text class="py-1">{{ serviceStartPlace }}</v-card-text>
            </v-col>
            <v-col class="text-center">
              <v-card-text class="text-h6 font-weight-bold"
                >{{ bookingdata.travelHrs }} hrs</v-card-text
              >
            </v-col>
            <v-col class="text-end">
              <v-card-subtitle>
                <span class="text-h6 font-weight-bold">{{
                  bookingdata.busdetails.arrivalTime
                }}</span>
              </v-card-subtitle>
              <v-card-text class="py-1">{{ serviceEndPlace }}</v-card-text>
            </v-col>
          </v-row>
        </v-card>
        <!-- Traverler Details -->
        <v-card class="border rounded-lg my-4" flat>
          <v-card-title class="font-weight-bold"
            >Traveller Details</v-card-title
          >

          <v-row class="px-2 py-4">
            <v-col cols="2">
              <v-card-text
                >Seat No :
                {{ bookingdata.selectedSeats.join(", ") }}</v-card-text
              >
            </v-col>

            <template
              v-for="(seat, index) in bookingdata.selectedSeats"
              :key="seat"
            >
              <v-col cols="3">
                <v-card-text class="py-1 px-0"
                  >Name (Passenger {{ index + 1 }})</v-card-text
                >
                <v-text-field
                  v-model="passengers[index].name"
                  variant="outlined"
                  density="compact"
                  color="blue"
                  :rules="[rules.required, rules.minLength]"
                ></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-card-text class="py-1 px-0">Age *</v-card-text>
                <v-text-field
                  v-model="passengers[index].age"
                  variant="outlined"
                  density="compact"
                  color="blue"
                  :rules="[rules.required, rules.numeric]"
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-card-text class="py-0">Gender</v-card-text>
                <v-col class="d-flex align-center py-0">
                  <v-checkbox
                    v-model="passengers[index].gender"
                    value="Male"
                    label="Male"
                    :rules="[rules.requiredGender]"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="passengers[index].gender"
                    value="Female"
                    label="Female"
                    :rules="[rules.requiredGender]"
                  ></v-checkbox>
                </v-col>
              </v-col>
            </template>
          </v-row>
        </v-card>
        <!-- Contact Details -->
        <v-card class="border rounded-lg" flat>
          <v-row class="d-flex align-center">
            <v-col cols="6"
              ><v-card-title class="font-weight-bold"
                >Contact Details</v-card-title
              ></v-col
            >
            <v-col>
              <v-card-subtitle>We’ll send your ticket here</v-card-subtitle>
            </v-col>
          </v-row>

          <v-row class="px-2 py-4">
            <v-col>
              <v-card-text class="py-1 px-0">Email Id</v-card-text>
              <v-text-field
                variant="outlined"
                density="compact"
                color="blue"
                v-model="email"
                :rules="emailRules"
                type="email"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-card-text class="py-1 px-0">Mobile Number</v-card-text>
              <v-text-field
                variant="outlined"
                density="compact"
                color="blue"
                v-model="mobileNumber"
                :rules="mobileRules"
                type="tel"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
      <!-- Right Side -->
      <v-card width="30%" class="px-4 elevation-4 py-4" height="54vh">
        <v-card-title>Price Details</v-card-title>
        <v-row class="d-flex align-center">
          <v-col class="py-0">
            <v-card-text class="py-0 pt-4">Base Fare</v-card-text>
          </v-col>
          <v-col class="py-0 text-end">{{ bookingdata.price }}</v-col>
        </v-row>
        <v-row class="d-flex align-center pb-6">
          <v-col class="py-0">
            <v-card-text class="py-0">Booking Fare</v-card-text>
          </v-col>
          <v-col class="text-end">29</v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="d-flex align-center">
          <v-col>
            <v-card-text>Amount</v-card-text>
          </v-col>
          <v-col class="text-end">{{ bookingdata.price + 29 }}</v-col>
        </v-row>
        <v-card-subtitle style="font-size: 12px" class="mt-4"
          >By clicking on proceed, I agree that I have read and <br />
          understood the TnCs and the Privacy Policy</v-card-subtitle
        >
        <v-btn block color="orange" class="mt-4 text-white" @click="paymentPage"
          >Continue</v-btn
        >
      </v-card>
    </v-container>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "bookingPage",
  data() {
    return {
      serviceStartPlace: null,
      serviceEndPlace: null,
      serviceDate: null,
      passengers: [],
      name: "",
      age: "",
      gender: "",
      rules: {
        required: (value) => !!value || "This field is required.",
        numeric: (value) =>
          /^[0-9]+$/.test(value) || "Only numeric values are allowed.",
        minLength: (value) =>
          (value && value.length >= 3) || "Minimum 3 characters required.",
        requiredGender: (value) => !!value || "Please select a gender.",
      },
      email: "",
      mobileNumber: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      mobileRules: [
        (v) => !!v || "Mobile number is required",
        (v) => /^\d{10}$/.test(v) || "Mobile number must be 10 digits",
      ],
    };
  },
  methods: {
    paymentPage() {
      for (let i = 0; i < this.passengers.length; i++) {
        const passenger = this.passengers[i];

        if (!passenger.name || !passenger.age || !passenger.gender) {
          alert(
            `Please fill all details for Passenger ${
              i + 1
            } (Name, Age, Gender).`
          );
          return; 
        }
      }

      if(! this.email){
        alert("Enter Email ID")
        return; 
      }

      if(!this.mobileNumber){
        alert("Enter Mobile Number")
        return; 
      }

      const userData = {
        passengers: this.passengers, 
        email: this.email,
        mobilenumber: this.mobileNumber,
      };

      this.$store.commit("userDetails", userData);
      this.$router.push({
        name: "payment",
        query: {
          from: this.serviceStartPlace,
          to: this.serviceEndPlace,
          date: this.serviceDate,
        },
      });
    },
  },
  computed: {
    ...mapState(["bookingdata"]),
  },
  watch: {
    "bookingdata.selectedSeats": {
      handler(newSeats) {
        if (!Array.isArray(newSeats)) {
          this.passengers = [];
          return;
        }
        this.passengers = newSeats.map(() => ({
          name: "",
          age: "",
          gender: "",
        }));
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    const { from, to, date } = this.$route.query;
    this.serviceStartPlace = from;
    this.serviceEndPlace = to;
    this.serviceDate = date;
  },
};
</script>
