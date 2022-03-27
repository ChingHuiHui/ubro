<template>
  <form @submit="submit">
    <slot :invalid="!meta.valid" :values="values" />
  </form>
</template>

<script lang="ts" setup>
  import { useForm } from 'vee-validate'

  const props = withDefaults(
    defineProps<{
      rules?: Object
      action: Function
      initialValues?: Object
    }>(),
    {
      rules: () => ({}),
      initialValues: () => ({}),
    }
  )

  const { handleSubmit, meta, values, resetForm } = useForm({
    initialValues: props.initialValues,
    validationSchema: props.rules,
  })

  const submit = handleSubmit(async () => {
    try {
      await props.action(values)

      resetForm()
    } catch (e) {
      throw e
    }
  })
</script>
