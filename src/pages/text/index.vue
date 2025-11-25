<script lang="ts" setup>
import type { FormGroupRow } from '@/components/Form/src/types/form'
import BasicForm from '@/components/Form/src/BasicForm.vue'

const group: FormGroupRow[] = [
  { key: 'basic', title: '基本信息', columns: [
    { field: 'name', component: 'WdInput', label: '姓名',
      // defaultValue: 1,
      border: true, required: true, componentProps: {
        placeholder: '请输入姓名',
      }, rules: [{ required: true, message: '请输入姓名' }] },
    { field: 'age', component: 'WdInput', label: '年龄',
      // defaultValue: 1,
      border: true, required: true, componentProps: {
        placeholder: '请输入年龄',
      }, rules: [{ required: true, message: '请输入年龄' }] },
  ] },
  { key: 'basic', title: '银行卡信息', columns: [
    { field: 'name', component: 'WdInput', label: '姓名',
      // defaultValue: 1,
      border: true, required: true, componentProps: {
        placeholder: '请输入姓名',
      }, rules: [{ required: true, message: '请输入姓名' }] },
    { field: 'age', component: 'WdInput', label: '年龄',
      // defaultValue: 1,
      border: true, required: true, componentProps: {
        placeholder: '请输入年龄',
      }, rules: [{ required: true, message: '请输入年龄' }] },
  ] },
]
definePage({
  style: {
    navigationBarTitleText: 'group示例',
  },
})
</script>

<template>
  <view class="container">
    <BasicForm
      ref="basicFormRef"
      submit-button-text="提交"
      layout="horizontal"
      :group="group"
      :show-action-button-group="true"
      :grid-props="{
        gutter: 10,
        column: 2,
      }"
    />
  </view>
</template>

<style lang="scss" scoped>
.container {
  width: 686rpx;
  margin: 0 auto;
}
</style>
