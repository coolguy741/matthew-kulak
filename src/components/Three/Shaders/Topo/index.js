export const topoVert = `
precision highp float;

varying vec2 v_uv;
varying vec3 v_position;

void main() {

    v_position = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const topoFrag = `

precision highp float;

uniform vec2 u_resolution;
uniform float u_ratio;
uniform vec2 u_mouse;
uniform float u_time;
uniform int u_n1;
uniform int u_n2;
uniform float u_bw1;
uniform float u_bw2;
uniform float u_slider;
uniform sampler2D u_noise;

varying vec2 v_uv;
varying vec3 v_position;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

    // x0 = x0 - 0.0 + 0.0 * C.xxx;
    // x1 = x0 - i1  + 1.0 * C.xxx;
    // x2 = x0 - i2  + 2.0 * C.xxx;
    // x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

  // Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }

//END ASHIMA /////////////////////////////////////////////////

const float STEPS = 39.;
const float CUTOFF = 0.; //depth less than this, show white wall
const vec2  OFFSET = vec2(0.00,0.00); //drop shadow offset

vec3 hsv2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float getNoise(vec2 uv, float t){
    
    //given a uv coord and time - return a noise val in range 0 - 1
    //using ashima noise
    
    //octave 1
    float SCALE = 1.0;
    float noise = snoise( vec3(uv.x*SCALE - t,uv.y*SCALE - t , 0));
    
    //octave 2 - more detail
    SCALE = 1.;
    noise += snoise( vec3(uv.x*SCALE + t,uv.y*SCALE , 0))* 0.5 ;
    
    //move noise into 0 - 1 range    
    noise = (noise/2. + 0.5);
    
    //make deeper rarer
    //noise = pow(noise,2.);
    
    return noise;
    
}

float getDepth(float n){
    
    n = floor(n*STEPS)/STEPS;
    
    return n;
    
}

float line(vec2 st, float pct){
  return  step( pct, st.y) -
          step( pct + 0.014290, st.y);
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float getlightness (float i) {
  return clamp(u_slider/100., 0., i);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_ratio;

    float t = u_time * 0.02;    
    float t2 = u_time * 0.2;

    vec3 col = vec3(1., 1., 1.);
    
   	float noise = getNoise(uv, t);
    
		float d = getDepth(noise);
    float h = noise + 0.8; //rainbow hue
    float s = 0.;
    float v = 1.; //deeper is darker

    col -= hsv2rgb(vec3(h,s,v));

    col += line(vec2(noise, noise), d);    
    col += vec3(.93, .93, .93);    

    // float hue = u_slider/200.*getNoise(uv.yx, t);

    if (col.x != 1.0) col -= vec3(getlightness(.8)) * (.5 + .5 * sin(u_time + vec3(uv.xy, 0.) + vec3(0., 2., 4.)));
    if (col.x >= .95) col -= vec3(.9);
    
    gl_FragColor = vec4(col,1.0);   
}
`
