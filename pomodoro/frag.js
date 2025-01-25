const frag = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
varying vec2 v_texcoord;

vec4 rgb(float r, float g, float b) {
    return vec4(r / 255.0, g / 255.0, b / 255.0, 1.0);
}

void main() {
    vec2 uv = v_texcoord;
    vec4 tl = rgb(247.0, 201.0, 253.0);
    vec4 tr = rgb(145.0, 190.0, 230.0);
    vec4 bl = rgb(195.0, 214.0, 196.0);
    vec4 br = rgb(147.0, 161.0, 211.0);

    float dispX = 0.5 * sin(u_time);
    float dispY = 0.5 * sin(u_time * 0.25);

    gl_FragColor = mix(
        mix(tl, tr, uv.x + dispX),
        mix(bl, br, uv.x - dispX),
        uv.y + dispY
    );
}`;
