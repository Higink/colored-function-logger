/**
 * Hash a string to a number
 * @param str - Input string
 * @returns number
 */
export function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}


/**
 * Get the name of the caller function
 * @returns string - Caller function name
 */
export function getCallerFunctionName(): string {
    const stack = new Error().stack;

    if (!stack) {
        return '<unknown>';
    }

    // 0 : Error
    // 1 : getCallerFunctionName
    // 2 : browserLog
    // 3 : Object.log
    // 4 : FUNCTION NAME
    const stackLines = stack.split('\n');
    for (let i = 4; i < stackLines.length; i++) {
        const line = stackLines[i];
        const patterns = [
            /at\s+(\w+)\s/,
            /at\s+\w+\.(\w+)\s/,
            /at\s+([A-Z]\w+\.\w+)\s/,
            /at\s+Object\.(\w+)\s/,
            /at\s+Module\.(\w+)\s/,
            /at\s+.*?\(.*\/([^\/\)]+)\.[jt]s/,
        ];

        for (const pattern of patterns) {
            const match = line.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
    }

    return '<anonymous>';
}