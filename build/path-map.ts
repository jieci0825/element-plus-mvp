import path from 'node:path'

const dirname = import.meta.dirname

/** `/` */
export const RootDir = path.resolve(dirname, '..')

/** `/dist` */
export const DistDir = path.resolve(RootDir, 'dist')
/** `/dist/ep` */
export const EpOutput = path.resolve(DistDir, 'ep')
/** `/packages` */
export const PackagesDir = path.resolve(RootDir, 'packages')

/** `/packages/components` */
export const ComponentsDir = path.resolve(PackagesDir, 'components')
/** `/packages/hooks` */
export const HooksDir = path.resolve(PackagesDir, 'hooks')
/** `/packages/utils` */
export const UtilsDir = path.resolve(PackagesDir, 'utils')
/** `/packages/ep` */
export const EpDir = path.resolve(PackagesDir, 'ep')
/** `/packages/theme-chalk` */
export const ThemeChalkDir = path.resolve(PackagesDir, 'theme-chalk')

/** `/packages/components/index.ts` */
export const ComponentsEntry = path.resolve(ComponentsDir, 'index.ts')
/** `/packages/hooks/index.ts` */
export const HooksEntry = path.resolve(HooksDir, 'index.ts')
/** `/packages/utils/index.ts` */
export const UtilsEntry = path.resolve(UtilsDir, 'index.ts')
/** `/packages/theme-chalk/index.ts` */
export const ThemeChalkEntry = path.resolve(ThemeChalkDir, 'index.ts')

/** `/packages/ep/package.json` */
export const EpPackage = path.resolve(EpDir, 'package.json')
