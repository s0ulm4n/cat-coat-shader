precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D uTexture;
uniform sampler2D uBodyMask;
uniform sampler2D uExtremitiesMask;

uniform vec3 uOrangeColor;
uniform vec3 uBlackColor;
uniform vec3 uEyeColor;

/**
* Locus B determines the intensity of the black/brown pigment.
* 0 - dominant black allele (B)
* 1 - brown (chocolate) allele (b), recessive to (B), dominant to (b')
* 2 - cinnamon allele variant (b'), recessive to both (B) and (b).
*
* Dominant O gene blocks production of black pigment.
*/
// uniform ivec2 uLocusB; // ✅

/**
* Locus O determines the production of yellow pigment.
* 0 - dominant orange allele (O)
* 1 - recessive non-orange allele (o)
*
* Orange gene is only present on the X chromosome, meaning that male cats will only have one copy of this gene.
*
* Orange pigment blocks black pigment from forming, so cats with dominant O gene won't develop any black color.
* Dominant O also blocks the effect of the recessive (a) non-aguti allele of Locus A (Agouti), meaning
* that *all* orange cats are tabby.
*
* (O/-) or (O/O) - full orange pigmentation
* (O/o) - tortoiseshell pigmentation (only possible in female cats, with extremely rare exceptions)
* (o/-) or (o/o) - no orange pigmentation
*/
uniform ivec2 uLocusO; // ✅

/**
* Locus D modifies the "normal" color and will wash out/dilute both orange and black pigment.
* 0 - dominant non-diluted allele (D)
* 1 - recessive diluted allele (d)
*/
// uniform ivec2 uLocusD; // ✅
/**
* "Dilution modification" gene is a separate gene that affects the dilution. In cats with the recessive
* dilution trait (d/d), (Dm) is a dominant trait that causes further dilution. The recessive allele doesn't
* have any effect. Dilution modification gene also has no effect in cats with the dominant (D/*) trait.
* 0 - dominant dilution modification allele (Dm)
* 1 - recessive inactive allele (dm)
*/
// uniform ivec2 uLocusDm; // ✅

/**
* "Agouti" gene controls whether or not the tabby pattern is exposed.
* 0 - dominant agouti allele (A). Causes the underlying tabby pattern to be exposed.
* 1 - recessive non-agouti allele (a). Hides the tabby pattern.
*
* (a/a) cats do not exhibit a tabby pattern, or exhibit very faint suggestions of one. This is the combination
* that solid black (or brown) cats have.
* However, cats with the dominant orange gene (O) will always exhibit tabby pattern, either on the entire body,
* or, in case of tortoiseshell cats, on the orange-colored parts. The pattern can be hard to notice though.
*/
// uniform ivec2 uLocusA; // ✅
/**
* Tabby gene controls the pattern of the coat. There are three alleles:
* 0 - "ticked" pattern allele (t_a). Dominant over all other alleles.
* 1 - "mackerel" pattern allele (t_m). Dominant over the classic pattern allele, recessive to (t_a).
* 2 - classic or "blotched" allele (t_b). Recessive to all other alleles.
*
* (t_a/*) - ticked pattern.
* (t_m/t_m) and (t_m/t_b) - mackerel pattern.
* (t_b/t_b) - blotched pattern.
*/
// uniform ivec2 uLocusT;
/**
* Spotted gene is directly connected to (t_m) allele. In mackerel tabby cats, it "breaks" the lines,
* creating a spotted pattern.
* 0 - dominant allele (Sp). Causes the mackerel pattern to become spotty.
* 1 - recessive allele (sp). Has no effect on the pattern.
*
* A spotted cat will have a (Sp/Sp) or (Sp/sp) genotype in this locus, along with at least one (t_m) allele
* and at least one (A) allele.
*/
// uniform ivec2 uLocusSp;

/**
* Locus C is the "master gene" for pigment formation. When the gene is active, both black and yellow
* pigments can be formed. When the gene is not active, no pigment can be formed.
* Recessive mutation produces an albino cat (c/c). However, there are several other mutations of the gene
* that result in *partial albinism*, or colorpoint.
* 0 - dominant full pigmentation allele (C)
* 1 - "Burmese" allele (c_b). Dominant to c, recessive to C, codominant with c_s.
* 2 - "Siamese" allele (c_s). Dominant to c, recessive to C, codominant with c_b.
* 3 - recessive albinism allele (c). Recessive to all other variations.
*
* (c/c) - full albino
* (c_s/c) or (c_s/c) - Siamese colorpoint aka Point (full albino on parts of the body, pigmented extremities)
* (c_s/c_b) - Tonkinese colorpoint aka Mink (very low pigmentation of the body, pigmented extremities)
* (c_b/c_b) or (c_b/c) - Burmese colorpoint aka Sepia (low pigmentation of the body, pigmented extremities)
* (C/*) - full pigmentation
*/
uniform ivec2 uLocusC; // ✅

/**
* White/white spotting gene.
* 0 - dominant white allele (W). Causes complete whiteness by disrupting melanin production.
* Overrides any other color gene. Also linked to blue eyes and deafness.
* 1 - dominant white spotting allele (S). Causes white spots.
* 2 - recessive non-white allele (w).
*
* (w/w) - non-white cats (unless albino).
* (S/S) and (S/w) - cats with white spots. (S/S) are likely to have over 50% of the body
* covered by white spots, (S/w) are likely to have less than 50%.
* (W/*) - fully white cats.
* The actual patterns of spots are complicated, and I am not going to figure them out.
*/
uniform ivec2 uLocusW; // ✅

const vec3 COLOR_WHITE = vec3(1.0);

// replace this by something better
float hash(vec2 p) {
    p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
    return - 1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
}
float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    // quintic interpolant
    vec2 u = f*f * f*(f * (f * 6.0 - 15.0) + 10.0);
    
    return mix(mix(hash(i + vec2(0.0, 0.0)),
    hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)),
    hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}
float whiteSpottingNoise(vec2 uv) {
    const vec4 C = vec4(
        0.211324865405187, // (3.0-sqrt(3.0))/6.0
        0.366025403784439, // 0.5*(sqrt(3.0)-1.0)
        - 0.577350269189626, // -1.0 + 2.0 * C.x
        0.024390243902439 // 1.0 / 41.0
    );
    vec2 i = floor(uv + dot(uv, C.yy));
    vec2 x0 = uv - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}
vec2 map(in vec2 p) {
    for(int i = 0; i < 4; i ++ )
    {
        float a = noise(p * 1.5) * 3.1415;
        p += 0.1 * vec2(cos(a), sin(a));
    }
    return p;
}

vec3 getTortoiseshellPattern(in vec2 uv, in vec3 orange, in vec3 black) {
    float f = 0.0;
    
    uv *= 8.0;
    mat2 m = mat2(1.6, 1.2, - 1.2, 1.6);
    f = 0.5000 * noise(uv); uv = m*uv;
    f += 0.2500 * noise(uv); uv = m*uv;
    f += 0.1250 * noise(uv); uv = m*uv;
    f += 0.0625 * noise(uv); uv = m*uv;
    
    f = 0.5 + 0.5 * f;
    
    return orange * f + black * (1.0 - f);
}

vec3 getBaseColor(in vec2 uv) {
    if (uLocusO[0] == 0 && uLocusO[1] == 0) {
        // Both orange alleles are dominant, no black will be present
        return uOrangeColor;
    }
    
    if (uLocusO[0] == 1 && uLocusO[1] == 1) {
        // Both orange alleles are recessive, no orange will be present.
        return uBlackColor;
    }
    
    // Otherwise, we're dealing with one dominant O and one recessive o,
    // which produces a tortoiseshell pattern.
    return getTortoiseshellPattern(uv, uOrangeColor, uBlackColor);
}

float getWhiteSpotting(in vec2 uv, in ivec2 locusW) {
    if (locusW[0] == 0 || locusW[1] == 0) {
        // Dominant W allele in locus W causes complete whiteness
        // regardless of any other color-related genes.
        return 0.0;
    }
    
    if (locusW[0] == 1 || locusW[1] == 1) {
        // Co-dominant allele S in locus W causes white spotting.
        vec2 pos = vec2(uv * 3.0);
        
        float DF = 0.5;
        
        // Add a random position
        DF += whiteSpottingNoise(pos) * 0.25;
        DF += whiteSpottingNoise(pos) * 0.25;
        
        return smoothstep(0.7, 0.75, fract(DF));
    }
    
    // Recessive allele in locus W does not affect coat color or pattern.
    return 1.0;
}

float getColorpoint(in vec2 uv, in ivec2 locusC) {
    if (locusC[0] == 0 || locusC[1] == 0) {
        // Dominant allele in locus C does not produce colorpoint
        return 1.0;
    }
    
    float d = distance(uv, vec2(0.5));
    return smoothstep(0.3, 0.5, d);
    // return d * d;
}

float getColorpointForNoseAndEars(in vec2 uv, in ivec2 locusC) {
    if (locusC[0] == 0 || locusC[1] == 0) {
        // Dominant allele in locus C does not produce colorpoint
        return 1.0;
    }
    
    float d = distance(uv, vec2(0.8, 0.25));
    return smoothstep(0.1, 0.3, d);
}

void main() {
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    
    vec4 tex = texture2D(uTexture, uv);
    vec4 bodyMask = texture2D(uBodyMask, uv);
    vec4 extremitiesMask = texture2D(uExtremitiesMask, uv);
    
    vec3 baseColor = getBaseColor(uv);
    float whiteness = getWhiteSpotting(uv, uLocusW);
    float colorpoint = getColorpoint(uv, uLocusC);
    float extrColorpoint = getColorpointForNoseAndEars(uv, uLocusC);
    
    vec3 bodyColor = tex.rgb;
    
    // Apply base color to the body
    bodyColor *= baseColor;
    // Apply white spotting (or make the entire body white)
    bodyColor = 1.0 - (whiteness * (1.0 - bodyColor) + (1.0 - whiteness) * tex.rgb * 0.05);
    // Apply colorpoint
    bodyColor = 1.0 - (colorpoint * (1.0 - bodyColor) + (1.0 - colorpoint) * tex.rgb * 0.05);
    // Apply the mask (only keep the color on the body)
    bodyColor.rgb = min(bodyColor.rgb, bodyMask.r);
    
    vec3 extrColor = tex.rgb;
    
    // Color ears and nose using base color
    extrColor *= baseColor * step(0.5, uv.x);
    // Apply whiteness on the ears and nose
    extrColor = 1.0 - (whiteness * (1.0 - extrColor) + (1.0 - whiteness) * tex.rgb * 0.05);
    // Apply colorpoint to the ears using a different function
    extrColor = 1.0 - (extrColorpoint * (1.0 - extrColor) + (1.0 - extrColorpoint) * tex.rgb * 0.05);
    // Color eyes using the eye color uniform
    extrColor += uEyeColor * tex.rgb * (1.0 - step(0.5, uv.x));
    // Apply the mask (only keep the color for extremities)
    extrColor.rgb = min(extrColor.rgb, extremitiesMask.r);
    
    vec3 color = bodyColor + extrColor;
    
    gl_FragColor = vec4(color, 1.0);
}
