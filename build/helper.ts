import fs from 'node:fs'
import { EpPackage, RootDir } from './path-map'
import type { ProjectManifest } from '@pnpm/types'

/**
 * 运行任务，打印开始和结束日志
 */
export async function runTask(fn: () => Promise<any> | void) {
    console.log('-- runTask start -- ', fn.name)
    try {
        await fn()
    } catch (error) {
        console.log('runTask error: ', error)
        process.exit(1)
    } finally {
        console.log('-- runTask end -- ', fn.name)
    }
}

/**
 * 排除文件
 */
export const excludeFiles = (files: string[]) => {
    const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
    return files.filter(path => {
        const position = path.startsWith(RootDir) ? RootDir.length : 0
        return !excludes.some(exclude => {
            // 因为是绝对路径，为了避免这个路径在前面的路径中，所以需要从 position 位置开始查找 exclude
            return path.includes(exclude, position)
        })
    })
}

export const getPackageDependencies = (
    pkgPath: string
): Record<'dependencies' | 'peerDependencies', string[]> => {
    if (!fs.existsSync(pkgPath)) {
        return {
            dependencies: [],
            peerDependencies: []
        }
    }
    const manifest = fs.readFileSync(pkgPath, 'utf-8') as string
    const { dependencies = {}, peerDependencies = {} } = JSON.parse(
        manifest
    ) as ProjectManifest
    return {
        dependencies: Object.keys(dependencies),
        peerDependencies: Object.keys(peerDependencies)
    }
}

export const generateExternal = async (options: { full: boolean }) => {
    const { dependencies, peerDependencies } = getPackageDependencies(EpPackage)

    return (id: string) => {
        //
        const packages: string[] = [...peerDependencies]

        // 如果不是全量打包，则包含 @vue 和 dependencies 中都是外部依赖
        if (!options.full) {
            // import { ref } from 'vue'，引入的是 vue，实际上真实路径是包含 @vue
            packages.push('@vue', ...dependencies)
        }

        return [...new Set(packages)].some(pkg => {
            // 如果 id 是 pkg 或者 id 是以 pkg/ 开头，则返回 true，表示是外部依赖，不需要打包
            return id === pkg || id.startsWith(`${pkg}/`)
        })
    }
}
