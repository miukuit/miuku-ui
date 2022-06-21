# miuku-ui 

## 开发文档 

## 介绍 

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



## Button 按钮

### 属性

| 属性       | 说明               | 类型    | 可选值                                      | 默认值  |
| ---------- | ------------------ | ------- | ------------------------------------------- | ------- |
| size       | 尺寸大小           | String  | large、default、small                       | default |
| type       | 颜色类型           | String  | primary、success、info、warning、danger     | primary |
| bg-color   | 自定义按钮背景颜色 | String  | 例如：#f0f，green，rgba(255, 255, 255, 0.4) |         |
| text-color | 自定义文本颜色     | String  | 例如：#f0f，green，rgba(255, 255, 255, 0.4) |         |
| disabled   | 是否为禁用状态     | Boolean |                                             | false   |
| round      | 是否为圆角         | Boolean |                                             | false   |
|            |                    |         |                                             |         |




## Particles 粒子

### Options


## Loading 加载动画
### Options 参数

