export const termFrag = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_ratio;
uniform int u_n1;
uniform int u_n2;
uniform float u_speed;
uniform float u_slider;
uniform sampler2D u_trail;

varying vec2 v_uv;
varying vec3 v_position;

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

float sdPyramid( vec3 p, float h)
{
  float m2 = h*h + 0.25;

  p.xz = abs(p.xz);
  p.xz = (p.z>p.x) ? p.zx : p.xz;
  p.xz -= 0.5;

  vec3 q = vec3( p.z, h*p.y - 0.5*p.x, h*p.x + 0.5*p.y);

  float s = max(-q.x,0.0);
  float t = clamp( (q.y-0.5*p.z)/(m2+0.25), 0.0, 1.0 );

  float a = m2*(q.x+s)*(q.x+s) + q.y*q.y;
  float b = m2*(q.x+0.5*t)*(q.x+0.5*t) + (q.y-m2*t)*(q.y-m2*t);

  float d2 = min(q.y,-q.x*m2-q.y*0.5) > 0.0 ? 0.0 : min(a,b);

  return sqrt( (d2+q.z*q.z)/m2 ) * sign(max(q.z,-p.y));
}

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
}

void main() {

    vec2 uv = (gl_FragCoord.xy - .5 * u_resolution.xy) / u_resolution.y;

    vec3 ro = vec3(0., .5, -.8);
    vec3 lookat = vec3(0.);
    float zoom = .5;
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
        dS = sdPyramid(p, .5);
        if (dS<.001) break;
        dO += dS;
    }

    vec3 col = vec3(.125);

    if (dS<.001) {
        float x = atan(p.x, p.z) + t;
        float y = atan(length(p.xz) - 1., p.y);

        float bands = sin(y * 20. + x * 10.);
        float ripples = sin((x * 15. - y * 15.) * 2.) * .5 + .5;
        float waves = sin(x * 2. - y * 100. + t * 30.);

        float b1 = smoothstep(0., 1., bands);
        float b2 = smoothstep(-.1, .1, bands - .1);

        float m = b1 * (1. - b2);
        m = max(m, ripples);

        rd = rotate(rd, vec3(0., 1., 0.), u_time);

        col.g += m;

        col.g -= abs(uv.x);
        col.g = max(.125, col.g);
        // col.g = max(col.g, 1.);
    }

    col = clamp(col, 0., 1.);

    // uv = gl_FragCoord.xy;

	// float gray = col.g;
	// int n = u_n1;
	// if (gray <= 0.) n = u_n2;
	// vec2 p2 = mod(uv/5.0, 2.0) - vec2(1.0);
	// // col = gray*vec3(character(n, p2));
	// col = col*character(n, p2);

    // gl_FragColor = vec4(col ,1.0);
}
`
