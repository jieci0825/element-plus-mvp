import path from 'node:path'
import type { ModuleFormat } from 'rollup'
import { PKG_NAME } from './constants'
import { EpOutput } from './path-map'

export const modules = ['esm', 'cjs'] as const
export type Module = (typeof modules)[number]
export interface BuildInfo {
    /** 构建目标模块体系（ES 模块或 CommonJS）。 */
    module: 'ESNext' | 'CommonJS'
    /** Rollup 输出格式配置，用于决定最终产物的模块格式。 */
    format: ModuleFormat
    /** 输出文件扩展名，用于区分不同构建产物类型。 */
    ext: 'mjs' | 'cjs' | 'js'
    /** 输出目录信息（名称与绝对输出路径）。 */
    output: {
        /** e.g: `es` */
        /** 输出目录的名称标识（通常用于区分 esm/cjs 等目录）。 */
        name: string
        /** e.g: `dist/ep/es` */
        /** 输出目录在项目中的路径（通常是构建产物落盘位置）。 */
        path: string
    }

    /** 打包入口/引用路径信息（用于生成对外暴露的路径结构）。 */
    bundle: {
        /** e.g: `ep/es` */
        /** 产物在包内的相对路径（用于拼接导出路径等）。 */
        path: string
    }
}

export const buildConfig: Record<Module, BuildInfo> = {
    esm: {
        module: 'ESNext',
        format: 'esm',
        ext: 'mjs',
        output: {
            name: 'es',
            path: path.resolve(EpOutput, 'es')
        },
        bundle: {
            path: `${PKG_NAME}/es`
        }
    },
    cjs: {
        module: 'CommonJS',
        format: 'cjs',
        ext: 'js',
        output: {
            name: 'lib',
            path: path.resolve(EpOutput, 'lib')
        },
        bundle: {
            path: `${PKG_NAME}/lib`
        }
    }
}
export const buildConfigEntries = Object.entries(
    buildConfig
) as BuildConfigEntries

export type BuildConfig = typeof buildConfig
export type BuildConfigEntries = [Module, BuildInfo][]

export const buildTarget = 'es2018'
