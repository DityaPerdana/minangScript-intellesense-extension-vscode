# MinangScript IntelliSense VS Code Extension 🏔️

[![Version](https://img.shields.io/badge/version-1.0.4-blue.svg)](https://marketplace.visualstudio.com/items?itemName=dtyminang.minangscript-intellisense)
[![VS Code Engine](https://img.shields.io/badge/vscode-^1.101.0-green.svg)](https://code.visualstudio.com/)
[![License](https://img.shields.io/badge/license-MIT-orange.svg)](LICENSE)
[![Publisher](https://img.shields.io/badge/publisher-dtyminang-red.svg)](https://marketplace.visualstudio.com/publishers/dtyminang)

A comprehensive Visual Studio Code extension that provides **IntelliSense**, **syntax highlighting**, **auto-completion**, and **complete language support** for the **MinangScript programming language** - a unique programming language that integrates Minangkabau cultural philosophy with modern programming concepts.

## 🌟 Features

### 🎨 **Syntax Highlighting**
- **Complete keyword highlighting** for all MinangScript constructs
- **Cultural keyword highlighting** with special colors for philosophy-based programming
- **Proper highlighting** for strings, numbers, comments, and operators
- **Operator and delimiter highlighting** with proper scopes

### 🧠 **IntelliSense & Auto-completion**
- **Smart auto-completion** for all MinangScript keywords
- **Built-in function suggestions** with detailed documentation
- **Cultural philosophy keywords** with educational explanations
- **Function parameter hints** and signature help
- **Method completion** for objects (e.g., `cetak.pesan`, `cetak.rusak`)
- **Variable completion** from current file context

### 📝 **Code Snippets (20+ Templates)**
- **Basic constructs**: `buek`, `karojo`, `kalau`, `selamo`, `untuak`
- **Cultural patterns**: `gotongRoyong`, `musyawarah`, `alamTakambang`, `adatBasandi`
- **Complex templates**: Main function, class-like structures, error handling
- **Built-in functions**: All `cetak.*` variants, type constructors
- **Pre-built templates** for common programming patterns

### 🔍 **Hover Documentation**
- **Detailed documentation** on keyword hover
- **Keyword explanations** in both Indonesian and English
- **Cultural context** for philosophy-based keywords
- **Function signatures** with parameter and return type information

### ⚡ **Quick Actions & Commands**
- **Run MinangScript File** (`Ctrl+F5`) - Execute directly from VS Code
- **Compile MinangScript File** - Transpile to JavaScript
- **Format Document** (`Shift+Alt+F`) - Code formatting
- **Context menu integration** for `.minang` files
- **Terminal integration** with MinangScript CLI

### 🏛️ **Cultural Philosophy Integration**
The extension deeply integrates **four core Minangkabau principles**:

1. **🤝 Gotong Royong** - Collaborative programming templates
2. **🗣️ Musyawarah Mufakat** - Consensus-based decision functions  
3. **🌿 Alam Takambang Jadi Guru** - Learning and adaptive patterns
4. **⚖️ Adat Basandi Syarak** - Ethics-based programming constructs

### 🎯 **File Icon Theme**
- **Custom file icons** for `.minang` files
- **Professional appearance** with MinangScript branding
- **Consistent visual identity** across your project

## 🚀 Installation

### **From VS Code Marketplace (Recommended)**
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for **"MinangScript IntelliSense"**
4. Click **Install**

### **Command Line Installation**
```bash
code --install-extension dtyminang.minangscript-intellisense
```

### **VS Code Quick Open**
Press `Ctrl+P` and type:
```
ext install dtyminang.minangscript-intellisense
```

### **Manual Installation (Development)**
1. Download the `.vsix` file from releases
2. Open VS Code and press `Ctrl+Shift+P`
3. Type "Extensions: Install from VSIX"
4. Select the downloaded file

## 📖 Usage

### **Basic Setup**
1. Install the **MinangScript CLI tool**: `npm install -g minangscript`
2. Create a new `.minang` file
3. Start coding with **full IntelliSense support**!

### **Example MinangScript Code**
```minangscript
// MinangScript dengan dukungan IntelliSense penuh
// Filosofi: Alam Takambang Jadi Guru

// Variable declarations with auto-completion
buek nama = "MinangScript";
ambiak umur = 25;
tagak PI = 3.14159;

// Function with IntelliSense support
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

// Cultural philosophy in action
musyawarah ambikKeputusan(pilihan) {
    kalau (pilihan.length > 1) {
        cetak.info("Berunding untuk mencapai mufakat...");
        jadi pilihan[0]; // Consensus reached
    }
    jadi pilihan[0];
}

// Main program execution
karojo utama() {
    salam("Dunia");
    hitungBersama(10, 20);
    
    cetak("");
    cetak("🏔️ Filosofi Minangkabau dalam kode:");
    cetak("• Gotong Royong - Bekerja sama");
    cetak("• Musyawarah Mufakat - Berunding bersama");  
    cetak("• Alam Takambang Jadi Guru - Belajar dari alam");
    cetak("• Adat Basandi Syarak - Beretika dalam berkarya");
}

utama();
```

## 🎨 **Activate File Icons**

To see MinangScript file icons:

1. **Open Command Palette** (`Ctrl+Shift+P`)
2. **Type**: `Preferences: File Icon Theme`
3. **Select**: `MinangScript File Icons`
4. **Restart VS Code** for changes to take effect

## 📚 **MinangScript Language Reference**

### **Basic Keywords**
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

### **Cultural Philosophy Keywords**
| Keyword | Philosophy | Usage |
|---------|------------|-------|
| `gotongRoyong` | Community collaboration | Collaborative functions |
| `musyawarah` | Consensus decision making | Decision functions |
| `alamTakambang` | Learning from nature | Adaptive functions |
| `adatBasandi` | Ethics-based practices | Ethical functions |

### **Built-in Functions**
- `cetak()` - Basic console output
- `cetak.pesan()` - Info message
- `cetak.rusak()` - Error message (red)
- `cetak.ameh()` - Warning message (yellow)
- `cetak.hijau()` - Success message (green)
- `cetak.biru()` - Info message (blue)
- `angko()` - Number constructor
- `kato()` - String constructor
- `kabanaran()` - Boolean constructor

## 🧪 **Testing the Extension**

### **Test IntelliSense Features**
1. **Auto-completion**: Type keywords and see suggestions
2. **Hover documentation**: Hover over keywords for explanations
3. **Snippets**: Type `gotongRoyong` + Tab for templates
4. **Method completion**: Type `cetak.` to see methods
5. **Commands**: Use `Ctrl+F5` to run files

### **Expected Results**
✅ **Syntax highlighting** with proper colors  
✅ **Smart auto-completion** for all constructs  
✅ **Hover documentation** with cultural explanations  
✅ **Code snippets** expand correctly  
✅ **File icons** display for `.minang` files  
✅ **Commands** integrate with MinangScript CLI  

## 🛠️ **Available Commands**

| Command | Shortcut | Description |
|---------|----------|-------------|
| Run MinangScript File | `Ctrl+F5` | Execute current .minang file |
| Compile MinangScript File | - | Compile to JavaScript |
| Format Document | `Shift+Alt+F` | Format MinangScript code |

## ⚙️ **Extension Settings**

This extension contributes the following settings:

* `minangscript.enableIntelliSense`: Enable/disable IntelliSense features
* `minangscript.enableSnippets`: Enable/disable code snippets
* `minangscript.enableHover`: Enable/disable hover documentation

## 🔧 **Technical Details**

### **Architecture**
- **TypeScript implementation** for better maintainability and performance
- **Modular design** with separate providers for completion, hover, etc.
- **Type-safe implementation** with proper VS Code API usage
- **Performance optimized** with smart caching and context awareness

### **Compatibility**
- **VS Code Engine**: ^1.101.0 (latest)
- **Node.js**: 16.x compatibility
- **File Extensions**: `.minang`
- **Language ID**: `minangscript`

### **Package Information**
- **Publisher**: dtyminang
- **Version**: 1.0.4
- **Categories**: Programming Languages, Snippets
- **Keywords**: minangscript, minang, minangkabau, indonesian

## 📊 **Development Statistics**

- **File count**: 18 files in package
- **Package size**: Optimized for performance
- **Keywords supported**: 20+ MinangScript keywords
- **Snippets included**: 20+ code templates
- **Functions covered**: All built-in MinangScript functions
- **Commands available**: 3 integrated commands

## 🚦 **Troubleshooting**

### **Extension not loading:**
1. Check if VS Code recognizes .minang files
2. Restart VS Code after installation
3. Check the Output panel for errors

### **No syntax highlighting:**
1. Ensure file has .minang extension
2. Check if extension is active in Extensions panel
3. Try Command Palette → "Change Language Mode" → "MinangScript"

### **Commands not working:**
1. Install MinangScript CLI: `npm install -g minangscript`
2. Ensure MinangScript files are saved before running
3. Check terminal for error messages

### **No file icons:**
1. Activate icon theme: Command Palette → "File Icon Theme" → "MinangScript File Icons"
2. Restart VS Code window
3. Try switching themes and back

## 🎯 **Future Enhancements**

- [ ] **Advanced code formatting** with cultural alignment
- [ ] **Real-time syntax error detection** and highlighting
- [ ] **Debugging support** for MinangScript programs
- [ ] **Custom color themes** optimized for MinangScript
- [ ] **Integrated tutorial** for cultural programming concepts
- [ ] **Code analysis** for cultural pattern compliance

## 🤝 **Contributing**

We welcome contributions! To contribute:

1. **Fork the repository**
2. **Make changes** in your fork
3. **Test thoroughly** with development mode (`F5`)
4. **Submit a pull request** with detailed description

### **Development Setup**
```bash
git clone https://github.com/DityaPerdana/minangScript-intellesense-extension-vscode.git
cd minangScript-intellesense-extension-vscode
npm install
npm run compile
# Press F5 to launch development host
```

## 📜 **License**

This extension is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

## 🔗 **Links**

- **Extension Marketplace**: https://marketplace.visualstudio.com/items?itemName=dtyminang.minangscript-intellisense
- **GitHub Repository**: https://github.com/DityaPerdana/minangScript-intellesense-extension-vscode
- **MinangScript Main Project**: https://github.com/DityaPerdana/minangScript
- **Publisher Hub**: https://marketplace.visualstudio.com/manage/publishers/dtyminang

## 🙏 **Acknowledgments**

- **MinangScript Team** for the core language development
- **Minangkabau Community** for cultural wisdom and philosophy
- **VS Code Team** for excellent extension APIs
- **Open Source Community** for inspiration and support

## 📈 **Changelog**

All notable changes to the MinangScript IntelliSense extension are documented here.

### **[1.0.4] - 2025-06-23**
- ✅ Added file icon theme for `.minang` files
- ✅ Improved extension marketplace presence
- ✅ Enhanced documentation and examples
- ✅ Consolidated all documentation into single README.md

### **[1.0.3] - 2025-06-23**
- ✅ Updated icon theme configuration
- ✅ Fixed file association issues

### **[1.0.2] - 2025-06-23**
- ✅ Added extension icon and file icon support
- ✅ Enhanced package configuration

### **[1.0.0] - 2025-06-22**
- 🎉 **Initial release** of MinangScript IntelliSense extension
- ✅ Complete syntax highlighting for MinangScript language
- ✅ IntelliSense support with auto-completion for all keywords
- ✅ Hover documentation for keywords and functions
- ✅ Code snippets for common patterns and cultural programming
- ✅ Support for cultural philosophy keywords (gotongRoyong, musyawarah, alamTakambang, adatBasandi)
- ✅ Built-in function completion with parameter hints
- ✅ Command integration for running and compiling MinangScript files
- ✅ Language configuration with proper bracket matching and auto-closing
- ✅ Comprehensive documentation and examples

#### **Features Added in 1.0.0**
- **Syntax Highlighting**: Full support for MinangScript syntax including keywords, operators, strings, numbers, and comments
- **Auto-completion**: Smart suggestions for keywords, functions, and cultural concepts
- **Hover Documentation**: Detailed explanations for all language constructs
- **Code Snippets**: Pre-built templates for functions, loops, conditionals, and cultural patterns
- **Command Integration**: Direct execution and compilation from VS Code
- **Cultural Keywords**: Special support for Minangkabau philosophy-based programming

#### **Technical Specifications (1.0.0)**
- **Language ID**: `minangscript`
- **File Extensions**: `.minang`
- **Activation Events**: `onLanguage:minangscript`
- **Engine Compatibility**: VS Code ^1.101.0
- **Supported Keywords**: Basic (buek, ambiak, tagak, karojo, jadi, kalau, lain, selamo, untuak, cetak), Values (bana, salah, kosong), Cultural (gotongRoyong, musyawarah, alamTakambang, adatBasandi), Built-ins (cetak.pesan, cetak.rusak, cetak.ameh, cetak.hijau, cetak.biru, angko, kato, kabanaran)

---

## 🎉 **Get Started Today!**

Install the extension now and experience the full power of **MinangScript development** with complete IDE support. Join the community of developers who are building software with **Minangkabau cultural wisdom**!

```bash
code --install-extension dtyminang.minangscript-intellisense
```

**Salamaik datang ka MinangScript! (Welcome to MinangScript!)** 🏔️

*Integrating traditional wisdom with modern technology for ethical and collaborative programming.*

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
