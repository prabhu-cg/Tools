import { detectMultipleH1 } from './rules/multipleH1'
import { detectSkippedHeadings } from './rules/skippedHeadings'
import { detectEmptyHeadings } from './rules/emptyHeadings'
import { detectInconsistentEmphasis } from './rules/inconsistentEmphasis'
import { detectConsecutiveBlankLines } from './rules/consecutiveBlankLines'
import { detectMissingBlankBeforeHeading } from './rules/missingBlankBeforeHeading'
import { detectBrokenListNesting } from './rules/brokenListNesting'
import { detectMixedBulletTypes } from './rules/mixedBulletTypes'
import { detectEmptyLinks } from './rules/emptyLinks'
import { detectMalformedLinks } from './rules/malformedLinks'
import type { ValidationIssue } from '../../types/index'

export function detectIssues(markdown: string): ValidationIssue[] {
  if (!markdown.trim()) return []

  return [
    ...detectMultipleH1(markdown),
    ...detectSkippedHeadings(markdown),
    ...detectEmptyHeadings(markdown),
    ...detectInconsistentEmphasis(markdown),
    ...detectConsecutiveBlankLines(markdown),
    ...detectMissingBlankBeforeHeading(markdown),
    ...detectBrokenListNesting(markdown),
    ...detectMixedBulletTypes(markdown),
    ...detectEmptyLinks(markdown),
    ...detectMalformedLinks(markdown),
  ]
}

export { type ValidationIssue }
