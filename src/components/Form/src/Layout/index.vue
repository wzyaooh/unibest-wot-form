<template>
  <wd-cell
    :required="required"
    :border="false"
    :prop="prop"
    :rules="rules"
    custom-style="border-bottom:1px solid #EBEBEB;"
    :clickable="clickable"
    @click="showToast"
  >
    <template #title>
      <view class="cell-label">
        <view class="cell-label-text">
          {{ label }}
        </view>
      </view>
    </template>
    <slot />
  </wd-cell>
  <wd-toast />
</template>

<script lang="ts" setup>
import { useToast } from 'wot-design-uni'
import { layoutProps } from './type'

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
})

const props = defineProps(layoutProps)

const toast = useToast()

function showToast() {
  toast.show('点击')
}
</script>

<style lang="scss" scoped>
.cell-label {
  display: flex;
  align-items: center;
  .cell-label-text {
    font-family:
      PingFang SC,
      PingFang SC !important;
    font-weight: 400 !important;
    font-size: 28rpx !important;
    color: #333333 !important;
  }
  .cell-label-question {
    margin-left: 10rpx;
    width: 20rpx;
    height: 20rpx;
    background-color: red;
  }
}
</style>
