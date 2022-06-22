const { defaultTheme } = require('@vuepress/theme-default')
module.exports = {
  lang: 'zh-CN',
  title: 'miuku-ui',
  description: 'miuku-ui',
  dest: 'release',
  port: '10086',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  markdown: {
    code: {
      lineNumbers: true
    }
  },
  theme: defaultTheme({
    navbar: [
      { text: '指南', link: '/' },
      { text: '组件', link: '/components/' },
      { text: 'Github', link: 'https://github.com/miukuit/miuku-ui' }
    ]
})
}