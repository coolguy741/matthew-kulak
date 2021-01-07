export const vert = `
precision highp float;

varying vec2 v_uv;
varying vec3 v_position;

void main() {

    v_position = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const frag = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_ratio;
uniform float u_speed;
uniform float u_slider;
uniform sampler2D u_texture;
uniform vec3 u_bgcolor;
uniform vec3 u_fgcolor;

varying vec2 v_uv;
varying vec3 v_position;

//random hash
vec4 hash42(vec2 p){
    
	vec4 p4 = fract(vec4(p.xyxy) * vec4(443.8975,397.2973, 491.1871, 470.7827));
    p4 += dot(p4.wzxy, p4+19.19);
    return fract(vec4(p4.x * p4.y, p4.x*p4.z, p4.y*p4.w, p4.x*p4.w));
}

float hash( float n ){
    return fract(sin(n)*43758.5453123);
}

// 3d noise function (iq's)
float n( in vec3 x ){
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0 + 113.0*p.z;
    float res = mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
                        mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y),
                    mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                        mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
    return res;
}

//tape noise
float nn(vec2 p){

    float y = p.y;
    float s = u_time * 2.;
    
    float v = (n( vec3(y*.01 +s, 			1., 1.0) ) + .0)
          	 *(n( vec3(y*.011+1000.0+s, 	1., 1.0) ) + .0) 
          	 *(n( vec3(y*.51+421.0+s, 	1., 1.0) ) + .0)   
        ;
    //v*= n( vec3( (fragCoord.xy + vec2(s,0.))*100.,1.0) );
   	v*= hash42(   vec2(p.x +u_time*0.01, p.y) ).x +.3 ;

    
    v = pow(v+.3, 1.);
	if(v<.7) v = 0.;  //threshold
    return v;
}

void main() {

    vec2 uv = v_position.xy;
    
    uv.x /= 9.37;
    uv.y /= 4.73;

    uv.x = (uv.x + 1.) / 2.;
    uv.y = (uv.y + 1.) / 2.;
    
    // bottom-left
    vec2 bl = step(vec2(0.1),uv);
    float pct = bl.x * bl.y;
    
    // top-right
    vec2 tr = step(vec2(0.1),1.0-uv);
    pct *= tr.x * tr.y;
    
    vec3 col = mix(u_fgcolor, u_bgcolor, pct);

    float linesN = 240.; //fields per seconds
    float one_y = u_resolution.y / linesN; //field line
    uv = floor(uv*u_resolution.xy/one_y)*one_y;

	float staticlines = nn(uv);
    
    // Base
    if (u_bgcolor == vec3(.8, .8, .8)) {
        col -= vec3(clamp(staticlines, 0., .4));
    }

    // Reactor
    if (u_bgcolor == vec3(.125, .125, .125)) {
        col.x += clamp(staticlines, 0., .7);
    }

    // Portal
    if (u_bgcolor == vec3(.149, .149, .149)) {
        col.x += staticlines;
        col.z += clamp(staticlines, 0., .6);
    }

    // Terminal
    if (u_bgcolor == vec3(.124, .124, .124)) {
        col.x += clamp(staticlines, 0., .577);
        col.y += clamp(staticlines, 0., .628);
        col.z += clamp(staticlines, 0., .9);
    }

    // Acid
    if (u_bgcolor == vec3(0.56, 0, 1)) {
        col.x += clamp(staticlines, 0., .05);
        col.y += staticlines;
        col.z -= staticlines;
    }
    
    gl_FragColor = vec4(col, .8);
}
`
