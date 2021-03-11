export const termFrag = `
uniform vec2 uResolution;
uniform float uTime;
uniform float uSlider;

varying vec2 vUv;
varying vec3 vPosition;

float character(int n, vec2 p) {
	p = floor(p*vec2(4.0, -4.0) + 2.5);
    if (clamp(p.x, 0.0, 4.0) == p.x)
	{
        if (clamp(p.y, 0.0, 4.0) == p.y)
		{
        	int a = int(round(p.x) + 5.0 * round(p.y));
			if (((n >> a) & 1) == 1) return 1.0;
		}
    }
	return 0.5;
}

void main() {

    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    // uv.x *= uResolution.x / uResolution.y;

    vec2 wavedUv = vec2(
        uv.x + sin(uv.y * sin(uTime / 10.) * 500.) * 0.5,
        uv.y + sin(uv.x * sin(uTime / 10.) * 400.) * 0.5
    );

    float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    vec3 color = vec3(strength);
    color += vec3(.12);

    gl_FragColor = vec4(color, 1.0);
}
`
