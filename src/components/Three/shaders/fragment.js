export const fragShader = `
precision highp float;

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform float u_ratio;
uniform float u_speed;
uniform sampler2D u_image;
uniform sampler2D u_disp;
uniform int u_n1;
uniform int u_n2;
uniform int u_n3;
uniform int u_n4;
uniform int u_n5;
uniform int u_n6;
uniform int u_n7;
uniform int u_n8;
uniform float u_bw1;
uniform float u_bw2;

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

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
	uv -= disc_center;
	float dist = sqrt(dot(uv, uv));
	return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}

void main() {

	// =========================
	//     DISPLACEMENT MAP
	// =========================

    vec4 c = vec4(0.,0.,0.,1.);

    vec4 disp = texture2D(u_disp, v_uv);

    vec2 dispUV = vec2(
        v_uv.x,
        v_uv.y
    );

	dispUV.y = mix(v_uv.y, disp.r - 0.2, sin(u_time/2.)/28.);
	

	// =========================
	//       MOUSE TRAIL
	// =========================

	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	vec4 color = texture2D(u_image, uv + vec2(0.0, -0.002));
	
	vec2 center = (u_mouse.xy) / 2. + .5;
	uv.x *= u_ratio;
	center.x *= u_ratio;
	
	color.r += circle(uv, center, 0.0, 0.1) * abs(u_speed);
	color.r = mix(color.r, 0.0, .009);
	color.r = clamp(color.r, 0.0, 1.0);
	
	color.g = color.r * 5.0;
	
	gl_FragColor = color;

	
	// =======================
	// OLD CODE
	// =======================

	// vec4 color = texture2D(u_image, dispUV);
	// float dist = clamp(0.9, 1.2, length(v_position - u_mouse) / 100.);
    // gl_FragColor = vec4(dist, dist, dist, 1.0) * color;


	// =========================
    //     ASCII CONVERSION
	// =========================

    // vec3 col = vec3(gl_FragColor);
    // // vec2 uv = gl_FragCoord.xy;
    // float gray = col.x;

    // int n = u_n1;
	// if (gray > 0.2) n = u_n2;
	// if (gray > 0.3) n = u_n3;
	// if (gray > 0.4) n = u_n4;
	// if (gray > 0.5) n = u_n5;
	// if (gray > 0.6) n = u_n6;
	// if (gray > 0.7) n = u_n7;
	// if (gray > 0.8) n = u_n8;

	// vec2 p = mod(uv/4.0, 2.0) - vec2(1.0);
	// if (u_mouse.z > 0.5)	col = gray*vec3(character(n, p));
	// else col = vec3(character(n, p));

	// gl_FragColor = vec4(col.x, col.y, col.z, 1.0);

}
`
