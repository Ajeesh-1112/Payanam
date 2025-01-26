<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  name: "ThreeScene",
  mounted() {
    this.initThree();
    this.loadModel();
  },
  beforeUnmount() {
    // Clean up resources
    window.removeEventListener("resize", this.onWindowResize);
    this.renderer.dispose();
  },
  methods: {
    loadModel() {
  const loader = new GLTFLoader();
  const modelPath = "/airline_plane_seat_game_ready.glb"; // Adjust the path to your GLB file

  loader.load(
    modelPath,
    (gltf) => {
      // Model loaded successfully
      const model = gltf.scene;

      // Compute bounding box
      const box = new THREE.Box3().setFromObject(model);

      // Get the center of the bounding box
      const center = box.getCenter(new THREE.Vector3());

      // Reposition the model to center it
      model.position.x -= center.x;
      model.position.y -= center.y;
      model.position.z -= center.z;

      // Optionally scale the model to fit within a specific size
      const size = box.getSize(new THREE.Vector3());
      const maxSize = Math.max(size.x, size.y, size.z);
      const scaleFactor = 2 / maxSize; // Adjust the target size (e.g., 2 units)
      model.scale.setScalar(scaleFactor);

      // Add model to the scene
      this.scene.add(model);

      console.log("Model centered and added to the scene", model);
    },
    (xhr) => {
      // Progress
      console.log(`Model ${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      // Error handling
      console.error("Error loading the model:", error);
    }
  );
},

    initThree() {
      // Scene
      this.scene = new THREE.Scene();

      // Camera
      const aspectRatio = window.innerWidth / window.innerHeight;
      this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
      this.camera.position.z = 5;

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.threeContainer.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // Animation loop
      this.animate();

      // Handle window resize
      window.addEventListener("resize", this.onWindowResize);
    },
    animate() {
      requestAnimationFrame(this.animate);

      

      // Render the scene
      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize() {
      // Update camera aspect ratio and renderer size
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
  },
};
</script>

<style>
.three-container {
  width: 40vw;
  height: 50vh;
  overflow: hidden;
}
</style>
