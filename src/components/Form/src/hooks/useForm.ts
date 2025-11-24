import type { FormActionType, FormGroupRow, FormProps, FormSchema, UseFormReturnType } from '../types/form'
import { nextTick, ref, unref, watch } from 'vue'
import { getDynamicProps } from '@/utils'

export function useForm(props): UseFormReturnType {
  const formRef = ref<Nullable<FormActionType>>(null)
  const loadedRef = ref(false)
  async function getForm() {
    const form = unref(formRef)
    if (!form) {
      console.error(
        '未获取到表单实例，请确保执行表单操作时表单已渲染！',
      )
    }
    await nextTick()
    return form as FormActionType
  }

  function register(instance: FormActionType) {
    formRef.value = instance
    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true,
      },
    )
  }

  const methods: FormActionType = {
    setProps: async (formProps: Partial<FormProps>) => {
      const form = await getForm()
      await form.setProps(formProps)
    },
    submit: async (): Promise<any> => {
      const form = await getForm()
      return form.submit()
    },
    setFieldsValue: async <T>(values: T) => {
      const form = await getForm()
      await form.setFieldsValue(values as Recordable<any>)
    },
    setSchema: async (values) => {
      const form = await getForm()
      form.setSchema(values)
    },
    reset: async () => {
      getForm().then(async (form) => {
        await form.reset()
      })
    },
    setLoading: (value: boolean) => {
      loadedRef.value = value
    },
    setGroupSchema: async (values: Partial<FormGroupRow[]>) => {
      const form = await getForm()
      form.setGroupSchema(values)
    },
    updateSchema: async (values: FormSchema | FormSchema[]) => {
      const form = await getForm()
      await form.updateSchema(values)
    },
    validate: async (nameList?: any[]): Promise<Recordable> => {
      const form = await getForm()
      return form.validate(nameList)
    },
    clearValidate: async (name?: string | string[]) => {
      const form = await getForm()
      await form.clearValidate(name)
    },
    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T
    },
  }

  return [register, methods]
}
