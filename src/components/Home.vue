<template>
  <v-container class="px-0 py-0" :fluid="true">
    <v-card>
      <v-layout>
        <v-app-bar style="position: fixed" class="py-2 px-10" prominent>
          <v-app-bar-nav-icon
            class="drawer-icon"
            variant="text"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <v-img
            src="/logo4.png"
            width="45px"
            class="position-fixed ml-10"
          ></v-img>
          <v-toolbar-title
            class="font-weight-bold position-fixed ml-16"
            style="left: 70px"
          >
            {{ $t("websiteName") }}
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-list class="navigation-list w-40 d-flex justify-center">
            <v-list-item
              @click="categories(option.name)"
              class="ml-2 px-10 text-center rounded-lg"
              :class="{
                selected_transport: selectedTransport === option.name,
              }"
              v-for="(option, i) in optionAvailable"
              :key="i"
            >
              <v-list-item-title class="text-subtitle-2 px-0 py-0">
                {{ option.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>

          <v-spacer></v-spacer>
          <!-- Language menu -->
          <v-menu offset-y>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">
                <v-card-text class="py-0 px-1">
                  <v-icon>mdi mdi-translate</v-icon>
                  [{{ defaultLanguage }}]
                  <v-icon>mdi-menu-down</v-icon>
                </v-card-text>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(language, index) in languageMenu"
                :key="index"
                @click="selectLanguage(language.value)"
              >
                <v-list-item-title>{{ language.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- Account Menu -->
          <v-menu offset-y>
            <template v-slot:activator="{ props }">
              <v-btn v-if="loginStatus" v-bind="props">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(accountOption, index) in accountMenu"
                :key="index"
                @click="selectAccountOption(accountOption)"
              >
                <v-list-item-title>{{ accountOption }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- Login Button -->
          <v-btn
            v-if="!loginStatus"
            @click="isLogin = true"
            class="navigation-list buttoncolor text-white"
            size="large"
          >
            <v-card-text class="px-0 py-0">Login / Signup</v-card-text>
          </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" temporary style="height: 70vh">
          <v-list class="pl-2">
            <v-row class="d-flex align-center my-2">
              <v-col class="py-0">
                <v-list-item-subtitle class="text-grey text-subtitle-1"
                  >Menu</v-list-item-subtitle
                >
              </v-col>
              <v-col class="text-end py-0">
                <v-icon @click="drawer = false">mdi-arrow-right</v-icon>
              </v-col>
            </v-row>
            <v-divider></v-divider>

            <v-list-item
              :class="{
                selected_transport_drawer: selectedTransport === option.name,
              }"
              @click="categories(option.name)"
              class="px-4 my-2 rounded-lg"
              v-for="(option, i) in optionAvailable"
              :key="i"
            >
              <v-list-item-title class="text-subtitle-2 px-0 py-0">
                {{ option.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-spacer style="margin-top: 120px"></v-spacer>
          <template v-slot:append>
            <v-btn
              append-icon="mdi-logout"
              block
              v-if="!loginStatus"
              @click="isLogin = true"
              class="buttoncolor text-white mb-23"
              size="large"
            >
              login / Signup
            </v-btn>
          </template>
        </v-navigation-drawer>

        <v-main>
          <v-container :fluid="true" class="px-0 py-0">
            <router-view />
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
    <!-- Login or Create Account Dialog -->
    <v-dialog max-width="1000px" v-model="isLogin" persistent>
      <v-card>
        <v-card>
          <v-carousel
            cycle
            interval="3000"
            show-arrows="hover"
            hide-delimiter-background
          >
            <v-carousel-item
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              cover
            ></v-carousel-item>

            <v-carousel-item
              src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
              cover
            ></v-carousel-item>

            <v-carousel-item
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              cover
            ></v-carousel-item>
          </v-carousel>
        </v-card>

        <v-card
          style="position: absolute; right: 0px"
          width="400px"
          height="100%"
          class="glassy-card px-2"
          flat
          rounded="0"
        >
          <v-row class="d-flex flex-column align-center">
            <v-col class="text-end py-0 pt-3">
              <v-icon @click="isLogin = false">mdi-close</v-icon>
            </v-col>
            <v-col class="py-0">
              <v-card-text class="text-h6"
                >Sign in to avail exciting discounts and
                cashbacks!!</v-card-text
              >
            </v-col>
            <v-col>
              <v-card-text class="px-1">Email</v-card-text>
              <v-text-field
                v-model="email"
                variant="outlined"
                density="compact"
              ></v-text-field>
              <v-btn block @click="login">Login</v-btn>
              <v-card-text class="text-center text-subtitle-1">or</v-card-text>
            </v-col>
          </v-row>
          <v-row class="d-flex flex-column align-center">
            <v-col class="py-0 text-center">
              <v-btn icon class="mr-4">
                <v-icon color="orange">mdi-google</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="blue">mdi-facebook</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-card-text
                >By signing up, you agree to our
                <span class="text-blue">Terms & Conditions </span>
                and
                <span class="text-blue"> Privacy Policy</span>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "homePage",
  data() {
    return {
      loginStatus: false,
      isLogin: false,
      isDate: true,
      selectedTransport: "Bus",
      defaultLanguage: "EN",
      selectedDate: null,
      email: null,
      loginBtnShow: true,
      drawer: false,
      group: null,

      optionAvailable: [
        { name: "Bus", value: "bus" },
        { name: "PNR Status", value: "pnrstatus" },
      ],
      languageMenu: [
        { name: "Tamil", value: "tn" },
        { name: "English", value: "en" },
        { name: "Hindi", value: "hn" },
      ],
      accountMenu: ["Upcoming Trips", "Cancel Ticket", "Log out"],
    };
  },
  computed: {
    formattedDate() {
      if (!this.selectedDate) return null;
      const date = new Date(this.selectedDate);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },

  methods: {
    selectLanguage(language) {
      this.$i18n.locale = language;
      this.defaultLanguage = language.toUpperCase();
    },
    selectAccountOption(value) {
      if (value == "Log out") {
        Cookies.remove("authToken");

        location.reload();
      }
    },

    categories(selectedCategories) {
      this.selectedTransport = selectedCategories;
      const selected = selectedCategories.split(" ").join("");
      this.$router.push(`${selected.toLowerCase()}`);
    },
    login() {
      this.$axios
        .post("http://localhost:3000/login", { email: this.email })
        .then((response) => {
          console.log("Login successful:", response.data);
          this.authToken();
        })
        .catch((error) => {
          console.error(
            "Login failed:",
            error.response ? error.response.data : error.message
          );
        });
    },
    authToken() {
      const auth_token = Cookies.get("authToken");

      if (auth_token) {
        (this.loginStatus = true), (this.isLogin = false);
      }
    },
  },
  mounted() {
    this.isLogin = true;
    this.authToken();
    this.$router.push("/bus");
  },
};
</script>

<style scoped>
.glassy-card {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.selected_transport {
  background-color: orange;
  color: white;
}
.selected_transport_drawer {
  border-left: 4px solid orange;
}

.navigation-list {
  display: flex;
}
.drawer-icon {
  display: none !important;
}
.buttoncolor {
  background-color: orange;
  border-radius: 6px !important;
}
@media (max-width: 800px) {
  .navigation-list {
    display: none !important;
  }
  .drawer-icon {
    display: block !important;
  }
}

.moving-bus {
  position: relative;
  animation: moveBus 5s linear forwards;
}

@keyframes moveBus {
  0% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(-5px);
  }
}
</style>
