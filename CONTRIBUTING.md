# Contributing to Device Detector

Thank you for your interest in contributing to Device Detector! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/device-detector.git
   cd device-detector
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/iaceene/device-detector.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

## Development Setup

This package uses TypeScript and compiles to JavaScript. The source files are in the `src/` directory.

### Project Structure

```
device-detector/
├── src/
│   ├── DeviceDedector.ts  # Main class
│   ├── db.ts              # Device pattern database
│   └── index.ts           # Entry point
├── dist/                  # Compiled output (generated)
├── package.json
├── tsconfig.json
└── README.md
```

### Build the Project

```bash
npm run build
```

This compiles TypeScript files from `src/` to `dist/`.

## Making Changes

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in the appropriate files

3. **Build the project** to ensure it compiles:
   ```bash
   npm run build
   ```

4. **Test your changes** locally (see [Testing](#testing) section)

## Testing

### Setting Up Tests

If you want to add tests, install testing dependencies:

```bash
npm install -D vitest happy-dom @vitest/coverage-v8
```

### Create Vitest Config

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### Create Test Files

Create your tests in a `test/` directory:

```typescript
// test/DeviceDetector.test.ts
import { describe, it, expect } from 'vitest';
import { Window } from 'happy-dom';
import DeviceDetector from '../src/index.js';

function createMockNavigator(userAgent: string, platform = 'MacIntel') {
  const window = new Window();
  
  Object.defineProperty(window.navigator, 'userAgent', {
    value: userAgent,
    writable: true,
    configurable: true
  });
  
  Object.defineProperty(window.navigator, 'platform', {
    value: platform,
    writable: true,
    configurable: true
  });
  
  global.navigator = window.navigator as any;
}

describe('DeviceDetector', () => {
  it('should detect macOS desktop', () => {
    createMockNavigator(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'MacIntel'
    );
    const detector = new DeviceDetector();
    expect(detector.Type()).toBe('desktop');
  });

  it('should detect iPhone', () => {
    createMockNavigator(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15',
      'iPhone'
    );
    const detector = new DeviceDetector();
    expect(detector.Type()).toBe('mobile');
  });

  it('should detect Android mobile', () => {
    createMockNavigator(
      'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36',
      'Linux armv8l'
    );
    const detector = new DeviceDetector();
    expect(detector.Type()).toBe('mobile');
  });

  it('should detect iPad', () => {
    createMockNavigator(
      'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15',
      'iPad'
    );
    const detector = new DeviceDetector();
    expect(detector.Type()).toBe('tablet');
  });

  it('should return user agent string', () => {
    const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)';
    createMockNavigator(ua);
    const detector = new DeviceDetector();
    expect(detector.UserAgent()).toBe(ua);
  });
});
```

### Add Test Scripts to package.json

```json
{
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "prepublishOnly": "npm run build"
  }
}
```

### Run Tests

```bash
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Manual Testing

You can also test manually in a browser:

1. Create an HTML file:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Device Detector Test</title>
   </head>
   <body>
       <h1>Device Type: <span id="device-type"></span></h1>
       <script type="module">
           import DeviceDetector from './dist/index.js';
           const detector = new DeviceDetector();
           document.getElementById('device-type').textContent = detector.Type();
       </script>
   </body>
   </html>
   ```

2. Serve it with a local server:
   ```bash
   python3 -m http.server
   ```

## Submitting Changes

1. **Commit your changes** with clear, descriptive commit messages:
   ```bash
   git add .
   git commit -m "Add: Support for new device patterns"
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Provide a clear description of your changes
   - Reference any related issues

### Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why
- **Testing**: Describe how you tested your changes
- **Documentation**: Update README.md if you added new features
- **Database Updates**: If you added device patterns, explain which devices are now supported

## Coding Standards

### TypeScript Style

- Use TypeScript for all source files
- Follow existing code style and formatting
- Use meaningful variable and function names
- Add comments for complex logic

### Naming Conventions

- **Classes**: PascalCase (`DeviceDetector`)
- **Interfaces/Types**: PascalCase (`DeviceType`, `MetaData`)
- **Methods**: PascalCase to match existing style (`Type()`, `UserAgent()`)
- **Variables**: camelCase (`userAgent`, `deviceType`)
- **Constants**: PascalCase for exported objects (`db`)

### File Organization

- Source files go in `src/`
- Each class/module in its own file
- Export types alongside implementations
- Use `.js` extensions in imports (for ESM compatibility)

### Adding Device Patterns

When adding new device patterns to `src/db.ts`:

1. **Research**: Verify the pattern appears in real user agents
2. **Test**: Ensure it doesn't conflict with existing patterns
3. **Document**: Add a comment explaining what devices it matches
4. **Organize**: Keep patterns grouped logically

Example:
```typescript
export const db = {
  TV: "SmartTV Tizen BRAVIA PlayStation Xbox...",
  MOBILE: "Android iPhone Samsung SM-G SM-A...",
  TABLET: "iPad Tablet SM-T SM-P...",
  Desktop: "Windows Macintosh Linux X11..."
}
```

### Detection Logic

The detection follows this priority:
1. Check for Android (special case due to "Linux; Android" format)
2. Check for TV patterns
3. Check for Tablet patterns
4. Check for Mobile patterns
5. Check for Desktop patterns
6. Return "other" if no match

Maintain this order when making changes to the detection logic.

## Questions?

If you have questions or need help:

- **Issues**: [Open an issue](https://github.com/iaceene/device-detector/issues)
- **Discussions**: Use GitHub Discussions for general questions
- **Email**: Contact the maintainer

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing to Device Detector! 🎉
