# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-22

### Added
- Initial release of Device Detector
- Device type detection (mobile, tablet, desktop, TV, ROBOT, other)
- Support for 100+ device patterns
- TypeScript support with full type definitions
- Zero dependencies
- Lightweight package with no test files included
- Complete documentation with testing guide in README.md
- CONTRIBUTING.md with detailed testing and contribution guidelines

### Features
- `Type()` - Get detected device type
- `GetMetaData()` - Get all device metadata
- `UserAgent()` - Get user agent string
- `Platform()` - Get platform identifier
- `Language()` - Get browser language
- `Browser()` - Get browser vendor
- `Product()` - Get product information

### Supported Devices
- Mobile: iPhone, Android, Samsung, Pixel, Xiaomi, Huawei, and more
- Tablets: iPad, Android tablets, Samsung Tab, Kindle Fire, Surface
- Desktop: Windows, macOS, Linux, Chrome OS, BSD variants
- TV: Smart TVs, PlayStation, Xbox, Roku, Apple TV, Fire TV, Chromecast
