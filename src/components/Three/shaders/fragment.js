export const fragShader = `

#define depth 35.
#define velPropagation 5.5
#define dampening .98

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;
uniform sampler2D u_image;
uniform sampler2D u_disp;

varying vec2 v_uv;
varying vec3 v_position;

float character(int n, vec2 p)
{
	p = floor(p*vec2(4.0, -4.0) + 2.5);
    if (clamp(p.x, 0.0, 4.0) == p.x)
	{
        if (clamp(p.y, 0.0, 4.0) == p.y)
		{
        	int a = int(round(p.x) + 5.0 * round(p.y));
			if (((n >> a) & 1) == 1) return 0.0;
		}
    }
	return 1.0;
}

void main()
{
    vec2 q = gl_FragCoord.xy/(u_resolution.xy);

    vec4 c = vec4(0.,0.,0.,1.);

    vec4 disp = texture2D(u_disp, v_uv);

    vec2 dispUV = vec2(
        v_uv.x,
        v_uv.y
    );

    dispUV.y = mix(v_uv.y, disp.r - 0.2, sin(u_time/2.)/8.);

    vec4 color = texture2D(u_image, dispUV);

    gl_FragColor = vec4(color);

    //Making it Ascii
    vec3 col = vec3(gl_FragColor);
    vec2 uv = gl_FragCoord.xy;
    float gray = col.x;

    int n = 11512810;             // #
	if (gray > 0.2) n = 13199452; // @
	if (gray > 0.3) n = 15252014; // 8
	if (gray > 0.4) n = 23385164; // &
	if (gray > 0.5) n = 15255086; // o
	if (gray > 0.6) n = 332772;   // *
	if (gray > 0.7) n = 65600;    // :
	if (gray > 0.8) n = 4096;     // .
    
    // int n = 4096;                 // .
	// if (gray > 0.2) n = 65600;    // :
	// if (gray > 0.3) n = 332772;   // *
	// if (gray > 0.4) n = 15255086; // o
	// if (gray > 0.5) n = 23385164; // &
	// if (gray > 0.6) n = 15252014; // 8
	// if (gray > 0.7) n = 13199452; // @
	// if (gray > 0.8) n = 11512810; // #

	vec2 p = mod(uv/4.0, 2.0) - vec2(1.0);
	if (u_mouse.z > 0.5)	col = gray*vec3(character(n, p));
	else col = vec3(character(n, p));

	gl_FragColor = vec4(col.x, col.x, col.x, 1.0);

}
`
