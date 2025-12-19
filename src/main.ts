import {App, Plugin, TFile, WorkspaceLeaf} from 'obsidian';

export default class ConditionalStylingPlugin extends Plugin {
	async onload() {
		// Initial styling of all files
		this.updateAllFileStyling();
		
		// Listen for file changes
		this.registerEvent(
			this.app.vault.on('modify', (file) => {
				if (file instanceof TFile && file.extension === 'md') {
					this.updateFileStyling(file);
				}
			})
		);
		
		// Listen for file opens/closes to refresh styling
		this.registerEvent(
			this.app.workspace.on('file-open', (file) => {
				this.updateAllFileStyling();
			})
		);
	}

	onunload() {
		this.removeAllStyling();
	}

	updateAllFileStyling() {
		const files = this.app.vault.getMarkdownFiles();
		files.forEach(file => this.updateFileStyling(file));
	}

	updateFileStyling(file: TFile) {
		const frontmatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
		
		// Get file explorer item
		const fileItem = this.getFileExplorerItem(file.path);
		if (!fileItem) return;

		// Remove existing styling classes
		fileItem.classList.remove('conditional-share-bold', 'conditional-draft-italic');
		
		// Apply new styling based on frontmatter
		const isShared = frontmatter?.share === true;
		const isDraft = frontmatter?.status === 'DRAFT';
		
		if (isShared) {
			fileItem.classList.add('conditional-share-bold');
		}
		
		if (isDraft) {
			fileItem.classList.add('conditional-draft-italic');
		}
	}

	getFileExplorerItem(filePath: string): HTMLElement | null {
		// Find the file explorer view
		const fileExplorer = this.app.workspace.getLeavesOfType('file-explorer')[0];
		if (!fileExplorer) return null;
		
		// Find the file item in the explorer
		const fileItems = fileExplorer.view.containerEl.querySelectorAll('[data-path]');
		for (let i = 0; i < fileItems.length; i++) {
			const item = fileItems[i] as HTMLElement;
			if (item.getAttribute('data-path') === filePath) {
				// Find the actual title/span element within the file item
				const titleEl = item.querySelector('.nav-file-title-content, .tree-item-self');
				return titleEl as HTMLElement || item;
			}
		}
		
		return null;
	}

	removeAllStyling() {
		const files = this.app.vault.getMarkdownFiles();
		files.forEach(file => {
			const fileItem = this.getFileExplorerItem(file.path);
			if (fileItem) {
				fileItem.classList.remove('conditional-share-bold', 'conditional-draft-italic');
			}
		});
	}
}
