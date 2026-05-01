# Development Guide

This guide covers extending and modifying Markly's functionality.

## Project Structure

```
src/
├── App.tsx                          # Root component
├── main.tsx                         # Vite entry point
├── index.css                        # Tailwind + custom styles
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx            # Root layout + header + error toast
│   │   └── SplitPane.tsx           # Left/right pane layout
│   ├── input/
│   │   ├── InputPanel.tsx          # Orchestrates left panel
│   │   ├── DropZone.tsx            # Drag-drop file upload
│   │   ├── PasteArea.tsx           # Text input textarea
│   │   └── ModeIndicator.tsx       # "Convert" / "Format" badge
│   ├── output/
│   │   ├── OutputPanel.tsx         # Orchestrates right panel
│   │   ├── OutputToolbar.tsx       # Tab toggle + copy + download
│   │   ├── MarkdownEditor.tsx      # Editable raw Markdown
│   │   └── MarkdownPreview.tsx     # Rendered HTML preview
│   └── ui/
│       ├── Button.tsx              # Styled button component
│       ├── Badge.tsx               # Mode indicator badge
│       ├── Spinner.tsx             # Loading spinner
│       └── Toast.tsx               # Error/success notification
├── hooks/
│   ├── useFileInput.ts             # File drop + paste handling
│   ├── useConversion.ts            # Pipeline orchestration
│   ├── useInputMode.ts             # Auto-detect mode (convert/format)
│   └── useClipboard.ts             # Clipboard write wrapper
├── lib/
│   ├── pipeline/
│   │   ├── index.ts                # Main orchestrator: runPipeline()
│   │   ├── detectType.ts           # Input type detection
│   │   ├── docxToMarkdown.ts       # DOCX → HTML → MD
│   │   ├── txtToMarkdown.ts        # TXT → MD (simple wrapper)
│   │   └── mdToMarkdown.ts         # MD → MD (line ending normalization)
│   ├── cleanup/
│   │   ├── index.ts                # Composes all cleanup plugins
│   │   ├── normalizeHeadings.ts    # Fix heading levels
│   │   ├── normalizeListMarkers.ts # Normalize bold/italic/list markers
│   │   ├── normalizeBlankLines.ts  # Remove empty nodes
│   │   └── normalizeIndentation.ts # Fix nested lists
│   ├── formatter/
│   │   ├── index.ts                # applyFormatter() wrapper
│   │   └── stringifyOptions.ts     # remark-stringify configuration
│   └── utils/
│       ├── fileReader.ts           # Promise-based FileReader
│       └── download.ts             # Trigger browser download
├── store/
│   └── appStore.ts                 # Zustand state management
└── types/
    └── index.ts                    # Shared TypeScript types
```

## Adding Features

### Adding a New Cleanup Pass

Cleanup passes are remark plugins that mutate the MDAST (Markdown AST).

**Example: Remove all blockquotes**

```typescript
// src/lib/cleanup/removeBlockquotes.ts
import type { Root } from 'mdast'

export function removeBlockquotes() {
  return function (tree: Root) {
    tree.children = tree.children.filter(
      (node) => node.type !== 'blockquote'
    )
  }
}
```

Then add to `src/lib/cleanup/index.ts`:

```typescript
import { removeBlockquotes } from './removeBlockquotes'

export function applyCleanup(markdown: string): string {
  const file = unified()
    .use(remarkParse)
    .use(normalizeHeadings)
    .use(normalizeListMarkers)
    .use(normalizeBlankLines)
    .use(normalizeIndentation)
    .use(removeBlockquotes)  // ← Add here
    .use(remarkStringify)
    .processSync(markdown)

  return String(file)
}
```

### Adding a New Converter

Converters transform input formats into Markdown.

**Example: JSON → Markdown table**

```typescript
// src/lib/pipeline/jsonToMarkdown.ts
export function jsonToMarkdown(jsonString: string): string {
  try {
    const data = JSON.parse(jsonString)
    
    // Convert to Markdown table
    if (Array.isArray(data)) {
      const headers = Object.keys(data[0])
      const header = `| ${headers.join(' | ')} |`
      const sep = `| ${headers.map(() => '---').join(' | ')} |`
      const rows = data.map(row =>
        `| ${headers.map(h => row[h]).join(' | ')} |`
      )
      return [header, sep, ...rows].join('\n')
    }
    
    return JSON.stringify(data, null, 2)
  } catch {
    throw new Error('Invalid JSON')
  }
}
```

Update `detectType.ts` to recognize JSON:

```typescript
export function detectInputType(
  file?: File,
  text?: string
): InputType {
  if (file) {
    const name = file.name.toLowerCase()
    if (name.endsWith('.json')) return 'json'  // ← Add
    // ... rest
  }
  // ... rest
}
```

Update the pipeline to handle JSON:

```typescript
// src/lib/pipeline/index.ts
import { jsonToMarkdown } from './jsonToMarkdown'

async function getMarkdown(input: RawInput): Promise<string> {
  const type = detectInputType(input.file, input.text)

  let rawMarkdown: string

  if (type === 'json') {  // ← Add
    if (!input.text) throw new Error('No data provided')
    rawMarkdown = jsonToMarkdown(input.text)
  } else if (type === 'docx') {
    // ... rest
  }
  // ... rest
}
```

### Adding a New UI Component

Components live in `src/components/` organized by layer.

**Example: Dark/Light theme toggle**

```typescript
// src/components/ui/ThemeToggle.tsx
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}
```

Add to header in `AppShell.tsx`:

```tsx
import { ThemeToggle } from '../ui/ThemeToggle'

<header className="...">
  <div className="flex items-center gap-3">
    {/* ... existing content ... */}
  </div>
  <ThemeToggle />
  <ModeIndicator />
</header>
```

### Adding New State

Extend the Zustand store for new state requirements.

```typescript
// src/types/index.ts
export interface AppState {
  // ... existing fields ...
  userPreferences: {
    theme: 'dark' | 'light'
    autoDownload: boolean
  }
}

export interface AppActions {
  // ... existing actions ...
  setTheme: (theme: 'dark' | 'light') => void
  setAutoDownload: (auto: boolean) => void
}
```

```typescript
// src/store/appStore.ts
const initialState: Omit<AppState, keyof AppActions> = {
  // ... existing ...
  userPreferences: {
    theme: 'dark',
    autoDownload: false,
  },
}

export const useAppStore = create<AppState & AppActions>((set) => ({
  ...initialState,
  // ... existing actions ...
  setTheme: (theme) => set((state) => ({
    userPreferences: { ...state.userPreferences, theme }
  })),
  setAutoDownload: (autoDownload) => set((state) => ({
    userPreferences: { ...state.userPreferences, autoDownload }
  })),
}))
```

## Testing

### Manual Testing Checklist

- [ ] Drop a `.docx` file - verify output appears
- [ ] Drop a `.txt` file - verify paragraphs are preserved
- [ ] Drop a `.md` file - verify headings are normalized
- [ ] Toggle between Raw and Preview tabs
- [ ] Click Copy button - verify clipboard works
- [ ] Click Download button - verify `.md` file downloads
- [ ] Paste messy Markdown - verify cleanup works
- [ ] Edit output in editor - verify edits are preserved
- [ ] Large file (>5MB) - verify it processes without errors
- [ ] Empty file - verify error message appears

### Unit Testing (Future)

Add tests with Vitest:

```bash
npm install --save-dev vitest @testing-library/react
```

Example test file:

```typescript
// src/lib/cleanup/normalizeHeadings.test.ts
import { describe, it, expect } from 'vitest'
import { applyCleanup } from './index'

describe('normalizeHeadings', () => {
  it('shifts H3-only document to H1', () => {
    const input = '### First\n\n### Second'
    const output = applyCleanup(input)
    expect(output).toContain('# First')
    expect(output).toContain('# Second')
  })

  it('prevents heading level skipping', () => {
    const input = '# Title\n\n### Skipped'
    const output = applyCleanup(input)
    expect(output).toContain('## Skipped')
  })
})
```

## Performance Optimization

### Bundle Size

The main bundle is ~1MB gzipped due to unified/remark/rehype. To reduce:

```typescript
// Dynamic import processors (future enhancement)
const cleanup = await import('./lib/cleanup')
const formatter = await import('./lib/formatter')
```

### Processing Speed

For large documents, consider:

1. Web Workers for AST processing
2. Streaming pipelines instead of full AST
3. Caching MDAST for repeat operations

Example Web Worker usage (future):

```typescript
// src/workers/markdown.worker.ts
import { applyCleanup } from '../lib/cleanup'
import { applyFormatter } from '../lib/formatter'

self.onmessage = (event) => {
  const { markdown } = event.data
  const result = applyFormatter(applyCleanup(markdown))
  self.postMessage({ result })
}
```

## Debugging

### Enable Debug Mode

Add to `main.tsx`:

```typescript
if (import.meta.env.DEV) {
  console.log('Development mode enabled')
  // Add debugging here
}
```

### Inspect MDAST

Print the AST to understand transformations:

```typescript
import { inspect } from 'unist-util-inspect'

const ast = unified().use(remarkParse).parse(markdown)
console.log(inspect(ast))
```

### Monitor State Changes

Use Zustand middleware:

```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useAppStore = create<AppState & AppActions>(
  devtools((set) => ({
    // ... store implementation ...
  }))
)
```

## Deployment

### GitHub Pages

```bash
npm run build
# Push to main branch - workflow handles deployment
```

### Custom Domain

Update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/',  // Change from '/markly/'
  // ...
})
```

### Environment Variables

Create `.env`:

```
VITE_API_URL=https://api.example.com
```

Access in components:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Code Style

- **Prettier**: Format with Tailwind CSS awareness
- **ESLint**: Catch common mistakes
- **TypeScript**: Strict mode enabled for type safety
- **Tailwind**: Use utility classes, prefer @apply sparingly

Run checks:

```bash
npm run lint
npm run build  # Includes TypeScript check
```

## Architecture Decisions

### Why Zustand?

- Minimal boilerplate
- Built-in TypeScript support
- No provider wrapper needed
- Easy to debug

### Why unified/remark/rehype?

- Standard AST format (unist)
- Rich plugin ecosystem
- Battle-tested in production
- Tree-walking simplicity

### Why Tailwind CSS?

- Utility-first → less custom CSS
- Dark mode built-in
- Typography plugin for rich content
- Fast development

## Future Enhancements

- [ ] Web Worker for large file processing
- [ ] Custom style mapping for DOCX
- [ ] YAML frontmatter preservation
- [ ] Markdown to DOCX reverse conversion
- [ ] Code syntax highlighting
- [ ] Markdown diff viewer
- [ ] Multi-file batch processing
- [ ] Cloud storage integration
- [ ] Theme customization
- [ ] Keyboard shortcuts

## Contributing

When adding features:

1. Create a feature branch
2. Add types first
3. Implement core logic
4. Add UI components
5. Test manually
6. Update README if needed
7. Create PR with clear description

## Resources

- **Unified Docs**: https://unifiedjs.com/
- **Remark Docs**: https://github.com/remarkjs/remark
- **Rehype Docs**: https://github.com/rehypejs/rehype
- **Tailwind Docs**: https://tailwindcss.com/
- **Zustand Docs**: https://zustand-demo.vercel.app/
