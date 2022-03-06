<template>
  <HuiField
    v-slot="{ error, validationListeners, value }"
    :label="label"
    :name="validationName"
  >
    <input
      class="form-input bg-white"
      :class="{ 'border-red-500': error }"
      :type="type"
      :placeholder="placeholder"
      :name="validationName"
      :value="value"
      v-on="validationListeners"
    />
  </HuiField>
</template>

<script lang="ts" setup>
  import HuiField from './HuiField.vue'
  import { computed } from 'vue'

  const props = withDefaults(
    defineProps<{
      name?: string
      label?: string
      type?: string
      placeholder?: string
    }>(),
    {
      name: '',
      label: '',
      type: 'text',
      placeholder: '',
    }
  )

  const validationName = computed(() => props.name || props.label || 'Field')
</script>
