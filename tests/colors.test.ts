import { getHexaColor, getTerminalColors } from '../tools/colors.js';

describe('Color Generation Tests', () => {
    describe('getHexaColor', () => {
        it('should generate consistent hex colors for the same input', () => {
            const color1 = getHexaColor('testFunction');
            const color2 = getHexaColor('testFunction');
            expect(color1).toBe(color2);
        });

        it('should generate different colors for different inputs', () => {
            const color1 = getHexaColor('function1');
            const color2 = getHexaColor('function2');
            expect(color1).not.toBe(color2);
        });

        it('should generate valid hex color format', () => {
            const color = getHexaColor('test');
            expect(color).toMatch(/^#[0-9a-f]{6}$/i);
        });
    });

    describe('getTerminalColors', () => {
        it('should generate consistent terminal colors for the same input', () => {
            const color1 = getTerminalColors('testFunction');
            const color2 = getTerminalColors('testFunction');
            expect(color1).toBe(color2);
        });

        it('should generate different colors for different inputs', () => {
            const color1 = getTerminalColors('function1');
            const color2 = getTerminalColors('function2');
            expect(color1).not.toBe(color2);
        });

        it('should generate valid ANSI color code', () => {
            const color = getTerminalColors('test');
            expect(color).toMatch(/^\x1b\[\d+(?:;\d+)*m$/);
        });
    });
});