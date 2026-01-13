import { runCommand } from '../helper'

export async function buildTheme() {
    await runCommand('pnpm -C packages/theme-chalk build')
}
