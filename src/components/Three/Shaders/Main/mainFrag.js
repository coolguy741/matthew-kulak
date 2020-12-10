export const mainFrag = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_ratio;
uniform vec2 u_mouse;
uniform float u_time;
uniform int u_n1;
uniform int u_n2;
uniform float u_bw1;
uniform float u_bw2;
uniform sampler2D u_noise;

varying vec2 v_uv;
varying vec3 v_position;


float character(int n, vec2 p) {
	p = floor(p*vec2(4.0, -4.0) + 2.5);
    if (clamp(p.x, 0.0, 4.0) == p.x)
	{
        if (clamp(p.y, 0.0, 4.0) == p.y)
		{
        	int a = int(round(p.x) + 5.0 * round(p.y));
			if (((n >> a) & 1) == 1) return u_bw1;
		}
    }
	return u_bw2;
}

float map(float value, float inMin, float inMax, float outMin, float outMax) {
	return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	uv *= u_resolution.xy/u_resolution.xy;

	vec4 col = texture2D(u_noise, uv);
    uv = gl_FragCoord.xy;

    float gray = col.y;

    int n = u_n1;
	if (gray > 0.5) n = u_n2;

	vec2 p = mod(uv/4., 2.0) - vec2(1.0);
	// col.xyz = gray*vec3(character(n, p));
	if (u_bw1 != 0.99 && u_bw1 != 1.0)  col.xyz = vec3(character(n, p));


	// Terminal theme

	if (u_bw1 == 1.0 && col.x == 1.0) col.xyz = vec3(0.204, 0.522, 0.141);


	// Acid theme

	vec3 hsbCol = hsb2rgb(col.rgb);

	if (u_bw1 == 0.99) col.r -= .8;
	if (u_bw1 == 0.99) col.b -= 1.;

	vec3 col1 = mix(vec3(143. / 255., 0., 255. / 255.), vec3(95. / 255., 46. / 255., 210. / 255.), gl_FragCoord.y / u_resolution.y);
	
	if (u_bw1 == 0.99 && col.r != 1.0 && col.g != 1.0 && col.b != 1.0) col.rgb += vec3(1.8, 0., 2.);
	if (u_bw1 == 0.99 && (col.r != 1.0 && col.g != 0.0 && col.b != 1.0) && (col.r != 0.8 && col.g != 1.0 && col.b != 0.0)) col.rgb += vec3(-1.5, 0.5, -1.5);
	if (u_bw1 == 0.99 && (col.r != 1.0 && col.g != 0.0 && col.b != 1.0) && (col.r != 0.8 && col.g != 1.0 && col.b != 0.0)) col.rgb += vec3(.1, 0., .1);

	if (u_bw1 == 0.99 && col.r <= 1.0 && col.g <= 0.5) col.rgb = col1;

	gl_FragColor = vec4(col.rgb, 1.0);

}
`
