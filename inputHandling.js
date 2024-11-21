// All of the radio button group captions
let locusBText; let locusOText; let locusDText; let locusDmText; let locusAText;
let locusTText; let locusSpText; let locusCText; let locusWText;

// All of the radio button groups
let locusBRadio; let locusORadio; let locusDRadio; let locusDmRadio; let locusARadio;
let locusTRadio; let locusSpRadio; let locusCRadio; let locusWRadio;

function createRadioButtons() {
    locusBText = createP("<b>Locus B</b>: black pigment");
    locusBText.position(815, 0);

    locusBRadio = createRadio("locus-b");
    locusBRadio.position(810, 35);
    locusBRadio.option(LOCUS_B_OPTIONS.BLACK, "(B/*): Black");
    locusBRadio.option(LOCUS_B_OPTIONS.CHOCOLATE, "(b/b) or (b/b'): Chocolate");
    locusBRadio.option(LOCUS_B_OPTIONS.CINNAMON, "(b'/b'): Cinnamon");
    locusBRadio.selected(LOCUS_B_OPTIONS.BLACK);

    locusOText = createP("<b>Locus O</b>: orange pigment");
    locusOText.position(815, 50);

    locusORadio = createRadio("locus-o");
    locusORadio.position(810, 85);
    locusORadio.option(LOCUS_O_OPTIONS.ORANGE, "(O/O) or (O): Orange");
    locusORadio.option(LOCUS_O_OPTIONS.TORTOISESHELL, "(O/o): Mix (XX only)");
    locusORadio.option(LOCUS_O_OPTIONS.NON_ORANGE, "(o/o) or (o): No orange");
    locusORadio.selected(LOCUS_O_OPTIONS.ORANGE);

    locusDText = createP("<b>Locus D</b>: pigment dilution");
    locusDText.position(815, 100);

    locusDRadio = createRadio("locus-d");
    locusDRadio.position(810, 135);
    locusDRadio.option(LOCUS_D_OPTIONS.NON_DILUTE, "(D/*): No dilution");
    locusDRadio.option(LOCUS_D_OPTIONS.DILUTE, "(d/d): Dilution");
    locusDRadio.selected(LOCUS_D_OPTIONS.NON_DILUTE);

    locusDmText = createP("<b>Locus Dm</b>: dilution modifier");
    locusDmText.position(815, 140);

    locusDmRadio = createRadio("locus-dm");
    locusDmRadio.position(810, 175);
    locusDmRadio.option(LOCUS_DM_OPTIONS.MODIFIED, "(Dm/*): Modified dilution");
    locusDmRadio.option(LOCUS_DM_OPTIONS.NOT_MODIFIED, "(dm/dm): No dilution modification");
    locusDmRadio.selected(LOCUS_DM_OPTIONS.NOT_MODIFIED);

    locusAText = createP("<b>Locus A</b>: agouti gene");
    locusAText.position(815, 190);

    locusARadio = createRadio("locus-a");
    locusARadio.position(810, 225);
    locusARadio.option(LOCUS_A_OPTIONS.AGOUTI, "(A/*): Tabby pattern visible");
    locusARadio.option(LOCUS_A_OPTIONS.NON_AGOUTI, "(a/a): Tabby pattern invisible or very faint");
    locusARadio.selected(LOCUS_A_OPTIONS.NON_AGOUTI);

    locusTText = createP("<b>Locus T</b>: tabby gene");
    locusTText.position(815, 230);

    locusTRadio = createRadio("locus-t");
    locusTRadio.position(810, 265);
    locusTRadio.option(LOCUS_T_OPTIONS.TICKED, "(Ta/*): Ticked pattern");
    locusTRadio.option(LOCUS_T_OPTIONS.MACKEREL, "(Tm/Tm) or (Tm/Tb): Mackerel pattern");
    locusTRadio.option(LOCUS_T_OPTIONS.BLOTCHED, "(Tb/Tb): Classic/blotched pattern");
    locusTRadio.selected(LOCUS_T_OPTIONS.MACKEREL);

    locusSpText = createP("<b>Locus Sp</b>: spotted gene (mackerel pattern modifier)");
    locusSpText.position(815, 270);

    locusSpRadio = createRadio("locus-sp");
    locusSpRadio.position(810, 305);
    locusSpRadio.option(LOCUS_SP_OPTIONS.SPOTTED, "(Sp/*): Mackerel -> Spotty");
    locusSpRadio.option(LOCUS_SP_OPTIONS.NOT_SPOTTED, "(sp/sp): No effect");
    locusSpRadio.selected(LOCUS_SP_OPTIONS.NOT_SPOTTED);

    locusCText = createP("<b>Locus C</b>: colorpoint");
    locusCText.position(815, 320);

    locusCRadio = createRadio("locus-c");
    locusCRadio.position(810, 355);
    locusCRadio.option(LOCUS_C_OPTIONS.NO_COLORPOINT, "(C/*): Full pigmentation");
    locusCRadio.option(LOCUS_C_OPTIONS.SEPIA, "(c_b/c_b) or (c_b/c): Burmese colorpoint (Sepia)");
    locusCRadio.option(LOCUS_C_OPTIONS.MINK, "(c_b/c_s): Tonkinese colorpoint (Mink)");
    locusCRadio.option(LOCUS_C_OPTIONS.POINT, "(c_s/c_s) or (c_s/c): Siamese colorpoint (Point)");
    locusCRadio.option(LOCUS_C_OPTIONS.ALBINISM, "(c/c): Full albinism");
    locusCRadio.selected(LOCUS_C_OPTIONS.NO_COLORPOINT);

    locusWText = createP("<b>Locus W</b>: white/white spotting gene");
    locusWText.position(815, 390);

    locusWRadio = createRadio("locus-w");
    locusWRadio.position(810, 425);
    locusWRadio.option(LOCUS_W_OPTIONS.EPISTATIC, "(W/W): Epistatic white");
    locusWRadio.option(LOCUS_W_OPTIONS.SPOTTING, "(S/w) or (S/S): White spotting");
    locusWRadio.option(LOCUS_W_OPTIONS.NO_WHITE, "(w/w): No white (unless albinism/colorpoint)");
    locusWRadio.selected(LOCUS_W_OPTIONS.NO_WHITE);
}

function calculateUniforms() {
    const colors = getBaseColors(
        locusBRadio.value(),
        locusDRadio.value(),
        locusDmRadio.value(),
    );

    let locusBValue;
    switch (locusBRadio.value()) {
        case LOCUS_B_OPTIONS.BLACK:
            locusBValue = [0, 0];
            break;
        case LOCUS_B_OPTIONS.CHOCOLATE:
            locusBValue = [1, 1];
            break;
        case LOCUS_B_OPTIONS.CINNAMON:
            locusBValue = [2, 2];
    }

    let locusOValue;
    switch (locusORadio.value()) {
        case LOCUS_O_OPTIONS.ORANGE:
            locusOValue = [0, 0];
            break;
        case LOCUS_O_OPTIONS.TORTOISESHELL:
            locusOValue = [0, 1];
            break;
        case LOCUS_O_OPTIONS.NON_ORANGE:
            locusOValue = [1, 1];
    }

    let locusAValue;
    switch (locusARadio.value()) {
        case LOCUS_A_OPTIONS.AGOUTI:
            locusAValue = [0, 0];
            break;
        case LOCUS_A_OPTIONS.NON_AGOUTI:
            locusAValue = [1, 1];
    }

    let locusTValue;
    switch (locusTRadio.value()) {
        case LOCUS_T_OPTIONS.TICKED:
            locusTValue = [0, 0];
            break;
        case LOCUS_T_OPTIONS.MACKEREL:
            locusTValue = [1, 1];
            break;
        case LOCUS_T_OPTIONS.BLOTCHED:
            locusTValue = [2, 2];
    }


    let locusSpValue;
    switch (locusSpRadio.value()) {
        case LOCUS_SP_OPTIONS.SPOTTED:
            locusSpValue = [0, 0];
            break;
        case LOCUS_SP_OPTIONS.NOT_SPOTTED:
            locusSpValue = [1, 1];
    }

    let locusCValue;
    switch (locusCRadio.value()) {
        case LOCUS_C_OPTIONS.NO_COLORPOINT:
            locusCValue = [0, 0];
            break;
        case LOCUS_C_OPTIONS.SEPIA:
            locusCValue = [1, 1];
            break;
        case LOCUS_C_OPTIONS.MINK:
            locusCValue = [1, 2];
            break;
        case LOCUS_C_OPTIONS.POINT:
            locusCValue = [2, 2];
            break;
        case LOCUS_C_OPTIONS.ALBINISM:
            locusCValue = [3, 3];
    }

    let locusWValue;
    switch (locusWRadio.value()) {
        case LOCUS_W_OPTIONS.EPISTATIC:
            locusWValue = [0, 0];
            break;
        case LOCUS_W_OPTIONS.SPOTTING:
            locusWValue = [1, 1];
            break;
        case LOCUS_W_OPTIONS.NO_WHITE:
            locusWValue = [2, 2];
    }

    return {
        uOrangeColor: colors.orange,
        uBlackColor: colors.black,
        uLocusB: locusBValue,
        uLocusO: locusOValue,
        uLocusA: locusAValue,
        uLocusT: locusTValue,
        uLocusSp: locusSpValue,
        uLocusC: locusCValue,
        uLocusW: locusWValue,
    };
}

function checkLocusInterdependence() {
    _enableRadioButton(locusORadio);
    _enableRadioButton(locusDRadio);
    _enableRadioButton(locusDmRadio);
    _enableRadioButton(locusARadio);
    _enableRadioButton(locusTRadio);
    _enableRadioButton(locusSpRadio);
    _enableRadioButton(locusCRadio);
    _enableRadioButton(locusBRadio);

    if (locusWRadio.value() === LOCUS_W_OPTIONS.EPISTATIC) {
        // Epistatic white allele completely overrides ANY other color and/or pattern.
        locusBRadio.disable(true);
        locusORadio.disable(true);
        locusDRadio.disable(true);
        locusDmRadio.disable(true);
        locusARadio.disable(true);
        locusTRadio.disable(true);
        locusSpRadio.disable(true);
        locusCRadio.disable(true);
    } else {
        if (locusORadio.value() === LOCUS_O_OPTIONS.ORANGE) {
            // (O/O) or (O) genotype completely replaces black pigmentation.
            locusBRadio.disable(true);

            // Dominant orange (O) is also epistatic over the (a/a) genotype - 
            // all orange cats are agouti.
            locusARadio.selected(LOCUS_A_OPTIONS.AGOUTI);
            locusARadio.disable(true);
        }

        if (locusDRadio.value() === LOCUS_D_OPTIONS.NON_DILUTE) {
            // Dilute modifier gene only matters if the cat has the recessive (d/d) genotype.
            locusDmRadio.disable(true);
        }

        if (locusTRadio.value() !== LOCUS_T_OPTIONS.MACKEREL) {
            // Spotted gene doesn't affect tabby patterns other than mackerel
            locusSpRadio.disable(true);
        }
    }
}

function _enableRadioButton(radio) {
    for (const radioInput of radio._getOptionsArray()) {
        radioInput.removeAttribute('disabled');
    }
}
