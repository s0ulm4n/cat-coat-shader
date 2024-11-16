precision mediump float;

// Texcoords for drawing textures
varying vec2 vTexCoord;

// The texture image itself
uniform sampler2D uTexture;

uniform vec3 uEyeColor;

void main() {
    // By default, our texcoords will be upside down.
    // Flip them by inverting the y component.
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    
    // Access our image by using texture2D().
    // texture2D expects a reference to the texture image (sampler2D),
    // and texture coordinates as its input.
    vec4 tex = texture2D(uTexture, uv);
    
    vec4 color = vec4(tex.rgb * uEyeColor, 1.0);
    if (tex.g > tex.r + tex.b) {
        // HACK
        // I put the eye textures on a green background.
        // Here we're detecting when if the texel we're looking at has
        // a higher value in its green channel then the R and B channels
        // combined (indicating that it's probably the background), and in that
        // case outputting a color with every channel (including alpha) set to 0.
        color = vec4(0.0);
    }
    
    gl_FragColor = color;
}
