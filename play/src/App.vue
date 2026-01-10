<script setup lang="ts">
import { EpButton } from '@ep/components'
</script>

<template>
    <div class="demo-container">
        <h1>Button 组件预览</h1>

        <section>
            <h2>默认按钮</h2>
            <EpButton>默认按钮</EpButton>
        </section>

        <section>
            <h2>类型</h2>
            <EpButton type="primary">Primary</EpButton>
            <EpButton type="secondary">Secondary</EpButton>
        </section>

        <section>
            <h2>尺寸</h2>
            <EpButton size="large">Large</EpButton>
            <EpButton>Default</EpButton>
            <EpButton size="small">Small</EpButton>
        </section>
    </div>
</template>

<style scoped>
.demo-container {
    padding: 20px;
}
section {
    margin-bottom: 20px;
}
h2 {
    margin-bottom: 10px;
    font-size: 16px;
    color: #666;
}
section > :deep(.ep-button) {
    margin-right: 10px;
}
</style>
