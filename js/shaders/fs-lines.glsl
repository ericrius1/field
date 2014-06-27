
uniform vec3 color;

varying vec3 vColor;
varying float vDraw;

void main() {

  if (vDraw == 0.0) {
    discard;
  }

  float depth = gl_FragCoord.z / gl_FragCoord.w;
  float fogFactor = smoothstep( 170.0, 70.0, depth );       

  gl_FragColor = vec4( (color * vColor) * fogFactor, 1.0 );

}