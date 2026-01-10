<script setup lang="ts">
import { EpButton } from '@ep/components'
</script>

<template>
    <div class="page">
        <h1 class="page-title">Button</h1>

        <section class="section">
            <h2 class="section-title">默认按钮</h2>
            <div class="section-content">
                <EpButton>默认按钮</EpButton>
            </div>
        </section>

        <section class="section">
            <h2 class="section-title">类型</h2>
            <div class="section-content">
                <EpButton type="primary">Primary</EpButton>
                <EpButton type="secondary">Secondary</EpButton>
                <EpButton type="danger">Danger</EpButton>
            </div>
        </section>

        <section class="section">
            <h2 class="section-title">尺寸</h2>
            <div class="section-content">
                <EpButton size="large">Large</EpButton>
                <EpButton>Default</EpButton>
                <EpButton size="small">Small</EpButton>
            </div>
        </section>
    </div>
</template>

<style scoped>
.page {
    max-width: 800px;
}

.page-title {
    font-size: 28px;
    font-weight: 600;
    color: #171717;
    margin-bottom: 40px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e5e5;
}

.section {
    margin-bottom: 32px;
}

.section-title {
    font-size: 16px;
    font-weight: 500;
    color: #171717;
    margin-bottom: 16px;
}

.section-content {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
}
</style>

