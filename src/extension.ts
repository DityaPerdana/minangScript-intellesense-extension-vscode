import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// MinangScript language constants
const MINANG_KEYWORDS = [
    'buek', 'ambiak', 'tagak', 'karojo', 'jadi', 'kalau', 'lain', 'kalauLain',
    'selamo', 'untuak', 'baronti', 'lanjuik', 'cetak', 'bana', 'salah', 'kosong',
    'gotongRoyong', 'musyawarah', 'alamTakambang', 'adatBasandi'
];

const BUILTIN_FUNCTIONS = [
    'cetak', 'cetak.pesan', 'cetak.rusak', 'cetak.urai', 'cetak.info', 
    'cetak.ameh', 'cetak.hijau', 'cetak.biru', 'angko', 'kato', 'kabanaran'
];

const CULTURAL_KEYWORDS = [
    'gotongRoyong', 'musyawarah', 'alamTakambang', 'adatBasandi'
];

const OPERATORS = [
    '+', '-', '*', '/', '%', '=', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '!'
];

interface MinangKeywordInfo {
    detail: string;
    documentation: string;
    insertText?: string;
    kind: vscode.CompletionItemKind;
}

interface MinangFunctionInfo {
    detail: string;
    documentation: string;
    signature: string;
    parameters: string[];
    returnType: string;
}

/**
 * Enhanced MinangScript Completion Provider with improved IntelliSense
 */
export class MinangScriptCompletionProvider implements vscode.CompletionItemProvider {
    
    private keywordInfo: Map<string, MinangKeywordInfo> = new Map();
    private functionInfo: Map<string, MinangFunctionInfo> = new Map();

    constructor() {
        this.initializeKeywordInfo();
        this.initializeFunctionInfo();
    }

    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        
        const completionItems: vscode.CompletionItem[] = [];
        const lineText = document.lineAt(position).text;
        const linePrefix = lineText.substring(0, position.character);

        // Check if we're completing after a dot (for method completion)
        const dotMatch = linePrefix.match(/(\w+)\.(\w*)$/);
        if (dotMatch) {
            return this.provideMethodCompletions(dotMatch[1]);
        }

        // Provide keyword completions
        this.addKeywordCompletions(completionItems);
        
        // Provide function completions
        this.addFunctionCompletions(completionItems);
        
        // Provide variable completions from current file
        this.addVariableCompletions(document, completionItems);
        
        // Provide cultural keyword completions
        this.addCulturalKeywordCompletions(completionItems);

        return completionItems;
    }

    private provideMethodCompletions(objectName: string): vscode.CompletionItem[] {
        const completions: vscode.CompletionItem[] = [];
        
        if (objectName === 'cetak') {
            const methods = ['pesan', 'rusak', 'urai', 'info', 'ameh', 'hijau', 'biru'];
            methods.forEach(method => {
                const item = new vscode.CompletionItem(method, vscode.CompletionItemKind.Method);
                const funcInfo = this.functionInfo.get(`cetak.${method}`);
                if (funcInfo) {
                    item.detail = funcInfo.detail;
                    item.documentation = new vscode.MarkdownString(funcInfo.documentation);
                    item.insertText = new vscode.SnippetString(`${method}(\${1:message})`);
                }
                completions.push(item);
            });
        }
        
        return completions;
    }

    private addKeywordCompletions(completionItems: vscode.CompletionItem[]): void {
        MINANG_KEYWORDS.forEach(keyword => {
            const info = this.keywordInfo.get(keyword);
            if (info) {
                const item = new vscode.CompletionItem(keyword, info.kind);
                item.detail = info.detail;
                item.documentation = new vscode.MarkdownString(info.documentation);
                
                if (info.insertText) {
                    item.insertText = new vscode.SnippetString(info.insertText);
                }
                
                completionItems.push(item);
            }
        });
    }

    private addFunctionCompletions(completionItems: vscode.CompletionItem[]): void {
        BUILTIN_FUNCTIONS.forEach(func => {
            const info = this.functionInfo.get(func);
            if (info) {
                const item = new vscode.CompletionItem(func, vscode.CompletionItemKind.Function);
                item.detail = info.detail;
                item.documentation = new vscode.MarkdownString(
                    `**${func}**${info.signature}\n\n${info.documentation}\n\n**Returns:** ${info.returnType}`
                );
                
                // Create snippet for function with parameters
                const paramSnippets = info.parameters.map((param, index) => `\${${index + 1}:${param}}`).join(', ');
                item.insertText = new vscode.SnippetString(`${func}(${paramSnippets})`);
                
                completionItems.push(item);
            }
        });
    }

    private addVariableCompletions(document: vscode.TextDocument, completionItems: vscode.CompletionItem[]): void {
        const text = document.getText();
        const variablePattern = /(?:buek|ambiak|tagak)\s+(\w+)/g;
        const variables = new Set<string>();
        
        let match;
        while ((match = variablePattern.exec(text)) !== null) {
            variables.add(match[1]);
        }
        
        variables.forEach(variable => {
            const item = new vscode.CompletionItem(variable, vscode.CompletionItemKind.Variable);
            item.detail = 'User Variable';
            item.documentation = new vscode.MarkdownString(`Variable declared in current file`);
            completionItems.push(item);
        });

        // Also find function definitions
        const functionPattern = /karojo\s+(\w+)/g;
        while ((match = functionPattern.exec(text)) !== null) {
            const item = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Function);
            item.detail = 'User Function';
            item.documentation = new vscode.MarkdownString(`Function defined in current file`);
            completionItems.push(item);
        }
    }

    private addCulturalKeywordCompletions(completionItems: vscode.CompletionItem[]): void {
        CULTURAL_KEYWORDS.forEach(keyword => {
            const item = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Class);
            item.detail = 'Cultural Philosophy';
            item.documentation = new vscode.MarkdownString(this.getCulturalKeywordDocumentation(keyword));
            completionItems.push(item);
        });
    }

    private initializeKeywordInfo(): void {
        this.keywordInfo.set('buek', {
            detail: 'Variable Declaration',
            documentation: 'Creates a variable. Example: `buek umur = 25;`',
            insertText: 'buek ${1:variableName} = ${2:value};',
            kind: vscode.CompletionItemKind.Keyword
        });

        this.keywordInfo.set('ambiak', {
            detail: 'Let Declaration',
            documentation: 'Let variable declaration with block scope. Example: `ambiak nama = "Siti";`',
            insertText: 'ambiak ${1:variableName} = ${2:value};',
            kind: vscode.CompletionItemKind.Keyword
        });

        this.keywordInfo.set('tagak', {
            detail: 'Const Declaration',
            documentation: 'Constant declaration. Example: `tagak PI = 3.14159;`',
            insertText: 'tagak ${1:CONSTANT_NAME} = ${2:value};',
            kind: vscode.CompletionItemKind.Keyword
        });

        this.keywordInfo.set('karojo', {
            detail: 'Function Declaration',
            documentation: 'Function definition. Example: `karojo salam() { cetak("Halo!"); }`',
            insertText: 'karojo ${1:functionName}(${2:parameters}) {\n\t${3:// function body}\n\tjadi ${4:result};\n}',
            kind: vscode.CompletionItemKind.Keyword
        });

        this.keywordInfo.set('kalau', {
            detail: 'If Statement',
            documentation: 'Conditional statement. Example: `kalau (umur > 18) { cetak("Dewasa"); }`',
            insertText: 'kalau (${1:condition}) {\n\t${2:// code block}\n}',
            kind: vscode.CompletionItemKind.Keyword
        });

        this.keywordInfo.set('selamo', {
            detail: 'While Loop',
            documentation: 'While loop. Example: `selamo (i < 10) { i++; }`',
            insertText: 'selamo (${1:condition}) {\n\t${2:// loop body}\n}',
            kind: vscode.CompletionItemKind.Keyword
        });

        this.keywordInfo.set('untuak', {
            detail: 'For Loop',
            documentation: 'For loop. Example: `untuak (buek i = 0; i < 5; i++) {}`',
            insertText: 'untuak (buek ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t${3:// loop body}\n}',
            kind: vscode.CompletionItemKind.Keyword
        });

        // Add more keywords...
        this.keywordInfo.set('jadi', {
            detail: 'Return Statement',
            documentation: 'Return statement. Example: `jadi hasil;`',
            insertText: 'jadi ${1:value};',
            kind: vscode.CompletionItemKind.Keyword
        });
    }

    private initializeFunctionInfo(): void {
        this.functionInfo.set('cetak', {
            detail: 'Console Output',
            documentation: 'Basic console output function',
            signature: '(value: any): void',
            parameters: ['value'],
            returnType: 'void'
        });

        this.functionInfo.set('cetak.pesan', {
            detail: 'Info Message',
            documentation: 'Display informational message with formatting',
            signature: '(message: string): void',
            parameters: ['message'],
            returnType: 'void'
        });

        this.functionInfo.set('cetak.rusak', {
            detail: 'Error Message',
            documentation: 'Display error message in red color',
            signature: '(error: string): void',
            parameters: ['error'],
            returnType: 'void'
        });

        this.functionInfo.set('angko', {
            detail: 'Number Constructor',
            documentation: 'Convert value to number type',
            signature: '(value: any): number',
            parameters: ['value'],
            returnType: 'number'
        });

        this.functionInfo.set('kato', {
            detail: 'String Constructor',
            documentation: 'Convert value to string type',
            signature: '(value: any): string',
            parameters: ['value'],
            returnType: 'string'
        });

        this.functionInfo.set('kabanaran', {
            detail: 'Boolean Constructor',
            documentation: 'Convert value to boolean type',
            signature: '(value: any): boolean',
            parameters: ['value'],
            returnType: 'boolean'
        });
    }

    private getCulturalKeywordDocumentation(keyword: string): string {
        const docs: { [key: string]: string } = {
            'gotongRoyong': '**Gotong Royong** - Community collaboration principle. Use for collaborative functions that work together toward a common goal.',
            'musyawarah': '**Musyawarah Mufakat** - Consensus-based decision making. Use for functions that require agreement and collaborative decision-making.',
            'alamTakambang': '**Alam Takambang Jadi Guru** - Learning from nature. Use for adaptive and learning functions that evolve based on experience.',
            'adatBasandi': '**Adat Basandi Syarak** - Ethics-based practices. Use for functions with ethical considerations and value-based implementations.'
        };
        return docs[keyword] || 'Cultural philosophy keyword';
    }
}

/**
 * Enhanced MinangScript Hover Provider
 */
export class MinangScriptHoverProvider implements vscode.HoverProvider {
    
    private completionProvider: MinangScriptCompletionProvider;

    constructor() {
        this.completionProvider = new MinangScriptCompletionProvider();
    }

    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {
        
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) return;
        
        const word = document.getText(wordRange);
        
        if (MINANG_KEYWORDS.includes(word)) {
            const detail = this.getKeywordDetail(word);
            const documentation = this.getKeywordDocumentation(word);
            
            return new vscode.Hover([
                new vscode.MarkdownString(`**${word}** - ${detail}`),
                new vscode.MarkdownString(documentation)
            ]);
        }
        
        if (BUILTIN_FUNCTIONS.includes(word)) {
            const detail = this.getFunctionDetail(word);
            const documentation = this.getFunctionDocumentation(word);
            
            return new vscode.Hover([
                new vscode.MarkdownString(`**${word}** - ${detail}`),
                new vscode.MarkdownString(documentation)
            ]);
        }
        
        if (CULTURAL_KEYWORDS.includes(word)) {
            const documentation = this.getCulturalKeywordDocumentation(word);
            
            return new vscode.Hover([
                new vscode.MarkdownString(`**${word}** - Cultural Philosophy`),
                new vscode.MarkdownString(documentation)
            ]);
        }
        
        return null;
    }

    private getKeywordDetail(keyword: string): string {
        // Implementation from the original class
        const details: { [key: string]: string } = {
            'buek': 'Variable Declaration',
            'ambiak': 'Let Declaration',
            'tagak': 'Const Declaration',
            'karojo': 'Function Declaration',
            'jadi': 'Return Statement',
            'kalau': 'If Statement',
            'lain': 'Else Statement',
            'kalauLain': 'Else If Statement',
            'selamo': 'While Loop',
            'untuak': 'For Loop',
            'baronti': 'Break Statement',
            'lanjuik': 'Continue Statement',
            'cetak': 'Print Function',
            'bana': 'Boolean True',
            'salah': 'Boolean False',
            'kosong': 'Null Value'
        };
        return details[keyword] || 'MinangScript Keyword';
    }

    private getKeywordDocumentation(keyword: string): string {
        // Implementation from the original class
        const docs: { [key: string]: string } = {
            'buek': 'Creates a variable. Example: `buek umur = 25;`',
            'ambiak': 'Let variable declaration with block scope. Example: `ambiak nama = "Siti";`',
            'tagak': 'Constant declaration. Example: `tagak PI = 3.14159;`',
            'karojo': 'Function definition. Example: `karojo salam() { cetak("Halo!"); }`',
            'jadi': 'Return statement. Example: `jadi hasil;`',
            'kalau': 'Conditional statement. Example: `kalau (umur > 18) { cetak("Dewasa"); }`',
            'lain': 'Else clause for conditional. Example: `kalau (kondisi) {} lain {}`',
            'selamo': 'While loop. Example: `selamo (i < 10) { i++; }`',
            'untuak': 'For loop. Example: `untuak (buek i = 0; i < 5; i++) {}`',
            'cetak': 'Print to console. Example: `cetak("Hello MinangScript!");`',
            'bana': 'Boolean true value',
            'salah': 'Boolean false value',
            'kosong': 'Null/empty value'
        };
        return docs[keyword] || 'MinangScript language construct';
    }

    private getFunctionDetail(func: string): string {
        const details: { [key: string]: string } = {
            'cetak': 'Console Output',
            'cetak.pesan': 'Info Message',
            'cetak.rusak': 'Error Message',
            'cetak.urai': 'Detailed Output',
            'cetak.info': 'Information',
            'cetak.ameh': 'Warning (Yellow)',
            'cetak.hijau': 'Success (Green)',
            'cetak.biru': 'Info (Blue)',
            'angko': 'Number Constructor',
            'kato': 'String Constructor',
            'kabanaran': 'Boolean Constructor'
        };
        return details[func] || 'Built-in Function';
    }

    private getFunctionDocumentation(func: string): string {
        const docs: { [key: string]: string } = {
            'cetak': 'Basic console output function',
            'cetak.pesan': 'Display informational message with formatting',
            'cetak.rusak': 'Display error message in red color',
            'cetak.urai': 'Display detailed object/variable information',
            'cetak.info': 'Display general information',
            'cetak.ameh': 'Display warning message in yellow color',
            'cetak.hijau': 'Display success message in green color',
            'cetak.biru': 'Display info message in blue color',
            'angko': 'Convert value to number type',
            'kato': 'Convert value to string type',
            'kabanaran': 'Convert value to boolean type'
        };
        return docs[func] || 'MinangScript built-in function';
    }

    private getCulturalKeywordDocumentation(keyword: string): string {
        const docs: { [key: string]: string } = {
            'gotongRoyong': '**Gotong Royong** - Community collaboration principle. Use for collaborative functions that work together.',
            'musyawarah': '**Musyawarah Mufakat** - Consensus-based decision making. Use for functions that require agreement.',
            'alamTakambang': '**Alam Takambang Jadi Guru** - Learning from nature. Use for adaptive and learning functions.',
            'adatBasandi': '**Adat Basandi Syarak** - Ethics-based practices. Use for functions with ethical considerations.'
        };
        return docs[keyword] || 'Cultural philosophy keyword';
    }
}

/**
 * Extension activation function
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('MinangScript IntelliSense extension is now active!');
    
    // Register providers
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'minangscript',
        new MinangScriptCompletionProvider(),
        '.', ' '
    );
    
    const hoverProvider = vscode.languages.registerHoverProvider(
        'minangscript',
        new MinangScriptHoverProvider()
    );
    
    // Register commands
    const runFileCommand = vscode.commands.registerCommand('minangscript.runFile', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No MinangScript file is open');
            return;
        }
        
        const filePath = editor.document.fileName;
        if (!filePath.endsWith('.minang')) {
            vscode.window.showErrorMessage('Please open a MinangScript (.minang) file');
            return;
        }
        
        const terminal = vscode.window.createTerminal('MinangScript');
        terminal.sendText(`minang run "${filePath}"`);
        terminal.show();
    });
    
    const compileFileCommand = vscode.commands.registerCommand('minangscript.compileFile', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No MinangScript file is open');
            return;
        }
        
        const filePath = editor.document.fileName;
        if (!filePath.endsWith('.minang')) {
            vscode.window.showErrorMessage('Please open a MinangScript (.minang) file');
            return;
        }
        
        const terminal = vscode.window.createTerminal('MinangScript');
        terminal.sendText(`minang build "${filePath}"`);
        terminal.show();
    });
    
    const formatDocumentCommand = vscode.commands.registerCommand('minangscript.formatDocument', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No MinangScript file is open');
            return;
        }
        
        if (!editor.document.fileName.endsWith('.minang')) {
            vscode.window.showErrorMessage('Please open a MinangScript (.minang) file');
            return;
        }
        
        vscode.window.showInformationMessage('MinangScript formatting feature coming soon!');
    });
    
    // Add subscriptions
    context.subscriptions.push(
        completionProvider,
        hoverProvider,
        runFileCommand,
        compileFileCommand,
        formatDocumentCommand
    );
    
    // Show welcome message
    vscode.window.showInformationMessage(
        'MinangScript IntelliSense activated! Salamaik datang ka MinangScript! 🏔️'
    );
}

/**
 * Extension deactivation function
 */
export function deactivate() {
    console.log('MinangScript IntelliSense extension is deactivated');
}
