//LIMITATIONS: Only HSL (no rgb)
//preserve drawingbuffer must be on! (static painting at end)

//FIGURE OUT SCREENSPACE TO WORLD SPACE!!

var camera, renderer, projector, scene, controls, clock;
var particleGroup;
var line;
var randFloat = THREE.Math.randFloat;


window.addEventListener('resize', onWindowResize);

var w = window.innerWidth;
var h = window.innerHeight;



init();
animate();
function init() {
  clock = new THREE.Clock();


  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);
  camera.position.z = 120;
  projector = new THREE.Projector();


  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);

}

function animate() {
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
};

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

