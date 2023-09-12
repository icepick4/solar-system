import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
    earthTexture,
    jupiterTexture,
    marsTexture,
    mercuryTexture,
    moonTexture,
    neptuneTexture,
    saturnTexture,
    sunTexture,
    uranusTexture,
    venusTexture
} from './constants';

let renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    controls: OrbitControls;

const render = () => {
    window.requestAnimationFrame(render);
    animateSphere();
    renderer.render(scene, camera);
};

let increment = (2 * Math.PI) / 1000;
let angle = 0;

const animateSphere = () => {
    angle += increment;

    earth.rotation.y += 0.15;
    earth.position.x = Math.cos(angle * 2) * 20;
    earth.position.z = Math.sin(angle * 2) * 20;

    moon.rotation.y += 0.001;
    moon.position.x = earth.position.x + Math.cos(angle * 10) * 2.5;
    moon.position.z = earth.position.z + Math.sin(angle * 10) * 2.5;

    mars.rotation.y += 0.08;
    mars.position.x = Math.cos(angle * 1.5) * 30;
    mars.position.z = Math.sin(angle * 1.5) * 30;

    venus.rotation.y += 0.001;
    venus.position.x = Math.cos(angle * 2) * 14;
    venus.position.z = Math.sin(angle * 2) * 14;

    jupiter.rotation.y += 0.0045;
    jupiter.position.x = Math.cos(angle * 0.8) * 100;
    jupiter.position.z = Math.sin(angle * 0.8) * 100;

    neptune.rotation.y += 0.001;
    neptune.position.x = Math.cos(angle * 0.3) * 150;
    neptune.position.z = Math.sin(angle * 0.3) * 150;

    uranus.rotation.y += 0.0014;
    uranus.position.x = Math.cos(angle * 0.4) * 125;
    uranus.position.z = Math.sin(angle * 0.4) * 125;

    mercury.rotation.y += 0.001;
    mercury.position.x = Math.cos(angle * 3) * 10;
    mercury.position.z = Math.sin(angle * 3) * 10;

    saturn.rotation.y += 0.0037;
    saturn.position.x = Math.cos(angle * 0.6) * 75;
    saturn.position.z = Math.sin(angle * 0.6) * 75;
};

scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 50;

renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

//sphere geometry
const earthGeometry = new THREE.SphereGeometry(1.6, 32, 32);
const sunGeometry = new THREE.SphereGeometry(7, 32, 32);
const moonGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const marsGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const venusGeometry = new THREE.SphereGeometry(1.2, 32, 32);
const jupiterGeometry = new THREE.SphereGeometry(4.5, 32, 32);
const neptuneGeometry = new THREE.SphereGeometry(2.5, 32, 32);
const uranusGeometry = new THREE.SphereGeometry(2.5, 32, 32);
const mercuryGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const saturnGeometry = new THREE.SphereGeometry(4, 32, 32);

const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.castShadow = true;
earth.receiveShadow = true;
earth.position.x = 30;

const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.castShadow = true;
moon.receiveShadow = true;
moon.position.x = 30;

const marsMaterial = new THREE.MeshStandardMaterial({
    map: marsTexture
});
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.castShadow = true;
mars.receiveShadow = true;
mars.position.x = 45;

const venusMaterial = new THREE.MeshStandardMaterial({
    map: venusTexture
});
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.castShadow = true;
venus.receiveShadow = true;
venus.position.x = 21;

const jupiterMaterial = new THREE.MeshStandardMaterial({
    map: jupiterTexture
});
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.castShadow = true;
jupiter.receiveShadow = true;
jupiter.position.x = 100;

const neptuneMaterial = new THREE.MeshStandardMaterial({
    map: neptuneTexture
});
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.castShadow = true;
neptune.receiveShadow = true;
neptune.position.x = 150;

const uranusMaterial = new THREE.MeshStandardMaterial({
    map: uranusTexture
});
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.castShadow = true;
uranus.receiveShadow = true;
uranus.position.x = 125;

const mercuryMaterial = new THREE.MeshStandardMaterial({
    map: mercuryTexture
});
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.castShadow = true;
mercury.receiveShadow = true;
mercury.position.x = 10;

const saturnMaterial = new THREE.MeshStandardMaterial({
    map: saturnTexture
});
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.castShadow = true;
saturn.receiveShadow = true;
saturn.position.x = 75;

const starsCoords = [];

for (let i = 0; i < 1000; i++) {
    const x = THREE.MathUtils.randFloatSpread(1000);
    const y = THREE.MathUtils.randFloatSpread(1000);
    const z = THREE.MathUtils.randFloatSpread(1000);

    starsCoords.push(x, y, z);
}

const starsGeometry = new THREE.BufferGeometry();
starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starsCoords, 3)
);
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const stars = new THREE.Points(starsGeometry, starsMaterial);

const globalLight = new THREE.AmbientLight(0xffffff, 0.25);

const pointLight = new THREE.PointLight(0xffffff, 1.25);
pointLight.position.set(0, 0, 0);
pointLight.color = new THREE.Color(0xff7f50);

scene.add(globalLight);
scene.add(pointLight);
scene.add(stars);
scene.add(earth);
scene.add(moon);
scene.add(mars);
scene.add(jupiter);
scene.add(neptune);
scene.add(uranus);
scene.add(mercury);
scene.add(saturn);
scene.add(venus);
scene.add(sun);
scene.add(camera);

render();
animateSphere();

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.updateProjectionMatrix();
    },
    false
);
document.body.appendChild(renderer.domElement);
