import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

console.log('Three.js>>', THREE)

const myCanvas = document.querySelector("canvas.threeD")
const sizes = {
    width: 390, height: 590
}

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffafcc)

const gltfloader = new GLTFLoader();
gltfloader.load('/assets/scene.gltf',
    (gltf) => {
        console.log('gltf>>>', gltf)
        gltf.scene.scale.set(1, 1, 1)
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`)
    },
    (error) => {
        console.log(`An error occurred while loading the model:`, error)
    }
)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(5.341, 5.684, 3.525)
scene.add(directionalLight)

const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(-100,250,400)
scene.add(camera)


const render = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true
})

const controls = new OrbitControls(camera, render.domElement)
// controls.autoRotate=true
controls.addEventListener('change',()=>{
console.log('position', camera.position)
// console.log('rotation', camera.rotation)
})


render.setSize(sizes.width, sizes.height)
render.setPixelRatio(window.devicePixelRatio)

function animate() {
    console.log('animate')
    requestAnimationFrame(animate)
    render.render(scene, camera)
    controls.update()
}
animate();