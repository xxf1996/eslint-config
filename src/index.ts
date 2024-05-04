import { FlatESLintConfig } from 'eslint-define-config'
import { SnowdreamESLintConfig } from './typings'
import { typescript } from './preset/typescript'
import { vue } from './preset/vue'
import { prettier } from './preset/prettier'

export function snowdream(config: Partial<SnowdreamESLintConfig>) {
  const configs: FlatESLintConfig[] = [...prettier]

  if (config.typescript) {
    configs.push(...typescript)
  }

  if (config.vue) {
    configs.push(...vue)
  }

  return configs
}
