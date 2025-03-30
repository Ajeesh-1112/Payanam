<template>
  <div ref="threeContainer" class="three-container">

    <v-tooltip text="View Seats" location="top">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          @click="viewSeat()"
          icon="mdi-seat"
          rounded="pill"
          color="red"
          style="position: absolute;z-index: 1;right:0;margin-right:70px;margin-top:20px"
        ></v-btn>
      </template>
    </v-tooltip>

    <v-tooltip text="Rotate" location="top">
  <template #activator="{ props }">
    <v-btn
    @click=rotateSides()
      v-bind="props"
      style="position: absolute; z-index: 1; margin-left: 10px; margin-top: 20px"
      rounded="pill"
      icon="mdi-rotate-360"
    ></v-btn>
  </template>
</v-tooltip>

<v-tooltip text="Move Forward" location="top">
  <template #activator="{ props }">
    <v-btn
     @click="moveFront()"
     icon="mdi-arrow-up"
     rounded="pill"
v-bind="props"
     style="position: absolute;z-index: 1;right:0;margin-right:10px;margin-top:20px"
     ></v-btn>
    </template>
    </v-tooltip>
  </div>
</template>

<script>
import ThreeScene from "../three.js";
// import Createproject from "@/views/Createproject.vue";
export default {
  name: "ThreeSceneComponent",
  data() {
    return {
      threeContainer: null,
      threeScene: null,
      undoModels: [],
    };
  },
  mounted() {
    this.initScene();
    // this.initializeThreeScene();
  },
  // beforeUnmount() {
  //   if (this.threeScene) {
  //     this.threeScene.dispose();
  //     this.threeScene = null;
  //   }
  // },
  methods: {
    // async initializeThreeScene() {
    //     // Simulating async initialization
    //     this.threeScene = await new Promise((resolve) => {
    //         setTimeout(() => resolve(new ThreeScene()), 1000); // Replace with actual initialization
    //     });
    //     console.log('threeScene initialized:', this.threeScene);
    // },
    create() {
      this.threeScene.createListener();
    },
    initScene() {
      this.threeContainer = this.$refs.threeContainer;
      this.threeScene = new ThreeScene(this.threeContainer);
      console.log("three", this.threeScene);
    },
    viewSeat() {
      this.threeScene.viewSeats()
    },
    moveFront() {

      this.threeScene.moveFront()

    },
    rotateSides() {
      this.threeScene.rotateSides()
    },
  }
}
</script>

<style>
.three-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.glow-button {
  position: absolute;
  z-index: 1;
}
</style>