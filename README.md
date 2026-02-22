# Device Detector 📱💻📺

A lightweight, zero-dependency TypeScript utility that detects device types from user agent strings. Perfect for responsive applications, SSR frameworks, and browser-based device detection.

[![npm version](https://img.shields.io/npm/v/device-detector.svg)](https://www.npmjs.com/package/device-detector)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Features

✨ **Zero Dependencies** - No external packages required  
🚀 **Lightweight** - Minimal footprint  
📱 **Comprehensive Detection** - Supports mobile, tablet, desktop, TV, and more  
🔧 **TypeScript First** - Full TypeScript support with type definitions  
🌐 **Browser Native** - Works directly in the browser using Navigator API  
🎯 **Accurate** - Rich device database with hundreds of device patterns  

## Installation

```bash
npm install device-detector
```

```bash
yarn add device-detector
```

```bash
pnpm add device-detector
```

## Usage

### Basic Usage

```typescript
import DeviceDetector from 'device-detector';

const detector = new DeviceDetector();

// Get device type
const deviceType = detector.Type(); // "mobile" | "desktop" | "tablet" | "TV" | "ROBOT" | "other"

console.log(`Device type: ${deviceType}`);
```

### Get All Metadata

```typescript
import DeviceDetector from 'device-detector';

const detector = new DeviceDetector();

// Get all device metadata
const metadata = detector.GetMetaData();
console.log(metadata);
// {
//   UserAgent: "Mozilla/5.0...",
//   Platform: "MacIntel",
//   Language: "en-US",
//   Browser: "Google Inc.",
//   Product: "Macintosh; Intel Mac OS X 10_15_7"
// }
```

### Individual Property Access

```typescript
import DeviceDetector from 'device-detector';

const detector = new DeviceDetector();

// Access individual properties
const userAgent = detector.UserAgent();
const platform = detector.Platform();
const language = detector.Language();
const browser = detector.Browser();
const product = detector.Product();

console.log(`User Agent: ${userAgent}`);
console.log(`Platform: ${platform}`);
console.log(`Language: ${language}`);
console.log(`Browser: ${browser}`);
console.log(`Product: ${product}`);
```

### Conditional Rendering Example

```typescript
import DeviceDetector from 'device-detector';

const detector = new DeviceDetector();
const deviceType = detector.Type();

if (deviceType === 'mobile') {
  console.log('Rendering mobile view');
} else if (deviceType === 'tablet') {
  console.log('Rendering tablet view');
} else if (deviceType === 'desktop') {
  console.log('Rendering desktop view');
} else if (deviceType === 'TV') {
  console.log('Rendering TV view');
}
```

## API Reference

### Constructor

```typescript
new DeviceDetector()
```

Creates a new instance of DeviceDetector and automatically detects the device type.

### Methods

#### `Type(): DeviceType`

Returns the detected device type.

**Returns:** `"mobile" | "desktop" | "tablet" | "TV" | "ROBOT" | "other"`

```typescript
const type = detector.Type();
```

#### `GetMetaData(): MetaData`

Returns all device metadata.

**Returns:** Object containing:
- `UserAgent`: string - Full user agent string
- `Platform`: string - Platform identifier
- `Language`: string - Browser language
- `Browser`: string - Browser vendor
- `Product`: string - Product information from user agent

```typescript
const metadata = detector.GetMetaData();
```

#### `UserAgent(): string`

Returns the user agent string.

```typescript
const userAgent = detector.UserAgent();
```

#### `Platform(): string`

Returns the platform identifier.

```typescript
const platform = detector.Platform();
```

#### `Language(): string`

Returns the browser language.

```typescript
const language = detector.Language();
```

#### `Browser(): string`

Returns the browser vendor.

```typescript
const browser = detector.Browser();
```

#### `Product(): string`

Returns the product information extracted from the user agent.

```typescript
const product = detector.Product();
```

## Device Detection

The library detects devices based on patterns found in the user agent string. It supports:

### Mobile Devices
- iPhone, Android devices, Samsung (SM-G, SM-A, SM-J, SM-M, SM-N)
- Pixel, Nexus, Xiaomi, Redmi, POCO, Huawei, Honor
- OPPO, Vivo, OnePlus, Realme, Nokia, Sony Xperia
- Motorola, BlackBerry, and many more

### Tablets
- iPad (all variants), Android tablets
- Samsung tablets (SM-T, SM-P, SM-X)
- Kindle Fire, Surface, Nexus tablets
- Huawei MediaPad/MatePad, Xiaomi tablets

### Desktop
- Windows (all versions), macOS/Macintosh
- Linux distributions (Ubuntu, Fedora, Debian, etc.)
- Chrome OS, BSD variants, Solaris

### TV Devices
- Smart TVs (Samsung, LG, Sony BRAVIA, etc.)
- Gaming consoles (PlayStation, Xbox)
- Streaming devices (Roku, Chromecast, Fire TV, Apple TV)
- Android TV, Google TV

## Browser Compatibility

Works in all modern browsers that support the Navigator API:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Use Cases

- 🎨 **Responsive Design** - Serve different layouts based on device type
- 🔄 **SSR/SSG** - Server-side device detection for Next.js, Nuxt, etc.
- 📊 **Analytics** - Track device types in your application
- 🎯 **A/B Testing** - Test features on specific device types
- 🚀 **Progressive Enhancement** - Enhance experiences based on device capabilities

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import DeviceDetector, { DeviceType, MetaData } from 'device-detector';

const detector: DeviceDetector = new DeviceDetector();
const type: DeviceType = detector.Type();
const metadata: MetaData = detector.GetMetaData();
```

## Testing

If you want to contribute and add tests, you can use any testing framework you prefer. Here's an example setup with Vitest:

### Install Test Dependencies

```bash
npm install -D vitest happy-dom @vitest/coverage-v8
```

### Create Test File

Create a test file at `test/DeviceDetector.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { Window } from 'happy-dom';
import DeviceDetector from '../src/index.js';

// Mock navigator for testing
function createMockNavigator(userAgent: string) {
  const window = new Window();
  Object.defineProperty(window.navigator, 'userAgent', {
    value: userAgent,
    writable: true,
  });
  global.navigator = window.navigator as any;
}

describe('DeviceDetector', () => {
  it('should detect macOS desktop', () => {
    createMockNavigator('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');
    const detector = new DeviceDetector();
    expect(detector.Type()).toBe('desktop');
  });

  it('should detect iPhone', () => {
    createMockNavigator('Mozilla/5.0 (iPhone; CPU iPhone OS 14_6)');
    const detector = new DeviceDetector();
    expect(detector.Type()).toBe('mobile');
  });
});
```

### Add Test Scripts

Add to your `package.json`:

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details on testing and contributing.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

ISC © iaceene

## Repository

[https://github.com/iaceene/device-detector](https://github.com/iaceene/device-detector)

## Issues

Found a bug or have a feature request? [Open an issue](https://github.com/iaceene/device-detector/issues)
