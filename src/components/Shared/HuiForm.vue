<template>
  <form @submit="submit">
    <slot :invalid="!meta.valid" :values="values" />
  </form>
</template>

<script lang="ts" setup>
  import { useForm } from 'vee-validate'

  const props = withDefaults(
    defineProps<{ rules?: Object; action: Function }>(),
    {
      rules: () => ({}),
    }
  )

  const { handleSubmit, meta, values } = useForm({
    validationSchema: props.rules,
  })

  const submit = handleSubmit(async () => {
    try {
      await props.action(values)
    } catch (e) {
      throw e
    }
  })
</script>
