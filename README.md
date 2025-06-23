# MinangScript IntelliSense Extension

A comprehensive Visual Studio Code extension that provides IntelliSense, syntax highlighting, auto-completion, and language support for the MinangScript programming language.

## Features

### 🎨 Syntax Highlighting
- Full syntax highlighting for MinangScript keywords
- Color coding for Minangkabau cultural keywords
- Proper highlighting for strings, numbers, comments, and operators

### 🧠 IntelliSense & Auto-completion
- Smart auto-completion for all MinangScript keywords
- Built-in function suggestions with documentation
- Cultural philosophy keywords with explanations
- Function parameter hints and snippets

### 📝 Code Snippets
- Pre-built code templates for common patterns
- Cultural programming pattern snippets
- Function templates following Minangkabau principles
- Error handling patterns

### 🔍 Hover Information
- Detailed documentation on hover
- Keyword explanations in both Indonesian and English
- Cultural context for philosophy-based keywords

### ⚡ Quick Actions
- Run MinangScript files directly from VS Code
- Compile files with integrated terminal
- Format documents (coming soon)

## Installation

### From VS Code Marketplace (Recommended)
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "MinangScript IntelliSense"
4. Click Install

### Manual Installation
1. Download the `.vsix` file from releases
2. Open VS Code
3. Press Ctrl+Shift+P
4. Type "Extensions: Install from VSIX"
5. Select the downloaded file

## Usage

### Basic Setup
1. Install the MinangScript CLI tool: `npm install -g minangscript`
2. Create a new `.minang` file
3. Start coding with full IntelliSense support!

### Example Code
```minangscript
// MinangScript dengan dukungan IntelliSense penuh
karojo salam(nama) {
    cetak.pesan("Salamaik datang, " + nama + "!");
    jadi bana;
}

// Gotong royong - collaborative function
gotongRoyong hitungBersama(angka1, angka2) {
    buek hasil = angko(angka1) + angko(angka2);
    cetak.hijau("Hasil: " + kato(hasil));
    jadi hasil;
}

// Main program
karojo utama() {
    salam("Dunia");
    hitungBersama(10, 20);
}

utama();
```

### Available Commands
- **Run MinangScript File** (Ctrl+F5): Execute current .minang file
- **Compile MinangScript File**: Compile to JavaScript
- **Format Document** (Shift+Alt+F): Format MinangScript code

## MinangScript Keywords

### Basic Keywords
| MinangScript | English | Description |
|--------------|---------|-------------|
| `buek` | var | Variable declaration |
| `ambiak` | let | Let declaration |
| `tagak` | const | Constant declaration |
| `karojo` | function | Function definition |
| `jadi` | return | Return statement |
| `kalau` | if | If statement |
| `lain` | else | Else statement |
| `selamo` | while | While loop |
| `untuak` | for | For loop |
| `cetak` | print | Console output |

### Cultural Philosophy Keywords
| Keyword | Philosophy | Usage |
|---------|------------|-------|
| `gotongRoyong` | Community collaboration | Collaborative functions |
| `musyawarah` | Consensus decision making | Decision functions |
| `alamTakambang` | Learning from nature | Adaptive functions |
| `adatBasandi` | Ethics-based practices | Ethical functions |

### Built-in Functions
- `cetak()` - Basic console output
- `cetak.pesan()` - Info message
- `cetak.rusak()` - Error message (red)
- `cetak.ameh()` - Warning message (yellow)
- `cetak.hijau()` - Success message (green)
- `cetak.biru()` - Info message (blue)
- `angko()` - Number constructor
- `kato()` - String constructor
- `kabanaran()` - Boolean constructor

## Extension Settings

This extension contributes the following settings:

* `minangscript.enableIntelliSense`: Enable/disable IntelliSense features
* `minangscript.enableSnippets`: Enable/disable code snippets
* `minangscript.enableHover`: Enable/disable hover documentation

## Known Issues

- Advanced formatting is still in development
- Some complex syntax patterns may not be highlighted perfectly

## Release Notes

### 1.0.0
- Initial release
- Full syntax highlighting
- Complete IntelliSense support
- Code snippets for all major patterns
- Cultural philosophy keyword support
- Hover documentation
- Command integration

## Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for details.

## License

This extension is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## About MinangScript

MinangScript is a programming language that integrates Minangkabau cultural philosophy with modern programming concepts. It aims to make programming more accessible to Indonesian speakers while preserving cultural wisdom.

For more information about MinangScript:
- [MinangScript Repository](https://github.com/MinangScript/minangscript)
- [Documentation](https://minangscript.dev)

---

**Salamaik datang ka MinangScript! (Welcome to MinangScript!)** 🏔️
