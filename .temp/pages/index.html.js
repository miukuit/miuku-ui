export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"开发指南\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"简介\",\"slug\":\"简介\",\"children\":[]},{\"level\":2,\"title\":\"安装\",\"slug\":\"安装\",\"children\":[{\"level\":3,\"title\":\"NPM\",\"slug\":\"npm\",\"children\":[]},{\"level\":3,\"title\":\"CDN\",\"slug\":\"cdn\",\"children\":[]}]},{\"level\":2,\"title\":\"引入\",\"slug\":\"引入\",\"children\":[{\"level\":3,\"title\":\"全局引入\",\"slug\":\"全局引入\",\"children\":[]}]}],\"git\":{\"updatedTime\":1655882002000,\"contributors\":[{\"name\":\"VisionView\",\"email\":\"38584405+VisionView@users.noreply.github.com\",\"commits\":1}]},\"filePathRelative\":\"README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
