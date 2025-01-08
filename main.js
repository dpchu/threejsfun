import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let dog;
const scene = new THREE.Scene();
const loader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
// renderer.setAnimationLoop(animate);
document.body.appendChild( renderer.domElement);

loader.load('shiba/scene.gltf', function(gltf){
// loader.load('shiba/scene.gltf', function(gltf){
    const dog = gltf.scene;
    dog.traverse((child) => {
        if(child.isMesh){
            child.rotation.y = Math.PI / 8;
            child.position.y = -2;
            child.geometry.center();
        }
    })
    scene.add(dog);


}, undefined, function (error){
    console.error(error);
});

function animate(){
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
}

if(WebGL.isWebGL2Available()) {
    animate();
} else {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.getElementById('container').appendChild(warning);
}

