# Colored Function Logger

![0 dependencies](https://img.shields.io/badge/Dependencies-0-blue)

A very light logging utility that automatically displays the calling function name with unique colors for Node.js and browser with no dependencies.

![Preview](demo/preview.png)

## Features

- Automatic calling function name detection
- Automatic color generation based on function name
- Work same as native console methods
- Environment detection (Node.js/Browser)
- All log levels (log, info, warn, error, debug)
- 0 dependencies

## Installation

```bash
npm install colored-function-logger
```

## Usage

There are two examples in the DEMO folder, one for Node.js and one for browser.

```javascript
import logger from 'colored-function-logger';

function yourFunction() {
    logger.log('This is a standard log');
    logger.warn('But you can use the others log levels too!');
}
```

## Color Features Details

**Browser**: 16M colors, convert function name to hexadecimal color.  
**Node**.js: 256 colors, convert function name to the closest ANSI color or fallback to 8 basic colors.

## License

This project is licensed under CC BY-NC-SA.

![CC BY-NC-SA](https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png)
