export const mainFrag = `
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
uniform float u_bw1;
uniform float u_bw2;
uniform sampler2D u_trail;
uniform sampler2D u_texture;

varying vec2 v_uv;

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
	uv -= disc_center;
	float dist = sqrt(dot(uv, uv));
	return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}

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

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
	
	// =======================
	//        NOISE
	// =======================

	vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x *= u_resolution.x/u_resolution.y;
    vec3 color1 = vec3(0.0);
    vec2 pos = vec2(uv*3.);

    float DF = 0.0;

    // Add a random position
    float a = 0.0;
    vec2 vel = vec2(u_time*.1);
    DF += snoise(pos+vel)*.25+.25;

    // Add a random position
    a = snoise(pos*vec2(cos(u_time*0.15),sin(u_time*0.1))*0.1)*3.1415;
    vel = vec2(cos(a),sin(a));
    DF += snoise(pos+vel)*.55+.25;

    color1 = vec3( smoothstep(.7,.75,fract(DF)) );

    gl_FragColor = vec4(1.0-color1,1.0);



    // =========================
	//       MOUSE TRAIL
	// =========================

	// vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	// vec4 color = texture2D(u_texture, v_uv + vec2(0.0, -0.002));
    uv.x /= u_resolution.x/u_resolution.y;
	vec4 color = vec4(color1, 1.0);
	
	vec2 center = (u_mouse.xy) / 2. + .5;
	uv.x *= u_ratio;
	center.x *= u_ratio;
	
	color.r += circle(uv, center, 0.04, 0.02) * u_speed;
	color.r = mix(color.r, 0.0, .009);
	color.r = clamp(color.r, 0.0, 1.0);
	
	color.g = color.r;
	color.b = color.r;
	
	gl_FragColor = color;


	// =========================
    //     ASCII CONVERSION
	// =========================

    vec3 col = vec3(gl_FragColor);
    uv = gl_FragCoord.xy;
    float gray = col.x;

    int n = u_n1;
	if (gray > 0.5) n = u_n2;

	vec2 p = mod(uv/4.0, 2.0) - vec2(1.0);
	if (u_mouse.z > 0.5)	col = gray*vec3(character(n, p));
	else col = vec3(character(n, p));

	gl_FragColor = vec4(col.x, col.x, col.x, 1.0);

}
`
