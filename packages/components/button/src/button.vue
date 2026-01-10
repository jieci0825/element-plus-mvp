<script setup lang="ts">
import { buttonProps, buttonEmits } from './button'

defineOptions({
    name: 'EpButton'
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const handleClick = (e: MouseEvent) => {
    emit('click', e)
}
</script>

<template>
    <button
        class="ep-button"
        :class="[`ep-button--${props.type}`, `ep-button--${props.size}`]"
        @click="handleClick"
    >
        <slot />
    </button>
</template>
