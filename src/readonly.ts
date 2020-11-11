
import * as vscode from 'vscode';
import * as fs from 'fs';


export function registerReadonlyEditors(context: vscode.ExtensionContext) {


	vscode.workspace.registerTextDocumentContentProvider('rofile', new TextDocumentContentProvider());

	let disposable = vscode.commands.registerCommand('r.lsp.openAsReadonly', async () => {
        openActiveFileAsReadonly();
	});

	context.subscriptions.push(disposable);
}

function openActiveFileAsReadonly(){
    const editor = vscode.window.activeTextEditor;

    if(!editor){
        return undefined;
    }

    const uri = editor.document.uri;

    const uri1 = uri.with({scheme: 'rofile'});

    const editor2 = vscode.window.showTextDocument(uri1);

    return editor2;
}


class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {
    provideTextDocumentContent(uri: vscode.Uri) {
        const uri0 = uri.with({scheme: 'file'});
        const text = fs.readFileSync(uri0.fsPath, 'utf-8');
        return text;
    }
}
