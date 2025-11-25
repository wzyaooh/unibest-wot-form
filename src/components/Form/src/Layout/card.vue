<template>
  <view class="cardContainer">
    <view class="cardLabelContainer">
      <view class="labelContent">
        <view class="cardLabel">
          {{ title }}
        </view>
        <view class="cardLabelLine" />
      </view>
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '分组标题',
  },
})
</script>

<style lang="scss" scoped>
.cardContainer {
  margin-top: 32rpx;
  .cardLabelContainer {
    width: 686rpx;
    margin-bottom: 32rpx;
    position: relative;
    .labelContent {
      .cardLabel {
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 600;
        font-size: 32rpx;
        color: #000000;
        line-height: 40rpx;
      }
      .cardLabelLine {
        width: 128rpx;
        height: 8rpx;
        background: #3078fd;
        position: absolute;
        left: 0rpx;
        bottom: -6rpx;
      }
    }
  }
}
</style>
