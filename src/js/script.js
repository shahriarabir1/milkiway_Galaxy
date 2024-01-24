import * as Three from "three"
import suns from "../img/sun.jpg"
import star from "../img/stars.jpg"
import earths from "../img/earth.jpg"
import mercurys from "../img/mercury.jpg"
import jupiters from "../img/jupiter.jpg"
import marss from "../img/mars.jpg"
import neptunes from "../img/neptune.jpg"
import plutos from "../img/pluto.jpg"
import saturns from "../img/saturn.jpg"
import uranuss from "../img/uranus.jpg"
import venuss from "../img/venus.jpg"
import ringMat from "../img/saturn_ring.png"
import ringUren from "../img/uranus ring.png"
import moons from '../img/moon.jpg'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

const renderer=new Three.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
const scene=new Three.Scene();

const camera =new Three.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
camera.position.set(-90, 140, 140);  // Adjust the camera position as needed
const axesHelper=new Three.AxesHelper(20);
scene.add(axesHelper)

// const gridHelper = new Three.GridHelper(50, 50);
// scene.add(gridHelper);

const orbit=new OrbitControls(camera,renderer.domElement);

const TextureLoader=new Three.TextureLoader();
const cubeTextLoader=new Three.CubeTextureLoader();
const ambientLight=new Three.AmbientLight(0x333333);
scene.add(ambientLight)
scene.background=cubeTextLoader.load([star,star,star,star,star,star])
const sunGeo=new Three.SphereGeometry(20,300,30);
const sunMat=new Three.MeshBasicMaterial({
  emissive: 0xffffee, // Set emissive color to simulate light emission
  emissiveIntensity: 1,
  map:TextureLoader.load(suns),
})

const sun =new Three.Mesh(sunGeo,sunMat);
scene.add(sun);

function createMesh(radius,texture,position,ring){
const meshGeo=new Three.SphereGeometry(radius,30,30);
const meshMat=new Three.MeshStandardMaterial({
  map:TextureLoader.load(texture)
});

const mesh=new Three.Mesh(meshGeo,meshMat);
mesh.position.x=position;
const object=new Three.Object3D();
object.add(mesh)
if(ring){
  const ringGeo=new Three.RingGeometry(radius,30,32)
  const ringMesh=new Three.MeshStandardMaterial({
    map:TextureLoader.load(ringMat)
  })
  const ringM=new Three.Mesh(ringGeo,ringMesh);
  ringM.position.x=position;
  ringM.rotation.x=-0.5*Math.PI
  object.add(ringM)
}
scene.add(object)
return {object,mesh};
}

// const mercuryGeo=new Three.SphereGeometry(3.20,30,30);
// const mercuryMat=new Three.MeshStandardMaterial({
//   map:TextureLoader.load(mercurys)
// })

// const mercury =new Three.Mesh(mercuryGeo,mercuryMat);
// mercury.position.x=28

// const mercuryObj=new Three.Object3D();
// mercuryObj.add(mercury)
// scene.add(mercuryObj)

const mercury=createMesh(4,mercurys,40)

const venus=createMesh(4*2.7,venuss,40*2)

const earth=createMesh(12,earths,40*3)

const mars=createMesh(4*1.5,marss,40*4)

const jupiter=createMesh(15,jupiters,40*10)

const saturn=createMesh(13,saturns,40*13,ringMat)

const uranus=createMesh(7.5,uranuss,40*15,ringUren)

const moonGeo = new Three.SphereGeometry(4, 30, 30);
const moonMat = new Three.MeshStandardMaterial({
 
  color:0xffffff
});
const moon = new Three.Mesh(moonGeo, moonMat);
const moonObj=new Three.Object3D()
earth.mesh.add(moonObj)
moonObj.add(moon)
moon.position.x=30

const pointLight=new Three.PointLight(0xfffffff, 2, 800);
scene.add(pointLight)
const directionalLight = new Three.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-1, 0, 0); // Set the direction of the light
sun.add(directionalLight);


function animate() {
 
  sun.rotateY(0.01)
  mercury.object.rotateY(0.04)
  earth.object.rotateY(0.02)
  venus.object.rotateY(0.03)
  mars.object.rotateY(0.017)
  jupiter.object.rotateY(0.017/2)
  saturn.object.rotateY(0.017/3)
  uranus.object.rotateY(0.017/4)
  moonObj.rotateY(0.04)

  mercury.mesh.rotateY(0.004)
  earth.mesh.rotateY(0.004)
  venus.mesh.rotateY(0.003)
  mars.mesh.rotateY(0.0017)
  jupiter.mesh.rotateY(0.004)
  saturn.mesh.rotateY(0.004)
  uranus.mesh.rotateY(0.004)


  orbit.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
window.addEventListener("resize",function(){
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})