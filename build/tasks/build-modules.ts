import { excludeFiles, generateExternal, runTask } from '../helper'
import fg from 'fast-glob'
import { EpDir, PackagesDir } from '../path-map'
import {
    rollup,
    type Plugin,
    type RollupBuild,
    type OutputOptions
} from 'rollup'
import { EpAlias } from '../plugins/ep-alias'
import esbuild from 'rollup-plugin-esbuild'
import vue from '@vitejs/plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import { buildConfigEntries, buildTarget } from '../build-info'
import nodeResolve from '@rollup/plugin-node-resolve'

const plugins: Plugin[] = [
    // 处理 .vue 文件，把 vue 的单文件三个部分转为一个 js/ts 模块（带 render 函数、HMR 代码、import 语句）
    //  -  如果使用了 <script lang="ts">，则 plugin-vue 不会把 TS 变成 JS，保留 TS 语法
    vue(),
    // 处理 @ep/theme-chalk 的别名，把 @ep/theme-chalk 替换为 ep/theme-chalk
    EpAlias(),
    // 解析模块
    nodeResolve({
        // 按照顺序查找文件
        extensions: ['.mjs', '.js', '.json', '.ts']
    }),
    // 将 CommonJS 模块转换为 ES Module
    commonjs(),
    // 编译
    esbuild({
        sourceMap: true,
        target: buildTarget,
        loaders: {
            // 如果文件后缀是 .vue，则使用 ts 编译器编译
            '.vue': 'ts'
        },
        // 编译期常量替换
        define: {
            // 将 "process.env.NODE_ENV" 替换为 "production"
            'process.env.NODE_ENV': '"production"'
        }
    })
]

async function buildModulesComponents() {
    // 得到所有需要打包的组件文件，每一个文件都是一个单独入口文件
    const input = excludeFiles(
        await fg(['**/*.{js,ts,vue}', '!**/style/(index|css).{js,ts,vue}'], {
            cwd: PackagesDir,
            absolute: true, // 是否返回绝对路径
            onlyFiles: true // 是否只返回文件，即目录的绝对路径不返回
        })
    )

    // 拿到 RollupBuild 实例
    const bundle = await rollup({
        input,
        plugins,
        external: await generateExternal({ full: false }),
        treeshake: {}
    })

    await writeBundles(
        bundle,
        buildConfigEntries.map(([module, config]): OutputOptions => {
            return {
                format: config.format,
                dir: config.output.path,
                // 在 commonjs 模式下，强制导出方式为 module.foo = xxx
                exports: module === 'cjs' ? 'named' : undefined,
                // 别给我合并文件，不需要整合为一个文件，我要 一个源文件 = 一个输出文件，实现目录结构保留
                preserveModules: true,
                // 路径裁剪器，及指定从哪一层目录开始保留结构，但是不包含该层目录
                preserveModulesRoot: EpDir,
                sourcemap: true,
                entryFileNames: `[name].${config.ext}`
            }
        })
    )
}

function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
    return Promise.all(options.map(option => bundle.write(option)))
}

export async function buildModules() {
    await runTask(buildModulesComponents)
}
