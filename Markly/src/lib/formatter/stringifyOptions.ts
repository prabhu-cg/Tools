import type { Options } from 'remark-stringify'

export const STRINGIFY_OPTIONS: Options = {
  bullet: '-',
  emphasis: '*',
  fence: '`',
  fences: true,
  incrementListMarker: true,
  rule: '-',
  ruleSpaces: false,
  setext: false,
  tightDefinitions: false,
}
