const { defaultTheme } = require('@vuepress/theme-default')
module.exports = {
  base: 'miuku-ui',
  port: '10086',
  lang: 'zh-CN',
  title: 'miuku-ui',
  description: 'miuku-ui: UI lib',
  dest: 'release',
  head: [
    ['link', {
      rel: 'icon',
      href: '/img/logo.png'
    }]
  ],
  markdown: {
    code: {
      lineNumbers: true
    }
  },
  theme: defaultTheme({
    logo: '/img/logo.png', // logo
    // repo 将被用作 仓库链接 的链接。仓库链接 将会显示为导航栏的最后一个元素。
    repo: 'https://github.com/miukuit/miuku-ui',
    navbar: [
      {
        text: '指南',
        link: '/'
      },
      {
        text: '组件',
        link: '/guide/components'
      }
    ],
    sidebarDepth: 2, // 侧边栏显示2级
  })
}