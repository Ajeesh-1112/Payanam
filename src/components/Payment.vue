<template>
  <v-container class="px-0 py-0 gradient" :fluid="true">
    <v-container class="py-0 px-0">
      <v-toolbar color="#FFA500" density="compact">
        <v-card-text class="text-subtitle-1 font-weight-bold">{{
          $t("websiteName")
        }}</v-card-text>
        <v-spacer></v-spacer>
        <v-card-text class="text-end">
          <v-icon>mdi-tick</v-icon> Safe and Secure</v-card-text
        >
      </v-toolbar>

      <v-card rounded="xl">
        <v-row class="d-flex align-center">
          <v-col class="py-0">
            <v-card-text class="py-0">Get addtional discounts</v-card-text>
            <v-card-subtitle
              >Login to accesss saved payments and discounts</v-card-subtitle
            >
          </v-col>
          <v-col class="d-flex flex-column align-center">
            <v-img src="bus_icon.png" width="75px" />
          </v-col>
          <v-col class="text-end py-0">
            <v-btn class="rounded-xl text-orange" height="100" block>
              login now
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="d-flex my-2" color="#EAE8E8 " flat height="90vh">
        <!-- LEFT -->
        <v-card class="d-flex" flat width="75%">
          <!-- SideBar -->
          <v-card flat width="40%">
            <v-card-title>Payment Options</v-card-title>
            <v-list>
              <v-list-item
                v-for="(payment, i) in paymentOptions"
                :key="i"
                class="rounded-lg"
                @click="selectedPaymentOptions(payment.value)"
                :class="{
                  'selected-item': selectedPayment === payment.value,
                  'hover-item': true,
                }"
              >
                <template v-slot:prepend>
                  <v-img :src="payment.image" height="50" width="50" />
                </template>
                <v-card-title
                  class="break-text text-subtitle-2 font-weight-bold"
                  >{{ payment.title }}</v-card-title
                >
                <v-card-subtitle style="font-size: 10px">{{
                  payment.subtitle
                }}</v-card-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
          <!-- UPI CARD -->
          <v-card flat class="px-4" v-if="isUpiOption">
            <v-card-text class="text-red"
              >Don't Refresh the page while transaction</v-card-text
            >
            <v-row class="border">
              <v-col class="text-center">
                <v-card-text class="px-0 font-weight-bold text-capitalize"
                  >SCAN AND PAY</v-card-text
                >
                <v-img src="/gPay_scanner.png" height="300px"> </v-img>
                <v-card-text>Scan and Pay using Banking app</v-card-text>
              </v-col>
              <v-col class="border-left">
                <v-card-text class="px-0 font-weight-bold text-capitalize"
                  >Enter your upi id</v-card-text
                >
                <v-text-field
                  v-model="price"
                  placeholder="Upi Id"
                  density="compact"
                  disabled
                  variant="outlined"
                >
                </v-text-field>
                <v-btn class="text-white"
                :loading="isLoading"
                block color="orange" @click="payNow"
                  >Pay Now</v-btn
                >
                <v-col>
                  <v-timeline dense>
                    <v-timeline-item
                      v-for="(item, i) in timeLines"
                      :key="i"
                      dot-color="green"
                      size="small"
                    >
                      <v-card-text class="py-0 px-0" style="font-size: 10px">
                        {{ item }}</v-card-text
                      >
                    </v-timeline-item>
                  </v-timeline>
                </v-col>
              </v-col>
              <v-row class="text-center mb-2 w-100">
                <v-col class="py-0 pt-2">
                  <img class="img" src="gpay.webp" />
                  <img class="img" src="paytm3.webp" />
                  <img class="img" src="phonepe.png" />
                </v-col>
              </v-row>
            </v-row>

            <v-row class="d-flex flex-column pb-10">
              <v-col class="py-0">
                <v-card-title class="font-weight-bold py-1">{{ price }}</v-card-title>
              </v-col>
              <v-col class="py-0">
                <v-card-subtitle>
                  By Payment your accepting our privacy policy
                  rules</v-card-subtitle
                >
              </v-col>
            </v-row>
          </v-card>
          <!-- CREDIT CARD -->
          <v-card v-if="isCreditOption" width="100%">
            <v-card-title class="text-center"
              >Credit/Debit Card Payment</v-card-title
            >
            <v-card-text class="text-center">Total-INR  {{ price }} /-</v-card-text>
            <v-card class="border mx-5">
              <v-row>
                <v-col class="d-flex flex-column">
                  <v-card-text class="py-1">Credit & Debit Cards</v-card-text>
                  <v-card-subtitle class="py-0"
                    >Transaction Fee may apply</v-card-subtitle
                  >
                </v-col>
                <v-col>
                  <v-img
                    src="./Credit-Card-Icons.jpg"
                    cover
                    height="70px"
                  ></v-img>
                </v-col>
              </v-row>
            </v-card>
          </v-card>
          <!-- Gpay Card -->
          <v-card v-if="isGpayOption" width="100%">GPAY</v-card>
        </v-card>
        <!-- Right -->
        <v-card width="25%" color="#eae8e8 " class="ml-4" flat>
          <v-card flat>
            <v-card-text class="text-subtitle-1 font-weight-bold"
              >Journy Details</v-card-text
            >
            <v-divider></v-divider>
            <v-row dense>
              <v-col class="px-0">
                <v-timeline dense side="end">
                  <v-timeline-item
                    size="small"
                    icon="mdi-map-marker-multiple"
                    dot-color="green"
                    fill-dot
                  >
                    <template v-slot:opposite>
                      <v-card-text
                        class="py-0 px-0 text-subtitle-2 font-weight-bold"
                      >
                        {{ bookingdata.busdetails.departureTime }}
                      </v-card-text>
                    </template>
                    <v-card-text
                      class="py-0 px-0 font-weight-bold text-subtitle-1"
                    >
                      {{ serviceStartPlace }}
                    </v-card-text>
                  </v-timeline-item>
                  <v-timeline-item
                    size="small"
                    icon="mdi-map-marker-multiple"
                    dot-color="red"
                    fill-dot
                  >
                    <template v-slot:opposite>
                      <v-card-text
                        class="px-0 py-0 text-subtitle-1 font-weight-bold"
                      >
                        {{ serviceEndPlace }}
                      </v-card-text>
                    </template>
                    <v-card-text
                      class="py-0 px-0 text-subtitle-2 font-weight-bold"
                    >
                      {{ bookingdata.busdetails.arrivalTime }}
                    </v-card-text>
                  </v-timeline-item>
                </v-timeline>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="mt-2 py-4 rounded-lg">
            <v-row class="d-flex">
              <v-col>
                <v-card-text>Fare Summary</v-card-text>
              </v-col>
              <v-col>
                <v-card-text class="text-blue">View Details</v-card-text>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="d-flex flex-column">
              <v-col class="d-flex justify-space-between py-0">
                <v-card-text>Bus Fare</v-card-text>
                <v-card-text class="text-center">{{
                  bookingdata.busdetails.sleeperPrice
                }}</v-card-text>
              </v-col>
              <v-col class="d-flex justify-space-between py-0">
                <v-card-text>charges</v-card-text>
                <v-card-text class="text-center">29</v-card-text>
              </v-col>
              <v-divider></v-divider>
              <v-col class="d-flex justify-space-between py-0">
                <v-card-text class="text-subtitle-1 font-weight-bold"
                  >TOTAL</v-card-text
                >
                <v-card-text class="text-center">{{
                  bookingdata.busdetails.sleeperPrice + 29
                }}</v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-card>
    </v-container>
    <v-dialog v-model="isSuccesfull" fullscreen>
      <v-toolbar color="orange" height="550px">
        <v-container class="text-center">
          <v-btn icon class="bg-white" color="orange" size="x-large">
            <v-icon size="2em">mdi-check</v-icon>
          </v-btn>
          <v-card-title class="text-h5 mt-4 text-white font-weight-bold"
            >Payment Succesfull</v-card-title
          >
        </v-container>
      </v-toolbar>
      <v-card>
        <v-card class="text-center" height="80vh" flat>
          <v-card-title class="text-h5 font-weight-bold"
            >THANK YOU FOR CHOOSING US :</v-card-title
          >
          <v-card-subtitle>Your Trip has been confirmed</v-card-subtitle>
          <v-row class="mt-4 d-flex flex-column">
            <v-col>
              <v-timeline dense side="end">
                <v-timeline-item
                  size="small"
                  icon="mdi-map-marker-multiple"
                  dot-color="green"
                  fill-dot
                >
                  <template v-slot:opposite>
                    <v-card-text
                      class="py-0 px-0 text-subtitle-2 font-weight-bold"
                    >
                      {{ serviceStartPlace }}
                    </v-card-text>
                  </template>
                </v-timeline-item>
                <v-timeline-item
                  size="small"
                  icon="mdi-map-marker-multiple"
                  dot-color="red"
                  fill-dot
                >
                  <template v-slot:opposite>
                    <v-card-text class="px-0 py-0 text-h6 font-weight-bold">
                      {{ serviceEndPlace }}
                    </v-card-text>
                  </template>
                </v-timeline-item>
              </v-timeline>
            </v-col>
            <v-col>
              <v-row class="d-flex">
                <v-col class="text-end">Payment Status</v-col>
                <v-col class="text-start ml-4 font-weight-bold">
                  <v-icon color="green">mdi-check</v-icon> Sucess</v-col
                >
              </v-row>
            </v-col>
          </v-row>
          <v-row class="d-flex mt-16">
            <v-col class="text-end">
              <v-btn @click="downloadTicket" color="orange" variant="outlined"
                >Download Ticktet</v-btn
              >
            </v-col>
            <v-col class="text-start">
              <v-btn @click="downloadTicket" color="grey"
                >Having an issues ?</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-dialog>
    <!-- Ticket -->
    <v-container v-if="isTicket">
      <v-container id="ticket-content" class="pa-4 rounded-lg elevation-3">
        <!-- Header -->
        <v-row class="align-center py-5" style="background-color: orange">
          <v-col cols="6" class="d-flex align-center">
            <v-icon size="40" color="white">mdi-bus</v-icon>
            <v-card-title class="font-weight-bold text-white ml-2 text-h4"
              >Payanam</v-card-title
            >
          </v-col>
          <v-col cols="6" class="text-end">
            <v-card-subtitle class="font-italic"
              >Your Trip Starts Here</v-card-subtitle
            >
            <v-card-text class="py-0 font-weight-bold"
              >E-Ticket Reservation</v-card-text
            >
          </v-col>
        </v-row>

        <v-divider class="my-3"></v-divider>

        <!-- Travel Information -->
        <v-row>
          <v-col>
            <v-card-title class="text-subtitle-1 font-weight-bold"
              >Travel Information</v-card-title
            >
          </v-col>
        </v-row>

        <v-row class="pa-2">
          <v-col cols="6">
            <v-card-text
              ><strong>Transport:</strong>
              {{ bookingdata.busdetails.companyName }}</v-card-text
            >
            <v-card-text
              ><strong>Service Start Place:</strong>
              {{ serviceStartPlace }}</v-card-text
            >
          </v-col>
          <v-col cols="6">
            <v-card-text><strong>PNR Number:</strong> 192193920</v-card-text>
            <v-card-text
              ><strong>Service End Place:</strong>
              {{ serviceEndPlace }}</v-card-text
            >
            <v-card-text
              ><strong>Class of Service:</strong>
              {{ bookingdata.busdetails.busType }}</v-card-text
            >
          </v-col>
        </v-row>

        <v-divider class="my-3"></v-divider>

        <!-- Traveler Information -->
        <v-row>
          <v-col>
            <v-card-title class="text-subtitle-1 font-weight-bold"
              >Traveler Information</v-card-title
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Seat No</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(passenger, index) in userdata.passengers"
                  :key="index"
                >
                  <td class="text-black">{{ passenger.name }}</td>
                  <td>{{ passenger.age }}</td>
                  <td>{{ passenger.gender }}</td>
                  <td>{{ bookingdata.selectedSeats[index] }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>

        <v-divider class="my-3"></v-divider>

        <!-- Important Points -->
        <v-row>
          <v-col>
            <v-card-title class="text-subtitle-1 font-weight-bold"
              >Important Points</v-card-title
            >
            <v-card-text>* This ticket is non-transferable.</v-card-text>
            <v-card-text>* Carry a valid ID proof.</v-card-text>
            <v-card-text>* Arrive 30 mins before departure.</v-card-text>
            <v-card-text
              >* Contact customer support for any issues.</v-card-text
            >
          </v-col>
        </v-row>

        <v-divider class="my-3"></v-divider>

        <!-- Cancellation Policy -->
        <v-row>
          <v-col>
            <v-card-title class="text-subtitle-1 font-weight-bold"
              >Cancellation Policy</v-card-title
            >
            <v-card-text
              >* 100% refund if canceled 48 hours before departure.</v-card-text
            >
            <v-card-text
              >* 50% refund if canceled 24 hours before departure.</v-card-text
            >
            <v-card-text
              >* No refund if canceled within 12 hours of
              departure.</v-card-text
            >
          </v-col>
        </v-row>

        <v-divider class="my-3"></v-divider>

        <!-- Safe Journey Message -->
        <v-row>
          <v-col class="text-center text-blue">
            <v-card-text class="font-weight-bold">
              SAFE JOURNEY, HAVE A NICE DAY.
              <v-icon color="green" size="2em">mdi-handshake-outline</v-icon>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
export default {
  name: "paymentPage",
  data() {
    return {
      isTicket: false,
      isLoading:false,
      isUpiOption: true,
      isCreditOption: false,
      isSuccesfull: false,
      isGpayOption: false,
      selectedPayment: "upi",
      serviceStartPlace: null,
      serviceEndPlace: null,
      price: null,
      paymentOptions: [
        {
          title: "UPI Options",
          subtitle: "Pay Directly From your bank",
          image: "./upi.webp",
          value: "upi",
        },
        {
          title: "Credit/Debit card",
          subtitle: "visa,Master card, and more",
          image: "./card-credit.png",
          value: "credit",
        },
        {
          title: "Google Pay",
          subtitle: "Pay With Googlepay",
          image: "./gpay.webp",
          value: "gpay",
        },
      ],
      timeLines: [
        "Enter Your resigtered VPA",
        "Receive payment request on bank app",
        "Authorize payment request",
      ],
      ticketData: {
        from: "City A",
        to: "City B",
        date: "2024-12-26",
        seat: "12A",
        price: 200,
      },
    };
  },
  methods: {
    selectedPaymentOptions(option) {
      this.selectedPayment = option;
      switch (option) {
        case "upi":
          this.isUpiOption = true;
          this.isCreditOption = false;
          this.isGpayOption = false;
          break;

        case "credit":
          this.isUpiOption = false;
          this.isGpayOption = false;
          this.isCreditOption = true;
          break;

        case "gpay":
          this.isGpayOption = true;
          this.isUpiOption = false;
          this.isCreditOption = false;
          break;
        default:
          console.log("Invalid payment option selected.");
      }
    },
    async downloadTicket() {
      this.isTicket = true;
      const element = document.getElementById("ticket-content");

      try {
        // Convert ticket content to canvas
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");

        // Create PDF
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Download PDF
        pdf.save("ticket.pdf");
      } catch (error) {
        console.error("Error generating ticket:", error);
      }
    },
    async payNow() {
      const token = Cookies.get("authToken");
      if (!token) {
        alert("Login to Book Ticket");
        return;
      }
      this.isLoading = true

      try {
        const response = await axios.post("http://localhost:3000/book-seats", {
          busId: this.bookingdata.busdetails._id,
          seats: this.bookingdata.selectedSeats,
        });

        if(response.status === 200){
          this.isLoading = false
          this.isSuccesfull = true;
          

        }
      } catch (error) {
        this.isLoading = false
       alert("Error in Payment")
        console.error("Booking error:", error);
        this.message = "Failed to book seats.";
      }
    }
    },
  computed: {
    ...mapState(["bookingdata", "userdata"]),
  },
  mounted() {
    const { from, to } = this.$route.query;
    this.serviceStartPlace = from;
    this.serviceEndPlace = to;
    this.price = this.bookingdata.busdetails.sleeperPrice + 29;
  },
};
</script>

<style scoped>
.gradient {
  background: linear-gradient(to bottom, orange 20%, #eae8e8 20%);
  width: 100%;
}
.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.selected-item {
  background-color: #e3f2fd;
  border-left: 4px solid #1e88e5;
  transition: background-color 0.3s, border-left 0.3s;
}

.hover-item:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
