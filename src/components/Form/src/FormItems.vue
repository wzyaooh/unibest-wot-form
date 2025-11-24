<template>
  <wd-form-item
    v-for="schema in schemas"
    :key="schema.field"
    :border="true"
    :label="schema.label"
    :required="schema.required"
    prop=""
  >
    <wd-input
      v-if="schema.component === 'WdInput'"
      v-model="localForm[schema.field]"
      :prop="schema.field"
      :rules="schema.rules"
      no-border
      :placeholder="schema.componentProps.placeholder"
    />
  </wd-form-item>
</template>

<script lang="ts" setup>
import type { FormSchema } from './types/form'
import { cloneDeep } from 'lodash-es'

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
})

const props = defineProps({
  schemas: {
    type: Array as () => FormSchema[],
    default: () => [],
  },
  formModel: {},
})

const emit = defineEmits(['changeFormModel'])

const localForm = reactive(cloneDeep(props.formModel))

watch(
  localForm,
  (newForm) => {
    emit('changeFormModel', newForm) // 通知父组件更新
  },
  { deep: true }, // 必须加！否则监听不到对象内部属性变化
)

watch(props, (newProps) => {
  if (localForm !== newProps.formModel) {
    Object.assign(localForm, props.formModel)
  }
}, {
  deep: true,
})
</script>

<style lang="scss" scoped>
:deep(.wd-cell) {
  padding-left: 0px;
}
</style>
