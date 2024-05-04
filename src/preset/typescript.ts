import type { FlatESLintConfig } from 'eslint-define-config'
import { GLOB_DTS, GLOB_TS, GLOB_TSX } from 'src/globs'
import tseslint from 'typescript-eslint'

export const tsCoreRules = tseslint.config({
  extends: [...tseslint.configs.recommended],
  files: [GLOB_TS, GLOB_TSX],
  languageOptions: {
    parser: tseslint.parser,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
  },
}) as FlatESLintConfig[]

export const typescript: FlatESLintConfig[] = [
  ...tsCoreRules,
  {
    files: [GLOB_DTS],
    rules: {},
  },
]
