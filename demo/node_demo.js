/**
 * Demo of using the logger in Node.js
 */

import logger from '../dist/src/index.js';

// Simple test function
function randomFunction() {
    logger.log('This is a standard log');
    logger.info('Important information');
    logger.warn('Warning, something might go wrong');
    logger.error('An error has occurred');
    logger.debug('Debug information');
}

// Function with objects
function data() {
    const data = {id: 1, name: 'Test', values: [1, 2, 3]};
    logger.info('Processing data:', data);
    logger.log('Multiple arguments:', 'string', 42, true, {nested: 'object'});
}

// Asynchronous function
async function asyncFnc() {
    logger.debug('Starting async operation');
    await new Promise(resolve => setTimeout(resolve, 100));
    logger.info('Operation completed successfully');
}

// Class with methods
class Calculator {
    addition(a, b) {
        logger.debug(`Calculating ${a} + ${b}`);
        const result = a + b;
        logger.info('Result:', result);
        return result;
    }

    divide(a, b) {
        if (b === 0) {
            logger.error('Division by zero is not possible');
            return null;
        }
        logger.log(`${a} / ${b} =`, a / b);
        return a / b;
    }
}

// Running demos
console.log('\n=== Node.js Logger Demo ===\n');

console.log('--- Simple Function ---');
randomFunction();

console.log('\n--- Data Processing ---');
data();

console.log('\n--- Async Function ---');
asyncFnc().then(() => {
    logger.log('Async function completed');
});

console.log('\n--- Class ---');
const calc = new Calculator();
calc.addition(5, 3);
calc.divide(10, 2);
calc.divide(10, 0);

console.log('\n--- Anonymous Functions ---');
logger.log('This is a log from an anonymous function');