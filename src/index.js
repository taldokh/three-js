import * as THREE from '../node_modules/three/build/three.module.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
let camera, scene, renderer;
let geometry, material, mesh;
const loader = new GLTFLoader();

init();
animate();
window.addEventListener('resize', onWindowResize, false);

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 10;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    scene.add(light);

    loader.load('../models/rocket/scene.gltf', function (gltf) {
        gltf.tex
        scene.add(gltf.scene);
        renderer.render(scene, camera);
    }, undefined, function (error) {

        console.error(error);

    });

    let controls = new OrbitControls(camera, renderer.domElement);
}

function update() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
}

function animate() {

    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.update();
}