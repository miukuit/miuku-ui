<!--  验证码 -->
<template>
  <div class="miu-identify"
    :style="{ height: `${height}px`, width: `${width}px` }"
  >
    <canvas ref="identifyCanvas" :width="width" :height="height"></canvas>
  </div>
</template>
<script>
export default {
  name: 'miuIdentify',
  props: {
    // 验证的代码
    code: {
      type: String,
      required: true,
      default: 'aBcd'
    },
    // 字体大小区间
    minSize: {
      type: Number,
      default: 25
    },
    maxSize: {
      type: Number,
      default: 30
    },
    // 字体颜色区间
    minColor: {
      type: Number,
      default: 0
    },
    maxColor: {
      type: Number,
      default: 160
    },
    // 背景颜色区间
    minBgColor: {
      type: Number,
      default: 255
    },
    maxBgColor: {
      type: Number,
      default: 255
    },
    // 容器宽高 单位：像素(px)
    width: {
      type: Number,
      default: 110
    },
    height: {
      type: Number,
      default: 32
    },
    // 干扰线条数区间
    minLineNumber: {
      type: Number,
      default: 5
    },
    maxLineNumber: {
      type: Number,
      default: 10
    },
    lineNumber: {
      type: Number
    },
    // 线条颜色区间
    minLineColor: {
      type: Number,
      default: 100
    },
    maxLineColor: {
      type: Number,
      default: 255
    },
    // 干扰点颜色区间
    minDotColor: {
      type: Number,
      default: 0
    },
    maxDotColor: {
      type: Number,
      default: 255
    },
  },
  watch: {
    code () {
      this.drawPicture()
    }
  },
  mounted () {
    this.drawPicture()
  },
  methods: {
    // 绘制干扰点
    drawDots (ctx) {
      let dotNumber = this.randomNum(70, 100)
      for (let i = 0; i < dotNumber; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(this.randomNum(0, this.width), this.randomNum(0, this.height), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    },
    // 绘制干扰线
    drawLines (ctx) {
      // 如果设置了线条数，则设置无效
      let number = this.lineNumber ? this.lineNumber : this.randomNum(this.minLineNumber, this.maxLineNumber)
      for (let i = 0; i < number; i++) {
        ctx.strokeStyle = this.randomColor(this.minLineColor, this.maxLineColor)
        ctx.beginPath()
        ctx.moveTo(this.randomNum(0, this.width), this.randomNum(0, this.height))
        ctx.lineTo(this.randomNum(0, this.width), this.randomNum(0, this.height))
        ctx.stroke()
      }
    },
    // 绘制文字
    drawText (ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.minColor, this.maxColor)
      ctx.font = this.randomNum(this.minSize, this.maxSize) + 'px SimHei'
      let x = (i + 1) * (this.width / (this.code.length + 1))
      let y = this.randomNum(this.maxSize, this.height - 5)
      var deg = this.randomNum(-50, 50) // 旋转角度
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    },
    // 绘制背景图片
    drawPicture () {
      let canvas = this.$refs.identifyCanvas
      let ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 绘制背景
      ctx.fillStyle = this.randomColor(this.minBgColor, this.maxBgColor)
      ctx.fillRect(0, 0, this.width, this.height)
      // 绘制文字
      for (let i = 0; i < this.code.length; i++) {
        this.drawText(ctx, this.code[i], i)
      }
      // 绘制干扰线
      this.drawLines(ctx)
      // 绘制干扰点
      this.drawDots(ctx)
    },
    // 生产一个 [min, max) 区间的随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      let r = this.randomNum(min, max)
      let g = this.randomNum(min, max)
      let b = this.randomNum(min, max)
      return `rgb(${r}, ${g}, ${b})`
    }
  }
}
</script>