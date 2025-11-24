<template>
  <view style="width: 686rpx;margin: 100px auto 0px;">
    <BasicForm
      ref="basicFormRef"
      submit-button-text="提交预约"
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

<script lang="ts" setup>
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
    giProps: {
      span: 1,
    },
    rules: [{ required: true, message: '请输入姓名' }],
  },
  {

    field: 'name1',
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
    giProps: {
      span: 1,
    },
    rules: [{ required: true, message: '请输入姓名' }],
  },
  {
    field: 'picker',
    component: 'WdPicker',
    label: '选择器',
    componentProps: {
      placeholder: '请输入年龄',
      columns: [
        '中南大学',
        '软件工程',
      ],
    },
    required: true,
    giProps: {
      span: 2,
    },
    rules: [{ required: true, message: '请输入年龄' }],
  },
  {
    field: 'WdSelectPicker',
    component: 'WdSelectPicker',
    label: '单选复选',
    componentProps: {
      placeholder: '请输入年龄',
      type: 'checkbox', // checkbox
      columns: [
        {
          value: '101',
          label: '男装',
        },
        {
          value: '102',
          label: '奢侈品',
        },
        {
          value: '103',
          label: '女装',
        },
      ],
    },
    required: true,
    giProps: {
      span: 2,
    },
    rules: [{ required: true, message: '请输入年龄' }],
  },
  {
    field: 'WdDateTimePicker',
    component: 'WdDateTimePicker',
    label: '日期时间选择',
    componentProps: {
      placeholder: '请输入年龄',
    },
    required: true,
    giProps: {
      span: 2,
    },
    rules: [{ required: true, message: '请输入年龄' }],
  },
  {
    field: 'WdCalendar',
    component: 'WdCalendar',
    label: '日历选择',
    componentProps: {
      placeholder: '请输入年龄',
    },
    required: true,
    giProps: {
      span: 2,
    },
    rules: [{ required: true, message: '请输入年龄' }],
  },
  {
    field: 'WdTextarea',
    component: 'WdTextarea',
    isHidden: true,
    label: '文本域',
    // defaultValue: 1,
    border: true,
    required: true,
    componentProps: {
      placeholder: '请输入姓名',
      onInput: (e: any) => {
        console.log(e, '=======<>')
      },
    },
    giProps: {
      span: 2,
    },
    rules: [{ required: true, message: '请输入姓名' }],
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
