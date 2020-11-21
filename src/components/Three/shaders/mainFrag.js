export const mainFrag = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_ratio;
uniform int u_n1;
uniform int u_n2;
uniform float u_bw1;
uniform float u_bw2;
uniform sampler2D u_trail;

varying vec2 v_uv;


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

void main() {

	// =========================
    //     ASCII CONVERSION
	// =========================

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv *= u_resolution.xy/u_resolution.xy;

    vec4 col = texture2D(u_trail, uv);

    // vec3 col = vec3(gl_FragColor);
    uv = gl_FragCoord.xy;


    float gray = col.x;

    int n = u_n1;
	if (gray > 0.5) n = u_n2;

	vec2 p = mod(uv/4.0, 2.0) - vec2(1.0);
	// col.xyz = gray*vec3(character(n, p));
	col.xyz = vec3(character(n, p));

    gl_FragColor = vec4(col.x, col.y, col.z, 1.0);
    
    // gl_FragColor = texture2D(u_trail, uv);

}
`
