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

void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * u_resolution.xy) / u_resolution.y;

    vec3 ro = vec3(0., 0., -1.);
    vec3 lookat = vec3(0.);
    float zoom = .5 - (u_slider / 1000.);
    float t = u_time * .1;

    vec3 f = normalize(lookat - ro),
        r = normalize(cross(vec3(0., 1., 0.), f)),
        u = cross(f, r),
        c = ro + f * zoom,
        i = c + uv.x * r + uv.y * u, 
        rd = normalize(i - ro);

    float dS, dO;
    vec3 p;

    for (int i=0; i<100; i++) {
        p = ro + rd * dO;
        dS = -(length(vec2(length(p.xz) - 1., p.y)) - .7);
        if (dS<.001) break;
        dO += dS;
    }

    vec3 col = vec3(.125);

    if (dS<.001) {
        float x = atan(p.x, p.z) + t;
        float y = atan(length(p.xz) - 1., p.y);

        float bands = sin(y * 50. + x * 30.);
        float ripples = sin((x * 15. - y * 15.) * 20.) * .5 + .5;
        float waves = sin(x * 2. - y * 100. + t * 30.);

        float b1 = smoothstep(0., 1., bands);
        float b2 = smoothstep(-.1, .1, bands - .1);

        float m = b1 * (1. - b2);
        m = max(m, ripples * b2 * max(0., waves));

        col.r += m;

        col.r -= abs(uv.x);
        col.r = max(.125, col.r);
        // col.r += .125;
    }

    gl_FragColor = vec4(col,1.);
}
`
