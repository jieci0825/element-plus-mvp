import EP from './default'

// 导出所需要的子包
export * from '@ep/components'
export * from '@ep/hooks'

// 导出安装函数和版本号
export const install = EP.install
export const version = EP.version
export default EP
