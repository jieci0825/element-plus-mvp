<script setup lang="ts">
import { ref } from 'vue'
import { useFocus } from '@ep/hooks'

const inputRef = ref<HTMLInputElement | null>(null)
const { focus } = useFocus(inputRef)
</script>

<template>
    <div class="page">
        <h1 class="page-title">useFocus</h1>

        <section class="section">
            <h2 class="section-title">基础用法</h2>
            <p class="section-desc">
                点击按钮，输入框将获得焦点。
            </p>
            <div class="section-content">
                <input ref="inputRef" type="text" class="input" placeholder="点击按钮聚焦此输入框" />
                <button class="btn" @click="focus">聚焦</button>
            </div>
        </section>

        <section class="section">
            <h2 class="section-title">代码示例</h2>
            <pre class="code-block"><code>import { ref } from 'vue'
import { useFocus } from '@ep/hooks'

const inputRef = ref&lt;HTMLInputElement | null&gt;(null)
const { focus } = useFocus(inputRef)</code></pre>
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
    margin-bottom: 12px;
}

.section-desc {
    font-size: 14px;
    color: #737373;
    margin-bottom: 16px;
}

.section-content {
    display: flex;
    gap: 12px;
    align-items: center;
}

.input {
    padding: 10px 14px;
    font-size: 14px;
    border: 1px solid #d4d4d4;
    outline: none;
    transition: border-color 0.15s;
    width: 280px;
}

.input:focus {
    border-color: #171717;
}

.input::placeholder {
    color: #a3a3a3;
}

.btn {
    padding: 10px 20px;
    font-size: 14px;
    color: #fff;
    background: #171717;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s;
}

.btn:hover {
    background: #404040;
}

.code-block {
    padding: 20px;
    background: #fafafa;
    border: 1px solid #e5e5e5;
    overflow-x: auto;
}

.code-block code {
    font-family: 'SF Mono', Monaco, Consolas, monospace;
    font-size: 13px;
    line-height: 1.6;
    color: #171717;
}
</style>

