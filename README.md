# Obsidian Conditional Styling Plugin

A minimal Obsidian plugin that provides visual distinction in the file explorer based on frontmatter fields. Perfect for content creators who manage both published and draft content.

## Features

- **`share: true`** → **BOLD** text (published content)
- **`status: DRAFT`** → *italics* text (needs review)
- **Both present** → ***BOLD+ITALICS*** (published but still draft)
- Real-time updates when frontmatter changes
- Cumulative styling when multiple conditions are met

## Usage

Add frontmatter to your notes:

```yaml
---
share: true
status: DRAFT
---

# My Note Title

Note content here...
```

## Styling Examples

| Frontmatter | File Explorer Appearance | Description |
|-------------|-------------------------|-------------|
| `share: true` | **My Note** | Published content |
| `status: DRAFT` | *My Note* | Draft content |
| Both fields | ***My Note*** | Published but needs review |
| Neither field | My Note | Regular note |

## Installation

> **Note:** This plugin is not yet submitted to the official Obsidian Community Plugins registry. Only manual installation is available for now.

### Manual Installation
1. Download the latest release from GitHub
2. Extract to `YourVault/.obsidian/plugins/obsidian-conditional-styling/`
3. Enable the plugin in Obsidian settings
4. Check "Safe mode" is disabled in Community Plugins settings

## Development

This plugin uses TypeScript and follows the standard Obsidian plugin template structure.

### Building
```bash
npm install
npm run build
```

The built files (`main.js`, `manifest.json`, `styles.css`) are ready to be copied to your Obsidian vault.

## Contributing

This is a minimal MVP focused on the core functionality. Feel free to submit issues or pull requests for additional features.

## License

0-BSD License
