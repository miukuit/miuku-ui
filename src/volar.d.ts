declare module 'vue' {
  interface GlobalComponents {
    MSmartTable: typeof import('miuku-ui')['MSmartTable']
    MTimeLineSlider: typeof import('miuku-ui')['MTimeLineSlider']
  }
}

export {}
