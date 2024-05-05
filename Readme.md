# @snowdream_x/eslint-config![img](https://img.shields.io/npm/v/@snowdream_x/eslint-config)

纯个人自用的eslint配置集合，架构设计参考自[sxzz/eslint-config](https://github.com/sxzz/eslint-config)。


# 关于Prettier

本来想参照[sxzz/prettier-config](https://github.com/sxzz/prettier-config)项目也专门配置一个 `prettier`的规则预设，其实可以不用分离出一个单独的项目来分发这个预设规则文件。只需要 `npm`打包的时候把规则文件（如[./prettierrc.js](./prettierrc.js)）加入（对应 `package.json`的 `files`字段设置），加上 `exports的`配置即可：

```json
{
  "files": [
    "prettierrc.js"
  ],
  "exports": {
    "./prettier": {
      "require": "./prettierrc.js",
      "import": "./prettierrc.js"
    }
  }
}
```

这样就可以在需要的项目中，对 `package.json`文件设置 `prettier`字段为 `@snowdream_x/eslint-config/prettier`即可复用这份配置。


## prettier 的绝佳替代

不过实际项目中如果要涉及到 `eslint`和 `prettier`混用，确实会有一些冲突的地方，主要在于 `prettier`和 `eslint`的设计目的和职责有所不同，前者的定位是 `formatter`，而后者是 `linter`。不过 `eslint`由于自带基于规则的精准且可定制的 `auto fix`，因此个人更喜欢用 `eslint`这套机制来格式化代码，且prettier本身确实对于规则的定制太少了！关于prettier的不足，推荐看看 `antfu`大佬的这篇文章——[为什么我不使用 Prettier](https://antfu.me/posts/why-not-prettier-zh)。

而eslint本身就能提供代码风格相关的一些规则，因此可以替代formatter。不过传统的eslint的规则配置是按照语言进行区分，基本上一个语言对应一个plugin和一个config包，所以如果要基于prettier的方式配置eslint就得对每个语言进行配置，略繁琐。不过在搜索后发现，其实目前前端常见的语言对应的eslint包都把formatter相关的规则迁移到另一个项目——[eslint-stylistic](https://github.com/eslint-stylistic/eslint-stylistic)，该项目就是专门承接eslint中formatter的规则，所以基于此可以让eslint同时完成eslint + formatter的任务了。

### @stylistic/eslint-plugin

该包适用于 `JS/JSX/TS`语言的代码风格定制，规则名跟 `prettier`接近，所以很容易配置，如：

```js
import stylistic from '@stylistic/eslint-plugin'
import type { FlatESLintConfig } from 'eslint-define-config'

export const format: FlatESLintConfig[] = [
  stylistic.configs.customize({
    semi: false,
    indent: 2,
    quotes: 'single',
    commaDangle: 'only-multiline',
    quoteProps: 'as-needed'
  }) as FlatESLintConfig
]
```


# API

## declarefunctionsnowdream(config:Partial `<SnowdreamESLintConfig>`, customConfigs?:FlatESLintConfig[]):FlatESLintConfig[]

```js
// eslint.config.js
import { snowdream } from '@snowdream_x/eslint-config'

export default snowdream({
  vue: true, // 加入vue的eslint规则预设
  typescript: true // 同理
}, [
  {
    ignores: ['src/styles/**/*.css']
  } // 自定义规则，可以进行覆盖
])
```
