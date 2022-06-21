// 整个包入口
import miuButton from './miu-button' // 按钮
import miuParticles from './miu-particles' // 粒子

// 加载字体图标

const components = [
  miuButton,
  miuParticles
]

// 定义install方法
const install = (Vue) => {
  // 注册所有的组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

// 判断是否直接引入文件，如果是，就不用调用Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 导出install方法
export default {
  install
}
