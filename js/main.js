//LIMITATIONS: Only HSL (no rgb)
//preserve drawingbuffer must be on! (static painting at end)

//FIGURE OUT SCREENSPACE TO WORLD SPACE!!

var camera, renderer, projector, scene, controls, clock, perlin, wineglass, brushtray, landscape, sky, village;
var particleGroup;
var line;
var randFloat = THREE.Math.randFloat;

var sphere;

window.addEventListener('resize', onWindowResize);

var w = window.innerWidth;
var h = window.innerHeight;
var leftScreen = -w/16;
var rightScreen = w/16;
console.log(window.innerWidth)
var topScreen = 50;
var bottomScreen = -50;


var csd = {
  volume: 0.0
};
var fsd = {
  volume: 1.0
}
var audio = loadAudio('assets/godfather.mp3');
audio.volume = 0;






init();
function init() {
  clock = new THREE.Clock();


  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);
  camera.position.z = 120;
  projector = new THREE.Projector();


  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: false});
  // renderer.autoClearColor = false;
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);

}

function start() {

  brushFactory = new BrushFactory();
  landscape = new Landscape();
  audio.play();
  var audioTween = new TWEEN.Tween(csd).
    to(fsd, 5000).
    easing(TWEEN.Easing.Cubic.In).
    onUpdate(function(){
      audio.volume = csd.volume;
  }).start();
  animate();

}


function animate() {
  TWEEN.update();
  landscape.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
};

function onWindowResize() {
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
}


function loadAudio(uri) {
  var audio = new Audio();
  audio.src = uri;
  return audio;
}
