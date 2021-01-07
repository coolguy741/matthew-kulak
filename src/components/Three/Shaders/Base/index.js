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
uniform float u_time;
uniform float u_ratio;
uniform vec3 u_mouse;
uniform float u_speed;
uniform float u_slider;
varying vec2 v_uv;
varying vec3 v_position;


#define USE_AA
//#define SHOW_AA_COLOR_ONLY
float aaTreshold = 4.;


mat3 rotx(float a) { mat3 rot; rot[0] = vec3(1.0, 0.0, 0.0); rot[1] = vec3(0.0, cos(a), -sin(a)); rot[2] = vec3(0.0, sin(a), cos(a)); return rot; }
mat3 roty(float a) { mat3 rot; rot[0] = vec3(cos(a), 0.0, sin(a)); rot[1] = vec3(0.0, 1.0, 0.0); rot[2] = vec3(-sin(a), 0.0, cos(a)); return rot; }
mat3 rotz(float a) { mat3 rot; rot[0] = vec3(cos(a), -sin(a), 0.0); rot[1] = vec3(sin(a), cos(a), 0.0); rot[2] = vec3(0.0, 0.0, 1.0); return rot; }
mat2 rotate(float a) { return mat2(cos(a), sin(a), -sin(a), cos(a)); }
vec4 render(in vec3 rp, in vec3 rd);
vec3 lightDir = normalize(vec3(1.0, .2, .0));

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(2.9898,78.233))) * 43758.5453);
}

float rnd(vec2 p)
{
    return abs(rand(p));
}

float value (float x, float randx)
{
    float a = min(x/randx, 1.0);
    float b = min(1.0, (1.0 - x) / (1.0 - randx));
    return a + (b - 1.0);
}

float polynoise(vec2 p)
{
    vec2 seed = floor(p);
    vec2 rndv = vec2( rnd(seed.xy), rnd(seed.yx));
    vec2 pt = fract(p);
    float bx = value(pt.x, rndv.x);
    float by = value(pt.y, rndv.y);
    return min(bx, by) * abs(rnd(seed.xy));
}

float T;
const float PI = 3.14159265;
mat2 r1; mat2 r2; mat2 r3;

float polyfbm(vec2 p)
{
    vec2 seed = floor(p);
    float m1 = polynoise(p * r2);
    m1 += polynoise ( r1 * (vec2(0.5, 0.5) + p));
    m1 += polynoise ( r3 * (vec2(0.35, 0.415) + p));
    m1 *= .35;
    
    float m2 = polynoise (r3 * (p * 2.4));
    m1 += m2 * 0.05;
    return m1;
}

float stonepolyfbm(vec2 p)
{
    vec2 seed = floor(p);
    float m1 = polynoise(p * r2);
    m1 += polynoise ( r1 * (vec2(0.5, 0.5) + p));
    m1 *= 0.5;
	return m1;
}

float sdBox( vec3 p, vec3 b )
{
  vec3 d = abs(p) - b;
  return min(max(d.x,max(d.y,d.z)),0.0) +
         length(max(d,0.0));
}

float peakH(in vec3 rp)
{
    return smoothstep(0.3, 0.298, rp.y + sin(rp.z * 10.0) * 0.05);
}

const float GROUND = 0.0;
const float STONES = 1.0;
float HIT_ID = GROUND;

float map(in vec3 rp)
{
    HIT_ID = GROUND;
    // stones
    float x = -(stonepolyfbm(rp.xz * 5.4) - 0.4) * 0.15 + sdBox(rp - vec3(0.0, .05, 0.0), vec3(11.0, .02, 11.0));
    
    // all the rest
    rp.y /= clamp((min(1.0 - abs(rp.z), (1.0 - abs(rp.x))) / 0.15), 0.5, 1.0);
    float l = rp.y - polyfbm(rp.xz * 1.4) * 1.2;
    
    float bounds = sdBox(rp, vec3(30.0, 2.5, 30.0));
    l = max(l, bounds); 
    x = max(x, bounds);
    if (x < l) HIT_ID = STONES; 
    
    return min(l, x);
}

vec3 grad(in vec3 rp)
{
    vec2 off = vec2(0.005, 0.0);
    vec3 g = vec3(map(rp + off.xyy) - map(rp - off.xyy),
                  map(rp + off.yxy) - map(rp - off.yxy),
                  map(rp + off.yyx) - map(rp - off.yyx));
    return normalize(g);
}


///////////////////////
///////// AA CODE   ///
//////////////////////
const float UNINITIALIZED = 99.0;
float aaRayDistance = UNINITIALIZED;
float aaDistance = UNINITIALIZED;

float prevDist = 0.0;
float oldSgn = 1.0;
float resolutionScale = 0.0; // fwidth(uv.x)

float getAATreshold(float dist)
{
    return dist * 0.5 * resolutionScale * aaTreshold;
}

void traceAA(float dist, in vec3 ro, in vec3 rp)
{
    float sgn = sign(dist - prevDist);
    
    float travelled = length(ro - rp);
    if(aaRayDistance == UNINITIALIZED && oldSgn != sgn && sgn > 0.0 && prevDist <= getAATreshold(travelled))
    {
        aaRayDistance = travelled;
        aaDistance = dist;
    }
    oldSgn = sgn;
    prevDist = dist;
}

void renderAA(inout vec4 color, in vec3 ro, in vec3 rd)
{
    if (aaDistance > 0.0 && aaDistance <= getAATreshold(aaRayDistance))
    {
        float aa = mix(1.0, 0.0, aaDistance / getAATreshold(aaRayDistance));
        color.rgb += aa * render(ro + rd * aaRayDistance, rd).rgb * (1.0 - color.a);
        color.a += aa;
        color.a = clamp(color.a, 0.0, 1.0);
    }
}


//////////////////////
//////////////////////

float ao(in vec3 rp, in vec3 g)
{
    float d = 0.4;
    float occ = 1.0;
    
    for (int i = 0; i < 3; ++i)
    {
        float fi = float(i * 2 + 1);
        d = d * fi;
        occ -= (1.0 - (map(rp + g * d) / d)) * (1.0 / fi);
    }
    occ = clamp(occ, 0.0, 1.0);
    return occ;
}


vec4 render(in vec3 rp, in vec3 rd)
{
    vec3 g = grad(rp);
    vec4 color1 = vec4(.9, .9, .9, .1);
    vec4 color2 = vec4(1., 1., 1., .1) * 1.4;
    
    float peak = peakH(rp);
    vec4 color = mix(color1, color2, smoothstep(0.1, 0.12, rp.y + stonepolyfbm(rp.xz * 2.0) * 0.1));
    color += mix(vec4(1.0), vec4(.0), peak);
    
    if (HIT_ID == STONES)
    {
        color = vec4(0.1, 0.1, 0.1, 0.0) * 1.8;
    }
    
    float d = dot(g, lightDir);
    d = clamp(d, 0.00, 1.0);
    d = mix(d, 1.0, 0.2);
    color *= d;
    color = mix(color, color * ao(rp, g), 0.7);
	return color;
}


vec2 _uv;

void trace(in vec3 rp, in vec3 rd, inout vec4 color)
{
    
    bool hit = false;
    vec3 ro = rp;
    vec4 bgcolor = vec4(.9, .9, .9, 1.);
    
    float closest = 999.0;
    vec3 closestPoint = vec3(0.0);
    float dist = 0.0;
    for (int i = 0; i < 500; ++i)
    {
        
        dist = map(rp);
        
#ifdef USE_AA        
        traceAA(dist, ro, rp);
#endif
        
        if(dist < 0.0)
        {
            hit = true;
            break;
        }
        rp += rd * max(dist, 0.01) * 0.2;
        
        if(length(ro - rp) > 5.) break;
    }
    
    // some more steps for better accuracy
    if(hit)
    {
        for (int i = 0; i < 8; ++i)
        {
            rp += dist * rd * 0.15;
	        dist = map(rp);
        }
    }
    
#ifdef USE_AA
	renderAA(color, ro, rd);
#endif
    
#ifndef SHOW_AA_COLOR_ONLY        
    if(hit)
    {
        color += render(rp, rd) * (1.0 - color.a);
    }
    else
    {
	    color = mix(color, bgcolor, 1.0 - color.a);
    }
#endif
    color.rgb = pow(color.rgb, vec3(1.0 / 3.2));
}


mat3 lookat(vec3 from, vec3 to)
{
    vec3 f = normalize(to - from);
    vec3 r = normalize(cross(vec3(0.0, 1.0, 0.0), f));
    vec3 u = normalize(cross(-r, f));
    return mat3(r, u, f);
}

void main()
{
    T = u_time;
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv -= vec2(0.5);
    uv.y /= u_resolution.x / u_resolution.y;
    _uv = uv;
    
    r1 = rotate(.1);
    r2 = rotate(.1);
    r3 = rotate(.1);
    // resolutionScale = fwidth(uv.x);
    
    vec2 m = vec2(sin(T * 0.1) * 0.5,  -0.1 - 0.2 * (cos(T * 0.2) * 0.5 + 0.5));
    if(u_mouse.z > 0.0)
    {
		m = ((u_mouse.xy / u_resolution.xy) - vec2(0.5));
    }
    
    vec2 im = vec2(12.0, 2.0) * m;
    vec3 rd = normalize(vec3(uv, 1.0));
    vec3 rp = vec3(0.0, 1.0, -5.5);
    vec3 lookTo = vec3(0.0, 0.0, 1.0);
    //rp = roty(im.x) * rp;
    rp.y = -im.y * 4.0;
    rd = lookat(rp, lookTo) * rd;
    
    gl_FragColor = vec4(0.0);
    trace(rp, rd, gl_FragColor);
}
`
