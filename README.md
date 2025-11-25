<p align="center">
  <a href="https://github.com/unibest-tech/unibest">
    <img width="160" src="./src/static/logo.svg">
  </a>
</p>

<h1 align="center">
  <a href="https://github.com/wzyaooh/unibest-wot-form" target="_blank">unibest - wotUi - from</a>
</h1>
<div align="center">
基于wotUI Form组件 进行封装
</div>
<div align="center">

![node version](https://img.shields.io/badge/node-%3E%3D18-green)
![pnpm version](https://img.shields.io/badge/pnpm-%3E%3D7.30-green)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/wzyaooh/unibest-wot-form)
![GitHub License](https://img.shields.io/github/license/wzyaooh/unibest-wot-form)

</div>



## 平台兼容性

| H5  | IOS | 安卓 | 微信小程序 | 字节小程序 | 快手小程序 | 支付宝小程序 | 钉钉小程序 | 百度小程序 |
| --- | --- | ---- | ---------- | ---------- | ---------- | ------------ | ---------- | ---------- |
| √   | √   | √    | √          | √          | √          | √            | √          | √          |

## useForm 用法

未开发完成

## template 用法

```
<template>
  <BasicForm
    submitButtonText="提交预约"
    layout="horizontal"
    :gridProps="{ 
    		gutter: 10,
        column: 2, }"
    :schemas="schemas"
    @submit="handleSubmit"
    @reset="handleReset"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicForm } from '@/components/Form/src/BasicForm';

  const schemas = [
    {
      field: 'name',
      component: 'WdInput',
      label: '姓名',
      labelMessage: '这是一个提示',
      componentProps: {
        placeholder: '请输入姓名',
        onInput: (e: any) => {
          console.log(e);
        },
      },
      rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
    }
  ];

	function handleSubmit() {
    const values = basicFormRef.value.getFieldsValue()
    console.log(values, '结果')
  }
</script>
```

## Props

| 名称                  | 类型                  | 默认值  | 说明                                     | 版本   |
| --------------------- | --------------------- | ------- | ---------------------------------------- | ------ |
| layout                | `inline/Horizontal`   | `false` | 表单布局方式                             |        |
| schemas               | `FormSchema[]`        | `null`  | 表单配置，见下方 `FormSchema`配置        |        |
| group                 | `FormGroupRow[]`      |         | 分组表单配置，一旦配置 `schemas` 会失效  |        |
| submitOnReset         | `boolean`             | `true`  | 重置时是否提交表单                       |        |
| gridProps             | `object`              |         | 配置表单栅格，                           |        |
| isFull                | `boolean`             | `true`  | 组件是否 `100%`表单内所有组件适用        | 待实现 |
| disabled              | `boolean`             | `false` | 向表单内所有组件传递 `disabled`属性      | 待实现 |
| showActionButtonGroup | `boolean`             | `true`  | 是否显示操作按钮(重置/提交)              |        |
| showResetButton       | `boolean`             | `true`  | 是否显示重置按钮                         |        |
| resetButtonOptions    | `object`              | ``      | 重置按钮配置见下方 `ActionButtonOption`  |        |
| showSubmitButton      | `boolean`             | `true`  | 是否显示提交按钮                         |        |
| submitButtonOptions   | `object`              | `true`  | 确认按钮配置见下方 `ActionButtonOption`  |        |
| resetButtonText       | `string`              | `重置`  | 重置按钮文字                             |        |
| submitButtonText      | `string`              | `查询`  | 查询按钮文字                             |        |
| resetFunc             | `() => Promise<void>` | `true`  | 自定义重置按钮逻辑 `() => Promise<void>` |        |
| submitFunc            | `() => Promise<void>` | `true`  | 自定义提交按钮逻辑 `() => Promise<void>` |        |

## Methods

| 名称              | 类型                                                         | 说明                                             | 版本           |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------ | -------------- |
| getFieldsValue    | `() => Recordable`                                           | 获取表单值                                       |                |
| setFieldsValue    | `(values) => Promise`                                        | 设置表单字段值                                   |                |
| setSchema         | `(values: FormSchema[]) => Promise`                          | 设置表单 `Schema`                                |                |
| validate          | `(nameList?: NamePath[]) => Promise`                         | 校验整个表单                                     |                |
| submit            | `() => values`                                               | 提交表单                                         | 返回表单值对象 |
| clearValidate     | `(name?: string | string[]) => Promise`                      | 清空校验                                         |                |
| setProps          | `(formProps) => Promise`                                     | 设置表单 Props                                   |                |
| change            | `(formModel) => values`                                      | 可以监听 `change` 事件，当任意表单值变化则会执行 |                |
| updateSchema      | `(schemaProps: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>` | 更新 `Schema`                                    |                |
| updateGroupSchema | `(key: string, propertyPath: string, newValue: any) => Promise<void>` | 更新分组表单 `Schema`                            | 有问题在处理   |

## FormSchema

| 名称              | 类型                                       | 说明                                                         | 版本                     |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------ | ------------------------ |
| field             | `string`                                   | 字段名                                                       | 支持 `a.b.c`写法 `2.3.2` |
| label             | `string`                                   | 标签名                                                       |                          |
| hidden            | `boolean|({schema, values, model, field})` | 表单隐藏域字段/或者隐藏表单，通常用于编辑场景，可配合 `defaultValue`设置默认值 |                          |
| labelMessage      | `string,string[]`                          | 标签名右侧温馨提示                                           |                          |
| labelMessageStyle | `object,string`                            | 标签名右侧样式                                               |                          |
| defaultValue      | `any`                                      | 所渲渲染组件的初始值                                         |                          |
| component         | `string`                                   | 组件类型，见下方 `ComponentType`                             |                          |
| componentProps    | `any,()=>{}`                               | 所渲染的组件的 `props`和 事件，请参考 `naiveui`为了简化使用，和官方保持一致 |                          |
| slot              | `string`                                   | 自定义 `slot`渲染组件                                        |                          |
| suffix            | `string`                                   | 组件后面的内容，返回值，`{ value , model , field }`          |                          |
| rules             | `object[]`                                 | 校验规则 参考 `naiveui``form`组件 `validation`               |                          |
| giProps           | `Partial<gi>`                              | 配置表单栅格，详情见 gi 组件                                 |                          |
| isFull            | `boolean`                                  | 组件是否 `100%`优先级最高                                    |                          |

## ComponentType



> [!NOTE]
>
> **schema** 内组件的可选类型，目前只测试了如下组件，实际上只要支持 v-model:value 表单组件理论上都支持 
>
> 组件存在子标签组件，需要单独增加



## 支持组件(后续会增加)

```
export type ComponentType
  = | 'WdInput'
    | 'WdTabs'
    | 'WdPicker'
    | 'WdSelectPicker'
    | 'WdDateTimePicker'
    | 'WdCalendar'
    | 'WdTextarea'

```

## FormGroupRow

```

export interface FormGroupRow {
  title: string;
  columns: FormSchema[];
}

```

