<template>
  <view class="basicForm">
    <wd-form ref="formElRef" v-bind="getBindValue" :model="formModel">
      <template v-if="getProps.group && getProps.group.length">
        <slot />
      </template>
      <template v-else>
        <view
          class="naive-grid" :style="{
            'grid-template-columns': `repeat(2, 1fr)`,
          }"
        >
          <view
            v-for="schema in schemas"
            :key="schema.field"
            class="naive-grid-item"
            :style="{
              'grid-column': schema.giProps ? `span ${schema.giProps.span}` : 'span 1',
            }"
          >
            <FormItems
              :form-model="formModel"
              :schema="schema"
              :vertical="getProps.layout"
              :form-action-type="formActionType"
              @change-form-model="changeFormModel"
            />
          </view>
        </view>
        <view v-if="getProps.showActionButtonGroup" class="buttonContainer">
          <wd-button v-if="getProps.showResetButton" custom-class="custom-submit" @click="reset">
            {{ getProps.resetButtonText }}
          </wd-button>
          <wd-button v-if="props.showSubmitButton" custom-class="custom-submit" @click="handleSubmit">
            {{ getProps.submitButtonText }}
          </wd-button>
        </view>
      </template>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
import type { GridProps } from 'wot-design-uni/components/wd-grid/types'
import type { FormActionType, FormGroupRow, FormProps, FormSchema } from './types/form'
import { reactive, unref, useAttrs } from 'vue'
import { deepMerge } from '@/utils'
import { isArray } from '@/utils/is'
import FormItems from './FormItems.vue'
import { useFormEvents } from './hooks/useFormEvents'
import { useFormValues } from './hooks/useFormValues'
import { basicProps } from './props'

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
})
const props = defineProps({
  ...basicProps,
})

const emit = defineEmits(['reset', 'submit', 'register', 'advanced', 'change'])

const attrs = useAttrs()

const defaultFormModel = ref<Recordable>({})
const propsRef = ref<Partial<FormProps>>({})
const formModel = reactive<Recordable>({})
const formElRef = ref<Nullable<FormActionType>>(null)
const schemaRef = ref<Nullable<FormSchema[]>>(null)
const groupSchemaRef = ref<Nullable<FormGroupRow[]>>(null)
const isUpdateDefaultRef = ref(false)

const loading = ref(false)

watch(
  formModel,
  () => {
    emit('change', formModel)
  },
  {
    deep: true,
  },
)

function changeFormModel(updateModel: Recordable) {
  Object.assign(formModel, updateModel)
}

// 获取form的props 并且组装
// TODO 分组表单props组装
const getProps = computed((): FormProps => {
  const formProps = { ...props, ...unref(propsRef) } as FormProps
  const rulesObj = {
    rules: {},
  }
  const schemas = formProps.schemas || []
  schemas.forEach((item) => {
    if (item.rules && isArray(item.rules)) {
      rulesObj.rules[item.field] = item.rules
    }
  })
  console.log('获取BasicFormProps', { ...formProps, ...unref(rulesObj) })
  return { ...formProps, ...unref(rulesObj) }
})
// 设置form的props
async function setProps(formProps: Partial<FormProps>): Promise<void> {
  propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
}

// 获取组件自定义prop和默认props
const getBindValue = computed(() => ({ ...attrs, ...props, ...unref(getProps) } as Recordable))
// 获取组装Schema
const getSchema = computed((): FormSchema[] => {
  const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any)
  for (const schema of schemas) {
    const { defaultValue } = schema
    if (defaultValue) {
      schema.defaultValue = defaultValue
    }
  }
  console.log('获取BasicForm Schemas', schemas)

  return schemas as FormSchema[]
})
// 设置Schema
async function setSchema(schemaProps: FormSchema[]): Promise<void> {
  schemaRef.value = schemaProps
}

// 获取分组表单的schemas
const getGroupSchemas = computed((): FormGroupRow[] => {
  const groupSchemas = unref(groupSchemaRef) || unref(getProps).group
  return groupSchemas as FormGroupRow[]
})
// 设置分组表单的schemas
async function setGroupSchema(schemaProps: FormGroupRow[]): Promise<void> {
  groupSchemaRef.value = schemaProps
}

// 更新loading状态
function setLoading(status: boolean): void {
  loading.value = status
}

async function updateSchema(schemaProps: FormSchema | FormSchema[]): Promise<void> {

}

const getGrid = computed((): GridProps => {
  return {
    ...unref(getProps)['grid-props'],
  }
})

const { handleFormValues, initDefault } = useFormValues({
  defaultFormModel,
  getSchema,
  formModel,
  getGroupSchemas,
})

const { handleSubmit, validate, reset, getFieldsValue, clearValidate, setFieldsValue }
  = useFormEvents({
    emit,
    getProps,
    formModel,
    getSchema,
    getGroupSchemas,
    formElRef: formElRef as Ref<FormActionType>,
    defaultFormModel,
    loading,
    handleFormValues,
  })

const formActionType: Partial<FormActionType> = {
  getFieldsValue,
  setFieldsValue,
  reset,
  validate,
  clearValidate,
  setProps,
  setSchema,
  setGroupSchema,
  setLoading,
  submit: handleSubmit,
  updateSchema,
}

watch(
  () => getSchema.value,
  (schema) => {
    if (unref(isUpdateDefaultRef)) {
      return
    }
    if (schema?.length) {
      initDefault()
      isUpdateDefaultRef.value = true
    }
  },
)

onMounted(() => {
  initDefault()
  emit('register', formActionType)
  // 回车 Submit fix Enter Event
})

defineExpose({
  ...formActionType,
})
</script>

<style lang="scss" scoped>
@import './styles/basicForm.scss';
.naive-grid {
  display: grid;
  /* 定义3列，每列宽度相等 */

  /* 定义行高，auto 表示根据内容自动调整 */
  // grid-auto-rows: minmax(50px, 10px);
  /* 定义网格间距 */
  gap: 0 10px;
}
</style>
