import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader";


const monkeyUrl = new URL('/model/helmetanimating.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	1,
	1000
); //OrbitControls


//? СВЕТ
var light = new THREE.AmbientLight(0xffffff); // soft white light (мягкий белый свет)
scene.add(light);

// тестовый свет:
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight)

const dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(dirLight);


//? End of СВЕТ

//? Фон
//renderer.setClearColor(0xA3A3A3);
renderer.setClearColor(0x151515);  // это задний фон canvas
//? End of Фон

//? Камера
camera.position.z = 5;  // z = 5 чтобы модель была по центру canvas
camera.position.x = 0;  // x = 0 чтобы модель была по центру canvas
//? End of Камера


const assetLoader = new GLTFLoader();

var mixer; //!
assetLoader.load(monkeyUrl.href, function (gltf4) {
	const model = gltf4.scene;
	scene.add(model);
	mixer = new THREE.AnimationMixer(model);  //!
	const clips = gltf4.animations;  //!
	//const clip = THREE.AnimationClip.findByName(clips, 'Idle');  //! Idle
	//const action = mixer.clipAction(clip);  //!
	var action = mixer.clipAction(gltf4.animations[0]);
	action.play();  //!

	gltf4.scene.scale.set(1, 1, 1) // Увеличить масштаб
	gltf4.scene.rotation.y = -0.9; // Повернуть модель по оси:y
	gltf4.scene.position.x = 2.2; // передвинуть модель по оси:x

	scene.add(gltf4.scene)
}, undefined, function (error) {
	console.error(error);
});

//!
const clock = new THREE.Clock();

function animate() {
	requestAnimationFrame(animate)

	const delta = clock.getDelta();
	mixer.update(delta);
	renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(this.window.innerWidth, window.innerHeight);
});

