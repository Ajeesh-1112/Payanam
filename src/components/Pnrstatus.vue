<template>
  <v-card
    flat
    height="90vh"
    style="background: url('/map.png'); background-size: cover"
  >
    <v-container flat class="d-flex justify-center align-center" height="100%">
      <v-card width="50%" class="pa-8 elevation-4" v-if="isTicket">
        <v-card-title class="text-subtitle-1 px-0 text-center font-weight-bold"
          >TICKET STATUS</v-card-title
        >
        <v-card-text class="px-0 py-1 pb-2">Enter PNR Number</v-card-text>
        <v-text-field variant="outlined"></v-text-field>
        <v-card-text class="px-0 py-1 pb-2">Mobile Number</v-card-text>

        <v-text-field variant="outlined"></v-text-field>

        <v-btn block color="#F44336" @click="isTicket = false">Search</v-btn>
      </v-card>
      <v-card flat v-else width="50%">
        <v-card-text class="font-weight-bold text-center">
          Your Trip Details</v-card-text
        >
        <v-row>
          <v-col>
            <v-card-text>Pnr No :</v-card-text>
          </v-col>
          <v-col>
            <v-card-text>Seat No :</v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-text>Start Place :</v-card-text>
          </v-col>
          <v-col>
            <v-card-text>End Place :</v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "pnrStatus",
  data() {
    return {
      isTicket: true,
    };
  },
};
</script>
