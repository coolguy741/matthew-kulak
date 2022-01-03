export const vert = `
precision highp float;

varying vec2 uUv;
varying vec3 vPosition;

void main() {

    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const voidFrag = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSlider;

varying vec2 uUv;
varying vec3 vPosition;


const int MAX_ITER = 20;

vec2 rotate(in vec2 v, in float a) {
	return vec2(cos(a)*v.x + sin(a)*v.y, -sin(a)*v.x + cos(a)*v.y);
}

float torus(in vec3 p, in vec2 t)
{
	vec2 q = abs(vec2(max(abs(p.x), abs(p.z))-t.x, p.y));
	return max(q.x, q.y)-t.y;
}

float rnd,sizer;
void randomize(in vec2 p){rnd=fract(sin(dot(p,vec2(13.3145,17.7391)))*317.7654321);}
vec3 fsign(vec3 p){return vec3(p.x<0.0?-1.0:1.0,p.y<0.0?-1.0:1.0,p.z<0.0?-1.0:1.0);}

vec3 paxis(vec3 p){//idea from dila originally at https://www.shadertoy.com/view/Xlj3DK
	vec3 a=abs(p);
	return fsign(p)*max(fsign(a-max(a.yzx,a.zxy)),0.0);
}

vec3 paxis2(vec3 p){
	vec3 a=abs(p);
	return fsign(p)*max(fsign(a-min(a.yzx,a.zxy)),0.0);
}

float DE(in vec3 p){
	float b=1.0;
	for(int i=0;i<3;i++){
		p-=paxis(p)*b*sizer;
		b*=0.5;
	}
	float d=length(p)-0.28;
	for(int i=0;i<4;i++){
		p-=paxis2(p)*b;
		b*=0.5;
	}
	p=abs(p);
	float d2=max(p.x,max(p.y,p.z))-b;
	return max(d2,-d);
}

float sdOctahedron(vec3 p, float s)
{
  p = abs(p);
  return (p.x+p.y+p.z-s)*0.57735027;
}

float opTwist(vec3 p)
{
    float k = uSlider / 5.; // Amount of twist
    float c = cos(k*p.y);
    float s = sin(k*p.y);
    mat2  m = mat2(c,-s,s,c);
    vec3  q = vec3(m*p.xz,p.y);
    return length(max(abs(q.xy) - .2 , 0.));;
}

float trap(in vec3 p)
{
	float d = opTwist(p);
	
	return d;

	// return length(max(abs(p.xy) - .2 + (uSlider / 1000.) , 0.));

	// return abs(max(abs(p.z)-0.1, abs(p.x)-0.1))-0.01;
	//return length(p)-0.5;
	//return length(max(abs(p) - 0.35, 0.0));
	//return abs(length(p.xz)-0.2)-0.01;
	// return abs(min(torus(vec3(p.x, mod(p.y,uSlider / 100.)-0.2, p.z), vec2(0.1, 0.05)), max(abs(p.z)-0.05, abs(p.x)-0.05)))-0.005;
	//return abs(min(torus(p, vec2(0.3, 0.05)), max(abs(p.z)-0.05, abs(p.x)-0.05)))-0.005;
	//return min(length(p.xz), min(length(p.yz), length(p.xy))) - 0.05;

}

float map(in vec3 p)
{
    float time = uTime;
	float cutout = dot(abs(p.yz),vec2(0.5))-0.035;
	float road = max(abs(p.y-23.), abs(p.z)-23.);
	
	vec3 z = abs(1.0-mod(p,2.0));
	z.yz = rotate(z.yz, time*0.05);

	float d = 99.0;
	float s = 1.0;
	for (float i = 0.0; i < 3.0; i++) {
		z.xz = rotate(z.xz, radians(i*10.0+time));
		z.zy = rotate(z.yz, radians((i+1.0)*20.0+time*1.1234));
		z = abs(1.0-mod(z+i/3.0,2.0));
		
		z = z*2.0 - 0.3;
		s *= 0.5;
		d = min(d, trap(z) * s);
	}
	return min(max(d, -cutout), road);
}

vec3 hsv(in float h, in float s, in float v) {
	return mix(vec3(1.0), clamp((abs(fract(h + vec3(3, 2, 1) / 3.0) * 6.0 - 3.0) - 1.0), 0.0 , 1.0), s) * v;
}

vec3 intersect(in vec3 rayOrigin, in vec3 rayDir)
{
    float time = uTime+20.0;
	float total_dist = 0.0;
	vec3 p = rayOrigin;
	float d = .1;
	float iter = 0.0;
	float mind = 3.14159+sin(time*.1)*0.2;
	
	for (int i = 0; i < MAX_ITER; i++)
	{		
		if (d < 0.001) continue;
		
		d = map(p);
		// This rotation causes the occasional distortion - like you would see from heat waves
		p += d*vec3(rayDir.x, rotate(rayDir.yz, sin(mind*(3. + uSlider / 15.))));
		mind = min(mind, d);
		total_dist += d;
		iter++;
	}

	vec3 color = vec3(0.0);
	if (d < 0.001) {
		float x = (iter/float(MAX_ITER));
		float y = (d-0.01)/0.01/(float(MAX_ITER));
		float z = (0.01-d)/0.01/float(MAX_ITER);
		if (max(abs(p.y-0.025), abs(p.z)-0.035)<0.0001) { // Road
			float w = smoothstep(mod(p.x*10.0, 4.0), 2.0, 2.01);
			w -= 1.0-smoothstep(mod(p.x*50.0+2.0, 4.0), 2.0, 1.99);
			w = fract(w+0.0001);
			float a = fract(smoothstep(abs(p.z), 0.0025, 0.0026));
			color = vec3((1.0-x-y*2.)*mix(vec3(0.8, 0.8, 0), vec3(0.1), 1.0-(1.0-w)*(1.0-a)));
		} else {
			float q = 1.0-x-y*2.+z;
			color = hsv(q*0.2+sin((time/3.) * (1. + uSlider / 10.)), 1.0-q*0.2, q);
		}
	} else
		color = hsv(d - sin((time/5.) * (1. + uSlider / 10.)), 1.0, 0.5)*mind*35.0; // Background
	return color;
}

void main()
{
    float time = uTime+60.0;
	vec3 upDirection = vec3(0., 1., 0);
	vec3 cameraDir = vec3(1., 0., 0.);
	vec3 cameraOrigin = vec3(time * (.1 + uSlider * .001), 0, 0.);
	
	vec3 u = normalize(cross(upDirection, cameraOrigin));
	vec3 v = normalize(cross(cameraDir, u));
	vec2 screenPos = -1.0 + 2.0 * gl_FragCoord.xy / uResolution.xy;
	screenPos.x *= uResolution.x / uResolution.y;
	vec3 rayDir = normalize(u * screenPos.x + v * screenPos.y + cameraDir*(1.0-length(screenPos)*0.5));
	
	gl_FragColor = vec4(intersect(cameraOrigin, rayDir), 1.0);
	gl_FragColor.rgb += vec3(.125);
}
`
