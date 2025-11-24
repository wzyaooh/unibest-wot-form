import type { ComputedRef, Ref } from 'vue'
import type { FormGroupRow, FormSchema } from '../types/form'
import { set } from 'lodash-es'
import { unref } from 'vue'
import { isArray, isFunction, isNullOrUnDef, isObject, isString } from '@/utils/is'

interface UseFormValuesContext {
  defaultFormModel: Ref<any>
  getSchema: ComputedRef<FormSchema[]>
  formModel: Recordable
  getGroupSchemas: ComputedRef<FormGroupRow[]>
}

/**
 * @desription 变异目标对象
 */
function strShiftObject(key: string, value: any, target: Recordable) {
  const pattern = /^\{(.+)\}$/
  if (pattern.test(key)) {
    const match = key.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      value = isObject(value) ? value : {}
      keys.forEach((k) => {
        set(target, k.trim(), value[k.trim()])
      })
      return true
    }
  }
}

export function useFormValues({
  defaultFormModel,
  getSchema,
  formModel,
  getGroupSchemas,
}: UseFormValuesContext) {
  // 加工 form values
  function handleFormValues(values: Recordable): Recordable {
    if (!isObject(values)) {
      return {}
    }
    const res: Recordable = {}
    for (const item of Object.entries(values)) {
      let [, value] = item
      const [key] = item
      if (
        !key
        || (isArray(value) && value.length === 0)
        || isFunction(value)
        || isNullOrUnDef(value)
      ) {
        continue
      }
      // 删除空格
      if (isString(value)) {
        value = value.trim()
      }
      if (!strShiftObject(key, value, res)) {
        set(res, key, value)
      }
    }
    return res
  }
  // 获取分组 schemas
  function filterGroupSchemas(groupSchemas: FormGroupRow[]) {
    return groupSchemas.flatMap(item => item.columns)
  }
  // 初始化默认值
  function initDefault() {
    const groupSchemas = filterGroupSchemas(unref(getGroupSchemas))
    const schemas = groupSchemas.length ? groupSchemas : unref(getSchema)
    const obj: Recordable = {}
    schemas.forEach((item) => {
      const { defaultValue } = item
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue
        formModel[item.field] = defaultValue
      }
    })
    defaultFormModel.value = obj
  }
  return { handleFormValues, initDefault }
}
