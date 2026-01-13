import type { Plugin, App } from 'vue'

/**
 * 提供一次性安装所有组件的函数
 */
export function makeInstaller(components: Plugin[]) {
    const install = (app: App) => {
        // 遍历组件列表安装组件
        components.forEach(component => {
            // 所有的组件都是通过 withInstall 包装过的，所以可以直接使用 app.use 安装
            app.use(component)
        })

        // 在源码中，这里还要提供一个注册全局上下文的方法，让子组件可以通过 inject 获取到全局配置
    }
    return {
        install,
        version: '0.0.1'
    }
}
