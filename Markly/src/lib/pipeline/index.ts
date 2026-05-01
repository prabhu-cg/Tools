import type { RawInput } from '../../types'
import { detectInputType } from './detectType'
import { docxToMarkdown } from './docxToMarkdown'
import { txtToMarkdown } from './txtToMarkdown'
import { mdToMarkdown } from './mdToMarkdown'
import { applyCleanup } from '../cleanup'
import { applyFormatter } from '../formatter'

async function getMarkdown(input: RawInput): Promise<string> {
  const type = detectInputType(input.file, input.text)

  let rawMarkdown: string

  if (type === 'docx') {
    if (!input.arrayBuffer) {
      throw new Error('No data provided')
    }
    rawMarkdown = await docxToMarkdown(input.arrayBuffer)
  } else if (type === 'txt') {
    if (!input.text) {
      throw new Error('No data provided')
    }
    rawMarkdown = txtToMarkdown(input.text)
  } else if (type === 'md') {
    if (!input.text) {
      throw new Error('No data provided')
    }
    rawMarkdown = mdToMarkdown(input.text)
  } else {
    throw new Error('Unsupported file type')
  }

  if (!rawMarkdown.trim()) {
    throw new Error('No content found in the input')
  }

  // Apply cleanup and formatting
  const cleanedMarkdown = applyCleanup(rawMarkdown)
  const finalMarkdown = applyFormatter(cleanedMarkdown)

  return finalMarkdown
}

export async function runPipeline(input: RawInput): Promise<string> {
  return getMarkdown(input)
}
