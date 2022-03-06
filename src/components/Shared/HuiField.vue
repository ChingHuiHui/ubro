<template>
  <div>
    <label v-if="label" class="font-medium block mb-1">
      <span>{{ label }}</span>
    </label>
    <slot
      :error="error"
      :value="value"
      :validationListeners="validationListeners"
    />
    <div v-if="error" class="text-red-500 mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useField } from 'vee-validate'

  const props = withDefaults(
    defineProps<{
      name?: string
      label?: string
    }>(),
    {
      name: '',
      label: '',
    }
  )

  const {
    errorMessage: error,
    handleChange,
    value,
    meta,
  } = useField(props.name, undefined, {
    validateOnValueUpdate: false,
  })

  const validationListeners = computed(() => {
    if (!error.value) {
      return {
        blur: handleChange,
        change: handleChange,
        input: (e: Event) => handleChange(e, false),
      }
    }

    return {
      blur: handleChange,
      change: handleChange,
      input: handleChange,
    }
  })
</script>
