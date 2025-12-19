# Building an Obsidian Plugin: From Concept to Reality in 2 Hours

## The Problem

As a content creator managing both published and draft content in Obsidian, I faced a common workflow challenge: distinguishing between notes that were ready for publication versus those still in draft form. Looking at my file explorer, every note looked identical - I had to manually open each one to check its frontmatter status.

My specific needs were simple:
- **Bold** text for published notes (`share: true`)  
- **Italic** text for draft notes (`status: DRAFT`)
- **Bold+Italic** for published notes still in draft (needing review first)

## The Goal vs Reality Gap

I started with what seemed like a straightforward request, but wanted to keep it minimal. No settings, no customization - just the exact functionality I needed. This approach would save development time and keep the plugin focused.

## Learning Journey: 5 Key Lessons

### Lesson 1: Start with a Clear PRD (Product Requirements Document)

My initial draft was comprehensive - almost too comprehensive. It included:
- Complex settings panels
- Multiple customization options  
- Performance tracking
- Future roadmaps

**The reality:** I just needed bold/italics styling based on two frontmatter fields. Scaling back to a minimalist approach saved hours of development.

**Takeaway:** Write the PRD, then ask yourself "What's the absolute minimum I need to solve my problem?"

### Lesson 2: Use the Official Template, but Modify Wisely

I cloned Obsidian's official sample plugin template. This gave me:
- Proper build setup (esbuild, TypeScript, linting)
- Correct directory structure
- Working GitHub Actions
- All necessary dependencies

**What I removed:** 
- Settings panel code (didn't need it)
- Ribbon icons and status bar items
- Modal dialogs and commands
- Unused import statements

**The benefit:** Skip the setup complexity and focus on core functionality.

### Lesson 3: Understanding Obsidian's API Structure

The biggest learning curve was understanding how to manipulate the file explorer DOM. Key insights:

**File Explorer Access:**
```typescript
const fileExplorer = this.app.workspace.getLeavesOfType('file-explorer')[0];
```

**Frontmatter Detection:**
```typescript
const frontmatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
const isShared = frontmatter?.share === true;
const isDraft = frontmatter?.status === 'DRAFT';
```

**DOM Manipulation:**
```typescript
const fileItem = this.getFileExplorerItem(file.path);
fileItem.classList.add('conditional-share-bold');
```

### Lesson 4: CSS Complexity is Surprising

I thought applying BOLD and ITALICS would be simple CSS, but Obsidian's file explorer structure has specific CSS classes and priorities. The solution:

```css
.conditional-share-bold {
    font-weight: bold !important;
}

.conditional-draft-italic {
    font-style: italic !important;
}

.conditional-share-bold.conditional-draft-italic {
    font-weight: bold !important;
    font-style: italic !important;
}
```

The `!important` declarations were necessary due to Obsidian's existing CSS hierarchy.

### Lesson 5: Event-Driven Architecture

Real-time updates required proper event handling:

```typescript
// Listen for file changes
this.registerEvent(
    this.app.vault.on('modify', (file) => {
        if (file instanceof TFile && file.extension === 'md') {
            this.updateFileStyling(file);
        }
    })
);

// Refresh when files open/close
this.registerEvent(
    this.app.workspace.on('file-open', (file) => {
        this.updateAllFileStyling();
    })
);
```

## Technical Architecture: Keep It Simple

The final implementation was just ~80 lines of code:

1. **Main Plugin Class:** Initialize listeners, update styling
2. **File Styling Logic:** Check frontmatter, apply CSS classes
3. **DOM Helper:** Find file explorer items by path
4. **CSS Rules:** Define visual styling behavior

No complex state management, no user settings, no configuration panels.

## Testing Methodology

Since this was a simple UI plugin, testing was straightforward:

1. **Build Test:** `npm run build` should complete without errors
2. **Install Test:** Copy files to Obsidian plugins directory
3. **Visual Test:** Create notes with different frontmatter combinations
4. **Update Test:** Modify frontmatter and verify real-time updates

The cumulative styling test was crucial - ensuring BOLD+ITALICS worked when both conditions were met.

## Git Strategy Considerations

I encountered a repository setup issue - I had cloned the sample plugin template but was trying to push to my new repo. This required:

```bash
git remote set-url origin https://github.com/cbruyndoncx/obsidian-conditional-styling.git
git push -f origin master
```

The force push was necessary since I created the repo from a template and my local version was the "truth."

## Documentation Philosophy

Good documentation for a minimal plugin:
- **Focus on the user's problem:** "Visual distinction for published vs draft content"
- **Show, don't just tell:** Include styling examples table
- **Be honest about limitations:** Note that it's not in the official registry yet
- **Keep it concise:** No need for extensive development setup instructions

## What Almost Went Wrong

1. **TypeScript Type Issues:** Initially had type errors with file modification events - solved by checking `instanceof TFile`
2. **CSS Specificity:** Without `!important`, Obsidian's default styles overrode my styling
3. **Plugin Naming:** Had to update both `package.json` and `manifest.json` consistently
4. **Git History:** Template clone created extra commits that needed_force pushing

## The Result: A Working Plugin in 1 Hour

From concept to working plugin:
- **30 minutes:** PRD, Implementation, and Verification (The "Flow" state)
- **30 minutes:** Deployment & Git Troubleshooting (The "Friction" state)

The core development - going from requirements to a working, tested plugin in my local vault - took just 30 minutes. The remaining time was spent wrestling with repository setup because I created the GitHub repo from a template _after_ doing the local development.

### Lesson Learned: Repo Initialization Matters

**What I did:**
1. Developed locally using a cloned template
2. Created a new GitHub repo using the same template
3. Tried to push local work to remote -> **Conflict Hell**

**What to do next time:**
1. Create the GitHub repo first (empty or from template)
2. Clone _that_ specific repo locally
3. Build the plugin inside it
4. Push changes normally

This simple change in order would have cut the total time in half, making this a 30-minute project from start to finish.

## Beyond the Plugin: What This Teaches About Development

1. **Constraints fuel creativity:** The "minimal only" constraint forced better focus
2. **Templates accelerate development:** Standing on the shoulders of giants works
3. **API documentation is essential:** Obsidian's API docs made the implementation possible
4. **Simple problems deserve simple solutions:** 80 lines of code solved my real-world need
5. **Documentation matters as much as code:** Clear docs determine whether others will use your work

## Next Steps (If I Want to Expand)

While the MVP is complete, potential enhancements could include:
- User-configurable formatting options
- Additional frontmatter fields (tags, categories)
- Keyboard shortcuts for toggling status
- Dashboard widget showing published vs draft counts
- Official plugin registry submission

But for now, a simple, focused solution that solves a real problem is exactly what I needed.

---

*This project demonstrates that sometimes the most satisfying software solutions are the ones that solve exactly your problem, nothing more, nothing less.*
