# Minimal MVP: Obsidian Conditional Styling Plugin

## Goal
Add visual distinction in the file explorer for files based on frontmatter:
- `share: true` → BOLD (published content)
- `status: DRAFT` → ITALICS (needs review)
- Both → BOLD + ITALICS (published but still draft)

## Core Requirements
1. Detect `share: true` and `status: DRAFT` in file frontmatter
2. Apply cumulative text styling in file explorer (BOLD and/or ITALICS)
3. Update styling automatically when frontmatter changes

## Implementation
- Use Obsidian's official plugin template
- Monitor frontmatter cache changes
- Apply CSS styles to file explorer items:
  - `share: true` → BOLD text
  - `status: DRAFT` → ITALICS text
  - Both present → BOLD + ITALICS text
- Handle missing/other status fields gracefully

## That's it.
No settings, no customization, no extra features. Just cumulative BOLD/ITALICS styling for published and draft content.
