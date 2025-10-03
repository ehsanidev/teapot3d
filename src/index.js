import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

console.log('Three.js>>', THREE)

const myCanvas = document.querySelector("canvas.threeD")
const sizes = {
    width: 900,
    height: 500
}

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf4f2f5)

const axesHelper = new THREE.AxesHelper(10, 10)
scene.add(axesHelper)

const gltfloader = new GLTFLoader();
gltfloader.load('/src/model/scene.glb',
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
directionalLight.position.set(-5.341, 8.684, 3.525)
scene.add(directionalLight)

const spotLight = new THREE.SpotLight(0xffffff, 1)
spotLight.position.set(-1.805, 8.476, 9.747)
scene.add(spotLight)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(-3,2,5)
scene.add(camera)


const hdrLoader = new RGBELoader()
hdrLoader.load('/src/model/small_empty_room_2_4k.hdr',
    (hdr) => {
        hdr.mapping = THREE.EquirectangularReflectionMapping
        scene.environment = hdr
        // scene.background=hdr
    }
)

const render = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true
})

const controls = new OrbitControls(camera, render.domElement)
// controls.autoRotate=true
// controls.addEventListener('change',()=>{
// console.log('position', camera.position)
// console.log('rotation', camera.rotation)
// })


render.setSize(sizes.width, sizes.height)
render.setPixelRatio(window.devicePixelRatio)

function animate() {
    console.log('animate')
    requestAnimationFrame(animate)
    render.render(scene, camera)
    controls.update()
}
animate();