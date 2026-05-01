# Markly Examples

This document shows real-world examples of how Markly transforms different input types into clean, formatted Markdown.

## Example 1: DOCX with Messy Headings

### Input (DOCX file)
```
A Word document with:
- Heading 3: "Introduction"
- Heading 4: "Background"
- Heading 2: "Main Section"
- Plus various formatting inconsistencies
```

### Output (After Markly)
```markdown
# Introduction

Background content here.

## Main Section

More content.
```

**What happened:**
- H3 shifted to H1 (minimum level is now H1)
- H4 clamped to H2 (no skipping levels)
- H2 becomes H2 (consistent with new hierarchy)

---

## Example 2: Plain Text Document

### Input (Plain text)
```
This is a document with multiple paragraphs.

First paragraph describes something important.

Second paragraph continues the thought.

Third paragraph concludes.
```

### Output (Markly-formatted Markdown)
```markdown
This is a document with multiple paragraphs.

First paragraph describes something important.

Second paragraph continues the thought.

Third paragraph concludes.
```

**What happened:**
- Paragraph breaks preserved
- Ready for Markdown editing (can add headings, lists, etc.)
- Clean spacing maintained

---

## Example 3: Messy Markdown with Formatting Issues

### Input (Copied from web or poorly formatted)
```markdown
### Getting Started

Some content here.

#### Why This Matters
More details.

### Another Section
Final content.

Text with __bold__ and _italic_ markers mixed.
- List item one
* List item two
+ List item three
```

### Output (Clean, consistent Markdown)
```markdown
# Getting Started

Some content here.

## Why This Matters

More details.

# Another Section

Final content.

Text with **bold** and *italic* markers consistent.

- List item one
- List item two
- List item three
```

**What happened:**
- H3 → H1, H4 → H2 (normalized levels starting at H1)
- `__bold__` → `**bold**` (consistent bold syntax)
- `_italic_` → `*italic*` (consistent italic syntax)
- `*`, `+` → `-` (unified list markers)
- Extra blank lines removed between consistent elements

---

## Example 4: DOCX with Tables and Formatting

### Input (DOCX with table)
```
Title

Introduction paragraph

| Header 1 | Header 2 |
|----------|----------|
| Data 1   | Data 2   |

Conclusion
```

### Output
```markdown
# Title

Introduction paragraph

| Header 1 | Header 2 |
|----------|----------|
| Data 1   | Data 2   |

Conclusion
```

**What happened:**
- Document converted to clean Markdown
- Tables preserved in GFM format
- Images/figures stripped (text-only)
- Consistent spacing throughout

---

## Example 5: Mixed Content with Code Blocks

### Input (DOCX or pasted content)
```
How to Use

First, install the package:

npm install my-package

Then import:

import { myFunc } from 'my-package'

Finally, use it:

myFunc()
```

### Output
```markdown
# How to Use

First, install the package:

```bash
npm install my-package
```

Then import:

```javascript
import { myFunc } from 'my-package'
```

Finally, use it:

```javascript
myFunc()
```
```

**What happened:**
- Headings normalized
- Code blocks formatted with fenced syntax
- Consistent spacing
- Ready for documentation

---

## Example 6: Complex Document Cleanup

### Input (Real-world messy document)
```markdown
### Part 1

Content here.

#### Details
- __Important__ point
* Another point
+ Third point

### Part 2

More content with inconsistent _formatting_ and __bold__.
```

### Output
```markdown
# Part 1

Content here.

## Details

- **Important** point
- Another point
- Third point

# Part 2

More content with inconsistent *formatting* and **bold**.
```

**What happened:**
1. **Heading normalization**: H3→H1, H4→H2 (start from H1, no skipping)
2. **List marker normalization**: `*`, `+` → `-`
3. **Formatting consistency**: `__x__` → `**x**`, `_x_` → `*x*`
4. **Spacing**: Proper blank lines between sections
5. **Overall structure**: Clean, scannable Markdown

---

## Example 7: Edge Case - Heading-Only Document

### Input
```markdown
### Overview
### Features
### Installation
### Usage
### Contributing
```

### Output
```markdown
# Overview

# Features

# Installation

# Usage

# Contributing
```

**What happened:**
- All headings shifted from H3 to H1 (minimum level becomes H1)
- This is intentional - it ensures the document structure starts at the proper level

---

## Example 8: DOCX with Multiple Styles

### Input (Microsoft Word with style tags)
```
Heading 1: "Main Title"
Heading 2: "Section One"
Normal: "Some paragraph text"
Heading 3: "Subsection"
Normal: "More content"
Heading 1: "Next Major Section"
```

### Output
```markdown
# Main Title

## Section One

Some paragraph text

### Subsection

More content

# Next Major Section
```

**What happened:**
- All Word styles automatically mapped to Markdown equivalents
- Consistent hierarchy maintained
- Proper spacing preserved

---

## Use Cases

### 1. Converting a Word Resume
- Drop your `.docx` resume into Markly
- Get clean Markdown for GitHub or text-based tools
- Edit formatting as needed
- Download and use anywhere

### 2. Cleaning Up Copied Web Content
- Paste content from a website
- Markly detects it as Markdown (if it has MD patterns)
- Cleans up formatting inconsistencies
- Output is ready for your docs

### 3. Standardizing Multiple Documents
- Convert several DOCX files one by one
- Each output uses consistent formatting
- Combine outputs into a cohesive document
- Upload to GitHub, GitBook, or any MD-based platform

### 4. Converting Plain Text to Structured Markdown
- Paste plain text from a notepad
- Use the Edit toggle to add structure (headings, lists, etc.)
- Preview renders as you edit
- Download the final Markdown

### 5. Markdown Linting
- Paste messy Markdown
- Markly normalizes heading levels, list markers, spacing
- Review the cleaned output
- Copy cleaned version

---

## Tips & Tricks

### Tip 1: Verify Before Download
Always toggle to Preview mode to verify the output looks correct before downloading.

### Tip 2: Two-Step Process
For complex documents:
1. Convert DOCX → Markdown
2. Paste result back into Markly to further clean formatting

### Tip 3: Edit the Output
The output is editable! Fix any issues directly in the editor before copying/downloading.

### Tip 4: Copy & Combine
Convert multiple files, copy outputs, and paste them into a single document for easy concatenation.

### Tip 5: Preview for Presentation
Use the Preview tab to see how the output will render on GitHub, GitBook, or other Markdown viewers.

---

## What Markly Handles Well

✅ Heading normalization and hierarchy  
✅ List marker consistency  
✅ Bold/italic formatting consistency  
✅ Blank line normalization  
✅ DOCX to Markdown conversion  
✅ Plain text paragraph wrapping  
✅ Code block detection and formatting  
✅ Table preservation (GFM format)  

---

## What Markly Doesn't Handle

❌ Password-protected DOCX files  
❌ Complex nested tables  
❌ Image conversion/embedding  
❌ Figure/diagram conversion  
❌ Custom styling beyond basic formatting  
❌ Advanced Markdown features (YAML frontmatter, etc.)  

For these cases, the output is a clean Markdown base that you can manually enhance.
