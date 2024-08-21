import type { FlatESLintConfig } from 'eslint-define-config'
import type { SnowdreamESLintConfig } from './typings'
import { getTSRules } from './preset/typescript'
import { getVueRules } from './preset/vue'
import { format } from './preset/format'

export function snowdream(config: Partial<SnowdreamESLintConfig>, customConfigs: FlatESLintConfig[] = []) {
  const configs: FlatESLintConfig[] = [...format]

  if (config.typescript) {
    configs.push(...getTSRules(config.baseUrl))
  }

  if (config.vue) {
    configs.push(...getVueRules(config.baseUrl))
  }

  configs.push(...customConfigs)

  return configs
}
