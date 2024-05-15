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
    /**
     * @link https://typescript-eslint.io/rules/naming-convention/
     * 这个规则是针对标识符命名风格的，可惜没有提供autofix
     */
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['variable'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: ['function'],
        format: ['camelCase']
      },
      // 解构变量就不用限制了
      {
        selector: ['variable'],
        modifiers: ['destructured'],
        format: null
      },
      // 全局常量必须是大写
      {
        selector: ['variable'],
        modifiers: ['const', 'global'],
        format: ['UPPER_CASE']
      },
      // 导出的常量成员可以是驼峰
      {
        selector: ['variable'],
        modifiers: ['const', 'global', 'exported'],
        format: ['UPPER_CASE', 'camelCase']
      },
      // 如果已经是必须要用引号包裹的属性了，就不用限制格式了
      {
        selector: ['objectLiteralProperty'],
        modifiers: ['requiresQuotes'],
        format: null
      },
      // 类型声明标识符为大驼峰
      {
        selector: ['interface', 'typeAlias'],
        format: ['PascalCase']
      }
    ],
    '@typescript-eslint/no-unused-vars': 'warn'
  },
}) as FlatESLintConfig[]

export const typescript: FlatESLintConfig[] = [
  ...tsCoreRules,
  {
    files: [GLOB_DTS],
    rules: {},
  },
]
