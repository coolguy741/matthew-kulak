export const trailFrag = `
precision highp float;

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform float u_ratio;
uniform float u_speed;
uniform sampler2D u_texture;

varying vec2 v_uv;


float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
	uv -= disc_center;
	float dist = sqrt(dot(uv, uv));
	return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}

void main() {
	

	// =========================
	//       MOUSE TRAIL
	// =========================

	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	vec4 color = vec4(0.0, 0.0, uv + vec2(0.0, -0.002));
	
	vec2 center = (u_mouse.xy) / 2.;
	uv.x *= u_ratio;
	center.x *= u_ratio;
	
	color.r += circle(uv, center, 0.0, 0.1) * u_speed;
	color.r = mix(color.r, 0.0, .009);
	color.r = clamp(color.r, 0.0, 1.0);
	
	color.g = color.r;
	
	gl_FragColor = color;

}
`
