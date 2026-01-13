import { PKG_NAME, PKG_PREFIX } from '../constants'
import type { Plugin } from 'rollup'

export function EpAlias(): Plugin {
    const themeChalk = 'theme-chalk'
    // 源主题样式路径 @ep/theme-chalk
    const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const
    // 打包后的主题样式路径 ep/theme-chalk
    const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const

    return {
        name: 'ep-alias-plugin',
        resolveId(id) {
            // 如果源主题样式路径不是以 @ep/theme-chalk 开头，则不处理
            if (!id.startsWith(sourceThemeChalk)) return
            return {
                // 如果源主题样式路径是以 @ep/theme-chalk 开头，则替换为 ep/theme-chalk，即更换掉导入的路径字符串
                id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
                // 将主题样式路径设置为外部依赖，即让 rollup 打包的时候，认为是一个外部依赖，直接忽略掉，不会打包到 bundle 中
                external: true
            }
        }
    }
}
