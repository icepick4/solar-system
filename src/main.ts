import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { earthTexture } from './constants';

let renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    controls: OrbitControls;

const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

const animateSphere = () => {
    requestAnimationFrame(animateSphere);
    sphere.rotation.y += 0.004;
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
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
// restrict camera movement
controls.minDistance = 1;
controls.maxDistance = 10;

// lights
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 200, 0);
const dirLight = new THREE.PointLight(0xffffff, 2, 400);
dirLight.position.set(0, 200, 100);
dirLight.castShadow = true;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

//sphere geometry
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({
    map: earthTexture
});
const sphere = new THREE.Mesh(geometry, material);
//adding shadow
sphere.castShadow = true;
sphere.receiveShadow = true;

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;

scene.add(sphere);
scene.add(hemiLight);
scene.add(dirLight);
scene.add(camera);
scene.add(floor);

render();
animateSphere();

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
