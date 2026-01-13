import { runCommand } from '../helper'

export async function generateTypesDefinitions() {
    // 本质就是要执行命令：vue-tsc -p tsconfig.build.json --declaration --emitDeclarationOnly
    await runCommand(
        'npx vue-tsc -p tsconfig.build.json --declaration --emitDeclarationOnly'
    )
}
