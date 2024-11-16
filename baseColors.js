// Orange gene only has two alleles: either there's orange, or there isn't.
// Therefore, there are only three possible options, depending on the dilution.
const ORANGE_COLOR_FAMILY = {
    BASE: [0.953, 0.667, 0.204], // Orange aka Red
    DILUTED: [0.984, 0.910, 0.784], // Cream
    DILUTED_MODIFIED: [0.980, 0.760, 0.176], // Apricot
};

// Black gene has three different alleles for different "shades" of black.
// Combined with the possible dilution options, this gives us
// a total of 3 x 3 = 9 colors.
const BLACK_COLOR_FAMILY = {
    BLACK: {
        BASE: [0.0, 0.0, 0.0], // Black
        DILUTED: [0.373, 0.369, 0.413], // Blue aka Grey
        DILUTED_MODIFIED: [0.788, 0.753, 0.694], // Caramel aka Blue-based caramel
    },
    CHOCOLATE: {
        BASE: [0.369, 0.239, 0.188], // Chocolate
        DILUTED: [0.686, 0.592, 0.628], // Lilac
        DILUTED_MODIFIED: [0.827, 0.8, 0.737], // Taupe aka Taupe-based caramel
    },
    CINNAMON: {
        BASE: [0.631, 0.428, 0.306], // Cinnamon
        DILUTED: [0.729, 0.624, 0.565], // Fawn
        DILUTED_MODIFIED: [0.875, 0.847, 0.784], // Fawn-based caramel
    },
};

function getBaseColors(locusB, locusD, locusDm) {
    let blackPalette;
    switch (locusB) {
        case LOCUS_B_OPTIONS.BLACK:
            blackPalette = BLACK_COLOR_FAMILY.BLACK;
            break;
        case LOCUS_B_OPTIONS.CHOCOLATE:
            blackPalette = BLACK_COLOR_FAMILY.CHOCOLATE;
            break;
        case LOCUS_B_OPTIONS.CINNAMON:
            blackPalette = BLACK_COLOR_FAMILY.CINNAMON;
    }

    if (locusD === LOCUS_D_OPTIONS.NON_DILUTE) {
        return {
            black: blackPalette.BASE,
            orange: ORANGE_COLOR_FAMILY.BASE,
        };
    } else {
        // Since locus D has only one other option, assuming the color is diluted
        if (locusDm === LOCUS_DM_OPTIONS.NOT_MODIFIED) {
            return {
                black: blackPalette.DILUTED,
                orange: ORANGE_COLOR_FAMILY.DILUTED,
            };
        } else {
            // Same thing - since there are only two options, assuming dilution
            // modifier is activated.
            return {
                black: blackPalette.DILUTED_MODIFIED,
                orange: ORANGE_COLOR_FAMILY.DILUTED_MODIFIED,
            };
        }
    }
}
