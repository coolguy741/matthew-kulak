export const darkVert = `
precision highp float;

varying vec2 vUv;
varying vec3 vPosition;

void main() {

    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const darkFrag = `

precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSlider;
uniform vec2 uMouse;

varying vec2 vUv;
varying vec3 vPosition;

float hash12(vec2 p)
{
	vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * uResolution.xy) / uResolution.y;

    vec3 ro = vec3(0., 0., -1.);
    vec3 lookat = vec3(0.);
    float zoom = 0.4;
    float t = uTime * .1;

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
        float m2 = b1 * (1. - b2);
        m = max(m, (ripples) * b2 * max(0., waves));
        m2 = max(m2, (ripples) * b2 * max(0., waves * abs(sin(t * 30.))));

        col.r += m;
        col.b += m2 * uSlider / 100.;
        // col.b += m2;
        // col.b += m * (y + t);
        // col.b *= y * abs(sin(t * 30.));

        col.r -= abs(uv.x);
        col.b -= abs(uv.x) / 3.;
        col.r = max(.125, col.r);
        col.b = max(.125, col.b);
        // col.r += .125;
    }

    gl_FragColor = vec4(col,1.);
}
`
