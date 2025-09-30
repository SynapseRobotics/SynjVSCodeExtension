"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
function activate(context) {
    const provider = vscode.languages.registerCompletionItemProvider('synj', {
        provideCompletionItems(document, position, token, context) {
            // Completion for the main keywords
            const keywords = [
                'model_name', 'algorithm', 'csv_path', 'train_test_split', 'target',
                'features', 'classes', 'epochs', 'learning_rate', 'batch_size',
                'early_stop', 'output_path'
            ];
            const keywordCompletions = keywords.map(keyword => {
                const item = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword);
                // item.insertText = `${keyword} = `;
                item.insertText = new vscode.SnippetString(`${keyword} = $1;`);
                return item;
            });
            // Completion for the algorithm type
            const algorithmType = ['LinearRegression', 'LogisticRegression'];
            const algorithmCompletions = algorithmType.map(algorithm => new vscode.CompletionItem(algorithm, vscode.CompletionItemKind.EnumMember));
            // Return a combined list of all possible completions
            return [
                ...keywordCompletions,
                ...algorithmCompletions,
                new vscode.CompletionItem('NULL', vscode.CompletionItemKind.Value)
            ];
        }
    });
    context.subscriptions.push(provider);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map