export const baseVert = `
precision highp float;

varying vec2 v_uv;
varying vec3 v_position;

void main() {

    v_position = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const baseFrag = `

precision highp float;

uniform vec2 u_resolution;
uniform float u_ratio;
uniform vec2 u_mouse;
uniform float u_time;

varying vec3 v_position;

float PI = 3.1415926;

float sdSphere( vec3 p, float s ) {
    return length(p)-s;
}

float sdBox( vec3 p, vec3 b ){
    vec3 q = abs(p) - b;
    return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

float sdOctahedron(vec3 p, float s) {
  p = abs(p);
  float m = p.x+p.y+p.z-s;
  vec3 q;
       if( 3.0*p.x < m ) q = p.xyz;
  else if( 3.0*p.y < m ) q = p.yzx;
  else if( 3.0*p.z < m ) q = p.zxy;
  else return m*0.57735027;
    
  float k = clamp(0.5*(q.z-q.y+s),0.0,s); 
  return length(vec3(q.x,q.y-s+k,q.z-k)); 
}

mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  
  return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float smin( float a, float b, float k ) {
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float sdf( vec3 p ) {
    //   float box = smin(sdBox(p1, vec3(.3)), sdSphere(p1, 0.4), .3);
    //   float sphere = sdSphere(p - vec3(u_mouse * vec2(2., 1.), 0.), 0.2);
    //   return smin(box, sphere, 0.5);
    
    vec3 p1 = rotate(p, vec3(1.), u_time);
    float oct = sdOctahedron(p1, .02);
    return oct;
}

float opRep(vec3 p, vec3 c)
{
    vec3 q = mod(p+0.5*c,c)-0.5*c;
    return sdf( q );
}

vec3 calcNormal( vec3 p ) {
    const float h = 0.0001;
    const vec2 k = vec2(1,-1);
    return normalize( k.xyy*sdf( p + k.xyy*h ) + 
                      k.yyx*sdf( p + k.yyx*h ) + 
                      k.yxy*sdf( p + k.yxy*h ) + 
                      k.xxx*sdf( p + k.xxx*h ) );
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.x *= u_resolution.x / u_resolution.y;

  vec2 newUV = uv - vec2(.5, 0.);

  float dist = length(newUV - vec2(.5));
  vec3 bg = mix(vec3(.9), vec3(.8), dist);

  vec3 ray = normalize(vec3( (uv - vec2(1., .5)), -1.));
  vec3 camPos = vec3(sin(u_time / 5.), cos(u_time / 5.), (u_time / -2.));

  vec3 rayPos = camPos;
  float t = 0.;

  float tMax = 5.;

  for (int i=0;i<256;i++) {
    vec3 pos = camPos + t*ray;
    float h = opRep(pos, vec3(.15));
    if (h<.0001 || t>tMax) break;
    t+=h;
  }

  vec3 color = bg;

  vec3 a = vec3(0.5, 0.5, 0.5);		
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(4.0, 4.0, 4.0);
  vec3 d = vec3(0.00, 0.33, 0.67);

  if (t<tMax) {
    vec3 pos = camPos + t*ray;
    vec3 normal = calcNormal(pos);
    color = normal;
    float diff = dot(vec3(1.), normal);
    color = vec3(diff);
    color = a + b * cos(2. * PI * (c * pos * sin(u_time / 20.) + d));
    float fresnel = pow(1. + dot(ray, normal), 1.);

    // color = vec3(fresnel);
    // color = mix(color, bg, fresnel);
  }

  gl_FragColor = vec4(color, 1.);   
}
`
