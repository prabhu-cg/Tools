import mammoth from 'mammoth'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import remarkStringify from 'remark-stringify'

const styleMap = [
  "p[style-name='Heading 1'] => h1:fresh",
  "p[style-name='Heading 2'] => h2:fresh",
  "p[style-name='Heading 3'] => h3:fresh",
  "p[style-name='Heading 4'] => h4:fresh",
  "p[style-name='Heading 5'] => h5:fresh",
  "p[style-name='Heading 6'] => h6:fresh",
]

export async function docxToMarkdown(buffer: ArrayBuffer): Promise<string> {
  try {
    const options: any = {
      arrayBuffer: buffer,
      styleMap,
    }
    const result = await mammoth.convertToHtml(options)

    if (result.messages.length > 0) {
      console.warn('Mammoth conversion warnings:', result.messages)
    }

    const html = result.value

    // Convert HTML to Markdown using unified pipeline
    const file = await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeRemark, {
        handlers: {
          ins: () => undefined,
          del: () => undefined,
          figure: () => undefined,
          img: () => undefined,
        },
      })
      .use(remarkStringify)
      .process(html)

    return String(file)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to convert DOCX: ${error.message}`)
    }
    throw new Error('Failed to convert DOCX: Unknown error')
  }
}
