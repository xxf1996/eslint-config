import stylistic from '@stylistic/eslint-plugin'
import type { FlatESLintConfig } from 'eslint-define-config'

// 替代prettier的绝佳工具，可以基于eslint的规则来进行代码的格式化定制
export const format: FlatESLintConfig[] = [
  stylistic.configs.customize({
    semi: false,
    indent: 2,
    quotes: 'single',
    commaDangle: 'only-multiline',
    quoteProps: 'as-needed',
    braceStyle: '1tbs' // https://eslint.org/docs/latest/rules/brace-style
  }) as FlatESLintConfig
]
