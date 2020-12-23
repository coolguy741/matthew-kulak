export const solisVert = `
precision highp float;

varying vec2 v_uv;
varying vec3 v_position;

void main() {

    v_position = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const solisFrag = `

precision highp float;

uniform vec2 u_resolution;
uniform float u_ratio;
// uniform vec2 u_mouse;
uniform float u_time;
uniform int u_n1;
uniform int u_n2;
uniform float u_bw1;
uniform float u_bw2;
uniform float u_slider;
uniform sampler2D u_noise;

varying vec2 v_uv;
varying vec3 v_position;

void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * u_resolution.xy) / u_resolution.y;

    vec3 col = vec3(0.);

    uv.x += 1. / 21.;

    float a = .785;
    float c = cos(a);
    float s = sin(a);
    uv *= mat2(c, -s, s, c);
    uv *= 15.;
    
    vec2 gv = fract(uv) - .5;
    vec2 id = floor(uv);

    float m = 0.;
    float t = u_time * (1. + u_slider / 70.);
    
    for (float y=-1.;y<=1.;y++) {
        for (float x=-1.;x<=1.;x++) {
            vec2 offset = vec2(x, y);
            
            float d = length(gv - offset);
            float dist = length(id + offset)*u_slider/100.;
            
            float r = mix(1., 1.5, sin(dist - t) * .5 + .5);
            m += smoothstep(r, r*.9, d);
        }
    }

    col += mod(m, (2. + (u_slider / 200.)));

    col = mix( vec3(1., 0., .2 + sin(u_time / 2.) / 5.), vec3(1., (.25 + (sin(u_time) *.5 + .5) / 14. + u_slider / 1500.), 0.), col );

    uv *= mat2(c, -s, s, c);
    uv *= mat2(c, -s, s, c);
    uv *= mat2(c, -s, s, c);
    uv *= mat2(c, -s, s, c);
    uv *= mat2(c, -s, s, c);

    uv /= 15.;
    col += mix(vec3(1., 0., .4), vec3(1., .5, 0.), uv.x);
    
    gl_FragColor = vec4(col,1.);   
}
`
