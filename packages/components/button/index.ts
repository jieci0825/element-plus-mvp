import Button from './src/button.vue'
import { withInstall, SFCWithInstall } from '@ep/utils'

export const EpButton: SFCWithInstall<typeof Button> = withInstall(Button)
export default EpButton

export * from './src/button'
