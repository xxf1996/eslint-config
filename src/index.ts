import type { FlatESLintConfig } from 'eslint-define-config'
import type { SnowdreamESLintConfig } from './typings'
import { typescript } from './preset/typescript'
import { vue } from './preset/vue'
import { format } from './preset/format'

export function snowdream(config: Partial<SnowdreamESLintConfig>, customConfigs: FlatESLintConfig[] = []) {
  const configs: FlatESLintConfig[] = [...format]

  if (config.typescript) {
    configs.push(...typescript)
  }

  if (config.vue) {
    configs.push(...vue)
  }

  configs.push(...customConfigs)

  return configs
}
