import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as os from 'os';
import * as fs from 'fs';

/**
 * 检测当前打开文件的类型
 * @returns 返回当前打开文件的类型（扩展名）
 */
function detectCurrentFileType(): string | undefined {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return undefined;
	}

	const filePath = editor.document.uri.fsPath;
	const fileExtension = filePath.split('.').pop()?.toLowerCase();

	return fileExtension;
}

/**
 * 检测当前工程是Python项目还是Java项目
 * @returns 'python' | 'java' | 'unknown'
 */
function detectProjectType(): string {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders || workspaceFolders.length === 0) {
		return 'unknown';
	}

	const projectPath = workspaceFolders[0].uri.fsPath;

	// 检查是否存在Python项目特征文件
	if (
		fs.existsSync(`${projectPath}/requirements.txt`) ||
		fs.existsSync(`${projectPath}/setup.py`) ||
		fs.existsSync(`${projectPath}/Pipfile`) ||
		fs.existsSync(`${projectPath}/pyproject.toml`)
	) {
		return 'python';
	}

	// 检查是否存在Java项目特征文件
	if (
		fs.existsSync(`${projectPath}/pom.xml`) ||
		fs.existsSync(`${projectPath}/build.gradle`) ||
		fs.existsSync(`${projectPath}/gradlew`) ||
		fs.existsSync(`${projectPath}/.classpath`)
	) {
		return 'java';
	}

	// 如果没有明确的标志，尝试通过文件扩展名判断
	try {
		const files = fs.readdirSync(projectPath);
		let javaCount = 0;
		let pythonCount = 0;

		for (const file of files) {
			if (file.endsWith('.java')) {
				javaCount++;
			} else if (file.endsWith('.py')) {
				pythonCount++;
			}

			// 如果找到足够的文件，提前返回结果
			if (javaCount > 5) {
				return 'java';
			}
			if (pythonCount > 5) {
				return 'python';
			}
		}

		// 根据文件数量比较
		if (javaCount > pythonCount) {
			return 'java';
		} else if (pythonCount > javaCount) {
			return 'python';
		}
	} catch (error) {
		console.error('检测项目类型时出错:', error);
	}

	return 'unknown';
}

function getMacIdeaPath(fileType: string | undefined, projectType: string): string {
	const ideaPaths = [
		'/Applications/IDEA.app',
		'/Applications/IntelliJ IDEA.app',
		'/Applications/IntelliJ IDEA CE.app',
		'/Applications/IntelliJ IDEA Ultimate.app',
		'/Applications/IntelliJ IDEA Community Edition.app',
		`${os.homedir()}/Applications/IDEA.app`,
		`${os.homedir()}/Applications/IntelliJ IDEA.app`,
		`${os.homedir()}/Applications/IntelliJ IDEA CE.app`,
		`${os.homedir()}/Applications/IntelliJ IDEA Ultimate.app`,
		`${os.homedir()}/Applications/IntelliJ IDEA Community Edition.app`,
	];
	const pycharmPaths = [
		`/Applications/PyCharm Community Edition.app`,
		`/Applications/PyCharm Professional Edition.app`,
		`${os.homedir()}/Applications/PyCharm Community Edition.app`,
		`${os.homedir()}/Applications/PyCharm Professional Edition.app`,
	];

	const commonPaths = {
		'idea': ideaPaths,
		'pycharm': pycharmPaths,
	};

	var paths: string[] = [];
	if (projectType === 'unknown') {
		return 'IntelliJ IDEA';
	} else if (projectType === 'python' || fileType === 'py') {
		paths = commonPaths.pycharm;
	} else if (projectType === 'java' || fileType === 'java') {
		paths = commonPaths.idea;
	}

	// Iterate through all possible IDEA installation paths and return the first existing path
	for (const path of paths) {
		if (fs.existsSync(path)) {
			return path;
		}
	}
	// If no paths exist, return the default APP name
	return 'IntelliJ IDEA';
}

function executeCommand(command: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const childProcess = exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error('Error executing command:', error);
				console.error('Stderr:', stderr);
				reject(error);
				return;
			}
			if (stdout) {
				console.log('Command output:', stdout);
			}
			if (stderr) {
				console.log('Command stderr:', stderr);
			}
			resolve();
		});

		// Add error handling
		childProcess.on('error', (error: NodeJS.ErrnoException) => {
			if (error.code === 'EPIPE') {
				console.log('Pipe communication disconnected, but this may not affect IDEA startup');
				resolve(); // Continue execution as IDEA may have started normally
			} else {
				reject(error);
			}
		});
	});
}

function getIdeaPath(config: vscode.WorkspaceConfiguration, fileType: string | undefined, projectType: string): string {
	let ideaPath = config.get<string>('switch2jetbrains.ideaPath');
	let eapIdeaPath = config.get<string>('switch2jetbrains.eapIdeaPath') 
	let useIdeaEAP = config.get<boolean>('switch2jetbrains.useIdeaEAP') 
	let pycharmPath = config.get<string>('switch2jetbrains.pycharmPath')

	if (projectType === 'python' || fileType === 'py') {
		ideaPath = pycharmPath;
	} else if (projectType === 'java' || fileType === 'java') {
		if (useIdeaEAP && eapIdeaPath) {
			ideaPath = eapIdeaPath;
		}
	}
	if (!ideaPath) {
		if (os.platform() === 'darwin') {
			ideaPath = getMacIdeaPath(fileType, projectType);
		} else if (os.platform() === 'win32') {
			ideaPath = 'C:\\Program Files\\JetBrains\\IntelliJ IDEA\\bin\\idea64.exe';
		} else {
			ideaPath = 'idea';
		}
	}
	return ideaPath;
}


export function activate(context: vscode.ExtensionContext) {

	console.log('Switch2JetBrains is now active!');

	let openFileDisposable = vscode.commands.registerCommand('Switch2JetBrains.openFileInJetBrains', async (uri?: vscode.Uri) => {
		let filePath: string;
		let line = 1;
		let column = 1;

		if (uri) {
			filePath = uri.fsPath;
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.document.uri.fsPath === filePath) {
				line = editor.selection.active.line + 1;
				column = editor.selection.active.character;
			}
		} else {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage('No active editor!');
				return;
			}
			filePath = editor.document.uri.fsPath;
			line = editor.selection.active.line + 1;
			column = editor.selection.active.character;
		}

		const projectType = detectProjectType();
		const fileType = detectCurrentFileType();

		const config = vscode.workspace.getConfiguration();
		let ideaPath = getIdeaPath(config, fileType, projectType)

		let command: string;
		if (os.platform() === 'darwin') {
			const ideaUrl = `idea://open?file=${encodeURIComponent(filePath)}&line=${line}&column=${column}`;
			// If IDEA is already open, using the 'idea' command will show two IDEA icons in the dock temporarily
			// Using the 'open' command instead will prevent this issue
			command = `open -a "${ideaPath}" "${ideaUrl}"`;
		} else {
			command = `"${ideaPath}" --line ${line} --column ${column} "${filePath}"`;
		}

		console.log('Executing command:', command);

		try {
			await executeCommand(command);
		} catch (error) {
			const err = error as Error;
			vscode.window.showErrorMessage(`Failed to open IDEA: ${err.message}`);
		}
	});

	let openProjectDisposable = vscode.commands.registerCommand('Switch2JetBrains.openProjectInJetBrains', async () => {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders || workspaceFolders.length === 0) {
			vscode.window.showErrorMessage('No workspace folder is opened!');
			return;
		}

		const projectPath = workspaceFolders[0].uri.fsPath;

		const projectType = detectProjectType();
		const fileType = detectCurrentFileType();

		const config = vscode.workspace.getConfiguration();
		let ideaPath = getIdeaPath(config, fileType, projectType)

		let command: string;
		if (os.platform() === 'darwin') {
			const ideaUrl = `idea://open?file=${encodeURIComponent(projectPath)}`;
			command = `open -a "${ideaPath}" "${ideaUrl}"`;
		} else {
			command = `"${ideaPath}" "${projectPath}"`;
		}

		console.log('Executing command:', command);

		try {
			await executeCommand(command);
		} catch (error) {
			const err = error as Error;
			vscode.window.showErrorMessage(`Failed to open project in IDEA: ${err.message}`);
		}
	});

	context.subscriptions.push(openFileDisposable);
	context.subscriptions.push(openProjectDisposable);
}

export function deactivate() {}
