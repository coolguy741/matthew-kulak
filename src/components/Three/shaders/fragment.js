export const fragShader = `
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_texture;

varying vec2 v_uv;

void main(){
    vec3 color = texture2D(u_texture, v_uv).rgb;
	gl_FragColor = vec4( color, 1.0 );
}


`
