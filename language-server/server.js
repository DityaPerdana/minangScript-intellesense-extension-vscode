const {
    createConnection,
    TextDocuments,
    Diagnostic,
    DiagnosticSeverity,
    ProposedFeatures,
    InitializeParams,
    DidChangeConfigurationNotification,
    CompletionItem,
    CompletionItemKind,
    TextDocumentPositionParams,
    TextDocumentSyncKind,
    InitializeResult,
    HoverParams,
    Hover,
    MarkupKind
} = require('vscode-languageserver/node');

const { TextDocument } = require('vscode-languageserver-textdocument');

// Create a connection for the server
const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

// MinangScript language definitions
const MINANG_KEYWORDS = [
    'buek', 'ambiak', 'tagak', 'karojo', 'jadi', 'kalau', 'lain', 'kalauLain',
    'selamo', 'untuak', 'baronti', 'lanjuik', 'cetak', 'bana', 'salah', 'kosong',
    'gotongRoyong', 'musyawarah', 'alamTakambang', 'adatBasandi', 'kelas', 'extends'
];

const BUILTIN_FUNCTIONS = [
    'cetak', 'cetak.pesan', 'cetak.rusak', 'cetak.urai', 'cetak.info',
    'angko', 'kato', 'kabanaran', 'panjang', 'gabung', 'cari', 'ganti'
];

const CULTURAL_KEYWORDS = ['gotongRoyong', 'musyawarah', 'alamTakambang', 'adatBasandi'];

connection.onInitialize((params) => {
    const capabilities = params.capabilities;

    hasConfigurationCapability = !!(
        capabilities.workspace && !!capabilities.workspace.configuration
    );
    hasWorkspaceFolderCapability = !!(
        capabilities.workspace && !!capabilities.workspace.workspaceFolders
    );
    hasDiagnosticRelatedInformationCapability = !!(
        capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation
    );

    const result = {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ['.', '(', ' ']
            },
            hoverProvider: true,
            signatureHelpProvider: {
                triggerCharacters: ['(', ',']
            },
            definitionProvider: true,
            referencesProvider: true,
            documentSymbolProvider: true,
            workspaceSymbolProvider: true,
            codeActionProvider: true,
            documentFormattingProvider: true,
            documentRangeFormattingProvider: true,
            semanticTokensProvider: {
                legend: {
                    tokenTypes: [
                        'keyword', 'function', 'variable', 'string', 'number',
                        'comment', 'operator', 'class', 'interface', 'enum',
                        'type', 'parameter', 'property', 'namespace'
                    ],
                    tokenModifiers: [
                        'declaration', 'definition', 'readonly', 'static',
                        'deprecated', 'abstract', 'async', 'modification',
                        'documentation', 'defaultLibrary', 'cultural'
                    ]
                },
                full: true,
                range: true
            }
        }
    };

    if (hasWorkspaceFolderCapability) {
        result.capabilities.workspace = {
            workspaceFolders: {
                supported: true
            }
        };
    }

    connection.console.log('MinangScript Language Server initialized');
    return result;
});

connection.onInitialized(() => {
    if (hasConfigurationCapability) {
        connection.client.register(DidChangeConfigurationNotification.type, undefined);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders(_event => {
            connection.console.log('Workspace folder change event received.');
        });
    }
});

// Document settings
const defaultSettings = {
    maxNumberOfProblems: 1000,
    culturalKeywordsEnabled: true,
    diagnosticsEnabled: true
};

let globalSettings = defaultSettings;
const documentSettings = new Map();

connection.onDidChangeConfiguration(change => {
    if (hasConfigurationCapability) {
        documentSettings.clear();
    } else {
        globalSettings = (change.settings.minangscript || defaultSettings);
    }
    documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource) {
    if (!hasConfigurationCapability) {
        return Promise.resolve(globalSettings);
    }
    let result = documentSettings.get(resource);
    if (!result) {
        result = connection.workspace.getConfiguration({
            scopeUri: resource,
            section: 'minangscript'
        });
        documentSettings.set(resource, result);
    }
    return result;
}

documents.onDidClose(e => {
    documentSettings.delete(e.document.uri);
});

documents.onDidChangeContent(change => {
    validateTextDocument(change.document);
});

// Enhanced validation function
async function validateTextDocument(textDocument) {
    const settings = await getDocumentSettings(textDocument.uri);
    if (!settings.diagnosticsEnabled) return;

    const text = textDocument.getText();
    const lines = text.split(/\r?\n/g);
    const diagnostics = [];

    for (let i = 0; i < lines.length && diagnostics.length < settings.maxNumberOfProblems; i++) {
        const line = lines[i];
        
        // Check for syntax issues
        checkSyntaxIssues(line, i, diagnostics);
        
        // Check for cultural keyword opportunities
        if (settings.culturalKeywordsEnabled) {
            checkCulturalOpportunities(line, i, diagnostics);
        }
        
        // Check for undefined variables
        checkUndefinedVariables(line, i, text, diagnostics);
        
        // Check for best practices
        checkBestPractices(line, i, diagnostics);
    }

    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

function checkSyntaxIssues(line, lineNumber, diagnostics) {
    // Missing semicolon
    if (line.trim().match(/^(buek|ambiak|tagak|cetak)\s+.*[^;}]$/) && !line.includes('//')) {
        diagnostics.push({
            severity: DiagnosticSeverity.Information,
            range: {
                start: { line: lineNumber, character: line.length - 1 },
                end: { line: lineNumber, character: line.length }
            },
            message: 'Consider adding semicolon at end of statement',
            source: 'minangscript',
            code: 'missing-semicolon'
        });
    }

    // Incorrect function declaration
    const funcMatch = line.match(/^s*function\s+/);
    if (funcMatch) {
        diagnostics.push({
            severity: DiagnosticSeverity.Error,
            range: {
                start: { line: lineNumber, character: funcMatch.index },
                end: { line: lineNumber, character: funcMatch.index + funcMatch[0].length }
            },
            message: "Use 'karojo' instead of 'function' in MinangScript",
            source: 'minangscript',
            code: 'incorrect-function-keyword'
        });
    }

    // Incorrect variable declaration
    const varMatch = line.match(/^s*(var|let|const)\s+/);
    if (varMatch) {
        const suggestions = { var: 'buek', let: 'ambiak', const: 'tagak' };
        diagnostics.push({
            severity: DiagnosticSeverity.Error,
            range: {
                start: { line: lineNumber, character: varMatch.index },
                end: { line: lineNumber, character: varMatch.index + varMatch[0].length }
            },
            message: `Use '${suggestions[varMatch[1]]}' instead of '${varMatch[1]}' in MinangScript`,
            source: 'minangscript',
            code: 'incorrect-variable-keyword'
        });
    }
}

function checkCulturalOpportunities(line, lineNumber, diagnostics) {
    const opportunities = [
        { pattern: /collaborate|teamwork|cooperation/i, suggestion: 'gotongRoyong', message: 'Consider using MinangScript cultural concept: gotongRoyong (collaborative work)' },
        { pattern: /discuss|meeting|consensus/i, suggestion: 'musyawarah', message: 'Consider using MinangScript cultural concept: musyawarah (consensus building)' },
        { pattern: /learn|adapt|observe/i, suggestion: 'alamTakambang', message: 'Consider using MinangScript cultural concept: alamTakambang (learning from nature)' },
        { pattern: /ethics|moral|principle/i, suggestion: 'adatBasandi', message: 'Consider using MinangScript cultural concept: adatBasandi (ethical foundation)' }
    ];

    opportunities.forEach(opp => {
        if (opp.pattern.test(line)) {
            diagnostics.push({
                severity: DiagnosticSeverity.Hint,
                range: {
                    start: { line: lineNumber, character: 0 },
                    end: { line: lineNumber, character: line.length }
                },
                message: opp.message,
                source: 'minangscript-cultural',
                code: 'cultural-opportunity-' + opp.suggestion
            });
        }
    });
}

function checkUndefinedVariables(line, lineNumber, fullText, diagnostics) {
    const varUsage = line.match(/cetak\s*\(\s*(\w+)\s*\)/);
    if (varUsage && !fullText.includes(`buek ${varUsage[1]}`) && 
        !fullText.includes(`ambiak ${varUsage[1]}`) && 
        !fullText.includes(`tagak ${varUsage[1]}`)) {
        
        const varStart = line.indexOf(varUsage[1]);
        diagnostics.push({
            severity: DiagnosticSeverity.Warning,
            range: {
                start: { line: lineNumber, character: varStart },
                end: { line: lineNumber, character: varStart + varUsage[1].length }
            },
            message: `Variable '${varUsage[1]}' might not be defined`,
            source: 'minangscript',
            code: 'undefined-variable'
        });
    }
}

function checkBestPractices(line, lineNumber, diagnostics) {
    // Check for console.log instead of cetak
    if (line.includes('console.log')) {
        const start = line.indexOf('console.log');
        diagnostics.push({
            severity: DiagnosticSeverity.Information,
            range: {
                start: { line: lineNumber, character: start },
                end: { line: lineNumber, character: start + 'console.log'.length }
            },
            message: "Use 'cetak' instead of 'console.log' for MinangScript",
            source: 'minangscript',
            code: 'use-minang-print'
        });
    }

    // Check for proper indentation (basic check)
    if (line.match(/^\s*(karojo|kalau|selamo|untuak|kelas)/)) {
        const nextLineIndex = lineNumber + 1;
        // This is a simplified check - in real implementation, you'd track context
        diagnostics.push({
            severity: DiagnosticSeverity.Hint,
            range: {
                start: { line: lineNumber, character: 0 },
                end: { line: lineNumber, character: line.length }
            },
            message: 'Ensure proper indentation in block statements',
            source: 'minangscript-style',
            code: 'indentation-hint'
        });
    }
}

// Completion provider
connection.onCompletion((textDocumentPosition) => {
    const completions = [];
    
    // Add keywords
    MINANG_KEYWORDS.forEach(keyword => {
        completions.push({
            label: keyword,
            kind: CompletionItemKind.Keyword,
            detail: getKeywordDetail(keyword),
            documentation: getKeywordDocumentation(keyword),
            insertText: getKeywordSnippet(keyword),
            sortText: '1' + keyword
        });
    });
    
    // Add built-in functions
    BUILTIN_FUNCTIONS.forEach(func => {
        completions.push({
            label: func,
            kind: CompletionItemKind.Function,
            detail: getFunctionDetail(func),
            documentation: getFunctionDocumentation(func),
            insertText: getFunctionSnippet(func),
            sortText: '2' + func
        });
    });
    
    // Add cultural keywords with high priority
    CULTURAL_KEYWORDS.forEach(keyword => {
        completions.push({
            label: keyword,
            kind: CompletionItemKind.Class,
            detail: '🏔️ ' + getCulturalDetail(keyword),
            documentation: {
                kind: MarkupKind.Markdown,
                value: getCulturalDocumentation(keyword)
            },
            insertText: getCulturalSnippet(keyword),
            sortText: '0' + keyword  // Highest priority
        });
    });
    
    return completions;
});

// Completion resolve
connection.onCompletionResolve((item) => {
    // Add additional documentation or processing if needed
    return item;
});

// Hover provider
connection.onHover((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) return null;
    
    const position = params.position;
    const text = document.getText();
    const lines = text.split(/\r?\n/g);
    const line = lines[position.line];
    
    // Get word at position
    const wordMatch = line.match(/\w+/g);
    if (!wordMatch) return null;
    
    let targetWord = null;
    let charCount = 0;
    
    for (const word of wordMatch) {
        const wordStart = line.indexOf(word, charCount);
        const wordEnd = wordStart + word.length;
        
        if (position.character >= wordStart && position.character <= wordEnd) {
            targetWord = word;
            break;
        }
        charCount = wordEnd;
    }
    
    if (!targetWord) return null;
    
    // Provide hover information
    if (CULTURAL_KEYWORDS.includes(targetWord)) {
        return {
            contents: {
                kind: MarkupKind.Markdown,
                value: getCulturalHoverDocumentation(targetWord)
            }
        };
    }
    
    if (MINANG_KEYWORDS.includes(targetWord)) {
        return {
            contents: {
                kind: MarkupKind.Markdown,
                value: getKeywordHoverDocumentation(targetWord)
            }
        };
    }
    
    if (BUILTIN_FUNCTIONS.includes(targetWord)) {
        return {
            contents: {
                kind: MarkupKind.Markdown,
                value: getFunctionHoverDocumentation(targetWord)
            }
        };
    }
    
    return null;
});

// Helper functions for documentation
function getKeywordDetail(keyword) {
    const details = {
        'buek': '📦 Variable Declaration',
        'ambiak': '🔄 Let Declaration',
        'tagak': '🔒 Const Declaration',
        'karojo': '⚡ Function Declaration',
        'jadi': '↩️ Return Statement',
        'kalau': '❓ If Statement',
        'lain': '🔀 Else Statement',
        'selamo': '🔄 While Loop',
        'untuak': '🔁 For Loop',
        'cetak': '🖨️ Print Function'
    };
    return details[keyword] || 'MinangScript Keyword';
}

function getKeywordDocumentation(keyword) {
    // Return markdown documentation for keywords
    return `**${getKeywordDetail(keyword)}**\n\nMinangScript keyword for ${keyword}`;
}

function getKeywordSnippet(keyword) {
    const snippets = {
        'karojo': 'karojo ${1:namaFungsi}(${2:parameter}) {\n\t${3:// kode}\n\tjadi ${4:hasil};\n}',
        'kalau': 'kalau (${1:kondisi}) {\n\t${2:// kode}\n}',
        'buek': 'buek ${1:variabel} = ${2:nilai};'
    };
    return snippets[keyword] || keyword;
}

function getFunctionDetail(func) {
    return `Built-in function: ${func}`;
}

function getFunctionDocumentation(func) {
    return `**${func}**\n\nMinangScript built-in function`;
}

function getFunctionSnippet(func) {
    if (func.startsWith('cetak')) {
        return `${func}("pesan")`;
    }
    return `${func}()`;
}

function getCulturalDetail(keyword) {
    const details = {
        'gotongRoyong': 'Collaborative Work Philosophy',
        'musyawarah': 'Consensus Building Philosophy',
        'alamTakambang': 'Learning from Nature Philosophy',
        'adatBasandi': 'Ethical Foundation Philosophy'
    };
    return details[keyword] || 'Cultural Philosophy';
}

function getCulturalDocumentation(keyword) {
    const docs = {
        'gotongRoyong': '**🤝 Gotong Royong**\n\nCollaborative work and mutual assistance philosophy from Minangkabau culture.',
        'musyawarah': '**🗣️ Musyawarah Mufakat**\n\nConsensus building through discussion and deliberation.',
        'alamTakambang': '**🌿 Alam Takambang Jadi Guru**\n\nLearning from nature and experience as a teacher.',
        'adatBasandi': '**⚖️ Adat Basandi Syarak**\n\nEthical foundation based on traditional and religious values.'
    };
    return docs[keyword] || 'MinangScript cultural philosophy';
}

function getCulturalSnippet(keyword) {
    return `${keyword}({
    // cultural implementation
})`;
}

function getCulturalHoverDocumentation(keyword) {
    return `## 🏔️ ${keyword}\n\n${getCulturalDocumentation(keyword)}\n\n*Traditional Minangkabau wisdom integrated into modern programming.*`;
}

function getKeywordHoverDocumentation(keyword) {
    return `## ${getKeywordDetail(keyword)}\n\n${getKeywordDocumentation(keyword)}`;
}

function getFunctionHoverDocumentation(func) {
    return `## ${getFunctionDetail(func)}\n\n${getFunctionDocumentation(func)}`;
}

// Make the text document manager listen on the connection
documents.listen(connection);

// Listen on the connection
connection.listen();

module.exports = {
    connection,
    documents
};
