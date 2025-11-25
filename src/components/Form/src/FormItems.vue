<template>
  <Layout
    :border="true"
    :label="schema.label"
    :required="schema.required"
    :vertical="vertical"
    :label-width="schema.labelWidth"
    :clickable="schema.clickable"
  >
    <wd-input
      v-if="schema.component === 'WdInput'"
      v-model="localForm[schema.field]"
      :prop="schema.field"
      :rules="schema.rules"
      no-border
      v-bind="schema.componentProps"
      :clearable="true"
    />
    <view class="picker">
      <wd-picker
        v-if="schema.component === 'WdPicker'"
        v-bind="schema.componentProps"
        v-model="localForm[schema.field]"
        :prop="schema.field"
        :rules="schema.rules"
      />
    </view>
    <view class="picker">
      <wd-select-picker
        v-if="schema.component === 'WdSelectPicker'"
        v-model="localForm[schema.field]"
        :prop="schema.field"
        :rules="schema.rules"
        v-bind="schema.componentProps"
      />
    </view>
    <view class="picker">
      <wd-datetime-picker
        v-if="schema.component === 'WdDateTimePicker'"
        v-model="localForm[schema.field]"
        :prop="schema.field"
        :rules="schema.rules"
        v-bind="schema.componentProps"
      />
    </view>
    <view class="picker">
      <wd-calendar
        v-if="schema.component === 'WdCalendar'"
        v-model="localForm[schema.field]"
        :prop="schema.field"
        :rules="schema.rules"
        v-bind="schema.componentProps"
      />
    </view>
    <view class="picker">
      <wd-textarea
        v-if="schema.component === 'WdTextarea'"
        v-model="localForm[schema.field]"
        :prop="schema.field"
        :rules="schema.rules"
        v-bind="schema.componentProps"
        custom-style="height:65rpx"
      />
    </view>
  </Layout>
</template>

<script lang="ts" setup>
import type { FormSchema } from './types/form'
import { cloneDeep } from 'lodash-es'
import Layout from './Layout/index.vue'

defineOptions({
  options: {
    styleIsolation: 'shared',
  },
})

const props = defineProps({
  schema: {
    type: Object,
    default: () => {},
  },
  formModel: {},
  vertical: {
    type: String,
    default: 'horizontal',
  },
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

:deep(.picker .wd-cell__wrapper) {
  align-items: center !important;
  padding: 0px;
}
:deep(.picker .wd-checkbox) {
  text-align: start;
}
</style>
