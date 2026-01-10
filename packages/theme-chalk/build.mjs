import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import fg from 'fast-glob'
import * as sass from 'sass'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pkgRoot = __dirname
const srcDir = path.resolve(pkgRoot, 'src')
const distDir = path.resolve(pkgRoot, 'dist')

const CSS_PREFIX = process.env.EP_THEME_CSS_PREFIX ?? 'ep-'
const MINIFY = process.env.EP_THEME_MINIFY !== 'false'

// 这些文件名不需要前缀
const NO_PREFIX_RE = /^(index|base|display|var)$/

// 确保目录为空
async function ensureEmptyDir(dir) {
    await fs.rm(dir, { recursive: true, force: true })
    await fs.mkdir(dir, { recursive: true })
}

function getOutBasename(base) {
    if (NO_PREFIX_RE.test(base)) return base
    return `${CSS_PREFIX}${base}`
}

function formatKB(bytes) {
    return `${(bytes / 1024).toFixed(1)} KB`
}

// 编译 scss 文件到 css 文件
async function compileScssToCss({ inputFile, outFile }) {
    const result = sass.compile(inputFile, {
        style: MINIFY ? 'compressed' : 'expanded',
        loadPaths: [srcDir]
    })

    let css = result.css

    await fs.mkdir(path.dirname(outFile), { recursive: true })
    await fs.writeFile(outFile, css)

    const beforeBytes = Buffer.byteLength(result.css)
    const afterBytes = Buffer.byteLength(css)
    const name = path.relative(pkgRoot, outFile)
    console.log(`${name}: ${formatKB(beforeBytes)} -> ${formatKB(afterBytes)}`)
}

// 将 sass 源码复制到 dist 目录
async function copySourceToDist() {
    const out = path.resolve(distDir, 'src')
    await fs.mkdir(out, { recursive: true })
    await fs.cp(srcDir, out, { recursive: true })
}

// 构建主题样式
async function buildThemeChalk() {
    // 获取所有 scss 文件
    const scssEntries = await fg(['*.scss'], { cwd: srcDir, absolute: true })
    // 并行编译所有 scss 文件
    await Promise.all(
        scssEntries.map(async scssFile => {
            // 获取文件名
            const base = path.basename(scssFile, '.scss')
            // 获取输出文件名
            const outBase = getOutBasename(base)
            // 获取输出文件路径
            const outFile = path.resolve(distDir, `${outBase}.css`)
            await compileScssToCss({
                inputFile: scssFile,
                outFile
            })
        })
    )

    // 编译暗色主题样式: src/dark/css-vars.scss -> dist/dark/css-vars.css
    const darkEntry = path.resolve(srcDir, 'dark/css-vars.scss')
    const darkOut = path.resolve(distDir, 'dark/css-vars.css')
    await compileScssToCss({
        inputFile: darkEntry,
        outFile: darkOut
    })
}

async function main() {
    await ensureEmptyDir(distDir)
    // 并行执行复制源码和构建主题样式
    await Promise.all([copySourceToDist(), buildThemeChalk()])
}

main().catch(err => {
    console.error('[@ep/theme-chalk] build failed:', err)
    process.exitCode = 1
})
