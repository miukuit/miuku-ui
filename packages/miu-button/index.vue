<template>
  <button
    class="miu-button"
    :class="[
      `miu-button-${type}`,
      `miu-button-${size}`,
      {
        'is-round': round
      }
    ]"
    :style="{
      backgroundColor: bgColor,
      color: textColor
    }"
    :disabled="disabled"
  >
    <span>
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: 'miuButton',
  props: {
    size: {
      type: String,
      default: 'default'
    },
    type: {
      type: String,
      default: 'primary'
    },
    bgColor: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../style/color.scss';
.miu-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  border: none;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 3px;
  outline: none;
  transition: 0.1s;
  font-weight: 500;
  font-size: 14px;
  //禁止元素的文字被选中
  -moz-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:active {
    transform: translate(1px, 1px);
  }
}
.miu-button-primary {
  background-color: $primary-color;
  color: $white-color;
}
.miu-button-success {
  background-color: $success-color;
  color: $white-color;
}
.miu-button-info {
  background-color: $info-color;
  color: $white-color;
}
.miu-button-warning {
  background-color: $warning-color;
  color: $white-color;
}
.miu-button-danger {
  background-color: $danger-color;
  color: $white-color;
}

.miu-button-large {
  height: 40px;
  line-height: 40px;
}
.miu-button-large.is-round {
  border-radius: 40px;
}

.miu-button-default {
  height: 35px;
  line-height: 35px;
}
.miu-button-default.is-round {
  border-radius: 35px;
}

.miu-button-small {
  height: 28px;
  line-height: 28px;
}
.miu-button-small.is-round {
  border-radius: 28px;
}
</style>
