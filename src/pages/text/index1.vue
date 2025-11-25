<script lang="ts" setup>
import type { FormSchema } from '@/components/Form/src/types/form'
import BasicForm from '@/components/Form/src/BasicForm.vue'

const basicFormRef = ref()
const schemas: FormSchema[] = [
  { field: 'name', component: 'WdInput', label: '姓名',
    // defaultValue: 1,
    border: true, required: true, componentProps: {
      placeholder: '请输入姓名',
    }, giProps: {
      span: 1,
    }, rules: [{ required: true, message: '请输入姓名' }] },
  { field: 'age', component: 'WdInput', label: '年龄', isHidden: true,
    // defaultValue: 1,
    border: true, required: true, componentProps: {
      placeholder: '请输入年龄',
    }, giProps: {
      span: 1,
    }, rules: [{ required: true, message: '请输入年龄' }] },
  {
    field: 'picker',
    component: 'WdPicker',
    label: '选择器',
    clickable: true,
    componentProps: {
      placeholder: '请输入年龄',
      columns: [
        '中南大学',
        '软件工程',
      ],
      onConfirm: val => handleConfirm(val),
    },
    required: true,
    giProps: {
      span: 2,
    },
    rules: [{ required: true, message: '请输入年龄' }],
  },
  { field: 'choose', component: 'WdInput', label: '选择中南显示', isHidden: false,
    // defaultValue: 1,
    border: true, required: true, componentProps: {
      placeholder: '请输入年龄',
    }, giProps: {
      span: 2,
    }, rules: [{ required: true, message: '请输入年龄' }] },
]
function handleSubmit() {
  const values = basicFormRef.value.getFieldsValue()
  console.log(values, '结果')
}

function handleConfirm({ value, selectedItems }) {
  schemas[3].isHidden = true
  basicFormRef.value.setSchema([...schemas])
}
definePage({
  style: {
    navigationBarTitleText: '测试',
  },
})
</script>

<template>
  <view class="container">
    <BasicForm
      ref="basicFormRef"
      submit-button-text="提交"
      layout="horizontal"
      :schemas="schemas"
      :show-action-button-group="true"
      :grid-props="{
        gutter: 10,
        column: 2,
      }"
      @submit="handleSubmit"
    />
  </view>
</template>

<style lang="scss" scoped>
.container {
  width: 686rpx;
  margin: 0 auto;
}
</style>
