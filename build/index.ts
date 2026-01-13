import fs from 'node:fs'

import { DistDir } from './path-map'
import { buildModules } from './tasks'
import { runTask } from './helper'

function clearDist() {
    if (fs.existsSync(DistDir)) {
        fs.rmSync(DistDir, { recursive: true, force: true })
    }
}

function createDist() {
    fs.mkdirSync(DistDir, { recursive: true })
}

async function run() {
    runTask(clearDist)
    runTask(createDist)
    await runTask(buildModules)
}

run()
