import {hashString} from "./functionName.js";

/**
 * Generate terminal color codes based on a string
 * @param str - Input string
 * @returns ANSI color code string
 */
export function getTerminalColors(str: string): string {
    if (use256Colors) {
        const colorCode = 16 + (hashString(str) % 240);
        return `\x1b[38;5;${colorCode}m`;
    } else {
        const baseColors = [
            '\x1b[31m', // Red
            '\x1b[32m', // Green
            '\x1b[33m', // Yellow
            '\x1b[34m', // Blue
            '\x1b[35m', // Magenta
            '\x1b[36m', // Cyan
            '\x1b[91m', // Bright Red
            '\x1b[92m'  // Bright Green
        ];
        const colorIndex = hashString(str) % baseColors.length;
        return baseColors[colorIndex];
    }
}


/**
 * Check if the terminal supports 256 colors
 * @returns boolean
 */
function supports256Colors(): boolean {
    if (!isNodeEnvironment) return false;

    const env = process.env;
    if (env.COLORTERM === 'truecolor' || env.COLORTERM === '24bit') {
        return true;
    }

    const term = process.env.TERM || '';
    return term.includes('256') || term.includes('xterm');
}

/**
 * Generate a hex color code based on a string
 * @param str - Input string
 * @returns Hex color string
 */
export function getHexaColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += value.toString(16).padStart(2, '0');
    }

    return color;
}

const isNodeEnvironment: boolean = typeof process !== 'undefined' && !!process.versions && !!process.versions.node;
const use256Colors = supports256Colors();
