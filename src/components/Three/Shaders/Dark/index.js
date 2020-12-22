export const darkVert = `
precision highp float;

varying vec2 v_uv;
varying vec3 v_position;

void main() {

    v_position = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const darkFrag = `

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

float hexDist(vec2 p) {
    p = abs(p);
    float c = dot(p, normalize(vec2(1., 1.73)));
    c = max(c, p.x);

    return c;
}

vec4 hexCoords (vec2 uv) {
    vec2 rep = vec2(1., 1.73);
    vec2 h = rep * .5;

    vec2 a = mod(uv, rep) - h;
    vec2 b = mod(uv - h, rep) - h;

    vec2 gv = dot(a, a)<dot(b, b) ? a: b;
    vec2 id = uv - gv;

    float x = atan(gv.x, gv.y);
    float y = .5 - hexDist(gv);

    return vec4(gv.x, y, id.x, id.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_ratio;
    uv -= vec2(1., 0.5);
    uv *= 15.;
    vec2 uv2 = uv / 15.;
    vec4 hc = hexCoords(uv);

    vec3 col = vec3(.3, 0., 0.7);

    // Creates hex grid
    float c = smoothstep(0., .04, hc.y);
    col -= c - (uv2.y / 2. - .1);
    col = clamp(col, 0., 1.);
    col += vec3(.125);

    // Adjusts levels with slider
    // col = clamp(col, 0., 1.);
    // col += vec3(u_slider / 100.);

    // Creates pulsating hexagons
    c *= smoothstep(0., .08, hc.y * cos(hc.z + (u_time * ((u_slider + 3.) / 3.) * .15 * hc.w + u_time) / 3.));
    c *= smoothstep(0., .08, hc.y * cos(hc.z + u_time  * hc.w + u_time / 1.));
    col = clamp(col, 0., 1.);
    c = clamp(c, 0., (.07 * (1. + u_slider / 20.)));
    col.r += c / (.5 + uv2.y);
    // col.b += c * (2.5 + uv2.y);
    
    gl_FragColor = vec4(col,1.);   
}
`
