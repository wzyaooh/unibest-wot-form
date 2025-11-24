import type { ButtonProps } from 'wot-design-uni/components/wd-button/types'
import type { ColProps } from 'wot-design-uni/components/wd-col/types'
import type { FormItemRule } from 'wot-design-uni/components/wd-form/types'
import type { RowProvide } from 'wot-design-uni/components/wd-row/types'
import type { ComponentType } from './index'

export interface FormProps {
  model?: Recordable
  schemas?: FormSchema[]
  group?: FormGroupRow[]
  isFull?: boolean
  showActionButtonGroup?: boolean
  showResetButton?: boolean
  resetButtonOptions?: Partial<ButtonProps>
  showSubmitButton?: boolean
  submitButtonOptions?: Partial<ButtonProps>
  submitButtonText?: string
  resetButtonText?: string
  gridProps?: RowProvide
  giProps?: ColProps
  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<void>
  border?: boolean
}

export interface componentSlotsRenderOptions {
  field: string
  model: Recordable
  formAction: Partial<FormActionType>
}

export type componentSlotsType = (opt: componentSlotsRenderOptions) => JSX.IntrinsicElements

// 表单内容项配置
export interface FormSchema {
  field: string
  label?: string
  labelWidth?: string
  component: ComponentType
  rules?: FormItemRule[]
  defaultValue?: any
  componentProps?: object | ((opt: { model: Recordable, formAction: FormActionType }) => object)
  componentSlots?: Record<string, componentSlotsType>
  isHidden?: boolean
  required?: boolean
  border?: boolean
}
// 分组表单内容配置项
export interface FormGroupRow {
  key?: string
  title: string
  // cardProps?: CardProps;
  // cardSlots?: CardSlots;
  columns: FormSchema[]
}

// 表单操作类型定义
export interface FormActionType {
  submit: () => Promise<any>
  reset: () => void
  validate: (
    names?: string | string[],
    rulesFun?: (rule: { key: string }) => boolean | undefined,
  ) => Promise<any>
  clearValidate: (name?: string | string[]) => Promise<void>
  setProps: (formProps: Partial<FormProps>) => Promise<void>
  setSchema: (schemaProps: Partial<FormSchema[]>) => Promise<void>
  setGroupSchema: (schemaProps: Partial<FormGroupRow[]>) => Promise<void>
  setFieldsValue: (values: Recordable) => void
  setLoading: (loading: boolean) => void
  getFieldsValue: () => Recordable
  updateSchema: (schemaProps: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>

}

export type RegisterFn = (formInstance: FormActionType) => void

export type UseFormReturnType = [RegisterFn, FormActionType]
