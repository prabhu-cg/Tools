import type { ValidationIssue, IssueType, RuleName, IssueFilter } from './validation'

export type { ValidationIssue, IssueType, RuleName, IssueFilter }
export type InputType = 'docx' | 'txt' | 'md' | 'unknown'
export type AppMode = 'convert' | 'format' | 'idle'
export type ProcessingStatus = 'idle' | 'processing' | 'done' | 'error'

export interface RawInput {
  type: InputType
  filename?: string
  file?: File
  text?: string
  arrayBuffer?: ArrayBuffer
}

export interface AppState {
  rawInput: RawInput | null
  output: string
  mode: AppMode
  status: ProcessingStatus
  errorMessage: string | null
  previewTab: 'raw' | 'preview'
  issues: ValidationIssue[]
  issueFilter: IssueFilter
  outputHistory: string[]
  validationPanelOpen: boolean
}

export interface AppActions {
  setRawInput: (input: RawInput | null) => void
  setOutput: (markdown: string) => void
  setMode: (mode: AppMode) => void
  setStatus: (status: ProcessingStatus) => void
  setError: (msg: string | null) => void
  setPreviewTab: (tab: 'raw' | 'preview') => void
  setIssues: (issues: ValidationIssue[]) => void
  setIssueFilter: (filter: Partial<IssueFilter>) => void
  applyFix: (fix: (markdown: string) => string) => void
  applyFixAll: (fixes: Array<(markdown: string) => string>) => void
  undo: () => void
  setValidationPanelOpen: (open: boolean) => void
  reset: () => void
}
