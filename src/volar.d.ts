declare module 'vue' {
  interface GlobalComponents {
    MCountTo: typeof import('miuku-ui')['MCountTo']
    MSmartTable: typeof import('miuku-ui')['MSmartTable']
    MTimeLineSlider: typeof import('miuku-ui')['MTimeLineSlider']
    MWaveWrapper: typeof import('miuku-ui')['MWaveWrapper']
  }
}

export {}
