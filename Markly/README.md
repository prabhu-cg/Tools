# Markly

> 🚀 **100% client-side Markdown converter**: DOCX/TXT/MD → clean Markdown  
> 🔒 **Privacy first**: No backend, no APIs, no tracking. Everything runs in your browser.  
> ✅ **Validation engine**: Detect and auto-fix 10 types of Markdown issues  
> ⚡ **Lightning fast**: No server roundtrips, instant processing

Markly transforms Word documents, plain text, and Markdown into clean, production-ready Markdown with automatic validation and fixing. All processing happens locally—nothing leaves your machine.

## ✨ Features

### 📥 Input Methods
- **Drag & Drop** — Drop `.docx`, `.txt`, or `.md` files anywhere
- **Paste Content** — Paste directly into the input area
- **Auto-Detection** — Automatically detects format and switches mode (Convert/Format)
- **File Browser** — Click to browse and select files
- **Show/Hide Paste Area** — Toggle with a single switch

### 🔄 Conversion Modes

#### Convert Mode (DOCX/TXT)
- **DOCX → Markdown** — Uses mammoth.js to extract text, styles, and structure from Word docs
- **TXT → Markdown** — Intelligently wraps plain text with proper paragraph breaks
- Preserves formatting: headings, lists, emphasis, links

#### Format Mode (Markdown)
- **Normalize existing Markdown** — Fix inconsistent styles
- **Re-serialize** — Apply canonical formatting rules
- **Perfect for consistency** — When you have messy Markdown from multiple sources

### 🧹 Intelligent Cleanup Pipeline

All conversions flow through a 4-stage cleanup engine:

1. **Heading Normalization**
   - Fix skipped levels (H1 → H4 becomes H1 → H2 → H3 → H4)
   - Ensure no duplicate H1s
   - Consistent depth structure

2. **List & Emphasis Fixes**
   - Normalize list markers (`-` is the standard)
   - Fix emphasis syntax (`**bold**` not `__bold__`, `*italic*` not `_italic_`)
   - Proper nesting and indentation

3. **Blank Line Management**
   - Remove DOCX artifacts and excessive whitespace
   - Maintain semantic spacing
   - Keep 1-2 blank lines between sections

4. **Output Formatting**
   - Consistent ATX headings (`##` not underlined)
   - Fenced code blocks (```  ) not indented
   - Numbered lists with increments (1. 2. 3.)

### ✅ Validation & Auto-Fix Engine

**10 built-in validation rules** automatically run after conversion. Detect and fix:

| Issue | Type | Auto-Fixable | What it does |
|-------|------|------|---|
| Multiple H1 headings | Error | ✅ | Demotes H1s after the first one to H2 |
| Skipped heading levels | Warning | ✅ | Fixes H1 → H4 jumps, adds missing H2/H3 |
| Empty headings | Warning | ✅ | Removes headings with no text |
| Inconsistent emphasis | Warning | ✅ | Normalizes `__text__` → `**text**` |
| 3+ blank lines | Warning | ✅ | Collapses consecutive blank lines |
| Missing blank before heading | Suggestion | ✅ | Inserts blank line before headings |
| Broken list nesting | Warning | ❌ | Detects nesting that skips levels |
| Mixed bullet types | Warning | ✅ | Normalizes `-` and `*` to `-` |
| Empty links | Error | ❌ | `[text]()` — must fix manually |
| Malformed links | Error | ❌ | Unclosed `[text](` — must fix manually |

**Fix modes:**
- 🔧 **Fix individual issues** — Click "Fix" on any issue to apply just that fix
- 🔨 **Fix All at once** — Click "Fix All" to apply all fixable issues (one undo step)
- ↩️ **Undo fixes** — Full 20-step history to revert changes

### 📊 Validation Panel

- **Issue list** with severity badges (red/amber/sky)
- **Filter by type** — Show only errors, warnings, or suggestions
- **Click to jump** — Click line number to scroll to that issue in the editor
- **Collapsible** — Toggle on/off without losing issue state
- **Issue count** — "Validate (5)" shows how many issues remain

### 💾 Output Features
- **Raw Editor** — Fully editable Markdown textarea with monospace font
- **Live Preview** — Rendered HTML preview with typography styling
- **Copy Button** — One-click copy to clipboard (shows "Copied!" for 2 seconds)
- **Download** — Save output as `.md` file
- **Tab Switcher** — Toggle between raw Markdown and preview

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **UI Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Language** | TypeScript 6 |
| **Styling** | Tailwind CSS v4 |
| **State** | Zustand |
| **Document Processing** | mammoth.js |
| **Markdown AST** | unified, remark, rehype |
| **Sanitization** | rehype-sanitize |
| **Validation** | Custom rule engine with closures |

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (for development)
- Modern web browser

### Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Usage Workflow

1. **Drop a file or paste content** — Left panel accepts DOCX, TXT, or Markdown
2. **Click "Clean & Format"** — Runs the conversion and cleanup pipeline
3. **Validation runs automatically** — Detects issues and shows them in the right panel
4. **Click "Validate" button** — Opens/closes the validation panel
5. **Fix issues**:
   - Individual: Click "Fix" on specific issues
   - All at once: Click "Fix All" (one undo step)
6. **Edit or download** — Edit raw Markdown or download as `.md` file

## 📚 Architecture

### High-Level Data Flow

```
User Input (File/Paste)
    ↓
detectInputType()
    ↓
runPipeline()
├─ Convert Stage: docxToMarkdown() | txtToMarkdown() | mdToMarkdown()
├─ Cleanup Stage: 4 remark plugins
└─ Format Stage: remarkStringify()
    ↓
Output String → Zustand Store
    ↓
ValidationObserver (useValidation hook, 300ms debounce)
    ├─ Parse output to MDAST
    ├─ Run 10 validation rules
    └─ Store issues in state
    ↓
UI Re-renders
├─ OutputPanel: Raw/Preview toggle
└─ ValidationPanel: Issue list + filters
```

### Component Hierarchy

```
App
├── ValidationObserver (mounts useValidation hook)
└── AppShell
    ├── Header (Markly branding)
    └── SplitPane (3-column layout)
        ├── InputPanel (30% width, fixed)
        │   ├── DropZone
        │   ├── PasteArea (collapsible)
        │   └── Action buttons (toggle + convert)
        │
        ├── OutputPanel (flex, adapts to panel)
        │   ├── OutputToolbar
        │   │   ├── Tab switcher (Markdown/Preview)
        │   │   ├── Copy button
        │   │   ├── Download button
        │   │   └── Validate button (shows issue count)
        │   ├── MarkdownEditor (raw, editable textarea)
        │   └── MarkdownPreview (rendered HTML)
        │
        └── ValidationPanel (25% width, conditional)
            ├── Header + issue count
            ├── IssueFilter (error/warning/suggestion toggles)
            ├── IssueList (scrollable)
            │   └── IssueItem (per issue)
            │       ├── Badge (type)
            │       ├── Message + line number
            │       └── Fix button
            └── Footer (Fix All + Undo buttons)
```

### State Management (Zustand)

```typescript
// Conversion state
rawInput: RawInput | null              // File/paste input
output: string                         // Markdown output
mode: 'convert' | 'format' | 'idle'   // Auto-detected mode
status: 'idle' | 'processing' | ...    // Processing status
errorMessage: string | null            // Error display

// Validation state
issues: ValidationIssue[]              // All detected issues
issueFilter: IssueFilter               // User filter preferences
outputHistory: string[]                // Undo stack (max 20)
validationPanelOpen: boolean           // UI toggle

// UI state
previewTab: 'raw' | 'preview'          // Tab selection
```

### Directory Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx               # Root layout
│   │   └── SplitPane.tsx              # 3-column with editor ref
│   ├── input/
│   │   ├── InputPanel.tsx
│   │   ├── DropZone.tsx
│   │   ├── PasteArea.tsx
│   │   └── ModeIndicator.tsx
│   ├── output/
│   │   ├── OutputPanel.tsx
│   │   ├── MarkdownEditor.tsx         # forwardRef textarea
│   │   ├── MarkdownPreview.tsx
│   │   └── OutputToolbar.tsx
│   ├── validation/
│   │   ├── ValidationPanel.tsx        # Main container
│   │   ├── IssueFilter.tsx            # Type toggles
│   │   ├── IssueList.tsx              # Filtered list
│   │   └── IssueItem.tsx              # Single issue
│   └── ui/
│       ├── Button.tsx                 # Reusable button
│       ├── Badge.tsx                  # Colored badge (4 colors)
│       ├── Spinner.tsx
│       ├── Toast.tsx
│       └── Toggle.tsx
├── hooks/
│   ├── useFileInput.ts                # File drop + paste
│   ├── useConversion.ts               # Pipeline orchestration
│   ├── useInputMode.ts                # Auto-detect mode
│   ├── useClipboard.ts                # Copy to clipboard
│   └── useValidation.ts               # Auto-validation (debounced)
├── lib/
│   ├── pipeline/
│   │   ├── index.ts                   # runPipeline()
│   │   ├── detectType.ts
│   │   ├── docxToMarkdown.ts
│   │   ├── txtToMarkdown.ts
│   │   └── mdToMarkdown.ts
│   ├── cleanup/
│   │   ├── index.ts                   # Remark plugin composition
│   │   ├── normalizeHeadings.ts
│   │   ├── normalizeListMarkers.ts
│   │   ├── normalizeBlankLines.ts
│   │   └── normalizeIndentation.ts
│   ├── formatter/
│   │   ├── index.ts                   # applyFormatter()
│   │   └── stringifyOptions.ts        # remark-stringify config
│   ├── validation/
│   │   ├── index.ts                   # detectIssues() aggregator
│   │   └── rules/
│   │       ├── multipleH1.ts
│   │       ├── skippedHeadings.ts
│   │       ├── emptyHeadings.ts
│   │       ├── inconsistentEmphasis.ts
│   │       ├── consecutiveBlankLines.ts
│   │       ├── missingBlankBeforeHeading.ts
│   │       ├── brokenListNesting.ts
│   │       ├── mixedBulletTypes.ts
│   │       ├── emptyLinks.ts
│   │       └── malformedLinks.ts
│   └── utils/
│       ├── fileReader.ts
│       └── download.ts
├── store/
│   └── appStore.ts                    # Zustand store
├── types/
│   ├── index.ts                       # AppState, AppActions
│   └── validation.ts                  # ValidationIssue types
└── App.tsx
```

## 🎯 Validation Rules Deep Dive

### How Validation Works

1. **Trigger**: After conversion completes OR when user edits in MarkdownEditor
2. **Debounce**: 300ms to avoid thrashing on every keystroke
3. **Parse**: Full markdown AST via remark-parse
4. **Detect**: Run 10 independent rule detectors
5. **Store**: Issue array with fix functions
6. **Display**: FilteredIssueList in ValidationPanel
7. **Apply Fix**: `applyFix(fixFunction)` or `applyFixAll([fixes...])`
8. **Re-validate**: Output changed → useValidation effect fires again

### Adding a New Rule

Create `src/lib/validation/rules/myRule.ts`:

```typescript
import { visit } from 'unist-util-visit'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root } from 'mdast'
import type { ValidationIssue } from '../../../types'

export function detectMyIssue(markdown: string): ValidationIssue[] {
  const tree = unified().use(remarkParse).parse(markdown) as Root
  const issues: ValidationIssue[] = []
  let index = 0

  visit(tree, 'nodeType', (node) => {
    if (/* condition */) {
      const line = node.position?.start.line ?? 0
      issues.push({
        id: `my-rule-${line}-${index++}`,
        type: 'warning',
        rule: 'my-rule',
        message: 'Description of the issue',
        line,
        fixable: true,
        fix: (md: string) => {
          // Transform and return fixed markdown
          return md.replace(/pattern/, 'replacement')
        },
      })
    }
  })

  return issues
}
```

Then add to `src/lib/validation/index.ts`:

```typescript
import { detectMyIssue } from './rules/myRule'

export function detectIssues(markdown: string): ValidationIssue[] {
  return [
    ...detectMyIssue(markdown),
    // ... other rules
  ]
}
```

## 📊 Performance Characteristics

| Metric | Value |
|--------|-------|
| DOCX conversion | ~500ms (5-10 page document) |
| Validation (5000 lines) | ~50ms (debounced 300ms) |
| Memory for typical doc | ~5MB |
| Max supported file size | ~50MB (browser limit) |

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari 14+
- ❌ Internet Explorer (not supported)

## 📦 Deployment

### Quick Start (Static Hosting)

The `dist/` folder can be deployed to any static host:

```bash
npm run build
# Deploy dist/ folder to:
# - GitHub Pages
# - Netlify
# - Vercel
# - AWS S3 + CloudFront
# - Cloudflare Pages
```

### GitHub Pages (Included)

GitHub Actions workflow in `.github/workflows/deploy.yml` automatically:
1. Builds on push to `main`
2. Deploys to `gh-pages` branch
3. Serves at `https://username.github.io/markly/`

## 🤝 Contributing

Contributions welcome! Areas for help:

- 🔍 New validation rules
- 🧹 Cleanup plugins
- 🎨 UI/UX improvements
- 📖 Documentation
- 🐛 Bug fixes
- ⚡ Performance optimization

## 📝 License

MIT

## 🙏 Acknowledgments

Built with excellent open-source libraries:
- [React](https://react.dev) — UI framework
- [Vite](https://vitejs.dev) — Build tool
- [unified](https://unifiedjs.com) — Plugin system
- [remark](https://remark.js.org) — Markdown AST
- [mammoth.js](https://github.com/mwilkinson22/mammoth-js) — DOCX parsing
- [Zustand](https://github.com/pmndrs/zustand) — State management
- [Tailwind CSS](https://tailwindcss.com) — Styling

---

**Made with ❤️ for writers, developers, and anyone who works with documents**
