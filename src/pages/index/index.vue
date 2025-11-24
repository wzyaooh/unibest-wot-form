<template>
  <view style="width: 686rpx;margin: 100px auto 0px;">
    <BasicForm
      ref="basicFormRef"
      submit-button-text="提交预约"
      :schemas="schemas"
      :show-action-button-group="true"
      @submit="handleSubmit"
    />
  </view>
</template>

<script lang="ts" setup -->
import type { FormSchema } from '@/components/Form/src/types/form'
import BasicForm from '@/components/Form/src/BasicForm.vue'

defineOptions({
  name: 'Home',
})
const basicFormRef = ref()
definePage({
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    backgroundColor: '#f5f5f5',
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

const schemas: FormSchema[] = reactive([
  {

    field: 'name',
    component: 'WdInput',
    isHidden: true,
    label: '姓名',
    // defaultValue: 1,
    border: true,
    required: true,
    componentProps: {
      placeholder: '请输入姓名',
      onInput: (e: any) => {
        console.log(e, '=======<>')
      },
    },
    rules: [{ required: true, message: '请输入姓名' }],
  },
  {

    field: 'age',
    component: 'WdInput',
    isHidden: true,
    label: '年龄',
    defaultValue: 1,
    border: true,
    required: true,
    componentProps: {
      placeholder: '请输入年龄',
      onInput: (e: any) => {
        console.log(e, '=======<>')
      },
    },
    rules: [{ required: true, message: '请输入年龄' }],
  },
  {

    field: 'age',
    component: 'WdInput',
    isHidden: true,
    label: '年龄',
    defaultValue: 1,
    border: true,
    required: true,
    componentProps: {
      placeholder: '请输入年龄',
      onInput: (e: any) => {
        console.log(e, '=======<>')
      },
    },
    rules: [{ required: true, message: '请输入年龄' }],
  },
])

function handleSubmit(values) {
  console.log('1', '===>', values)
  // basicFormRef.value.validate()
}

onLoad(() => {
  console.log('测试 uni API 自动引入: onLoad')
})
</script>
