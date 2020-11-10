export const fragShader = `
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_image;
uniform sampler2D u_disp;

varying vec2 v_uv;

void main(){
    vec4 disp = texture2D(u_disp, v_uv);

    vec2 dispUV = vec2(
        v_uv.x,
        v_uv.y
    );

    dispUV.y = mix(v_uv.y, disp.r - 0.2, sin(u_time / 2.)*0.03);

    vec4 color = texture2D(u_image, dispUV);

    color.r = texture2D(u_image, dispUV + vec2(0. , .005) * sin(u_time / 2.)).r;
    color.g = texture2D(u_image, dispUV + vec2(0. , .01) * sin(u_time / 2.)).g;
    color.b = texture2D(u_image, dispUV + vec2(0. , .02) * sin(u_time / 2.)).b;

	gl_FragColor = vec4( color );
}
`
