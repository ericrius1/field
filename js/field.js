var Field = function(){

  var fieldGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/point.png'),
    maxAge: 10
  });

  var emitter = new SPE.Emitter({
    acceleration: new THREE.Vector3(-.1, .1, -.1),
    accelerationSpread: new THREE.Vector3(.15, 0.05, 0.05),
    opacityStart: 0,
    opacityEnd: 1,
    particleCount: 20
  })

  fieldGroup.addEmitter(emitter);
  scene.add(fieldGroup.mesh);

  this.update = function(){
    fieldGroup.tick();
  }
}