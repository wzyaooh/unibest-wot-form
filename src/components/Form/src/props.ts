import type { ButtonProps } from 'wot-design-uni/components/wd-button/types'
import type { FormGroupRow, FormSchema } from './types/form'
import { formProps } from 'wot-design-uni/components/wd-form/types'

console.log(formProps, 'formProps')
export const basicProps = {
  ...formProps,
  // 表单配置规则
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  // 分组表单配置规则
  group: {
    type: [Array] as PropType<FormGroupRow[]>,
    default: () => [],
  },
  // 组件是否width 100%
  isFull: {
    type: Boolean,
    default: true,
  },
  // 是否显示操作按钮（查询/重置）
  showActionButtonGroup: {
    type: Boolean,
    default: false,
  },
  // 显示重置按钮
  showResetButton: {
    type: Boolean,
    default: false,
  },
  // 重置按钮配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 显示确认按钮
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  // 确认按钮配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 确认按钮文字
  submitButtonText: {
    type: String,
    default: '查询',
  },
  // 重置按钮文字
  resetButtonText: {
    type: String,
    default: '重置',
  },
  border: {
    type: Boolean,
    default: true,
  },
}
