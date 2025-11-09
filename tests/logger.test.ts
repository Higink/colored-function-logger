import logger from '../src/index.js';

describe('Logger Tests', () => {
    let consoleLogSpy: jest.SpyInstance;
    let consoleInfoSpy: jest.SpyInstance;
    let consoleWarnSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;
    let consoleDebugSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Log Methods', () => {
        it('should call console.log with correct formatting', () => {
            logger.log('test message');
            expect(consoleLogSpy).toHaveBeenCalled();
            const args = consoleLogSpy.mock.calls[0];
            expect(args[0]).toMatch(/\x1b\[\d+(?:;\d+)*m\[.*?\]\x1b\[0m/);
            expect(args[1]).toBe('test message');
        });

        it('should call console.info with correct formatting', () => {
            logger.info('test info');
            expect(consoleInfoSpy).toHaveBeenCalled();
            const args = consoleInfoSpy.mock.calls[0];
            expect(args[0]).toMatch(/\x1b\[\d+(?:;\d+)*m\[.*?\]\x1b\[0m/);
            expect(args[1]).toBe('test info');
        });

        it('should call console.warn with correct formatting', () => {
            logger.warn('test warning');
            expect(consoleWarnSpy).toHaveBeenCalled();
            const args = consoleWarnSpy.mock.calls[0];
            expect(args[0]).toMatch(/\x1b\[\d+(?:;\d+)*m\[.*?\]\x1b\[0m/);
            expect(args[1]).toBe('test warning');
        });

        it('should call console.error with correct formatting', () => {
            logger.error('test error');
            expect(consoleErrorSpy).toHaveBeenCalled();
            const args = consoleErrorSpy.mock.calls[0];
            expect(args[0]).toMatch(/\x1b\[\d+(?:;\d+)*m\[.*?\]\x1b\[0m/);
            expect(args[1]).toBe('test error');
        });

        it('should call console.debug with correct formatting', () => {
            logger.debug('test debug');
            expect(consoleDebugSpy).toHaveBeenCalled();
            const args = consoleDebugSpy.mock.calls[0];
            expect(args[0]).toMatch(/\x1b\[\d+(?:;\d+)*m\[.*?\]\x1b\[0m/);
            expect(args[1]).toBe('test debug');
        });
    });

    it('should handle multiple arguments', () => {
        logger.log('message', 123, { test: 'object' });
        expect(consoleLogSpy).toHaveBeenCalled();
        const args = consoleLogSpy.mock.calls[0];
        expect(args[1]).toBe('message');
        expect(args[2]).toBe(123);
        expect(args[3]).toEqual({ test: 'object' });
    });
});