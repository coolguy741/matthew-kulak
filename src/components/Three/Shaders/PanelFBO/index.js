export const vert = `
precision highp float;

varying vec2 vUv;
varying vec3 vPosition;

void main() {

    vPosition = position;
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
varying vec3 vPosition;



void main() {

    vec2 uv = vPosition.xy;

    vec3 col = vec3(u_bgcolor);
    
    gl_FragColor = vec4(col, 1.0);
}
`
