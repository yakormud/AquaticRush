
// นันทกร ลามอ 6409682553
// อิงรัก อุตตมางคพงศ์ 6409682975

import * as THREE from 'three';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.141.0/examples/jsm/loaders/GLTFLoader.js";
import { AnimationMixer } from 'three';
import { MathUtils } from 'three';
import {
  CSS3DRenderer,
  CSS3DObject
} from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js';

//กำหนดตัวโหลดของไฟล์โมเดล GLTF
const loader = new GLTFLoader();

    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;
    let USE_WIREFRAME = false;
    var direction = new THREE.Vector3(0, 0, 1);
    var speed = 50;                                                         //กำหนดค่า speed เพื่อใช้เป็นค่าความเร็วของการเล่นเกม
    let coinsCount = 0;
    const mixers = [];
    let mixer;
    var enemyRocksArr = []
    let player, playerHitbox, rock, enemy, rockHitbox1, test, coin;
    let geomRoadStrip2, matRoadStrip2;
    var enemyRocksArr2 = [];
    var coinsArr = [];
    var coinsArr2 = [];
    let coinStrip;
    let geomCoin, matCoin, RoadStrip2;
    var x, y, z;
    let cliff, cliff2;
    var cliffArr = [];

    let coral;
    let coralArr = [];

    let fish, fish2;
    let fishArr = [];

    // สร้าง Scene , renderer, clock ไว้เพื่อใช้ในการอัพเดท animation แต่ละเฟรม
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    const clock = new THREE.Clock();

    // กำหนด camera เป็นกล้องหลักในการมองในเกม
    const camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 1000);
    camera.position.set(0, 35, 50);
    camera.lookAt(0,0,0);
    scene.add(camera);

    //สร้างแสงแบบ HemishereLight
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1 ); 
    hemiLight.position.set(100,10,100);
    scene.add(hemiLight);

    //สร้างแสงแบบ pointLight ไปยังแมพ
    const light3 = new THREE.PointLight(0xffffff,0.5);
    light3.position.set(-10,30,-20);
    light3.castShadow = true;
    scene.add(light3);

    //สร้างแสงแบบ PointLight อีกอันไปยังแมพ
    const light4 = new THREE.PointLight(0x3a3a3e,0.5);
    light4.position.set(-60,30,0);
    light4.castShadow = true;
    scene.add(light4);

    //สร้างพื้นแบบ Phong Material ที่สามารถสะท้อนแสงได้ และเป็นพื้นหลักของตัวเกม
    var meshFloor;
    meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(700,700, 700,10),
		new THREE.MeshPhongMaterial({color:0xd07655, wireframe:USE_WIREFRAME})
	  );
    meshFloor.receiveShadow = true;
	  meshFloor.rotation.x -= Math.PI / 2; // หมุนพื้นจากแนวระนาบแกน X 90 องศา
    meshFloor.position.y -= 2;
	  scene.add(meshFloor);

    //ทำให้เกิดแสงเงาบนวัตถุที่ถูก Render ออกมา
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;


    //สร้างเสียง audio ไฟล์สำหรับใช้เปิดในโปรแกรม
    const listener = new THREE.AudioListener();
    camera.add( listener );

    const sound = new THREE.Audio(listener);

    //กำหนด URL ของเพลงที่อยู่ในโฟลเดอร์ ชื่อ song.mp3
    const songUrl = new URL('/song.mp3', import.meta.url);

    //โหลดเพลง โดยกำหนดให้เพลง loop ตลอดเวลา และตั้งค่า Volume ความดังของเพลง = 0.2
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(songUrl.href, function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.1);
      sound.play();
    });

    //กำหนด URL ของตัวโมเดลทั้งหมดที่ใช้ในเกม ซึ่งอยู่ในโฟลเดอร์ model2
    const fishUrl1 = new URL('model2/shark.glb', import.meta.url);
    const fishUrl2 = new URL('model2/whale.glb', import.meta.url);
    const fishUrl3 = new URL('model2/shark_orange.glb', import.meta.url);
    const fishUrl4 = new URL('model2/whale_yellow.glb', import.meta.url);
    const fishUrl5 = new URL('model2/whale_pink.glb', import.meta.url);
    const treeUrl1 = new URL('model2/tree3.glb', import.meta.url);
    const rockUrl1 = new URL('model2/rock.glb', import.meta.url);
    const rockUrl2 = new URL('model2/rock_pink.glb', import.meta.url);
    const rockUrl3 = new URL('model2/rock_yellow.glb', import.meta.url);
    const coinUrl1 = new URL('model2/coin.glb', import.meta.url);
    const cliffUrl1 = new URL('model2/cliff3_purple.glb', import.meta.url);
    const cliffUrl2 = new URL('model2/cliff2_green.glb', import.meta.url);
    const cliffUrl3 = new URL('model2/cliff2_green_grass.glb', import.meta.url);
    const coralUrl1 = new URL('model2/coral1.glb', import.meta.url);
    const coralUrl2 = new URL('model2/coral2.glb', import.meta.url);
    const coralUrl3 = new URL('model2/coral3.glb', import.meta.url);
    const coralUrl4 = new URL('model2/coral4.glb', import.meta.url);
    const coralUrl5 = new URL('model2/coral5.glb', import.meta.url);
    const coralUrl6 = new URL('model2/seaweed_blue.glb', import.meta.url);
    const coralUrl7 = new URL('model2/tree7.glb', import.meta.url);
    const coralUrl8 = new URL('model2/seaweed_pink.glb', import.meta.url);




//ทำฟังก์ชั้นการโหลดโมเดลแบบ Async Loader คือให้มีการโหลดโมเดลเป็นลำดับขั้นตอนจนครบ
const loadAsync = url => {
  return new Promise(resolve => {
    loader.load(url, gltf => {
      resolve(gltf)
    })
  })
}

//ทำการโหลดโมเดลทั้งหมด รวมถึง animation ของตัวโมเดล
Promise.all([

  loadAsync(fishUrl1.href),           // Index = 0
  loadAsync(fishUrl2.href),
  loadAsync(treeUrl1.href),
  loadAsync(fishUrl1.href),
  loadAsync(rockUrl1.href),
  loadAsync(coinUrl1.href),
  loadAsync(cliffUrl1.href),
  loadAsync(cliffUrl3.href),
  loadAsync(cliffUrl2.href),
  loadAsync(cliffUrl2.href),
  loadAsync(cliffUrl1.href),
  loadAsync(cliffUrl2.href),          // โมเดลสุดท้ายของภูเขาฝั่งขวา
  loadAsync(cliffUrl3.href),          // โมเดลแรกของภูเขาฝั่งซ้าย
  loadAsync(cliffUrl2.href),
  loadAsync(cliffUrl2.href),
  loadAsync(cliffUrl3.href),
  loadAsync(cliffUrl1.href),
  loadAsync(cliffUrl1.href),
  loadAsync(rockUrl2.href),           // Index = 18 , โมเดลหิน
  loadAsync(coralUrl1.href),
  loadAsync(coralUrl2.href),
  loadAsync(coralUrl3.href),
  loadAsync(coralUrl3.href),
  loadAsync(coralUrl4.href),
  loadAsync(coralUrl5.href),
  loadAsync(coralUrl6.href),
  loadAsync(coralUrl7.href),
  loadAsync(coralUrl8.href),
  loadAsync(coinUrl1.href),
  loadAsync(fishUrl1.href),            //Index =  29, โมเดลของปลาที่ว่ายในแมพ
  loadAsync(fishUrl3.href),
  loadAsync(fishUrl4.href),
  loadAsync(fishUrl5.href),

]).then(models => {                    //ทำการโหลดโมเดลและเพิ่มเข้าไปใน Array                             
 
    player = models[0].scene.children[0]        //โมเดลหลักของผู้เล่น  เป็นตัวปลาฉลามที่ได้จากการโหลดใน Array ลำดับที่ 1
    player.traverse( function(node){
         if(node.isMesh)
             node.castShadow = true;          //กำหนดให้สามารถสร้างแสงเงาในแมพได้
    });
    player.receiveShadow = true;              //สามารถรับแสงเงาได้
    player.rotation.x += Math.PI ;            //ทำการหมุนให้สอดคล้องตนกันกับการเล่นในแมพ
    player.rotation.z += Math.PI ;
    player.position.set(0,1,0);               //ตั้งค่า position ของตัวผู้เล่นให้อยู่กลางจอ โดยใช้ position 0,1,0
    player.scale.set(0.6,0.6,0.6);            //กำหนด scale ของปลาฉลาม = 0.6
    scene.add(player);                        //เพิ่มตัวปลาฉลามเข้าไปใน scene


    mixer = new AnimationMixer(player);                                           // mixer ใช้สำหรับการโหลด animation ของตัวโมเดลเพื่อให้สามารถแสดงผลได้
    mixer.clipAction(models[0].animations[0]).play();
    //console.log(mixer);                                                           
    mixers.push(mixer);                                                           // นำ mixer ไปเก็บใน Array mixers[] เพื่อใช้สำหรับเรียกใช้การ animate โมเดลในฟังก์ชัน animate

    playerHitbox = new THREE.Box3(new THREE.Vector3,new THREE.Vector3);           //ทำการกำหนดกล่อง เพื่อใช้เป็น Hitbox ของตัว player 
    playerHitbox.setFromObject(player);                                           //กำหนดให้มีขนาดใกล้เคียงกับปลาฉลาม 
    //console.log('playerHitbox: ');
    //console.log(playerHitbox);

    for (var i = 0; i < 6; i++) {                                                 //สร้างหน้าผา ทั้งสองฝั่ง ซ้าย-ขวา โดยให้มีจำนวนฝั่งละ 6
      //console.log('Cliffs is generated!');
      cliff = models[6+i].scene.children[0];                                      //ทำการโหลดโมเดล                                           
      cliff.scale.set(0.5,0.5,0.5);

      let rand = MathUtils.randInt(-3,3)                                          //ใช้สำหรับการ Random ตัวเลข position ที่จะวางหน้าผาลงไปเผื่อให้มี layer ที่แตกต่างกัน

      cliff.position.set(26+2*rand,0,30-(i*60));                                  //กำหนดฟังก์ชันในการ generate หน้าผา
      cliff.rotation.x += Math.PI ;                                               //ทำการหมุนหน้าผาให้ได้รูปแบบที่ต้องการ โดยใช้ Math.PI เข้ามาช่วยในการหมุน
      cliff.rotation.y += Math.PI/2 ;
      cliff.rotation.z += Math.PI ;
      cliff.receiveShadow = true;
      cliff.castShadow = true;
      scene.add(cliff);
      cliffArr.push(cliff);                                                       //เพิ่มหน้าผาไปใน Array cliffArr[] เพื่อเรียกใช้ในฟังก์ชัน animate

      //console.log(' Right Cliffs is generated!');
      cliff2 = models[12+i].scene.children[0];                                    //สร้างหน้าผาฝั้งขวา
      cliff2.scale.set(0.5,0.5,0.5);

      rand = MathUtils.randInt(-1,1)

      cliff2.position.set(-30+2*rand,0,30-(i*60));
      cliff2.rotation.y -= Math.PI/2 ;
      cliff2.receiveShadow = true;
      cliff2.castShadow = true;
      scene.add(cliff2);
      cliffArr.push(cliff2);

    }

    for (var i = 0; i < 8; i++) {
      console.log('Decoration Coral is generated!');                               //สร้างปะการังจำนวนทั้งสิ้น 8 อัน ตาม texture ที่ 20-28 เพื่อตกแต่งภายในแมพ
      coral = models[20+i].scene.children[0];                                         
      let rand = MathUtils.randInt(-10,10);
      let randSize = MathUtils.randFloat(0,1)
      coral.scale.set(0.25+randSize*0.1,0.25+randSize*0.1,0.25+randSize*0.1);

      coral.position.set(rand*2,-2.5,-200+(-1*rand*15));
      coral.receiveShadow = true;
      coral.castShadow = true;
      
      coral.traverse( function(node){
        if(node.isMesh)
            node.castShadow = true;
      });

      scene.add(coral);
        coralArr.push(coral);

    }

    
    for (var i = 0; i < 6; i++) {                                                   //ฟังก์ชันสำหรับการสร้างหินเพื่อเป็นอุปสรรคในแมพ

      console.log('Enemy rocks is generated!');

      rock = models[4].scene.children[0]
      let rockSize = MathUtils.randInt(1,6);                                      //สุ่มขนาดของหินให้มีขนาดแตกต่างกัน
      rock.scale.set(rockSize,rockSize,rockSize);
      enemy = rock;

      rock.position.set(10 - i * 10, -1, -100 - i * 10);
      rock.receiveShadow = true;
      rock.castShadow = true;

      scene.add(rock);
      enemyRocksArr.push(rock);                                                    //ทำการเก็บ model ของหินไว้ใน Array enemyRocksArr[] เพื่อเรียกใช้ในภายหลัง

      console.log('Enemy hitbox is generated!');
      geomRoadStrip2 = new THREE.BoxGeometry(rockSize+3, rockSize+3, rockSize+3);           //สร้าง Hitbox ของตัวหิน ซึ่งมีขนาดตามโมเดลหินที่สร้างไว้ เพื่อใช้สำหรับการเช็ค collision การชน
      matRoadStrip2 = new THREE.MeshPhongMaterial({color:0xff461f, wireframe:false});

      RoadStrip2 = new THREE.Mesh(geomRoadStrip2, matRoadStrip2);

      y = MathUtils.randInt(-20,20);
      z = MathUtils.randInt(-20,20);
      RoadStrip2.position.set(4-(y*3), -1, -150 - (z*3));
      RoadStrip2.geometry.computeBoundingBox();                                   //ทำการสร้าง boundingBox ขึ้นมาใช้สำหรับการเรียกใช้ขนาดเพิ่มเติมในฟังก์ชัน animate
      RoadStrip2.visible = false;
      RoadStrip2.receiveShadow = true;
      RoadStrip2.castShadow = true;

      scene.add(RoadStrip2);
      enemyRocksArr2.push(RoadStrip2);
      console.log(enemyRocksArr2);                                              //เพิ่ม Hitbox ของหินแต่ละก้อนลงใน Array enemyRocksArr2[] เพื่อใช้เรียกอีกครั้งในภายหลัง
  }
  

  for (var j = 0; j < 2; j++) {                                         //สร้างเหรียญให้สามารถเก็บได้ในแมพ โดยมีหลักการคล้ายกันกับการชนหิน

    console.log('Coins is generated!');                                 //ถ้าชนเหรียญ ผู้เล่นจะได้รับเหรียญเพิ่มแทน โดยไม่เสียหัวใจ
    if( j == 1){
      coin = models[28].scene.children[0];
    }else{
      coin = models[5].scene.children[0];
    }
    coin.scale.set(2,2,2);
    coin.position.set(10 - j * 10, 12, -100 - j * 10);
    coin.rotation.x -= Math.PI/2;
    coin.receiveShadow = true;

    coin.traverse( function(node){
      if(node.isMesh)
          node.castShadow = true;
     });
    
    coinsArr.push(coin);
    scene.add(coin);

    console.log('Coin hitbox is generated!');                                           //สร้าง Hitbox ของเหรียญ
    geomCoin = new THREE.BoxGeometry(3, 3, 3);
    matCoin = new THREE.MeshPhongMaterial({color:0xeaddca, wireframe:false});

    coinStrip = new THREE.Mesh(geomCoin, matCoin);

    y = MathUtils.randInt(-20,20);
    z = MathUtils.randInt(-20,20);

    coinStrip.position.set(4-(y*3), 3, -150 - (z*3));
    coinStrip.geometry.computeBoundingBox();
    coinStrip.visible = false;
    coinStrip.receiveShadow = true;
    coinStrip.castShadow = true;

    scene.add(coinStrip);
    coinsArr2.push(coinStrip);
    console.log(coinsArr2);                                                             //เพิ่ม Hitbox ของเหรียญแต่ละอันใน Array coinsArr2[]
  }
  for (var j = 0; j < 2; j++) {

    console.log('Fish is generated!');                                    //สร้างปลา เป็นโมเดลที่สามารถขยับได้ และลอยไปเรื่อยๆในแมพ
    fish = models[29+j].scene.children[0];
    let randZ = MathUtils.randInt(-300,0);
    let randX = MathUtils.randInt(-25,25);
    fish.position.set(randX, 1, randZ);
    fish.rotation.x += Math.PI ;
    fish.rotation.z += Math.PI ;
    fish.scale.set(0.2,0.2,0.2);
    if(j == 1) fish.scale.set(0.1,0.1,0.1);
    fish.receiveShadow = true;

    fish.traverse( function(node){
      if(node.isMesh)
          node.castShadow = true;
     });
    
    fishArr.push(fish);
    scene.add(fish);

    mixer = new AnimationMixer(fish);                                     //เก็บค่า animation ในตัวแปร mixer เพื่อใช้เรียกสำหรับการทำให้โมเดลสามารถขยับได้
      mixer.clipAction(models[j+29].animations[0]).play();
      console.log(mixer);
      mixers.push(mixer);

    
  }

  for (var j = 0; j < 2; j++) {

    console.log('Whale is generated!');                                   //สร้างปลาวาฬเพิ่มในแมพ โดยใช้หลักการเดียวกับการสร้างปลาเพิ่มด้านบน
    fish2 = models[31+j].scene.children[0];
    let randZ = MathUtils.randInt(-300,0);
    let randX = MathUtils.randInt(-25,25);
    fish2.position.set(randX, 1, randZ);
    fish2.scale.set(1,1,1);
    fish2.receiveShadow = true;

    fish2.traverse( function(node){
      if(node.isMesh)
          node.castShadow = true;
     });
    
    fishArr.push(fish2);
    scene.add(fish2);

    mixer = new AnimationMixer(fish2);
      mixer.clipAction(models[j+31].animations[0]).play();
      console.log(mixer);
      mixers.push(mixer);

    
  }
});
    console.log(mixers);      
let cube1BB = new THREE.Box3(new THREE.Vector3,new THREE.Vector3);     //กำหนดตัวแปรเพื่อใช้เก็บค่าในการสร้าง Hitbox ในแมพ โดยจะเรียกใช้ใน Function animate เพื่อให้
let cube2BB = new THREE.Box3(new THREE.Vector3,new THREE.Vector3);     //Hitbox แต่ละตัวอัพเดทตลอดเวลา
let cube3BB = new THREE.Box3(new THREE.Vector3,new THREE.Vector3);
let cube4BB = new THREE.Box3(new THREE.Vector3,new THREE.Vector3);  
let cube5BB = new THREE.Box3(new THREE.Vector3,new THREE.Vector3);  
let cube6BB = new THREE.Box3(new THREE.Vector3,new THREE.Vector3);

let coin1BB = new THREE.Box3(new THREE.Vector3,new THREE.Vector3);
let coin2BB = new THREE.Box3(new THREE.Vector3,new THREE.Vector3);

let mainBoxGeo = new THREE.BoxGeometry(3, 3, 3);
let mainBoxMat = new THREE.MeshPhongMaterial({color:0x88e904, wireframe:false});

let mainBox = new THREE.Mesh(mainBoxGeo, mainBoxMat);                 //กำหนดตัวแปรเก็บ Hitbox โดย mainBox จะเก็บตัวเก็บ Hitbox หลักของ ตัวที่ player ควบคุม
mainBox.position.z = 5;
mainBox.geometry.computeBoundingBox();
mainBox.visible = false;
scene.add(mainBox);


let t = 0,heart=3,distance = 0,heartStr="Life: &#10084;&#10084;&#10084;";           //กำหนดหัวใจเริ่มต้น และข้อความแสดงสถานะเพิ่มเติม


function animate() {                                                  //ฟังก์ชันหลักสำหรับการ Render ตัว animation ให้ออกมา

    requestAnimationFrame(animate);                                   //ขอ Request เพื่อใช้สำหรับการ render

    const delta = clock.getDelta();                                   //กำหนด delta จาก clock.getDelta() ใช้สำหรับการเก็บข้อมูลเวลาในตัวแปรเพิ่มใช้อัพเดท object
    if(heart ==2) heartStr="Life: &#10084;&#10084;";                  //ข้อความแสดงสถานะเมื่อหัวใจอยู่ในแต่ละระดับ
    if(heart ==1) heartStr="Life: &#10084;";
    if(heart ==0) {                                                   //เมื่อเกมจบจะปรากฎข้อความโชว์ว่า Game Over
      heartStr = "Game Over!";
      document.getElementById("heart").innerHTML = heartStr;
      document.getElementById("heart").style.fontSize = "80px";
      document.getElementById("heart2").style.fontSize = "60px";
      document.getElementById("heart2").innerHTML = "Total Distance: " + distance + "M , Total Coins: " + coinsCount + "$";
      sound.pause();
    }else{
      document.getElementById("heart").innerHTML = heartStr + ", Distance: " + distance + "M , Coins: " + coinsCount + "$";
    }
    //console.log('1');
    
    // คำสั่งสำหรับการอัพเดท Position ของ Hitbox รวมถึง Position ของตัวโมเดลในระนาบสามมิติ โดยจะมีการอัพเดทตลอดเวลา
    if(enemyRocksArr2[0] && enemyRocksArr2[1] && enemyRocksArr2[2]){
      if(cube1BB) cube1BB.copy( enemyRocksArr2[0].geometry.boundingBox ).applyMatrix4( enemyRocksArr2[0].matrixWorld);
      enemyRocksArr[0].position.set(enemyRocksArr2[0].position.x,enemyRocksArr2[0].position.y,enemyRocksArr2[0].position.z);
      if(cube2BB) cube2BB.copy( enemyRocksArr2[1].geometry.boundingBox ).applyMatrix4( enemyRocksArr2[1].matrixWorld);
      enemyRocksArr[1].position.set(enemyRocksArr2[1].position.x,enemyRocksArr2[1].position.y,enemyRocksArr2[1].position.z);
      if(cube3BB) cube3BB.copy( enemyRocksArr2[2].geometry.boundingBox ).applyMatrix4( enemyRocksArr2[2].matrixWorld);
      enemyRocksArr[2].position.set(enemyRocksArr2[2].position.x,enemyRocksArr2[2].position.y,enemyRocksArr2[2].position.z);

      if(cube4BB) cube4BB.copy( enemyRocksArr2[3].geometry.boundingBox ).applyMatrix4( enemyRocksArr2[3].matrixWorld);
      enemyRocksArr[3].position.set(enemyRocksArr2[3].position.x,enemyRocksArr2[3].position.y,enemyRocksArr2[3].position.z);
      if(cube5BB) cube5BB.copy( enemyRocksArr2[4].geometry.boundingBox ).applyMatrix4( enemyRocksArr2[4].matrixWorld);
      enemyRocksArr[4].position.set(enemyRocksArr2[4].position.x,enemyRocksArr2[4].position.y,enemyRocksArr2[4].position.z);
      if(cube6BB) cube6BB.copy( enemyRocksArr2[5].geometry.boundingBox ).applyMatrix4( enemyRocksArr2[5].matrixWorld);
      enemyRocksArr[5].position.set(enemyRocksArr2[5].position.x,enemyRocksArr2[5].position.y,enemyRocksArr2[5].position.z);

      if(coin1BB) coin1BB.copy( coinsArr2[0].geometry.boundingBox ).applyMatrix4( coinsArr2[0].matrixWorld);
      coinsArr[0].position.set(coinsArr2[0].position.x,coinsArr2[0].position.y,coinsArr2[0].position.z);
      if(coin2BB) coin2BB.copy( coinsArr2[1].geometry.boundingBox ).applyMatrix4( coinsArr2[1].matrixWorld);
      coinsArr[1].position.set(coinsArr2[1].position.x,coinsArr2[1].position.y,coinsArr2[1].position.z);
    }

    // อัพเดท Hitbox ของตัว Player ในระนาบ 3 มิติ และตัวโมเดล
    if(playerHitbox) {
      playerHitbox.copy( mainBox.geometry.boundingBox ).applyMatrix4( mainBox.matrixWorld);    
    } 

    // ในกรณีที่ speed != 0 หรือก็คือเกมยังไม่จบ จะทำการปรับกล้องให้หมุนตาม player ตลอดเวลา
    if(speed != 0){
      //console.log(player.position)
      if(player) camera.lookAt(player.position,player.position,player.position);
      updatePlayer();        // อัพเดทตัว player ตามการเคลื่อนที่ของ mouse
    }

    checkCollision();     // เช็คการชนกันของ object ที่เป็นตัว player กับ object ชนิดอื่นๆ โดยอาศัยการชนกันของ Hitbox ที่ได้สร้างไว้


    mixers.forEach(function(mixer) {              //คำสั่งสำหรับการเรียกใช้การเล่น Animation ของทุกตัวที่ถูกเก็บไว้ใน Array ที่ชื่อ mixers

            mixer.update(delta);                  //อัพเดทตามเวลา delta ที่ได้ถูกสร้างไว้จาก clock.getDelta();
    });

      enemyRocksArr.forEach(function(RoadStrip){                                        //ฟังก์ชันสำหรับการเช็คโมเดลหิน ถ้ากรณีที่มันหมุนตามแนวแกน Z เกิน 50 จะทำการโชว์ object นั้น
        if (RoadStrip.position.z >= 50 && RoadStrip.visible == false) {
            console.log("A rock is respawn");
            RoadStrip.visible = true;
        } else {
        }
    });
    enemyRocksArr2.forEach(function(RoadStrip){                                   //ฟังก์ชันสำหรับการเช็ค Hitbox หิน โดยจะมีการกำหนดให้ Z ติดลบ เพื่อทำการวนซ้ำหินในแมพ
      RoadStrip.position.addScaledVector(direction, speed * delta);               //กำหนดความเร็วของหิน ตาม speed ที่ตั้งไว้
      if (RoadStrip.position.z >= 100) {
        
        x = MathUtils.randInt(-20,20);                    
        z = MathUtils.randInt(-20,20);
        RoadStrip.position.x = x+2;                                               //Random เพื่อทำการกำหนด position ใหม่ของหินในแนวแกน X,z

        RoadStrip.position.z = -200 + z*3;
      } else {
      }
    });

    coinsArr.forEach(function(RoadStrip){                                           
      RoadStrip.rotation.z += 0.01;                                               //ฟังก์ชันสำหรับการเช็คโมเดลเหรียญ ถ้ากรณีที่มันหมุนตามแนวแกน Z เกิน 50 จะทำการโชว์ object นั้น
      if (RoadStrip.position.z >= 50 && RoadStrip.visible == false) {
          console.log("A coin is respawn");
          RoadStrip.visible = true;
      } else {
      }
  });
  coinsArr2.forEach(function(RoadStrip){                                          //ฟังก์ชันสำหรับการเช็ค Hitbox ของเหรียญ โดยจะมีการกำหนดให้ Z ติดลบ เพื่อทำการวนซ้ำเหรียญในแมพ   
    RoadStrip.position.addScaledVector(direction, speed * delta);
    if (RoadStrip.position.z >= 100) {

      x = MathUtils.randInt(-20,20);
      z = MathUtils.randInt(-20,20);
      RoadStrip.position.x = x+2;

      RoadStrip.position.z = -200 + z*3;
    } else {
    }
  });

  cliffArr.forEach(function(RoadStrip){                                           //ฟังก์ชันสำหรับการเช็คหน้าผา ถ้าหน้าผาอยู่แกน Z มากกว่า 100 จะทำการวนซ้ำใหม่
    RoadStrip.position.addScaledVector(direction, speed * delta);
    if (RoadStrip.position.z >= 100) {
      distance+=0.5;                                                              //เพิ่มค่าให้ตัวแปร Distance เพือ่โชว์ระยะทางในเกม
      RoadStrip.position.z = -200 ;
    } else {
    }
  });

  coralArr.forEach(function(RoadStrip){                                         //ฟังก์ชันสำหรับการเช็คปะการัง ถ้าอยู่แกน Z มากกว่า 100 จะทำการวนซ้ำใหม่
    RoadStrip.position.addScaledVector(direction, speed * delta);
    if (RoadStrip.position.z >= 100) {
      let randX = MathUtils.randInt(-25,25);
      RoadStrip.position.z = -250 ;
      RoadStrip.position.x = randX;
    } else {
    }
  });

  fishArr.forEach(function(RoadStrip){                                          //ฟังก์ชันสำหรับการเช็คปลาในแมพ ถ้าอยู่แกน Z มากกว่า 100 จะทำการวนซ้ำใหม่
    RoadStrip.position.addScaledVector(direction, speed * delta);
    RoadStrip.position.z-= 0.1;                                                 //ทำการกำหนดให้เพิ่มค่า position Z ตลอดเวลาเพื่อให้ดูเหมือนว่าปลากำลังว่ายอยู่
    if (RoadStrip.position.z >= 100) {
      let randX = MathUtils.randInt(-25,25);
      let randZ = MathUtils.randInt(-300,-200);
      RoadStrip.position.z = randZ ;
      RoadStrip.position.x = randX;
    } 
  });
    
  
    renderer.render(scene, camera);
}

function checkCollision(){                                                        //เช็คการชนกันของ Hitbox ระหว่างตัวผู้เล่นกับ หิน และเหรียญ
  if(playerHitbox && cube1BB && cube2BB && cube3BB&& cube4BB&& cube5BB&& cube6BB && coin1BB){
    if(playerHitbox.intersectsBox(cube1BB)){                          //หากชนกับหิน ก็จะทำการลดหัวใจลงไป 1 และถ้าหัวใจเหลือ 0 เกมจะจบ โดยทำการลด speed = 0 ในแมพ
      if(enemyRocksArr[0].visible == false){                          
      }else{                                                          //ทั้ง 2 object เมื่อชนจะหายไป และจะโชว์ใหม่ เมื่อเข้าเงื่อนไขตามที่เขียนไว้ใน function animate
        if(heart <= 1) speed = 0;
        enemyRocksArr[0].visible = false;
        console.log('1COLLISION!' + heart ); 
        heart -=1;
      }
    }else if(playerHitbox.intersectsBox(cube2BB)){
      if(enemyRocksArr[1].visible == false){
        
      }else{
        if(heart <= 1) speed =  0;
        enemyRocksArr[1].visible = false;
        console.log('2COLLISION2!' + heart);
        heart-=1;
        
      }
    }else if(playerHitbox.intersectsBox(cube3BB)){
      if(enemyRocksArr[2].visible == false){
        
      }else{
        if(heart <= 1) speed =  0;
        enemyRocksArr[2].visible = false;
        console.log('3COLLISION2!' + heart);
        heart-=1;
        
      }
    }else if(playerHitbox.intersectsBox(cube4BB)){
      if(enemyRocksArr[3].visible == false){
        
      }else{
        if(heart <= 1) speed =  0;
        enemyRocksArr[3].visible = false;
        console.log('4COLLISION2!' + heart);
        heart-=1;
        
      }
    }else if(playerHitbox.intersectsBox(cube5BB)){
      if(enemyRocksArr[4].visible == false){
        
      }else{
        if(heart <= 1) speed =  0;
        enemyRocksArr[4].visible = false;
        console.log('5COLLISION2!' + heart);
        heart-=1;
        
      }
    }else if(playerHitbox.intersectsBox(cube6BB)){
      if(enemyRocksArr[5].visible == false){
        
      }else{
        if(heart <= 1) speed =  0;
        enemyRocksArr[5].visible = false;
        console.log('6COLLISION2!' + heart);
        heart-=1;
        
      }
    }else if(playerHitbox.intersectsBox(coin1BB)){                    //หากชนกับเหรียญ ก็จะทำการเพิ่ม coin เข้าตัวผู้เล่น โดยจะแสดงผลด้านบน และไม่ลดหัวใจ
      if(coinsArr[0].visible == false){
        
      }else{
        coinsArr[0].visible = false;
        coinsCount++;
        console.log('COINS COLLISION2! : ' + coinsCount);
        
      }
    }else if(playerHitbox.intersectsBox(coin2BB)){
      if(coinsArr[1].visible == false){
        
      }else{
        coinsArr[1].visible = false;
        coinsCount++;
        console.log('COINS COLLISION2! : ' + coinsCount);
        
      }
    }
    
  }
}

window.addEventListener('resize', function() {                                //เพิ่ม function Listener เพื่อช่วยในการขยับกล้องตามผู้เล่น
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

var mousePos={x:0, y:0};

function handleMouseMove(event) {                                          //ฟังก์ชันสำหรับเช็คการเคลื่อนที่ของ mouse และปรับใช้กับตัวผู้เล่น

	var tx = -1 + (event.clientX / WIDTH)*2;                                //ทำการแปลงค่าการเลื่อนของเม้าส์ ในอยู่ระหว่าง -1,1 ตอนผู้เล่นขยับบนจอ ในแนวแกนนอน

	var ty = 1 - (event.clientY / HEIGHT)*2;                                //ทำการแปลงค่าการเลื่อนของเม้าส์ ในอยู่ระหว่าง -1,1 ตอนผู้เล่นขยับบนจอ ในแนวตั้ง
  //var tz = -1 + (event.clientZ / HEIGHT)*2;
	mousePos = {x:tx, y:ty};

}



function updatePlayer(){                                                 //ทำการอัพเดทตัว player ตามแนวแกนระนาบขึ้นลง ตาม mouse


  var targetX = normalize(mousePos.x, -0.5, 0.5, -20, 20);              //กำหนดในระยะ -0.5, 0.5 และ สามารถเคลื่อนที่ตัวผู้เล่นได้ ในระยะแกน X -20 ถึง 20
  var targetZ = normalize(mousePos.y, -1, 1, 0, 20);                     //กำหนดในระยะ -1, 1 และ สามารถเคลื่อนที่ตัวผู้เล่นได้ ในระยะแกน Y 0 ถึง 20 
                                                                        //0-20 หมายถึง ระยะแกน X ตั้งแต่ 0 ถึง -20
	// update the player position
	if(player) player.position.z = -targetZ+5;                            //อัพเดทตัว player ซึ่งคือโมเดลปลาฉลาม ตามการเคลื่อนที่ของ mouse โดยใช้สูตรด้านบน ตามแนวแกน Z
	if(player) player.position.x = targetX;                               //อัพเดทตัว player ซึ่งคือโมเดลปลาฉลาม ตามการเคลื่อนที่ของ mouse โดยใช้สูตรด้านบน ตามแนวแกน X

  mainBox.position.z = -targetZ;
	mainBox.position.x = targetX;

  if(targetZ < 10) speed = 50+ targetZ*3;                               //กำหนดให้ถ้าผู้เล่นขยับตัวปลาไปน้อยกว่า แกน Z ค่าเท่ากับ 10 จะทำการเร่ง speed obj ในแมพ
}

function normalize(v,vmin,vmax,tmin, tmax){                             //ฟังก์ชันเสริมสำหรับการคำนวณหาค่า position เมาส์กับ ระยะทางที่ผู้เล่นสามารถเคลื่อนที่ไปได้

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xffffff, 0);                                 //ทำการเว็ตท้องฟ้า หรือ background ด้านหลังให้มีสีขาว
document.body.appendChild(renderer.domElement);


renderer.outputEncoding = THREE.sRGBEncoding;                         //เพิ่มให้มีการเรียกใช้การ encoding โมเดลที่ import เข้ามาโดยใช้สี sRGB

document.addEventListener('mousemove', handleMouseMove, false);       //ทำการกำหนด Listener สำหรับการตรวจจับการเคลื่อนที่ของ mouse

  animate();                                                          //เรียกใช้ function animate เพื่อทำการ render ทุก obj ที่สร้างมาข้างต้น
