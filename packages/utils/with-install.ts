import type { Plugin } from 'vue'

/**
 * 添加 Vue 插件安装方法的类型
 * @description 表示这个类型是一个 Vue 插件，并且包含 install 方法，且具备泛型 T 的属性和方法
 */
export type SFCWithInstall<T> = T & Plugin

/**
 * 添加 Vue 插件安装方法的实现
 * @param component - 组件
 * @returns 附加 install 方法的组件
 * @example
 * const Button = withInstall(ButtonComponent)
 * app.use(Button)
 */
export const withInstall = <T>(component: T) => {
    const comp = component as SFCWithInstall<T>
    comp.install = app => {
        app.component((comp as any).name, comp)
    }
    return comp
}
