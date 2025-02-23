// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { scanCode } from './scanner';
import { ESLint } from 'eslint';
import { scanForSQLInjection } from './owasp/sql-injection.rule';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "security-analyzer" is now active!');
	

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	//const disposable1 = vscode.commands.registerCommand('security-analyzer.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from security-analyzer!');
		// open a browser window
//vscode.env.openExternal (vscode.Uri.parse('https://www.google.com/search?q=cute+animals&tbm=isch.'));
	//});


	let disposable = vscode.commands.registerCommand('security-analyzer.helloWorld', () => {
		const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showInformationMessage('Open a file to scan for vulnerabilities.');
            return;
        }

        const code = editor.document.getText();
        const issues = scanForSQLInjection(code);
		const decorationsArray: vscode.DecorationOptions[] = [];
        if (issues.length > 0) {
            issues.forEach(issue => {
				const { line, message } = issue;
				const range = new vscode.Range(line, 0, line, editor.document.lineAt(line).text.length);
				
				const decoration: vscode.DecorationOptions = { 
					range, 
					hoverMessage: `⚠️ ${message}` 
				};
			
				decorationsArray.push(decoration);
			});

            const decorationType = vscode.window.createTextEditorDecorationType({
                backgroundColor: 'rgba(255,0,0,0.3)',
                overviewRulerColor: 'red',
                overviewRulerLane: vscode.OverviewRulerLane.Right,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'red'
            });

            editor.setDecorations(decorationType, decorationsArray);
            vscode.window.showErrorMessage(`Security Issues Found: Check the highlighted lines.`);
        } else {
            vscode.window.showInformationMessage('No security vulnerabilities detected.');
        }
    });
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
