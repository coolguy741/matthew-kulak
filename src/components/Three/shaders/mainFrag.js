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
uniform int u_n3;
uniform int u_n4;
uniform int u_n5;
uniform int u_n6;
uniform int u_n7;
uniform int u_n8;
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

void main() {
	
	// =======================
	//        OLD CODE
	// =======================

    float bpm = 0.935;
    
	vec2 uv = vec2( gl_FragCoord.xy - 0.* u_resolution.xy );
    uv = 30. * uv.xy/u_resolution.y;
    uv.x -= 12. * ((sin(abs(sin(u_time/1.) * 5.) * uv.y * 50.) + 15.) / 15.);
    
    vec2 pos = vec2(15.)-uv;
    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);
    
    float f = 2.;
    vec3 ring1 = vec3(1.-smoothstep(f,f+0.1,r) - (1.-smoothstep(f-0.1,f,r)));
    f = 6.-ceil(abs(pow(cos(a),2.)*2.)*2.);
    vec3 ring2 = vec3(1.-smoothstep(f,f+0.2,r) - (1.-smoothstep(f-0.2,f,r)));
    f = 6.+ceil(abs(pow(cos(a),2.)*2.)*2.);
    vec3 ring3 = vec3(1.-smoothstep(f,f+.3,r) - (1.-smoothstep(f-.3,f,r)));
    f = 7.+ceil(abs(pow(cos(a),2.)*2.)*2.) + abs(tan(a));
    vec3 ring4 = vec3(1.-smoothstep(f,f+.4,r) - (1.-smoothstep(f-.4,f,r)));
    f = 8.+ceil(abs(pow(cos(a),2.)*2.)*2.) + abs(tan(a)) + abs(tan(a+3.1459/2.));
    vec3 ring5 = vec3(1.-smoothstep(f,f+.5,r) - (1.-smoothstep(f-.5,f,r)));
    f = 8.-ceil(abs(cos(a)*2.)*2.)+min(ceil(abs(tan(a)*0.3)),6.);
    vec3 ring6 = vec3(1.-smoothstep(f,f+.6,r) - (1.-smoothstep(f-.6,f,r)));
    f = 10.+ceil(abs(pow(cos(a),2.)*2.)*2.)+abs(tan(a))+abs(tan(a+3.1459/2.))+abs(tan(a*8.));
    vec3 ring7 = vec3(1.-smoothstep(f,f+9.25,r) - (1.-smoothstep(f-3.25,f,r)));
    
    vec3 color = ring1 + ring2 + ring3 + ring4 + ring5 + ring6 + ring7;
    color *= vec3(abs(sin(u_time * bpm + r/(20.))) * 2., abs(cos(u_time/2. + r)), abs(log(sin(u_time + r))));
    color = pow(color, vec3(abs(sin(u_time * bpm))) * 5.);
    gl_FragColor = vec4(color, 1.0);


    // =========================
	//       MOUSE TRAIL
	// =========================

	// vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	// vec4 color = texture2D(u_image, v_uv + vec2(0.0, -0.002));
	
	// vec2 center = (u_mouse.xy) / 2. + .5;
	// uv.x *= u_ratio;
	// center.x *= u_ratio;
	
	// color.r += circle(uv, center, 0.0, .08) * u_speed;
	// color.r = mix(color.r, 0.0, .009);
	// color.r = clamp(color.r, 0.0, 1.0);
	
	// color.g = color.r;
	
	// gl_FragColor = vec4(color, 1.0);


	// =========================
    //     ASCII CONVERSION
	// =========================

    vec3 col = vec3(gl_FragColor);
    uv = gl_FragCoord.xy;
    float gray = col.x;

    int n = u_n1;
	if (gray > 0.2) n = u_n2;
	if (gray > 0.3) n = u_n3;
	if (gray > 0.4) n = u_n4;
	if (gray > 0.5) n = u_n5;
	if (gray > 0.6) n = u_n6;
	if (gray > 0.7) n = u_n7;
	if (gray > 0.8) n = u_n8;

	vec2 p = mod(uv/4.0, 2.0) - vec2(1.0);
	if (u_mouse.z > 0.5)	col = gray*vec3(character(n, p));
	else col = vec3(character(n, p));

	gl_FragColor = vec4(col.x, col.y, col.z, 1.0);

}
`
