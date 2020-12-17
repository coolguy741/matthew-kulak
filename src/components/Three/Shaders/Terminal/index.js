export const termFrag = `
uniform vec2 u_resolution;
uniform float u_ratio;
uniform vec2 u_mouse;
uniform float u_time;
uniform int u_n1;
uniform int u_n2;
uniform float u_bw1;
uniform float u_bw2;
uniform float u_slider;
uniform sampler2D u_noise;

float random(in float x){
    return fract(sin(x) * 4.);
}

float random(in vec2 st){
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 4.) * 0.8;
}

float randomChar(in vec2 outer,in vec2 inner){
    float grid = 5.;
    vec2 margin = vec2(0.2,0.05);
    float seed = u_slider;
    vec2 borders = step(margin,inner)*step(margin,1.-inner);
    return step(.5,random(outer*seed+floor(inner*grid))) * borders.x * borders.y;
}

vec3 matrix(in vec2 st){
    float rows = 160.0 / u_slider;
    vec2 ipos = floor(st*rows)+vec2(1.,0.);

    ipos += vec2(.0,floor(u_time*18.*random(ipos.x)));

    vec2 fpos = fract(st*rows);
    vec2 center = (.5-fpos);

    float pct = random(ipos);

    return vec3(0, randomChar(ipos,fpos) * pct/1.8, 0.);
}

void main(){
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.y *= u_resolution.y/u_resolution.x;

    gl_FragColor = vec4(.125, .125, .125, 0.);

	gl_FragColor += vec4(matrix(st),1.0);
}
`
