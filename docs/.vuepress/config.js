const { defaultTheme } = require('@vuepress/theme-default')
const { path } = require('@vuepress/utils')

const navbar = require('./config/navbar')

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
      href: '/images/logo.png'
    }]
  ],
  markdown: {
    code: {
      lineNumbers: true
    }
  },
  theme: defaultTheme({
    logo: '/images/logo.png', // logo
    // repo 将被用作 仓库链接 的链接。仓库链接 将会显示为导航栏的最后一个元素。
    repo: 'https://github.com/miukuit/miuku-ui',
    navbar,
    sidebarDepth: 2, // 侧边栏显示2级
  }),
  plugins:[
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components')
      }
    ]
  ]
}