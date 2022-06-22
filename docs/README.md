# 开发指南

## 简介
`miuku-ui`是基于[Vue.js@3.x](https://v3.cn.vuejs.org/)开发的一套轻便、便捷、高效、炫酷的UI组件库框架。
> 由于 Vue3 不再支持 IE11，miuku-ui 也不再支持 IE 浏览器。

## 安装
### NPM
```powershell
$ npm i miuku-ui
# 或
$ yarn miuku-ui
```
### CDN

```html
<!-- 样式库 -->
<link rel="stylesheet" href="//unpkg.com/miuku-ui/dist/miuku-ui.css" />
<!-- 组件库 在此之前请引入 Vue3 -->
<script src="//unpkg.com/miuku-ui"></script>
```

## 引入
### 全局引入

```js
// main.js
import miukuUI from 'miuku-ui'
// 引入组件样式文件
import 'miuku-ui/dist/miuku-ui.css'
// 注册组件
app.use(miukuUI)
```