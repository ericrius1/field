uniform float globalTime;

attribute vec3 customColor;
attribute float seed;
attribute float lng;
attribute float draw;

varying vec3 vColor;
varying float vDraw;

const vec3 axisx = vec3(1.0, 0.0, 0.0);
const vec3 axisy = vec3(0.0, 1.0, 0.0);
const vec3 axisz = vec3(0.0, 0.0, 1.0);

const vec3 center = vec3(0.0, 0.0, 0.0);
const float strength = 8.0;


void main() {

vDraw = draw;
vColor = customColor;

vec3 directionVec = normalize(position);

float xangle = dot(axisx, directionVec) * 2.5;
float yangle = dot(axisy, directionVec) * 3.0;
float zangle = dot(axisz, directionVec) * 3.5;
vec3 animated = position;

float time = globalTime*0.25;

float cosx = cos(time + xangle);
float sinx = sin(time + xangle);
float cosy = cos(time + yangle);
float siny = sin(time + yangle);
float cosz = cos(time + zangle);
float sinz = sin(time + zangle);

animated.x += directionVec.x * cosx * siny * cosz * strength;
animated.y += directionVec.y * sinx * cosy * sinz * strength;
animated.z += directionVec.z * sinx * cosy * cosz * strength;

// time
float localTime = (lng*0.2 + globalTime + seed*2.0)*0.5 + seed;

vec3 mov = vec3( sin(localTime+sinx), -cos(localTime*seed+siny), cos(localTime+sinz) );

if (seed < 0.5) {
  mov *= -1.0;
}

animated += mov*(lng-40.0)*0.15;
vec4 mvPosition = modelViewMatrix * vec4( animated, 1.0 );
gl_Position = projectionMatrix * mvPosition;

}