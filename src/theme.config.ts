import { extendTheme } from "@mui/joy/styles";

const themeColor = {
    "h": 218,
    "s": 85,
    "l": 50
};

function hslToRgbHex(h: number, s: number, l: number): string {
    // HSLの値を適切な範囲に正規化
    h = h % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        [r, g, b] = [c, x, 0];
    } else if (60 <= h && h < 120) {
        [r, g, b] = [x, c, 0];
    } else if (120 <= h && h < 180) {
        [r, g, b] = [0, c, x];
    } else if (180 <= h && h < 240) {
        [r, g, b] = [0, x, c];
    } else if (240 <= h && h < 300) {
        [r, g, b] = [x, 0, c];
    } else if (300 <= h && h < 360) {
        [r, g, b] = [c, 0, x];
    }

    // RGB値を0-255の範囲に変換し、16進数にフォーマット
    const toHex = (value: number) => {
        return Math.round((value + m) * 255).toString(16).padStart(2, "0");
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
const theme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "primary": {
                    // "50": "#EDF5FD", // hsl(210, 80%, 96%)
                    // "100": "#E3EFFB", // hsl(210, 75%, 94%)
                    // "200": "#C7DFF7", // hsl(210, 75%, 87%)
                    // "300": "#97C3F0", // hsl(210, 75%, 77%)
                    // "400": "#4393E4", // hsl(210, 75%, 58%)
                    // "500": "#0B6BCB", // hsl(210, 90%, 42%)
                    // "600": "#185EA5", // hsl(210, 75%, 37%)
                    // "700": "#12467B", // hsl(210, 75%, 28%)
                    // "800": "#0A2744", // hsl(210, 75%, 15%)
                    // "900": "##051423" // hsl(210, 75%, 8%)
                    "50": hslToRgbHex(themeColor.h, themeColor.s, 96),
                    "100": hslToRgbHex(themeColor.h, themeColor.s, 94),
                    "200": hslToRgbHex(themeColor.h, themeColor.s, 87),
                    "300": hslToRgbHex(themeColor.h, themeColor.s, 77),
                    "400": hslToRgbHex(themeColor.h, themeColor.s, 58),
                    "500": hslToRgbHex(themeColor.h, themeColor.s, 42),
                    "600": hslToRgbHex(themeColor.h, themeColor.s, 37),
                    "700": hslToRgbHex(themeColor.h, themeColor.s, 28),
                    "800": hslToRgbHex(themeColor.h, themeColor.s, 15),
                    "900": hslToRgbHex(themeColor.h, themeColor.s, 8)
                }
            }
        }
    }
});

export default theme;