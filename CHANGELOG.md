# Changelog

All notable changes to the MinangScript IntelliSense extension will be documented in this file.

## [1.0.0] - 2025-06-22

### Added
- Initial release of MinangScript IntelliSense extension
- Complete syntax highlighting for MinangScript language
- IntelliSense support with auto-completion for all keywords
- Hover documentation for keywords and functions
- Code snippets for common patterns and cultural programming
- Support for cultural philosophy keywords (gotongRoyong, musyawarah, alamTakambang, adatBasandi)
- Built-in function completion with parameter hints
- Command integration for running and compiling MinangScript files
- Language configuration with proper bracket matching and auto-closing
- Comprehensive documentation and examples

### Features
- **Syntax Highlighting**: Full support for MinangScript syntax including keywords, operators, strings, numbers, and comments
- **Auto-completion**: Smart suggestions for keywords, functions, and cultural concepts
- **Hover Documentation**: Detailed explanations for all language constructs
- **Code Snippets**: Pre-built templates for functions, loops, conditionals, and cultural patterns
- **Command Integration**: Direct execution and compilation from VS Code
- **Cultural Keywords**: Special support for Minangkabau philosophy-based programming

### Technical Details
- Language ID: `minangscript`
- File Extensions: `.minang`
- Activation Events: `onLanguage:minangscript`
- Engine Compatibility: VS Code ^1.74.0

### Supported Keywords
- Basic: buek, ambiak, tagak, karojo, jadi, kalau, lain, selamo, untuak, cetak
- Values: bana, salah, kosong
- Cultural: gotongRoyong, musyawarah, alamTakambang, adatBasandi
- Built-ins: cetak.pesan, cetak.rusak, cetak.ameh, cetak.hijau, cetak.biru, angko, kato, kabanaran
