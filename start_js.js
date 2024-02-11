import * as THREE from 'three';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.141.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.141.0/examples/jsm/controls/OrbitControls.js';
import { AnimationMixer } from 'three';
import {
    CSS3DRenderer,
    CSS3DObject
 } from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js';

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    const clock = new THREE.Clock();

    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(35, WIDTH/HEIGHT, 0.1, 1000);                //ระยะการมองเห็น 35, สัดส่วนภาพเป็นความกว้าง/ความสูง, ระยะใกล้ 0.1, ระยะไกล 1000
    camera.position.set(-130,45,100);                                                       // มุมกล้องที่แสดงภาพในจอ

    const orbit = new OrbitControls(camera, renderer.domElement);                           //ทำให้สามารถหมุนกล้องได้
    orbit.update();

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.8 );                 //แสงจากทุกทิศทาง ครึ่งบนแสงจากท้องฟ้า, ครึ่งล่างแสงจากพื้นดินปรับให้เป็นสีขาวทั้ง
    hemiLight.position.set(100,100,100);
    scene.add(hemiLight);


    const light3 = new THREE.PointLight(0xffffff,1);                                        //แสงที่ถูกปล่อยออกมาจากจุดเดียวเพื่อไว้ฉายตัวฉลาม, ความเข้มของแสงเป็น 1
    light3.position.set(2,100,15);
    light3.castShadow = true;                                                               //สร้างเงาจากแสงนี้
    scene.add(light3);

    let meshFloor;                                                                          //สีพื้น
    meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(300,300, 300,10),
		new THREE.MeshPhongMaterial({color:0xd07655, wireframe:false})
	  );
    meshFloor.receiveShadow = true;
	  meshFloor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
    meshFloor.position.y -= 12;
	  scene.add(meshFloor);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const mixers = [];
    let mixer,mixer2;

    // init loader
    const loader = new GLTFLoader();

    // make async loader
    const loadAsync = url => {
        return new Promise(resolve => {
        loader.load(url, gltf => {
        resolve(gltf)
        })
    })
    }

    const modelUrl1 = new URL('model/shark.glb', import.meta.url);
    const modelUrl2 = new URL('model/cliff3_purple.glb', import.meta.url);
    const modelUrl3 = new URL('model/rock_yellow.glb', import.meta.url);
    const modelUrl4 = new URL('model/seaweed2_pink.glb', import.meta.url);
    const modelUrl5 = new URL('model/tree4_mushroom.glb', import.meta.url);
    const modelUrl6 = new URL('model/cliff2_green_grass.glb', import.meta.url);


// load both models in parallel
let player,player2, player3, player4, player5, player6;
var x,y,z;
renderer.setClearColor( 0xffffff, 0);

Promise.all([

  loadAsync(modelUrl1.href), 
  loadAsync(modelUrl2.href),
  loadAsync(modelUrl3.href),
  loadAsync(modelUrl4.href),
  loadAsync(modelUrl5.href),
  loadAsync(modelUrl6.href),

]).then(models => {                                                       // Load models in to an Array!
 
    player = models[0].scene.children[0]
    player.traverse(function (node) {       // castshadow
        if (node.isMesh)
            node.castShadow = true;
    });
    player.receiveShadow = true;            // shadow
    //player.rotation.z += Math.PI;           //หันข้าง
    player.rotation.y += Math.PI;
    player.position.set(-15, 1, 40);
    player.scale.set(1, 1, 1);     //ขยาย
    scene.add(player);                      //add

    mixer = new AnimationMixer(player);                              //animate
    mixer.clipAction(models[0].animations[0]).play();
    console.log(mixer);
    mixers.push(mixer);   //



    // MODEl 2

     player2 = models[1].scene.children[0]
     player2.traverse(function (node) {
         if (node.isMesh)
             node.castShadow = true;
     });
     player2.receiveShadow = true;
     player2.rotation.y += Math.PI;
     player2.rotation.y += 180;
     player2.position.set(60, -12, 0);
     player2.scale.set(1, 1, 1);
     scene.add(player2);

    // mixer2 = new AnimationMixer(player2);
    // mixer2.clipAction(models[1].animations[0]).play();
    // console.log(mixer2);
    // mixers.push(mixer2);

    // MODEl 3

    player3 = models[2].scene.children[0]
    player3.traverse(function (node) {
        if (node.isMesh)
            node.castShadow = true;
    });
    player3.receiveShadow = true;
    //player3.rotation.y += Math.PI;
    player3.position.set(-70, -5, 0);
    player3.scale.set(10, 10, 10);
    scene.add(player3);

    // MODEl 4

    player4 = models[3].scene.children[0]
    player4.traverse(function (node) {
        if (node.isMesh)
            node.castShadow = true;
    });
    player4.receiveShadow = true;
    player4.position.set(-50, -14, -10);
    player4.scale.set(0.8, 0.8, 0.8);
    scene.add(player4);

    // MODEl 5

    player5 = models[4].scene.children[0]
    player5.traverse(function (node) {
        if (node.isMesh)
            node.castShadow = true;
    });
    player5.receiveShadow = true;
    player5.rotation.y += Math.PI;
    player5.position.set(-70, -14, -30);
    player5.scale.set(0.8, 0.8, 0.8);
    scene.add(player5);

    // MODEl 6

    player6 = models[5].scene.children[0]
    player6.traverse(function (node) {
        if (node.isMesh)
            node.castShadow = true;
    });
    player6.receiveShadow = true;
    player6.rotation.y += Math.PI;
    player6.rotation.y += 120;
    player6.position.set(-90, -14, -40);
    player6.scale.set(0.8, 0.8, 0.8);
    scene.add(player6);
});

let el = document.createElement('div');
el.innerHTML = "<h1>START</h1>";
let obj = new CSS3DObject(el);
obj.position.set(-130, 45, 100);
scene.add(obj);

let loader2 = new THREE.CubeTextureLoader();
let skyBox = loader2.load([
    'skybox/px.png',
    'skybox/nx.png',
    'skybox/py.png',
    'skybox/ny.png',
    'skybox/pz.png',
    'skybox/nz.png',
    
]);
scene.background = skyBox;


function animate(){

    requestAnimationFrame(animate);
    obj.rotation.y += 0.007;
    const delta = clock.getDelta();
    mixers.forEach(function(mixer) {
        mixer.update(delta);
    });
    renderer.render(scene, camera);
}
//renderer.setAnimationLoop(animate);
animate();