<template>
  <view style="margin-top: 100px;">
    <BasicForm @register="register" @submit="handleSubmit" />
  </view>
</template>

<script lang="ts" setup>
import type { FormProps, FormSchema } from '@/components/Form/src/types/form'
import BasicForm from '@/components/Form/src/BasicForm.vue'
import { useForm } from '@/components/Form/src/hooks/useForm'

const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'WdInput',
    label: '姓名',
    defaultValue: 1,
    componentProps: {
      placeholder: '请输入姓名',
    },
    required: true,
    rules: [{ required: true, message: '请输入姓名' }],
  },
]

const [register, { setSchema, getFieldsValue }] = useForm({
  labelWidth: 120,
  layout: 'horizontal',
  submitButtonText: '提交预约',
  schemas,
  showActionButtonGroup: true,
} as FormProps)

function handleSubmit() {
  const data = getFieldsValue()
  console.log(data, 'ddd')
  // const current = schemas.concat[{
  //   field: 'name',
  //   component: 'WdTabs',
  //   label: '姓名',
  // }]
}

definePage({
  style: {
    navigationBarTitleText: '',
  },
})
</script>

<style lang="scss" scoped>
//
</style>
