## P5 sketch: genetically accurate cat coat coloration modeling

This is an attempt to use the information I learned about cat genetics to create a texture for a 3D model of a cat using information about its genetics.

### Brief explanation of the input
The inputs for this sketch are broken into several "loci". Each locus represents a part of a chromosome containing a genetic marker for a particular trait (or combination of traits).
To learn more about the genetic aspect, check out the [Wikipedia article](https://en.wikipedia.org/wiki/Cat_coat_genetics) (the main source of information for this model).

Brief description of the genes used by the model:
* **Locus B**: determines the intensity of the black/brown pigmentation.
  * Has three alleles: dominant black (B), chocolate (b) and cinnamon (b').
  * Dominance: (B) > (b) > (b').
* **Locus O**: determines the intensity of the red/yellow pigmentation.
  * Dominant (O) - has orange color. Recessive (o) - no orange color.
  * Orange gene is only present on the X chromosome.
  * Epistatic over recessive (a/a) non-agouti genotype in locus A.
* **Locus D**: base color dilution.
  * Dominant (D) - no dilution. Recessive (d) - lightens the base color.
* **Locus Dm**: dilution modifier.
  * Dominant (Dm) - enhances the effect of the dominant (D) allele in locus D, further brightening the color. Recessive (d) - no effect.
  * Only manifests if the cat has (d/d) genotype in locus D.
* **Locus A**: agouti factor (visibility of the tabby pattern)
  * Dominant (A) - pattern visible. Recessive (a) - pattern not visible.
* **Locus T**: pattern type.
  * (Ta) - ticked pattern. (Tm) - mackerel pattern. (Tb) - classic/blotched pattern.
  * Dominance: (Ta) > (Tm) > (Tb).
* **Locus Sp**: "spotted" modified. Modifies the mackerel pattern, turning stripes into spots.
  * Dominant (Sp) causes the mackerel pattern to become spotty. Recessive (sp) has no effect.
  * Only manifests if the cat has (Tm/Tm) or (Tm/Tb) genotype in locus T.
* **Locus C**: colorpoint.
  * Dominant (C) - full pigmentation (no colorpoint). Co-dominant (Cs) and (Cb) - different versions of colorpoint (Siamese and Burmese). Recessive (c) - full albinism.
* **Locus W**: epistatic white/white spotting.
  * Dominant (W) - fully white cat (completely blocking skin and fur pigmentation). Co-dominant (S) - white spotting. Recessive (w) - no white.
  * Dominant (W) is epistatic over any other color genes.
  * In addition to whiteness, (W) often manifests in blue eyes and congenital deafness.

### 3D model and textures
* https://free3d.com/3d-model/cat-v1--522281.html
* https://free3d.com/3d-model/cat-v1--326682.html
