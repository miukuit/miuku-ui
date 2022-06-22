<template><div><h1 id="开发指南" tabindex="-1"><a class="header-anchor" href="#开发指南" aria-hidden="true">#</a> 开发指南</h1>
<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p><code v-pre>miuku-ui</code>是基于<a href="https://v3.cn.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue.js@3.x<ExternalLinkIcon/></a>开发的一套轻便、便捷、高效、炫酷的UI组件库框架。</p>
<blockquote>
<p>由于 Vue3 不再支持 IE11，miuku-ui 也不再支持 IE 浏览器。</p>
</blockquote>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<h3 id="npm" tabindex="-1"><a class="header-anchor" href="#npm" aria-hidden="true">#</a> NPM</h3>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ npm i miuku-ui
<span class="token comment"># 或</span>
$ yarn miuku-ui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cdn" tabindex="-1"><a class="header-anchor" href="#cdn" aria-hidden="true">#</a> CDN</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 样式库 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>//unpkg.com/miuku-ui/dist/miuku-ui.css<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token comment">&lt;!-- 组件库 在此之前请引入 Vue3 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>//unpkg.com/miuku-ui<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="引入" tabindex="-1"><a class="header-anchor" href="#引入" aria-hidden="true">#</a> 引入</h2>
<h3 id="全局引入" tabindex="-1"><a class="header-anchor" href="#全局引入" aria-hidden="true">#</a> 全局引入</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// main.js</span>
<span class="token keyword">import</span> miukuUI <span class="token keyword">from</span> <span class="token string">'miuku-ui'</span>
<span class="token comment">// 引入组件样式文件</span>
<span class="token keyword">import</span> <span class="token string">'miuku-ui/dist/miuku-ui.css'</span>
<span class="token comment">// 注册组件</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>miukuUI<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
