import { hashString, getCallerFunctionName } from '../tools/functionName.js';

describe('Function Name Utils Tests', () => {
    describe('hashString', () => {
        it('should generate consistent hash for the same input', () => {
            const hash1 = hashString('testString');
            const hash2 = hashString('testString');
            expect(hash1).toBe(hash2);
        });

        it('should generate different hashes for different inputs', () => {
            const hash1 = hashString('string1');
            const hash2 = hashString('string2');
            expect(hash1).not.toBe(hash2);
        });

        it('should always return a positive number', () => {
            const hash = hashString('test');
            expect(hash).toBeGreaterThanOrEqual(0);
        });
    });

    describe('getCallerFunctionName', () => {
        it('should parse function names from stack trace', () => {
            const error = new Error();
            error.stack = `Error: test
    at getCallerFunctionName (D:\\Projets\\colored-function-logger\\tools\\functionName.ts:123:456)
    at MyClass.myMethod (D:\\Projets\\colored-function-logger\\test\\test.ts:789:10)
    at Object.testFunction (D:\\Projets\\colored-function-logger\\test\\test.ts:789:10)
    at Module.myFunction (D:\\Projets\\colored-function-logger\\test\\test.ts:789:10)`;
            jest.spyOn(global, 'Error').mockImplementation(() => error);
            const result = getCallerFunctionName();
            expect(result).toMatch(/^(myMethod|testFunction|myFunction)$/);
            jest.restoreAllMocks();
        });

        it('should handle when no function name is found', () => {
            const error = new Error();
            error.stack = `Error
    at D:\\Projets\\colored-function-logger\\tools\\functionName.ts:123:456
    at D:\\Projets\\colored-function-logger\\test\\test.ts:789:10`;
            jest.spyOn(global, 'Error').mockImplementation(() => error);
            const result = getCallerFunctionName();
            expect(result).toBe('<anonymous>');
            jest.restoreAllMocks();
        });

        it('should return <unknown> when stack is not available', () => {
            const error = new Error();
            error.stack = '';
            jest.spyOn(global, 'Error').mockImplementation(() => error);
            const result = getCallerFunctionName();
            expect(result).toBe('<unknown>');
            jest.restoreAllMocks();
        });
    });
});