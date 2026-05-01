import { create } from 'zustand'
import type { AppState, AppActions } from '../types'

const initialState: Omit<AppState, keyof AppActions> = {
  rawInput: null,
  output: '',
  mode: 'idle',
  status: 'idle',
  errorMessage: null,
  previewTab: 'raw',
  issues: [],
  issueFilter: { errors: true, warnings: true, suggestions: true },
  outputHistory: [],
  validationPanelOpen: false,
}

export const useAppStore = create<AppState & AppActions>((set) => ({
  ...initialState,
  setRawInput: (input) => set({ rawInput: input }),
  setOutput: (output) => set({ output }),
  setMode: (mode) => set({ mode }),
  setStatus: (status) => set({ status }),
  setError: (errorMessage) => set({ errorMessage }),
  setPreviewTab: (previewTab) => set({ previewTab }),
  setIssues: (issues) => set({ issues }),
  setIssueFilter: (partial) =>
    set((s) => ({ issueFilter: { ...s.issueFilter, ...partial } })),
  applyFix: (fix) =>
    set((s) => ({
      output: fix(s.output),
      outputHistory: [s.output, ...s.outputHistory].slice(0, 20),
    })),
  applyFixAll: (fixes) =>
    set((s) => ({
      output: fixes.reduce((md, fn) => fn(md), s.output),
      outputHistory: [s.output, ...s.outputHistory].slice(0, 20),
    })),
  undo: () =>
    set((s) =>
      s.outputHistory.length === 0
        ? s
        : {
            output: s.outputHistory[0],
            outputHistory: s.outputHistory.slice(1),
          }
    ),
  setValidationPanelOpen: (open) => set({ validationPanelOpen: open }),
  reset: () => set(initialState),
}))
