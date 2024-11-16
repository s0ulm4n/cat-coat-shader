// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D uTexture;

uniform vec3 uOrangeColor;
uniform vec3 uBlackColor;

/**
* Locus B determines the intensity of the black/brown pigment.
* 0 - dominant black allele (B)
* 1 - brown (chocolate) allele (b), recessive to (B), dominant to (b')
* 2 - cinnamon allele variant (b'), recessive to both (B) and (b).
*
* Dominant O gene blocks production of black pigment.
*/
uniform ivec2 uLocusB; // ✅

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
uniform ivec2 uLocusA; // ✅
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
uniform ivec2 uLocusT;
/**
* Spotted gene is directly connected to (t_m) allele. In mackerel tabby cats, it "breaks" the lines,
* creating a spotted pattern.
* 0 - dominant allele (Sp). Causes the mackerel pattern to become spotty.
* 1 - recessive allele (sp). Has no effect on the pattern.
*
* A spotted cat will have a (Sp/Sp) or (Sp/sp) genotype in this locus, along with at least one (t_m) allele
* and at least one (A) allele.
*/
uniform ivec2 uLocusSp;

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

// Non-diluted black pigmentation
// const vec3 COLOR_BLACK = vec3(0.0);
// const vec3 COLOR_CHOCOLATE = vec3(0.369, 0.239, 0.188);
// const vec3 COLOR_CINNAMON = vec3(0.631, 0.428, 0.306);
// // Diluted black pigmentation
// const vec3 COLOR_BLUE = vec3(0.373, 0.369, 0.413); // aka Gray
// const vec3 COLOR_LILAC = vec3(0.686, 0.592, 0.628);
// const vec3 COLOR_FAWN = vec3(0.729, 0.624, 0.565);
// // Double dilution (dilution + dilution modifier)
// const vec3 COLOR_CARAMEL = vec3(0.788, 0.753, 0.694); // aka Blue-based caramel
// const vec3 COLOR_TAUPE = vec3(0.827, 0.8, 0.737); // aka Taupe-based caramel
// const vec3 COLOR_FAWN_CARAMEL = vec3(0.875, 0.847, 0.784);

// // Orange pigmentation
// const vec3 COLOR_ORANGE = vec3(0.953, 0.667, 0.204); // aka Red
// const vec3 COLOR_CREAM = vec3(0.984, 0.910, 0.784); // diluted Orange
// const vec3 COLOR_APRICOT = vec3(0.980, 0.760, 0.176); // double-diluted Orange

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

// TODO: diluted colors are a bit too bright
// vec3 getColorDilution(in vec3[3]colorFamily, in ivec2 locusD, in ivec2 locusDm) {
    //     bool hasDominantDilutionAllele = false;
    //     if (locusD[0] == 0 || locusD[1] == 0) {
        //         hasDominantDilutionAllele = true;
    //     }
    
    //     bool hasDominantDilutionModificationAllele = false;
    //     if (locusDm[0] == 0 || locusDm[1] == 0) {
        //         hasDominantDilutionModificationAllele = true;
    //     }
    
    //     if (hasDominantDilutionAllele) {
        //         // Dominant allele in locus D is non-diluted
        //         return colorFamily[0];
    //     } else if (!hasDominantDilutionModificationAllele) {
        //         // Recessive alleles in locus D result in dilution,
        //         // but the recessive allele in locus Dm has no effect.
        //         return colorFamily[1];
    //     } else {
        //         // Recessive allele in locus D is further modified by the
        //         // dominant allele in locus Dm.
        //         return colorFamily[2];
    //     }
// }

// TODO: the pattern looks less like a cat and more like orange fog.
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

vec3 getBaseColor(
    in vec2 uv
    // in ivec2 locusB,
    // in ivec2 locusO,
    // in ivec2 locusD,
    // in ivec2 locusDm
) {
    // vec3 orangeColorFamily[3];
    // orangeColorFamily[0] = COLOR_ORANGE;
    // orangeColorFamily[1] = COLOR_CREAM;
    // orangeColorFamily[2] = COLOR_APRICOT;
    // vec3 orange = getColorDilution(orangeColorFamily, locusD, locusDm);
    
    if (uLocusO[0] == 0 && uLocusO[1] == 0) {
        // Both orange alleles are dominant, no black will be present
        return uOrangeColor;
    }
    
    // vec3 blackColorFamily[3];
    // if (locusB[0] == 0 || locusB[1] == 0) {
        //     // Dominant black allele is present
        //     blackColorFamily[0] = COLOR_BLACK;
        //     blackColorFamily[1] = COLOR_BLUE;
        //     blackColorFamily[2] = COLOR_CARAMEL;
    // } else if (locusB[0] == 1 || locusB[1] == 1) {
        //     // Dominant black allele isn't present, but chocolate allele is
        //     // present (and it's dominant over cinnamon allele)
        //     blackColorFamily[0] = COLOR_CHOCOLATE;
        //     blackColorFamily[1] = COLOR_LILAC;
        //     blackColorFamily[2] = COLOR_TAUPE;
    // } else {
        //     // Both locus B alleles are recessive cinnamon
        //     blackColorFamily[0] = COLOR_CINNAMON;
        //     blackColorFamily[1] = COLOR_FAWN;
        //     blackColorFamily[2] = COLOR_FAWN_CARAMEL;
    // }
    // vec3 black = getColorDilution(blackColorFamily, locusD, locusDm);
    
    if (uLocusO[0] == 1 && uLocusO[1] == 1) {
        // Both orange alleles are recessive, no orange will be present.
        return uBlackColor;
    }
    
    // Otherwise, we're dealing with one dominant O and one recessive o,
    // which produces a tortoiseshell pattern.
    return getTortoiseshellPattern(uv, uOrangeColor, uBlackColor);
}

// TODO: Spotting looks horrible with tabby
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

// TODO: Tweak the values to get darker corners
// TODO: introduce other variants of colorpoint
float getColorpoint(in vec2 uv, in ivec2 locusC) {
    if (locusC[0] == 0 || locusC[1] == 0) {
        // Dominant allele in locus C does not produce colorpoint
        return 1.0;
    }
    
    float d = distance(uv, vec2(0.5));
    return smoothstep(0.3, 0.8, d);
    return d * d;
}

// float getTabbyPattern(
    //     in vec2 uv,
    //     in ivec2 locusA,
    //     in ivec2 locusT,
    //     in ivec2 locusSP,
    //     in ivec2 locusO
// ) {
    //     const int AA = 2;
    
    //     if (locusA[0] == 0 || locusA[1] == 0 || locusO[0] == 0 || locusO[1] == 0) {
        //         // The dominant allele in the Agouti gene makes the pattern manifest
        //         // The dominant allele in the Orange locus enforces the pattern
        //         // even if the dominant A allele isn't present!
        
        //         float tot = 0.0;
        //         for(int m = 0; m < AA; m ++ )
        //         for(int n = 0; n < AA; n ++ )
        //         {
            //             vec2 o = vec2(float(m), float(n)) / float(AA) - 0.5;
            //             vec2 p = (1.4 * (gl_FragCoord.xy + o) - uResolution.xy) / uResolution.y;
            
            //             // deformation
            //             vec2 q = map(p);
            //             //vec2 q = vec2(1.0,0.0);
            
            //             // color
            //             float w = 6.0 * q.x;
            //             float u = floor(w);
            //             float f = fract(w);
            //             // float col = sin(3.0 * u + 1.0);
            //             float col = clamp(sin(3.0 * u + 1.0), 0.6, 0.9);
            
            //             tot += col;
        //         }
        //         tot /= float(AA * AA);
        
        //         return tot;
    //     }
    
    //     return 1.0;
// }

// TODO: I think I need more rules about which functions get called based on
// the inputs. For example, tabby pattern shouldn't be applied on top of
// the white spots.
void main() {
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    
    vec4 tex = texture2D(uTexture, uv);
    vec3 color = tex.rgb;
    
    color *= getBaseColor(
        uv
        // uLocusB,
        // uLocusO,
        // uLocusD,
        // uLocusDm
    );
    
    color = 1.0 - getWhiteSpotting(uv, uLocusW) * (1.0 - color);
    
    color = 1.0 - getColorpoint(uv, uLocusC) * (1.0 - color);
    
    // // This needs to be a lot less extreme.
    // // The variation in color should be relatively minimal.
    // // Also, ideally the stripes themselves shouldn't be solid, but
    // // a little hazy instead.
    // if (color.r + color.g + color.b < 2.9) { // - this is a bad way of doing this!
        //     color = color * getTabbyPattern(uv, uLocusA, uLocusT, uLocusSp, uLocusO);
    // }
    
    gl_FragColor = vec4(color, 1.0);
}

