export const baseVert = `
precision highp float;

varying vec2 vUv;
varying vec3 vPosition;

void main() {

    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const baseFrag = `

precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSlider;

vec3 objcol;

// by Dave_Hoskins
float hash12(vec2 p)
{
	vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

mat2 rot(float a){
    float s = sin(a), c = cos(a);
    return mat2(c, s, -s, c);
}

float sdPyramid( vec3 p, float h)
{
  float m2 = h*h + 0.25;
    
  p.xz = abs(p.xz);
  p.xz = (p.z>p.x) ? p.zx : p.xz;
  p.xz -= 0.5;

  vec3 q = vec3( p.z, h*p.y - 0.5*p.x, h*p.x + 0.5*p.y);
   
  float s = max(-q.x,0.0);
  float t = clamp( (q.y-0.5*p.z)/(m2+0.25), 0.0, 1.0 );
    
  float a = m2*(q.x+s)*(q.x+s) + q.y*q.y;
  float b = m2*(q.x+0.5*t)*(q.x+0.5*t) + (q.y-m2*t)*(q.y-m2*t);
    
  float d2 = min(q.y,-q.x*m2-q.y*0.5) > 0.0 ? 0.0 : min(a,b);
    
  return sqrt( (d2+q.z*q.z)/m2 ) * sign(max(q.z,-p.y));
}

float de(vec3 pos)
{
    float t = uTime;
    float a=smoothstep(13.,1.,t)*2.-smoothstep(4.,0.,t)*1.;
    float f=sin(uTime*5.+sin(uTime*20.)*.2);
    // pos.yz *= rot(uTime);
    vec3 p = pos;
    float s=4.;
    // for (int i=0; i<4; i++){
    //     p=abs(p)*1.3-.5-f*.1-a;
    //     p.xy*=rot(radians(45.));
    //     p.xz*=rot(radians(45.));
    //     s*=1.3;
    // }
    float fra = length(p)/s-.5;
    pos.xz *= rot(uTime);

    // Distance between shapes
    p = abs(pos) - .1 - a;

    float d = length(p) - .7;

    // Bars
    d = min(d, max(length(p.xz)-.1,p.y));
    d = min(d, max(length(p.yz)-.1,p.x));
    d = min(d, max(length(p.xy)-.1,p.z));

    // Pyramid
    d = sdPyramid(p, 1.);

    // ??
    p = abs(pos);

    // ??
    // p.x -= 4.+a+f*.5;

    // Big circle
    // d = min(d, length(p) - 2.6);

    // Energy beams
    // d = min(d, length(p.yz-abs(sin(p.x*.5-uTime*10.))));

    // p = abs(pos);
    // p.y -= 4.+a+f*.5;
    // d = min(d, length(p) - .7);

    // Color plane
    d = min(d, max(length(p.xz)-uSlider / 7.,p.y));

    // Atom glow
    // d = min(d, fra);

    objcol = abs(p - .5);
    if (d==fra) objcol=vec3(0.,0.,0.);
    return d;
}

vec3 normal(vec3 p) {
    vec2 d = vec2(0., .01);
    return normalize(vec3(de(p+d.yxx), de(p+d.xyx), de(p+d.xxy))-de(p));
}

vec3 march(vec3 from, vec3 dir)
{
    float d = 0., td = 0., maxdist = 30.;
    vec3 p = from, col = vec3(.9, 0.9, 0.9);
    for (int i = 0; i<100; i++)
    {
        // Noise 
        // float d2 = de(p) * (1.-hash12(gl_FragCoord.xy+uTime)*.2);

        // No noise
        float d2 = de(p);
        if (d2<0.)
        {
            vec3 n = normal(p);
            dir = reflect(dir, n);
            d2 = .1;
        }
        d = max(.01, abs(d2));
        p += d * dir;
        td += d;
        if (td>maxdist) break;
        col -= .02 - .01 * objcol;
    }
    return pow(col, vec3(2.));
}

void main()
{
    vec2 uv = gl_FragCoord.xy / uResolution.xy - .5;
    uv.x *= uResolution.x / uResolution.y;
    vec3 from = vec3(0.,0.,-3.);
    vec3 dir = normalize(vec3(uv, 1.));
    vec3 col = march(from, dir);

    gl_FragColor = vec4(col,1.);
}
`
