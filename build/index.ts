import fs from 'node:fs'

import { DistDir } from './path-map'
import {
    buildModules,
    generateTypesDefinitions,
    copyTypesAndFiles,
    buildTheme
} from './tasks'
import { runTask } from './helper'

function clearDist() {
    if (fs.existsSync(DistDir)) {
        fs.rmSync(DistDir, { recursive: true, force: true })
    }
}

function createDist() {
    fs.mkdirSync(DistDir, { recursive: true })
}

async function build() {
    await runTask(clearDist)
    await runTask(createDist)
    await runTask(buildModules)
    await runTask(buildTheme)
    await runTask(generateTypesDefinitions)
    await runTask(copyTypesAndFiles)
}

build()
