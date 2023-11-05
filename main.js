import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import gsap from 'gsap'
import helvetiker_font from './helvetiker_regular.typeface.json'
import { InstancedInterleavedBuffer } from 'three'
//import fontJSON from './helvetiker_regular.typeface.json';
//import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader'
//import { createText } from 'three-bmfont-text'
//NamaSaham = ''
//Angka = ''
//StringQuery = NamaSaham, Angka
//import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'

//const Circlematerial = new THREE.MeshBasicMaterial({ color: 0xff0000 } );
//const CirclematerialPlus = new THREE.MeshBasicMaterial( { color: 0x006400 } );
//n1 = Indonesia(Jakarta) (IHSG)
//n2 = America (New York) (DOW JONES)
//n3 = America (New York) (NASDAQ)
//n4 = America (New York) (S&P 500)
//n5 = England (London) (FTSE 100)
//n6 = Japan (Tokyo) (NIKKEI 225)
//n7 = HONG KONG (HANG SHENG)
//

const currentUrl = new URL(window.location.href);
const urlParams = new URLSearchParams(currentUrl.search);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer(
  {antialias: true
  })

renderer.setSize(innerWidth, innerHeight)
renderer.sortObjects = false;
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({
 // color: 0xFF0000,
 vertexShader,
 fragmentShader,
 uniforms: {
  globeTexture : {
    value: new THREE.TextureLoader().load('./img/globe3.jpg')
  }
 }
 //map: new THREE.TextureLoader().load('./img/globe.jpg')
}))
//console.log(sphere)
scene.add(sphere)

// create atmosphere
const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(5.25, 50, 50), new THREE.ShaderMaterial({
  // color: 0xFF0000,
  vertexShader: atmosphereVertexShader,
  fragmentShader: atmosphereFragmentShader,
  blending : THREE.AdditiveBlending,
  side : THREE.BackSide

  //map: new THREE.TextureLoader().load('./img/globe.jpg')
 }))

atmosphere.scale.set(1.1, 1.1, 1.1)

 scene.add(atmosphere)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial(
  {
    color : 0xffffff
  }
)
const starVertices = []
for (let i = 0; i <10000; i++){
const x = (Math.random() - 0.5) * 2000
const y = (Math.random() - 0.5) * 2000
const z = -Math.random() * 2800
starVertices.push(x,y,z)
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(
  starVertices, 3
))

const stars = new THREE.Points(starGeometry, starMaterial)

scene.add(stars)
const mouse = {
  x : undefined,
  y : undefined
}

camera.position.z = 15

const point1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.1,50,50),
  new THREE.MeshBasicMaterial({
    color : '#ff0000'
  })
)


function createPoint(lat , lng){
  const box = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.1, 0.1), 
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity : 0.8,
    transparent : false
  }))
  

  const latitude = (lat / 180) * Math.PI
  const longitude = (lng/ 180) * Math.PI
  const radius = 5
  
  const x = radius *Math.cos(latitude) * Math.sin(longitude)
  const y = radius *Math.sin(latitude)
  const z = radius *Math.cos(latitude) * Math.cos(longitude)
  

  
  box.position.x = x
  box.position.y = y
  box.position.z = z
  box.lookAt(0,0,0)
  box.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0,-0.2))
  
  group.add(box)

  gsap.to(box.scale,{
z: 0,
duration : 5,
yoyo: true,
repeat: -1,
ease : 'linear',
delay : Math.random()
  })
  //box.scale.z = 0
}
var latny = 40.730610
var lngny = -73.935242
var latlondon = 51.509865
var lnglondon = -0.118092
var latty = 35.652832
var lngty = 139.839478
var lathk =22.302711
var lnghk = 114.177216

//  West = Negative East = Positive
// South = Negative North = Positive
createPoint(-6.2000, 106.8166 ) // Indonesia
createPoint(latny, lngny)
createPoint(latlondon, lnglondon)
createPoint(latty, lngty)
createPoint(lathk, lnghk)
//6.1750 degrees S and 106.8283 degrees E

sphere.rotation.y =  -Math.PI/2




// Indonesia
//Text 
const textGeometry = new THREE.TextGeometry('Jakarta', {
  font: new THREE.Font(helvetiker_font),
  size:0.4,
  height: 0.1
});
const textMaterial = new THREE.MeshBasicMaterial({ 
  color: 0xffffff });
  textMaterial.side = THREE.DoubleSide;
const textMesh1 = new THREE.Mesh(textGeometry, textMaterial);
const latitude2 = (-6.2000/180) * Math.PI
const longitude2 =(106.8166/180) * Math.PI
const radius2 = 5
const x2 = radius2 *Math.cos(latitude2) * Math.sin(longitude2)
const y2 = radius2 *Math.sin(latitude2)
const z2 = radius2 *Math.cos(latitude2) * Math.cos(longitude2)
textMesh1.position.set(x2, y2 + 0.08, z2 - 0.2);
textMesh1.rotation.y = 100* Math.PI / 180;
group.add(textMesh1);
scene.add(group);
//Lingkaran dan Tulisan di Lingkaran

const Circlegeometry = new THREE.CircleGeometry( 0.8, 16);
const Circlematerial = new THREE.MeshBasicMaterial ({ color: 0xff0000 } );
Circlematerial.side = THREE.DoubleSide;






    
const param1 = urlParams.get('n1')
let Circlematerialn1;
let textind;
if (param1 < 0){
  Circlematerialn1 = new THREE.MeshBasicMaterial ({ color: 0xff0000 } );
  Circlematerialn1.side = THREE.DoubleSide
  textind = "IHSG \n "+ param1 + '%'
}
else if (param1 > 0 ){
  Circlematerialn1 = new THREE.MeshBasicMaterial( { color: 0x006400 } );
  Circlematerialn1.side = THREE.DoubleSide
  textind = "IHSG \n+"+ param1 + '%'
}else{
  Circlematerialn1 = new THREE.MeshBasicMaterial( { color: 0x006400  } );
  textind = "  IHSG \n "+ param1 + '%'
}
const circlejkt = new THREE.Mesh( Circlegeometry, Circlematerialn1 );
circlejkt.position.set(x2 + 0.5,y2 - 0.5,z2-1.5)
circlejkt.rotation.y = 100* Math.PI / 180;
group.add( circlejkt );
scene.add(group);
const textGeometryIHSG = new THREE.TextGeometry(textind, {
  font: new THREE.Font(helvetiker_font),
  size:0.22,
  height: 0.4
});

const textMeshIHSG = new THREE.Mesh(textGeometryIHSG, textMaterial);
textMeshIHSG.position.set(x2 + 0.5,y2 - 0.5,z2-1.5)
textMeshIHSG.rotation.y = 90* Math.PI / 180;
group.add(textMeshIHSG);
scene.add(group);
// New York 
const textGeometryny = new THREE.TextGeometry('New York', {
  font: new THREE.Font(helvetiker_font),
  size:0.5,
  height: 0.1
});
const textMaterialny = new THREE.MeshBasicMaterial({ 
  color: 0xffff00 });
const textMeshny = new THREE.Mesh(textGeometryny, textMaterial);
const latitudeny= (latny/180) * Math.PI
const longitudeny =(lngny/180) * Math.PI
const radius = 5
const xny = radius *Math.cos(latitudeny) * Math.sin(longitudeny)
const yny = radius *Math.sin(latitudeny)
const zny = radius *Math.cos(latitudeny) * Math.cos(longitudeny)
textMeshny.position.set(xny -0.2, yny -0.3, zny + 0.1);
textMeshny.rotation.y = 270* Math.PI / 180;
group.add(textMeshny);
scene.add(group);
//Circle NY 1 (DOW JONES)
//
const param2 = urlParams.get('n2')
let Circlematerialn2;
let textny1;
if (param2 < 0){
  Circlematerialn2 = new THREE.MeshBasicMaterial ({ color: 0xff0000 } );
  Circlematerialn2.side = THREE.DoubleSide
  textny1 = "DOW \nJONES\n "+ param2 + '%'
}
else if (param2 > 0 ){
  Circlematerialn2 = new THREE.MeshBasicMaterial( { color: 0x006400 } );
  Circlematerialn2.side = THREE.DoubleSide
  textny1 = "DOW\nJONES\n +"+ param2 + '%'
}else{
  Circlematerialn2 = new THREE.MeshBasicMaterial( { color: 0x006400 } );
  textny1 = "DOW \n JONES \n "+ param2 + '%'
}
const circleny1 = new THREE.Mesh( Circlegeometry, Circlematerialn2 );
circleny1.position.set(xny -1.1,yny - 0.5,zny-0.8)
circleny1.rotation.y = 270* Math.PI / 180;
group.add( circleny1 );
scene.add(group);

const textGeometryDJ = new THREE.TextGeometry(textny1, {
  font: new THREE.Font(helvetiker_font),
  size:0.18,
  height: 0.1
});

const textMeshDJ = new THREE.Mesh(textGeometryDJ, textMaterial);
textMeshDJ.position.set(xny -1.1,yny - 0.5,zny-0.8)
textMeshDJ.rotation.y = 270* Math.PI / 180;
group.add(textMeshDJ);
scene.add(group);
// Circle NY 2 (NASDAQ)
const param3 = urlParams.get('n3')
let Circlematerialn3;
let textny2;
if (param3 < 0){
  Circlematerialn3 = new THREE.MeshBasicMaterial ({ color: 0xff0000 } );
  Circlematerialn3.side = THREE.DoubleSide
  textny2 = "NAS\nDAQ\n"+ param3 + '%'
}
else if (param3 > 0 ){
  Circlematerialn3 = new THREE.MeshBasicMaterial( { color: 0x006400 } );
  Circlematerialn3.side = THREE.DoubleSide
  textny2 = "NAS\nDAQ\n +"+ param3 + '%'
}else{
  Circlematerialn3 = new THREE.MeshBasicMaterial( { color: 0x006400 } );
  textny2 = "NAS\nDAQ\n"+ param3 + '%'
}
const circleny2 = new THREE.Mesh( Circlegeometry, Circlematerialn3 );
circleny2.position.set(xny ,yny +1.3,zny+1.4)
circleny2.rotation.y = 270* Math.PI / 180;
group.add(circleny2);
scene.add(group);

const textGeometryND = new THREE.TextGeometry(textny2, {
  font: new THREE.Font(helvetiker_font),
  size:0.18,
  height: 0.1
});

const textMeshND = new THREE.Mesh(textGeometryND, textMaterial);
textMeshND.position.set(xny ,yny +1.5,zny+1.4)
textMeshND.rotation.y = 270* Math.PI / 180;
group.add(textMeshND);
scene.add(group);

// // Circle NY 3 (S & P 500)
const param4 = urlParams.get('n4')

let Circlematerialn4;
let textny3;
if (param4 < 0){
  Circlematerialn4 = new THREE.MeshBasicMaterial ({ color: 0xff0000 } );
  Circlematerialn4.side = THREE.DoubleSide
  textny3 = "S&P\n500\n"+ param4 + '%'
}
else if (param4 > 0 ){
  Circlematerialn4 = new THREE.MeshBasicMaterial( { color: 0x006400 } );
  Circlematerialn4.side = THREE.DoubleSide
  textny3 = "S&P \n500\n+"+ param4 + '%'
}else{
  Circlematerialn4 = new THREE.MeshBasicMaterial( { color: 0x006400  } );
  textny3 = "S&P\n500\n"+ param4 + '%'
}



const circleny3 = new THREE.Mesh( Circlegeometry, Circlematerialn4 );
circleny3.position.set(xny -1.5,yny - 1,zny+1.2)
circleny3.rotation.y = 270* Math.PI / 180;
group.add(circleny3);
scene.add(group);

const textGeometrySP = new THREE.TextGeometry(textny3, {
  font: new THREE.Font(helvetiker_font),
  size:0.18,
  height: 0.1
});

const textMeshSP = new THREE.Mesh(textGeometrySP, textMaterial);
textMeshSP.position.set(xny -1.5 ,yny - 1,zny+1.2)
textMeshSP.rotation.y = 270* Math.PI / 180;
group.add(textMeshSP);
scene.add(group);

// London
const textGeometrylndn = new THREE.TextGeometry('London', {
  font: new THREE.Font(helvetiker_font),
  size:0.4,
  height: 0.1
});
const textMateriallndn = new THREE.MeshBasicMaterial({ 
  color: 0xffffff });
const textMeshlndn = new THREE.Mesh(textGeometrylndn, textMateriallndn);
const latitudelndn= (latlondon/180) * Math.PI
const longitudelndn =(lnglondon/180) * Math.PI
const xlndn = radius *Math.cos(latitudelndn) * Math.sin(longitudelndn)
const ylndn = radius *Math.sin(latitudelndn)
const zlndn = radius *Math.cos(latitudelndn) * Math.cos(longitudelndn)
textMeshlndn.position.set(xlndn +0.5, ylndn, zlndn + 0.1);
textMeshlndn.rotation.y = 360* Math.PI / 180;
group.add(textMeshlndn);
scene.add(group);

// Circle London
const param5 = urlParams.get('n5')
let Circlematerialn5;
let textlndn;
if (param5 < 0){
  Circlematerialn5 = new THREE.MeshBasicMaterial ({ color: 0xff0000 } );
  Circlematerialn5.side = THREE.DoubleSide
  textlndn = "FTSE\n100\n"+ param5 + '%'
}
else if (param5 > 0 ){
  Circlematerialn5 = new THREE.MeshBasicMaterial( { color: 0x006400 } );
  Circlematerialn5.side = THREE.DoubleSide
  textlndn = "FTSE\n100\n+"+ param5 + '%'
}else{
  Circlematerialn5 = new THREE.MeshBasicMaterial( { color: 0x006400  } );
  textlndn = "FTSE\n100\n"+ param5 + '%'
}

const circlelndn = new THREE.Mesh( Circlegeometry, Circlematerialn5 );
circlelndn.position.set(xlndn-0.7,ylndn- 0.2,zlndn+1.8)
circlelndn.rotation.y = 180* Math.PI / 180;
group.add(circlelndn);
scene.add(group);

const textGeometrylndn1 = new THREE.TextGeometry(textlndn, {
  font: new THREE.Font(helvetiker_font),
  size:0.20,
  height: 0.1
});

const textMeshlndn1 = new THREE.Mesh(textGeometrylndn1, textMaterial);
textMeshlndn1.position.set(xlndn-0.7,ylndn- 0.2,zlndn+1.8)
textMeshlndn1.rotation.y = 0* Math.PI / 180;
group.add(textMeshlndn1);
scene.add(group);

//TOKYO
const textGeometryty = new THREE.TextGeometry('Tokyo', {
  font: new THREE.Font(helvetiker_font),
  size:0.4,
  height: 0.1
});
const textMaterialty = new THREE.MeshBasicMaterial({ 
  color: 0xffffff });
const textMeshty = new THREE.Mesh(textGeometryty, textMaterialty);
const latitudety= (latty/180) * Math.PI
const longitudety =(lngty/180) * Math.PI
const xty = radius *Math.cos(latitudety) * Math.sin(longitudety)
const yty = radius *Math.sin(latitudety)
const zty = radius *Math.cos(latitudety) * Math.cos(longitudety)
textMeshty.position.set(xty, yty+ 0.5, zty - 0.4);
textMeshty.rotation.y = 135 *  Math.PI / 180;
group.add(textMeshty);
scene.add(group);

// Circle Tokyo Nikkei 225
const param6 = urlParams.get('n6')
let Circlematerialn6;
let textty;
if (param6 < 0){
  Circlematerialn6 = new THREE.MeshBasicMaterial ({ color: 0xff0000 } );
  Circlematerialn6.side = THREE.DoubleSide
  textty = "NIKKEI\n225\n"+ param6 + '%'
}
else if (param6 > 0 ){
  Circlematerialn6 = new THREE.MeshBasicMaterial( { color: 0x006400 } );
  Circlematerialn6.side = THREE.DoubleSide
  textty = " NIKKEI\n225\n+"+ param6 + '%'
}else{
  Circlematerialn6 = new THREE.MeshBasicMaterial( { color: 0x006400  } );
  textty = " NIKKEI\n225\n"+ param6 + '%'
}




const circlety1 = new THREE.Mesh( Circlegeometry, Circlematerialn6 );
circlety1.position.set(xty -0.4,yty - 0.5,zty-1.6)
circlety1.rotation.y = 135* Math.PI / 180;
group.add( circlety1 );
scene.add(group);

const textGeometryty1 = new THREE.TextGeometry(textty, {
  font: new THREE.Font(helvetiker_font),
  size:0.19,
  height: 0.1
});

const textMeshty1 = new THREE.Mesh(textGeometryty1, textMaterial);
textMeshty1.position.set(xty -0.4,yty - 0.5,zty-1.6)
textMeshty1.rotation.y = 135* Math.PI / 180;
group.add(textMeshty1);
scene.add(group);

//Hong Kong
const textGeometryhk = new THREE.TextGeometry('HONG KONG', {
  font: new THREE.Font(helvetiker_font),
  size:0.3,
  height: 0.1
});
const textMaterialhk = new THREE.MeshBasicMaterial({ 
  color: 0xffffff });
const textMeshhk = new THREE.Mesh(textGeometryhk, textMaterialhk);
const latitudehk= (lathk/180) * Math.PI
const longitudehk =(lnghk/180) * Math.PI
const xhk = radius *Math.cos(latitudehk) * Math.sin(longitudehk)
const yhk = radius *Math.sin(latitudehk)
const zhk = radius *Math.cos(latitudehk) * Math.cos(longitudehk)
textMeshhk.position.set(xhk, yhk, zhk - 0.4);
textMeshhk.rotation.y = 100 *  Math.PI / 180;
group.add(textMeshhk);
scene.add(group);

// Circle Hong Kong Hang Sheng
const param7 = urlParams.get('n7')
let Circlematerialn7;
let texthk;
if (param7 < 0){
  Circlematerialn7 = new THREE.MeshBasicMaterial ({ color: 0xff0000 } );
  Circlematerialn7.side = THREE.DoubleSide
  texthk = " HANG\n SHENG\n "+ param7 + '%'
}
else if (param7 > 0 ){
  Circlematerialn7 = new THREE.MeshBasicMaterial( { color: 0x006400 } );
  Circlematerialn7.side = THREE.DoubleSide,
  texthk = " HANG\n SHENG\n +"+ param7 + '%'
}else{
  Circlematerialn7 = new THREE.MeshBasicMaterial( { color: 0x006400  } );
  texthk = " HANG\n SHENG\n "+ param7 + '%'
}



const circlehk1 = new THREE.Mesh( Circlegeometry, Circlematerialn7 );
circlehk1.position.set(xhk +1.1,yhk + 0.4,zhk+0.4)
circlehk1.rotation.y = 100* Math.PI / 180;
group.add( circlehk1 );
scene.add(group);

const textGeometryhk1 = new THREE.TextGeometry(texthk, {
  font: new THREE.Font(helvetiker_font),
  size:0.177,
  height: 0.1
});

const textMeshhk1 = new THREE.Mesh(textGeometryhk1, textMaterial);
textMeshhk1.position.set(xhk +1.1,yhk + 0.4,zhk+0.4)
textMeshhk1.rotation.y = 100* Math.PI / 180;
group.add(textMeshhk1);
scene.add(group);

let target = new THREE.Vector3(0,0, 15);

function updateDistanceJkt() {
  let vector = new THREE.Vector3();
  vector.setFromMatrixPosition( circlejkt.matrixWorld );
  let distancejkt = vector.distanceTo( target );
  console.log(distancejkt);


  if (distancejkt > 13.8) {
    circlejkt.visible = false;
    textMeshIHSG.visible = false;
  } else {
    circlejkt.visible = true;
    textMeshIHSG.visible = true;
  }
}

function updateDistanceny1() {
  let vector = new THREE.Vector3();
  vector.setFromMatrixPosition( circleny1.matrixWorld );
  let distanceny1 = vector.distanceTo( target );
  console.log(distanceny1);


  if (distanceny1 > 13) {
    circleny1.visible = false;
    textMeshDJ.visible = false;
  } else {
    circleny1.visible = true;
    textMeshDJ.visible = true;
  }
}

function updateDistanceny2() {
  let vector = new THREE.Vector3();
  vector.setFromMatrixPosition( circleny2.matrixWorld );
  let distanceny2 = vector.distanceTo( target );
  console.log(distanceny2);


  if (distanceny2 > 13) {
    circleny2.visible = false;
    textMeshND.visible = false;
  } else {
    circleny2.visible = true;
    textMeshND.visible = true;
  }
}

function updateDistanceny3() {
  let vector = new THREE.Vector3();
  vector.setFromMatrixPosition( circleny3.matrixWorld );
  let distanceny3 = vector.distanceTo( target );
  console.log(distanceny3);


  if (distanceny3 > 12) {
    circleny3.visible = false;
    textMeshSP.visible = false;
  } else {
    circleny3.visible = true;
    textMeshSP.visible = true;
  }
}


function updateDistancelndn() {
  let vector = new THREE.Vector3();
  vector.setFromMatrixPosition( circlelndn.matrixWorld );
  let distancelndn = vector.distanceTo( target );
  console.log(distancelndn);


  if (distancelndn > 12) {
    circlelndn.visible = false;
    textMeshlndn1.visible = false;
  } else {
    circlelndn.visible = true;
    textMeshlndn1.visible = true;
  }
}

function updateDistancety() {
  let vector = new THREE.Vector3();
  vector.setFromMatrixPosition( circlety1.matrixWorld );
  let distancety = vector.distanceTo( target );
  console.log(distancety);


  if (distancety > 12) {
    circlety1.visible = false;
    textMeshty1.visible = false;
  } else {
    circlety1.visible = true;
    textMeshty1.visible = true;
  }
}

function updateDistancehk() {
  let vector = new THREE.Vector3();
  vector.setFromMatrixPosition( circlehk1.matrixWorld );
  let distancehk = vector.distanceTo( target );
  console.log(distancehk);


  if (distancehk > 12) {
    circlehk1.visible = false;
    textMeshhk1.visible = false;
  } else {
    circlehk1.visible = true;
    textMeshhk1.visible = true;
  }
}
function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  group.rotation.y += 0.0009
  circlejkt.lookAt(target);
  textMeshIHSG.lookAt(target);
  circleny1.lookAt(target);
  circleny2.lookAt(target);
  circleny3.lookAt(target);
  textMeshDJ.lookAt(target);
  textMeshSP.lookAt(target);
  textMeshND.lookAt(target);
  circlelndn.lookAt(target);
  textMeshlndn1.lookAt(target);
  circlety1.lookAt(target);
  textMeshty1.lookAt(target);
  circlehk1.lookAt(target);
  textMeshhk1.lookAt(target);
  

  if (mouse.x){
    gsap.to(group.rotation,{
      x: -mouse.y * 1.8,
      y: mouse.x * 1.8,
      duration : 2
    } )
  }
}

let isDragging = false;

document.addEventListener('mousedown', (event) => {
  isDragging = true;
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    mouse.x = ((event.clientX - innerWidth/2) / (innerWidth/2)) * 2 -1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1;
    updateDistanceJkt();
    updateDistanceny1();
    updateDistanceny2();
    updateDistanceny3();
    updateDistancelndn();
    updateDistancety();
    updateDistancehk();
  }
});

document.addEventListener('mouseup', (event) => {
  isDragging = false;
});

animate();