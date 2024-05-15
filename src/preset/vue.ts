import type { Rules, FlatESLintConfig } from 'eslint-define-config'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'
import { GLOB_VUE } from 'src/globs'
import type { ConfigWithExtends } from 'typescript-eslint'
import tseslint from 'typescript-eslint'
import { tsCoreRules } from './typescript'

const VUE3_RULES: Rules = {
  ...pluginVue.configs.base.rules,
  ...pluginVue.configs['vue3-essential'].rules,
  ...pluginVue.configs['vue3-strongly-recommended'].rules,
  ...pluginVue.configs['vue3-recommended'].rules,
}
const VUE_CUSTOM_RULES: Partial<Rules> = {
  'vue/multi-word-component-names': 'warn',
}
const VUE_TS_CORE_RULES = tseslint.config({
  extends: tsCoreRules as ConfigWithExtends['extends'],
  files: [GLOB_VUE],
}) as FlatESLintConfig[]

export const vue: FlatESLintConfig[] = [
  ...VUE_TS_CORE_RULES,
  {
    files: [GLOB_VUE],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      }, // TODO: 这里为啥要指定@typescript-eslint/parser？是为了vue的ts部分统一使用typescript-eslint？
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      vue: pluginVue,
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...VUE3_RULES,
      ...VUE_CUSTOM_RULES,
    },
  },
]
