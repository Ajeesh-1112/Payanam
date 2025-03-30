import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Group, Tween, Easing } from "@tweenjs/tween.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
export default class ThreeScene {
  constructor(container) {
    this.container = container;
    this.tweenGroup = new Group();
    this.sprites = []; // Store all sprites
    this.initThree();
    window.addEventListener("resize", this.onWindowResize.bind(this));
    window.addEventListener("click", this.onMouseClick.bind(this)); // Add click event
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("white");

    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.set(
      -4.200033965446292, 3.375501009667464, 9.4321634645945);
    // this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI / 2.5;

    this.light = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.light);

    const pointLight = new THREE.DirectionalLight("white", 2);
    pointLight.position.set(10, 10, 0);
    this.scene.add(pointLight);

    this.raycaster = new THREE.Raycaster(); // Raycaster for detecting clicks
    this.mouse = new THREE.Vector2(); // Store mouse position
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load("hdri.hdr", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.environment = texture;  // Apply HDRI as environment
        this.scene.background = texture;   // (Optional) Use HDRI as background
    });
    this.loadModel();
    this.animate();
  }

  loadModel() {
    const loader = new GLTFLoader();
    const modelPath = "/indonesian_bus_ecoline.glb";

    loader.load(
      modelPath,
      (gltf) => {
        this.scene.add(gltf.scene);
        console.log('glt',gltf.scene);

        const seatMaterial = new THREE.MeshPhysicalMaterial({color:'#454343',clearcoat:1,clearcoatRoughness:0.5})
    
        gltf.scene.children[0].children[0].children[16].children[0].material=seatMaterial

        const floorMaterial = new THREE.MeshStandardMaterial({color:'#5A5A5A'})
        gltf.scene.children[0].children[0].children[30].children[0].material=floorMaterial

        const topMaterial = new THREE.MeshStandardMaterial({color:'#5A5A5A'})
        gltf.scene.children[0].children[0].children[15].children[0].material=topMaterial

        const topLineMaterial = new THREE.MeshStandardMaterial({color:'black'})
        gltf.scene.children[0].children[0].children[19].children[0].material=topLineMaterial

        const mirrorMaterial = new THREE.MeshStandardMaterial({color:'black'})
        gltf.scene.children[0].children[0].children[14].children[0].material=mirrorMaterial

        const sideDotMaterial = new THREE.MeshStandardMaterial({color:'black'})
        gltf.scene.children[0].children[0].children[7].children[0].material=sideDotMaterial

        const glassMaterial = new THREE.MeshStandardMaterial({color:'black',transparent:true,opacity:0.8})
        gltf.scene.children[0].children[0].children[1].children[0].material=glassMaterial


        this.createSprites();
        this.object = gltf.scene;

this.radius = Math.sqrt(
  Math.pow(-4.200033965446292, 2) +
  Math.pow(3.375501009667464, 2) +
  Math.pow(9.4321634645945, 2)
);

this.angle = 0;
      },
      undefined,
      (error) => console.error("Error loading model", error)
    );
  }

  createSprites() {
    const textureLoader = new THREE.TextureLoader();
    const spriteTexture = textureLoader.load("./payanam.png");

    const spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture });

    const startPosition = new THREE.Vector3(-0.49, 2.55, 2.55);
const startPosition2 = new THREE.Vector3( 
0.4351855169308744,  
2.4866183021329688,
  3.044029005676796);

    for (let i = 0; i < 7; i++) {
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(startPosition.x, startPosition.y + 0.2, startPosition.z + i * -1.3);
      sprite.scale.set(0.2, 0.2, 0.2);
      this.scene.add(sprite);
      this.sprites.push(sprite);
    }
     for (let i = 0; i < 7; i++) {
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(startPosition.x-0.5, startPosition.y+0.2, startPosition.z + i * -1.3);
        sprite.scale.set(0.2,0.2,0.2)
        this.scene.add(sprite);
        this.sprites.push(sprite);

      }
        for (let i = 0; i < 6; i++) {
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(startPosition2.x, startPosition2.y+0.2, startPosition2.z + i * -1.3);
    sprite.scale.set(0.2,0.2,0.2)
    this.scene.add(sprite);
    this.sprites.push(sprite);

  }
  for (let i = 0; i < 6; i++) {
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(startPosition2.x+0.5, startPosition2.y+0.2, startPosition2.z + i * -1.3);
    sprite.scale.set(0.2,0.2,0.2)
    this.scene.add(sprite);
    this.sprites.push(sprite);

  }
  }

  onMouseClick(event) {
    // Convert mouse click to normalized device coordinates (-1 to +1)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.sprites);

    if (intersects.length > 0) {
      const clickedSprite = intersects[0].object;
      this.moveCameraToSprite(clickedSprite);
    }
  }


moveCameraToSprite(sprite) {
  this.tweenGroup.removeAll(); // Stop any active tweens

  // Move the camera to the front of the sprite (bus)
  const offset = 2; // Distance in front of the bus
  const targetPosition = new THREE.Vector3(
    sprite.position.x,
    sprite.position.y , // Move slightly above sprite
    sprite.position.z +0.5
  );

  new Tween(this.camera.position, this.tweenGroup)
    .to(targetPosition, 1500)
    .easing(Easing.Quadratic.InOut)
    .onUpdate(() => {
      this.camera.position.copy(this.camera.position);
      // Make the camera look in front of the bus
      this.camera.lookAt(sprite.position.x, sprite.position.y, sprite.position.z + offset);
    })
    .onComplete(() => {
      this.camera.lookAt(sprite.position.x, sprite.position.y, sprite.position.z + offset);
    })
    .start();

}


viewSeats() {
    this.tweenGroup.removeAll(); // Stop any active tweens

    const seatPosition = new THREE.Vector3(0.0076, 2.70, 4.18);
    const lookAtTarget = new THREE.Vector3(0, 2, 0); // Ensure camera looks at the correct point

    new Tween(this.camera.position ,this.tweenGroup)
        .to(seatPosition, 1500)
        .easing(Easing.Quadratic.InOut)
        .onUpdate(() => {
            this.camera.position.lerp(seatPosition, 0.1); // Smoothly move camera
            this.camera.lookAt(lookAtTarget);
        })
        .onComplete(() => {
            this.camera.lookAt(lookAtTarget);
        })
        .start();
}
moveFront() {
  this.tweenGroup.removeAll(); // Stop any active tweens

  const moveDistance = 1; // Adjust this value for how much to move forward
  const direction = new THREE.Vector3(); 
  this.camera.getWorldDirection(direction); // Get the camera's current forward direction

  const targetPosition = new THREE.Vector3().copy(this.camera.position).addScaledVector(direction, moveDistance);

  new Tween(this.camera.position ,this.tweenGroup)
      .to(targetPosition, 1000) 
      .easing(Easing.Quadratic.InOut)
      .onUpdate(() => {
          this.camera.position.lerp(targetPosition, 0.1); 
      })
      .onComplete(() => {
          this.camera.position.copy(targetPosition);
      })
      .start();
}
rotateSides(){
   this.angle += 1; 

  new Tween(this.camera.position, this.tweenGroup)
      .to({ x: this.radius * Math.cos(this.angle), y: 3.375501009667464, z: this.radius * Math.sin(this.angle) }, 1000)
      .easing(Easing.Quadratic.InOut)
      .onUpdate(() => {
          this.camera.lookAt(0, 0, 0);
      })
      .start();
  this.camera.lookAt(0,0,0);
}
  animate() {
    requestAnimationFrame(() => this.animate());
    this.tweenGroup.update();
    // console.log(this.camera.position);
   
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
//-4.20003396544629
//3
//-10