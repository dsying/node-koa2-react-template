# Install

```s
yarn install
npm install
```

# parcel 构建
项目整理依赖 Parcel 打包构建

```json
"build": "rm -rf dist && parcel build src/index.html --no-cache -d dist --public-url /"
```
*npm run build*

# .babelrc
通过配置 *.babelrc* , 来支持 es6/es7 语法
Parcel打包时会自动寻找 .babelrc 配置文件

# Scss

```s
yarn add postcss-preset-env node-sass autoprefixer
```
