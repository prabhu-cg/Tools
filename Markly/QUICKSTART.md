# Markly Quick Start Guide

Get started with Markly in 2 minutes.

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. That's it!

## 🎯 Basic Usage

### Step 1: Input
Choose one of these options:
- **Drag & drop** a `.docx`, `.txt`, or `.md` file onto the left panel
- **Copy-paste** content directly into the text area

### Step 2: Convert
- Click **"Clean & Format"** button
- Wait 1-2 seconds for processing
- Output appears on the right

### Step 3: Output
- **View as Markdown** (raw tab) or **Preview** (preview tab)
- **Copy** to clipboard with one click
- **Download** as `.md` file
- Or edit directly in the output box and copy

## 📝 Examples

### Convert a Word Document
1. Drag your `.docx` file into the left panel
2. Click "Clean & Format"
3. See clean Markdown on the right
4. Click "Download .md" to save

### Cleanup Messy Markdown
1. Paste your Markdown into the left panel
2. It auto-detects as Markdown (Format mode)
3. Click "Clean & Format"
4. See normalized heading levels, consistent list markers, etc.

### Convert Plain Text
1. Paste text into the left panel
2. Click "Clean & Format"
3. Get paragraph-formatted Markdown
4. Edit with added headings, lists, etc.

## 🎨 Features

| Feature | How to Use |
|---------|-----------|
| **Mode Indicator** | Top right shows "Convert" or "Format" based on input |
| **Preview** | Toggle between raw Markdown and rendered HTML preview |
| **Copy** | Click "Copy" button, gets Markdown to clipboard |
| **Download** | Click "Download .md" to save as file |
| **Edit** | Output box is fully editable before copying/download |

## 🔍 What Gets Cleaned

When you click "Clean & Format", Markly:

- ✅ Normalizes heading levels (no H1 → H3 jumps)
- ✅ Fixes list markers (converts `*` and `+` to `-`)
- ✅ Standardizes bold/italic (`__text__` → `**text**`)
- ✅ Removes extra blank lines
- ✅ Ensures proper spacing
- ✅ Sanitizes output for safety

## ⌨️ Keyboard Shortcuts

| Action | Method |
|--------|--------|
| Process | Click "Clean & Format" or press Ctrl/Cmd+Enter (when implemented) |
| Copy Output | Click "Copy" or press Ctrl/Cmd+C (after focusing output) |
| Switch Tab | Click "Markdown" or "Preview" tabs |

## 🚨 Common Issues

### "File too large" error
Maximum file size is 50MB. Markly processes everything in your browser's memory.

**Solution:** Split large files into smaller chunks and process separately.

### Output looks weird
Check the Preview tab to see how it will actually render.

**Solution:** Edit the raw Markdown if needed - the editor is fully editable.

### DOCX with images
Images are stripped from the output (text-only focus).

**Solution:** Add image links manually after conversion, or use the source DOCX for images.

### Password-protected DOCX
Cannot be processed.

**Solution:** Remove the password from the DOCX file first, then upload.

## 💡 Pro Tips

### Tip 1: Two-Pass Processing
For complex documents:
1. Convert DOCX → Markdown
2. Copy output
3. Paste back into Markly to further refine

### Tip 2: Toggle Edit Mode
Click "Edit" toggle to show/hide the paste area after dropping a file.

### Tip 3: Preview Before Download
Always check the Preview tab to verify the output matches your expectations.

### Tip 4: Combine Multiple Files
Convert several files separately, copy outputs, and combine into one document.

### Tip 5: Check the Cleanup
Toggle between Raw and Preview to understand what Markly cleaned up.

## 🛠️ Building for Deployment

### Build for Production
```bash
npm run build
```

Output is in the `dist/` folder.

### Deploy to GitHub Pages
1. Push code to GitHub
2. Go to repo Settings → Pages
3. Set source to GitHub Actions
4. Workflow `.github/workflows/deploy.yml` handles the rest

### Deploy to Other Hosts
Copy the `dist/` folder contents to:
- Netlify
- Vercel
- AWS S3
- Cloudflare Pages
- Any static hosting

## 📚 Learn More

- **[Full Documentation](README.md)** - Complete guide and architecture
- **[Examples](EXAMPLES.md)** - Real-world use cases and transformations
- **[Troubleshooting](README.md#limitations)** - Known limitations and workarounds

## ❓ FAQ

**Q: Is my data private?**  
A: 100% private! Everything runs in your browser. No data is sent to any server.

**Q: Can I use offline?**  
A: Yes! Once loaded, the app works completely offline.

**Q: What about large files?**  
A: Process happens in browser memory. Practical limit is ~50MB depending on your browser.

**Q: Can I embed this on my website?**  
A: Yes! Deploy to any static host and link/embed as needed.

**Q: Does it work on mobile?**  
A: Yes, though the split-pane layout is optimized for desktop. Mobile version would require responsive design updates.

**Q: Can I convert back from Markdown?**  
A: Not in this version. Markly is Markdown-focused. For Markdown → Word, use tools like Pandoc.

---

Ready to go? Open [http://localhost:5173](http://localhost:5173) and start converting!
