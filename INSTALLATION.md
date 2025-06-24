# MinangScript IntelliSense Installation & Testing Guide

## Installation

### Method 1: Install from VSIX (Recommended for testing)

1. **Install the packaged extension:**
   ```bash
   code --install-extension minangscript-intellisense-1.0.0.vsix
   ```

2. **Or install through VS Code UI:**
   - Open VS Code
   - Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac)
   - Type "Extensions: Install from VSIX"
   - Select the `minangscript-intellisense-1.0.0.vsix` file

### Method 2: Development Mode

1. **Open the extension in VS Code:**
   ```bash
   cd minangscript-intellisense
   code .
   ```

2. **Press F5** to launch a new VS Code window with the extension loaded

## Testing the Extension

### 1. Create a Test File

Create a new file with the `.minang` extension:

```minangscript
// test.minang

// Test variable declarations
buek nama = "MinangScript";
ambiak umur = 25;
tagak PI = 3.14159;

// Test function with IntelliSense
karojo salam(nama) {
    cetak.pesan("Salamaik datang, " + nama + "!");
    jadi bana;
}

// Test cultural keywords
gotongRoyong hitungBersama(a, b) {
    buek hasil = angko(a) + angko(b);
    cetak.hijau("Hasil: " + kato(hasil));
    jadi hasil;
}

// Test control structures
kalau (umur >= 18) {
    cetak("Dewasa");
} lain {
    cetak("Muda");
}

// Test loops
selamo (umur < 30) {
    cetak("Masih muda");
    umur++;
}

untuak (buek i = 0; i < 5; i++) {
    cetak("Loop: " + kato(i));
}

// Call functions
salam("Dunia");
hitungBersama(10, 20);
```

### 2. Test Features

**✅ Syntax Highlighting:**
- Keywords should be highlighted in different colors
- Strings, numbers, and comments should have proper colors
- Cultural keywords should have special highlighting

**✅ Auto-completion:**
- Type `buek` and press Tab - should expand to variable declaration
- Type `karojo` and press Tab - should expand to function template
- Type `cetak.` - should show method completions (pesan, rusak, hijau, etc.)
- Type any MinangScript keyword - should show in completion list

**✅ Hover Documentation:**
- Hover over keywords like `buek`, `karojo`, `kalau` - should show documentation
- Hover over functions like `cetak`, `angko` - should show function info
- Hover over cultural keywords - should show cultural explanations

**✅ Code Snippets:**
- Type `gotongRoyong` and press Tab - should expand to collaborative function template
- Type `kalau` and press Tab - should expand to if statement template
- Type `selamo` and press Tab - should expand to while loop template

**✅ Commands:**
- Right-click in .minang file - should see "Run MinangScript File" option
- Press `Ctrl+F5` - should run the file (requires MinangScript CLI installed)
- Press `Shift+Alt+F` - should trigger format command

### 3. Test Advanced Features

**IntelliSense with Variables:**
```minangscript
buek testVar = "hello";
ambiak anotherVar = 123;

// When typing, both variables should appear in completion
cetak(testVar); // testVar should autocomplete
cetak(anotherVar); // anotherVar should autocomplete
```

**Function Definitions:**
```minangscript
karojo myFunction() {
    jadi "test";
}

// myFunction should appear in completion when typing
myFunction(); // Should autocomplete
```

**Method Completion:**
```minangscript
// Type cetak. and you should see:
cetak.pesan();   // Info message
cetak.rusak();   // Error message  
cetak.ameh();    // Warning message
cetak.hijau();   // Success message
cetak.biru();    // Info message
```

## Expected Results

### ✅ Working Features:
1. **Syntax Highlighting** - All MinangScript keywords properly colored
2. **Auto-completion** - Smart suggestions for keywords, functions, variables
3. **Hover Documentation** - Detailed info on hover
4. **Code Snippets** - Pre-built templates for common patterns
5. **Command Integration** - Run and compile commands available
6. **Cultural Keywords** - Special support for philosophy-based programming

### ✅ Cultural Integration:
- `gotongRoyong` - Collaborative programming pattern
- `musyawarah` - Consensus-based decision making
- `alamTakambang` - Learning and adaptive functions
- `adatBasandi` - Ethics-based programming

## Troubleshooting

**Extension not loading:**
1. Check if VS Code recognizes .minang files
2. Restart VS Code after installation
3. Check the Output panel for errors

**No syntax highlighting:**
1. Ensure file has .minang extension
2. Check if extension is active in Extensions panel
3. Try opening Command Palette and selecting "MinangScript" as language

**Commands not working:**
1. Install MinangScript CLI: `npm install -g minangscript`
2. Ensure MinangScript files are saved before running
3. Check terminal for error messages

## Development Notes

The extension includes:
- **TypeScript implementation** for better maintainability
- **Comprehensive language support** for all MinangScript features
- **Cultural philosophy integration** with proper documentation
- **VS Code API best practices** for optimal performance

## Next Steps

1. **Add Icon** - Create a proper extension icon (128x128 PNG)
2. **Enhance Formatting** - Implement advanced code formatting
3. **Error Detection** - Add real-time syntax error detection
4. **Publish to Marketplace** - Make available for public download
5. **Add Themes** - Create MinangScript-specific color themes

## Contributing

To contribute to the extension:
1. Fork the repository
2. Make changes in the `src/` directory
3. Run `npm run compile` to build
4. Test with F5 (Development Host)
5. Submit pull request

---

**Salamaik datang ka MinangScript IntelliSense! 🏔️**
