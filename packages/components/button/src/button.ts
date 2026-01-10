import Button from './button.vue'
import { ExtractPropTypes, PropType } from 'vue'

// 按钮组件属性类型
export const buttonProps = {
    /** 按钮类型 */
    type: {
        type: String as PropType<'primary' | 'secondary'>,
        default: 'primary'
    },
    /** 按钮大小 */
    size: {
        type: String as PropType<'small' | 'medium' | 'large'>,
        default: 'medium'
    }
} as const
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

// 按钮组件事件类型
export const buttonEmits = {
    click: (e: MouseEvent) => e instanceof MouseEvent
} as const
export type ButtonEmits = typeof buttonEmits

// 按钮组件实例类型
export type ButtonInstance = InstanceType<typeof Button> & unknown
