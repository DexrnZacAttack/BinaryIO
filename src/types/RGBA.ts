/** can be RGB or RGBA. */
export interface RGBA {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}

export function RGBAtoRGBColor(rgba: RGBA): RGBColor {
    return new RGBColor(rgba.red, rgba.green, rgba.blue, rgba.alpha);
}

export class RGBColor implements RGBA {
    /**
     * RGB(A) color class, allows for RGB(A) colors to be converted to a Number, among other things.
     * Internally always RGBA.
     * @param red
     * @param green
     * @param blue 
     * @param alpha 
     */
    constructor(public red: number, public green: number, public blue: number, public alpha?: number) {}

    /**
     * Converts an RGB(A) value to a Number.
     * @returns Number from RGB(A) value
     */
    toNumber(): number {
        return (this.red << 24) | (this.green << 16) | (this.blue << 8) | (this.alpha !== undefined ? this.alpha : 255);
    }

    /**
     * Converts an RGB(A) value to an RGBA interface.
     * @returns RGBA interface from RGB(A) value
     */
    toRGBAInterface(): RGBA {
        return {red: this.red, green: this.green, blue: this.blue, alpha: this.alpha};
    }
}

/** RGB pixel formats */
export enum RGBFormat {
    RGB = "RGB",
    RGBA = "RGBA",
    ARGB = "ARGB",
    BGR = "BGR",
    BGRA = "BGRA",
    ABGR = "ABGR",
    GBR = "GBR",
    GBRA = "GBRA",
    AGBR = "AGBR",
    GRB = "GRB",
    GRBA = "GRBA",
    AGRB = "AGRB"
}