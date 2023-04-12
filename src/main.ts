import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { earthTexture } from './constants';

let renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    controls: OrbitControls;

const render = () => {
    window.requestAnimationFrame(render);
    animateSphere();
    renderer.render(scene, camera);
};

const animateSphere = () => {
    sphere.rotation.y += 0.0025;
};

const fullRotation = () => {
    //make one full rotation then stop
    const rotation = setInterval(() => {
        sphere.rotation.y += 0.025;
    }, 1);
    setTimeout(() => {
        clearInterval(rotation);
    }, 1000);
};

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
// restrict camera movement
controls.minDistance = 1;
controls.maxDistance = 10;

const dirLight = new THREE.PointLight(0xffffff, 2, 400);
dirLight.position.set(0, 20000, 1000);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 500;
dirLight.shadow.radius = 30;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

//sphere geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({
    map: earthTexture
});
material.map!.anisotropy = 16;
const sphere = new THREE.Mesh(geometry, material);
//adding shadow
sphere.castShadow = true;
sphere.receiveShadow = true;

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -3;
floor.castShadow = true;
floor.receiveShadow = true;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(100, 100, 0);
light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
//blur
light.shadow.radius = 10;

scene.add(light);
scene.add(sphere);
scene.add(dirLight);
scene.add(camera);
scene.add(floor);

render();
animateSphere();

document.addEventListener('click', fullRotation);

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.updateProjectionMatrix();
        render();
    },
    false
);
document.body.appendChild(renderer.domElement);
