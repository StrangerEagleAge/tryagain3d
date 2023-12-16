<script type="module">
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader";
import { FontLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/geometries/TextGeometry";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//let controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight("blueviolet", 10);
light.position.set(-2, 0, 20);
scene.add(light);

//добавление музыки для атмосферности
const body = document.querySelector("body");
const audioMac = new Audio("macintosh-plus-420.mp3");

audioMac.volume = 0.1;

body.onclick = () => {
  audioMac.play();
  body.style.cursor = "default";
};
//загрузка модели и установление её настроек
const loader = new GLTFLoader();

loader.load(
  "https://threejs.org/examples/models/gltf/Nefertiti/Nefertiti.glb",
  function (gltf) {

    let model = gltf.scene;
    model.traverse(node => {
      if (node.isMesh){
        node.material.map = null;
        node.material.metalness = 0.5;
        node.material.roughness = 0.6;
      }
    })
    model.position.set(0, -2, 0);
    model.scale.setScalar(0.4);

    model.rotation.y = 1.5;
    model.rotation.x = 0.4;
    
    scene.add(gltf.scene);
  }
);
//загрузка текста и установление его настроек
const loaderText = new FontLoader();

loaderText.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function (font) {
  const geometry = new TextGeometry("its all in your h e a d", {
    font: font,
    size: 0.2,
    height: 0.01,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.005,
    bevelSegments: 2
  });
  const material = new THREE.MeshPhongMaterial({
    color: "royalblue",
    shininess: 1
  });
  const textHate = new THREE.Mesh(geometry, material);

  textHate.position.x = -1.25;
  textHate.position.z = 18;
  textHate.position.y = -0.1;
  scene.add(textHate);
});

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
})

</script>
