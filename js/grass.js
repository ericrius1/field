var Grass = function() {

  var delta, time, oldTime;

  var uniforms, lines, uniforms2, sphere;

  var attributes = {
    draw: {
      type: 'f',
      value: []
    },
    lng: {
      type: 'f',
      value: []
    },
    seed: {
      type: 'f',
      value: []
    },
    customColor: {
      type:'c',
      value: []
    }
  };

  uniforms = {
    color: {
      type: "c",
      value: new THREE.Color(0xffffff)
    },
    globalTime: {
      type: 'f',
      value: 0.0
    }
  }
  var shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    attributes: attributes,
    vertexShader: document.getElementById('vertexshader_lines').textContent,
    fragmentShader: document.getElementById('fragmentshader_lines').textContent
  });

  shaderMaterial.linewidth = 1;

  var lineGeo = new THREE.Geometry();
  var radius = 40;

  var lngArray = [];
  var seedArray = [];
  var colorArray = [];
  var drawArray = [];

  var numOfPoints = 15000;

  var points = pointsOnSphere(numOfPoints);

  for (var i = 0; i < numOfPoints; i++) {
    var num = 5 + Math.floor(Math.random() * 2);

    var base = points[i];
    base.multiplyScalar(radius);
    var seed = Math.random();

    var lat = 90 - (Math.acos(-base.y / radius)) * 180 / Math.PI;
    var lon = ((270 + (Math.atan(-base.x, -base.z)) * 180 / Math.PI) % 360) - 180;

    var pixel_x = Math.floor((canvas.width / 360) * (lon+180));
    var pixel_y = Math.floor((canvas.height / 180) * (lat + 90));

    var c = getPixel(pixel_x, pixel_y);

    for (var j = 0; j < num; j++) {
      var vertex = new THREE.Vector3().copy(base);
      var lng = radius + (j * 3);
      var color = new THREE.Color(0xffffff);
      var black = (j / num) + 0.2;
      color.setRGB((c.r / 255) * black, (c.g / 255) * black, (c.b / 255) * black);

      vertex.setLength(lng);
      lineGeo.vertices.push(vertex);
      colorArray.push(color);
      seedArray.push(seed);
      lngArray.push(lng);
      if (j == num - 1 || j == 0) {
        drawArray.push(0);
      } else {
        drawArray.push(1);
      }
    }
  }

  var vertices = lineGeo.vertices;
  var values_color = attributes.customColor.value;
  var values_lng = attributes.lng.value;
  var values_seed = attributes.seed.value;
  var values_draw = attributes.draw.value;

  for (var v = 0; v < vertices.length; v++) {
    values_lng[v] = lngArray[v];
    values_seed[v] = seedArray[v];
    values_draw[v] = drawArray[v];
    values_color[v] = colorArray[v];

  }

  lines = new THREE.Line(lineGeo, shaderMaterial, THREE.LineStrip);
  scene.add(lines);



  function pointsOnSphere(n) {
    var upts = new Array();
    var inc = Math.PI * (3 - Math.sqrt(5));
    var off = 2.0 / n;
    var x, y, z;
    var r;
    var phi;

    for (var k = 0; k < n; k++) {
      y = k * off - 1 + (off / 2);
      r = Math.sqrt(1 - y * y);
      phi = k * inc;
      x = Math.cos(phi) * r;
      z = Math.sin(phi) * r;
      upts.push(new THREE.Vector3(x, y, z));
    }

    return upts;
  }

  this.update = function() {
    time = new Date().getTime();
    delta = time - oldTime;
    oldTime = time;

    if(isNaN(delta) || delta > 1000 || delta == 0){
      delta = 1000/60;
    }

    uniforms.globalTime.value += delta * 0.008;
  }
}