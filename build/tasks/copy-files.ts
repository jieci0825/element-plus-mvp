import fs from 'node:fs'
import path from 'node:path'
import { DistDir, EpDir, EpOutput, ThemeChalkDir } from '../path-map'

/** dist/types */
const typesDir = path.resolve(DistDir, 'types')
/** dist/types/packages */
const typesPackagesDir = path.resolve(typesDir, 'packages')

/**
 * 递归复制目录
 */
function copyDir(src: string, dest: string) {
    fs.mkdirSync(dest, { recursive: true })
    const entries = fs.readdirSync(src, { withFileTypes: true })

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name)
        const destPath = path.join(dest, entry.name)

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath)
        } else {
            fs.copyFileSync(srcPath, destPath)
        }
    }
}

/**
 * 递归删除目录
 */
function removeDir(dir: string) {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true })
    }
}

/**
 * 将 dist/types/packages 下的内容移动到 dist/types 下，并复制类型到 es/lib 目录
 */
export async function copyTypesAndFiles() {
    // 1. 将 dist/types/packages 下的内容移动到 dist/types 下
    if (fs.existsSync(typesPackagesDir)) {
        const entries = fs.readdirSync(typesPackagesDir, {
            withFileTypes: true
        })
        for (const entry of entries) {
            const srcPath = path.join(typesPackagesDir, entry.name)
            const destPath = path.join(typesDir, entry.name)

            if (entry.isDirectory()) {
                copyDir(srcPath, destPath)
            } else {
                fs.copyFileSync(srcPath, destPath)
            }
        }
        // 删除 packages 目录
        removeDir(typesPackagesDir)
    }

    // 2. 将 dist/types/ep 里的文件移动到 dist/types 根目录，然后删除 ep 目录
    const typesEpDir = path.resolve(typesDir, 'ep')
    if (fs.existsSync(typesEpDir)) {
        const entries = fs.readdirSync(typesEpDir, { withFileTypes: true })
        for (const entry of entries) {
            const srcPath = path.join(typesEpDir, entry.name)
            const destPath = path.join(typesDir, entry.name)

            if (entry.isDirectory()) {
                copyDir(srcPath, destPath)
            } else {
                fs.copyFileSync(srcPath, destPath)
            }
        }
        // 删除 ep 目录
        removeDir(typesEpDir)
    }

    // 3. 将类型文件复制到 dist/ep/es 和 dist/ep/lib
    const esDir = path.resolve(EpOutput, 'es')
    const libDir = path.resolve(EpOutput, 'lib')

    // 复制子目录（components, hooks, utils）
    const typeDirs = ['components', 'hooks', 'utils']
    for (const dir of typeDirs) {
        const srcDir = path.resolve(typesDir, dir)
        if (fs.existsSync(srcDir)) {
            copyDir(srcDir, path.resolve(esDir, dir))
            copyDir(srcDir, path.resolve(libDir, dir))
        }
    }

    // 复制根目录下的 .d.ts 文件
    const rootEntries = fs.readdirSync(typesDir, { withFileTypes: true })
    for (const entry of rootEntries) {
        if (!entry.isDirectory() && entry.name.endsWith('.d.ts')) {
            const srcPath = path.join(typesDir, entry.name)
            fs.copyFileSync(srcPath, path.join(esDir, entry.name))
            fs.copyFileSync(srcPath, path.join(libDir, entry.name))
        }
    }

    // 4. 复制 README.md 和 package.json 到 dist/ep
    const readmeSrc = path.resolve(EpDir, 'README.md')
    const packageSrc = path.resolve(EpDir, 'package.json')

    if (fs.existsSync(readmeSrc)) {
        fs.copyFileSync(readmeSrc, path.resolve(EpOutput, 'README.md'))
    }
    if (fs.existsSync(packageSrc)) {
        fs.copyFileSync(packageSrc, path.resolve(EpOutput, 'package.json'))
    }

    // 5. 复制 theme-chalk/dist 到 dist/ep/theme-chalk
    const themeChalkDistDir = path.resolve(ThemeChalkDir, 'dist')
    const themeChalkOutputDir = path.resolve(EpOutput, 'theme-chalk')
    if (fs.existsSync(themeChalkDistDir)) {
        copyDir(themeChalkDistDir, themeChalkOutputDir)
    }
}
