# Markly

A 100% client-side web application that converts DOCX/TXT files and pasted content into clean, formatted Markdown. No backend, no server calls, no cost.

## Features

### Input Methods
- **Drag & Drop**: Drop `.docx`, `.txt`, or `.md` files
- **Copy-Paste**: Paste content directly into the input area
- **Auto-Detection**: Automatically detects input type and switches to appropriate mode

### Conversion Pipeline
- **DOCX → Markdown**: Uses `mammoth.js` to convert Word documents to HTML, then transforms to clean Markdown
- **TXT → Markdown**: Wraps plain text into properly formatted paragraphs
- **MD → Format**: Reformats existing Markdown with consistent styling

### Cleanup Engine
- Normalizes heading levels (no skipping H1 → H3)
- Removes extra blank lines
- Normalizes list markers (`-` instead of `*`)
- Fixes bold/italic formatting (`**` instead of `__`)
- Removes extra indentation issues
- Sanitizes output for safety

### Output Features
- **Raw Editor**: Editable Markdown output with syntax highlighting
- **Preview**: Live rendered preview with typography styling
- **Copy to Clipboard**: One-click copy of formatted Markdown
- **Download**: Save output as `.md` file
- **Mode Indicator**: Shows Convert (DOCX/TXT) or Format (MD) mode

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **mammoth.js** - DOCX conversion
- **unified + remark + rehype** - Markdown processing
- **rehype-sanitize** - Output sanitization

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

Output will be in the `dist/` directory.

## Deployment

### GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment to GitHub Pages.

1. Push to the `main` branch
2. GitHub Actions automatically builds and deploys

**Configuration:**
- The workflow file is in `.github/workflows/deploy.yml`
- By default, the app is served from `https://username.github.io/markly/`
- To serve from a custom domain, update `vite.config.ts` and configure your domain in GitHub Pages settings

### Static Hosting

You can also deploy the `dist/` folder to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Cloudflare Pages
- Any web server

## Usage

### Basic Workflow

1. **Input Phase**
   - Drop a file or paste content in the left panel
   - The app auto-detects the type: `Convert` (DOCX/TXT) or `Format` (MD)

2. **Processing**
   - Click "Clean & Format" button
   - The pipeline runs entirely in your browser
   - Output appears in the right panel

3. **Output**
   - View raw Markdown or preview
   - Edit the output directly if needed
   - Copy to clipboard or download as `.md` file

### Supported File Types

- `.docx` - Microsoft Word documents
- `.txt` - Plain text files
- `.md`, `.markdown` - Markdown files

### Example Transformations

**DOCX → Markdown**
```
Word doc with formatting → Clean Markdown with normalized headings and spacing
```

**TXT → Markdown**
```
Plain text paragraphs → Markdown with paragraph breaks preserved
```

**MD → Formatted MD**
```
Messy Markdown (H3-only headings, mixed list markers) → Clean, consistent Markdown
```

## Architecture

### Component Structure

```
App
├── AppShell (layout wrapper)
│   ├── Header (brand + mode indicator)
│   └── SplitPane
│       ├── InputPanel
│       │   ├── DropZone
│       │   ├── PasteArea
│       │   └── Action Buttons
│       └── OutputPanel
│           ├── OutputToolbar (tabs + copy/download)
│           ├── MarkdownEditor (raw)
│           └── MarkdownPreview (rendered)
```

### Data Flow

```
Input (File/Paste)
  ↓
detectInputType()
  ↓
runPipeline() [main orchestrator]
  ├─ Convert: docxToMarkdown() / txtToMarkdown() / mdToMarkdown()
  ├─ Cleanup: normalizeHeadings() + normalizeListMarkers() + normalizeBlankLines() + normalizeIndentation()
  └─ Format: remarkStringify() with consistent options
  ↓
Output (Markdown string) → Zustand store
  ↓
OutputPanel re-renders with raw/preview toggle
```

### Key Libraries

- **unified**: AST transformation pipeline
- **remark**: Markdown parser/stringifier
- **rehype**: HTML AST manipulation
- **rehype-sanitize**: XSS prevention
- **mammoth**: DOCX to HTML conversion

## Performance

- Handles files up to 50MB
- Processing time typically < 2 seconds (browser-dependent)
- All operations are client-side (zero latency from network)
- Minimal dependencies for fast initial load

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with ES2022 support

## Limitations

- No support for password-protected DOCX files
- Table formatting in DOCX is limited
- Image/figure conversion is not supported (stripped for text clarity)
- Maximum practical file size is ~50MB (browser memory limits)

## Development Notes

### Project Structure

```
src/
├── components/
│   ├── layout/          # AppShell, SplitPane
│   ├── input/           # DropZone, PasteArea, InputPanel
│   ├── output/          # MarkdownEditor, Preview, Toolbar
│   └── ui/              # Button, Badge, Spinner, Toast
├── hooks/               # useFileInput, useConversion, useClipboard
├── lib/
│   ├── pipeline/        # Conversion logic
│   ├── cleanup/         # Markdown normalization
│   ├── formatter/       # Output formatting
│   └── utils/           # FileReader, download helpers
├── store/               # Zustand app state
├── types/               # TypeScript interfaces
└── App.tsx
```

### Adding Features

To add new functionality:

1. **New cleanup pass**: Add a plugin in `src/lib/cleanup/`
2. **New converter**: Add logic in `src/lib/pipeline/`
3. **New UI component**: Create in `src/components/` with appropriate folder
4. **New state**: Extend `AppState` in `src/types/index.ts` and Zustand store

### Testing the Pipeline

```typescript
import { runPipeline } from './src/lib/pipeline'

const result = await runPipeline({
  type: 'txt',
  text: 'Your content here'
})
```

## Contributing

This is a personal project. For suggestions or issues, please refer to the GitHub repository.

## License

MIT

## Credits

- Built with React, Vite, and TypeScript
- Markdown processing by unified/remark/rehype
- DOCX support via mammoth.js
- Styling with Tailwind CSS
