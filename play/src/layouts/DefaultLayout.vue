<script setup lang="ts">
import { useRoute } from 'vue-router'
import { menuGroups } from '../router'

const route = useRoute()
</script>

<template>
    <div class="layout">
        <aside class="sidebar">
            <div class="sidebar-header">EP Demo Play</div>
            <nav class="sidebar-nav">
                <div
                    v-for="group in menuGroups"
                    :key="group.name"
                    class="nav-group"
                >
                    <div class="nav-group-title">{{ group.name }}</div>
                    <router-link
                        v-for="item in group.items"
                        :key="item.path"
                        :to="item.path"
                        class="nav-item"
                        :class="{ active: route.path === item.path }"
                    >
                        {{ item.title }}
                    </router-link>
                </div>
            </nav>
        </aside>
        <main class="main">
            <router-view />
        </main>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: 220px;
    flex-shrink: 0;
    border-right: 1px solid #e5e5e5;
    background: #fafafa;
}

.sidebar-header {
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    font-size: 18px;
    font-weight: 600;
    color: #171717;
    border-bottom: 1px solid #e5e5e5;
    letter-spacing: 0.5px;
}

.sidebar-nav {
    padding: 16px 0;
}

.nav-group {
    margin-bottom: 8px;
}

.nav-group-title {
    padding: 8px 24px;
    font-size: 12px;
    font-weight: 500;
    color: #a3a3a3;
    letter-spacing: 0.3px;
}

.nav-item {
    display: block;
    padding: 10px 24px 10px 32px;
    font-size: 14px;
    color: #525252;
    text-decoration: none;
    transition: color 0.15s, background-color 0.15s;
}

.nav-item:hover {
    color: #171717;
    background-color: #f0f0f0;
}

.nav-item.active {
    color: #171717;
    font-weight: 500;
    background-color: #e5e5e5;
}

.main {
    flex: 1;
    padding: 40px 48px;
    background: #fff;
    overflow-y: auto;
}
</style>
