import {getCallerFunctionName} from "../tools/functionName.js";
import {getHexaColor, getTerminalColors} from "../tools/colors.js";

enum LogLevel {
    LOG = 'log',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    DEBUG = 'debug'
}

const isNodeEnvironment: boolean = typeof process !== 'undefined' && !!process.versions && !!process.versions.node;
const logWithLevel = isNodeEnvironment ? terminalLog : browserLog;

/**
 * Log function for browser environment
 * @param level - Log level
 * @param args - Arguments to log
 */
function browserLog(level: LogLevel, ...args: any[]): void {
    const functionName = getCallerFunctionName();
    console[level](
        `%c[${functionName}]`,
        `color: ${getHexaColor(functionName)}; font-weight: bold;`,
        ...args
    );
}

/**
 * log function for terminal (Node.js) environment
 * @param level - Log level
 * @param args - Arguments to log
 */
function terminalLog(level: LogLevel, ...args: any[]): void {
    const functionName = getCallerFunctionName();
    console[level](`${getTerminalColors(functionName)}[${functionName}]\x1b[0m`, ...args);
}

export default {
    log: (...args: any[]): void => {
        logWithLevel(LogLevel.LOG, ...args);
    },

    info: (...args: any[]): void => {
        logWithLevel(LogLevel.INFO, ...args);
    },

    warn: (...args: any[]): void => {
        logWithLevel(LogLevel.WARN, ...args);
    },

    error: (...args: any[]): void => {
        logWithLevel(LogLevel.ERROR, ...args);
    },

    debug: (...args: any[]): void => {
        logWithLevel(LogLevel.DEBUG, ...args);
    }
};