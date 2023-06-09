import type { Props as FormProps } from '@/components/VForm/index.vue'
import type { Props as TableProps } from '@/components/VTable/index.vue'

export const formProps = ref<FormProps>({
    fields: [
        {
            type: 'VDatePicker',
            key: 'feedbackDate',
            label: '反馈时间',
            provide: {
                type: 'datetimerange',
                startPlaceholder: '开通开始时间',
                endPlaceholder: '开通结束时间',
            },
        },
    ],
    defaultValue: {}
})

/**
 * TableProps
 * columnsItem: {
 *  provide: {
 *      options: xxxx,
 *      formatToYMDHMS: 格式化时间
 *      phoneMosaic: 手机号脱敏
 *      thousandsFormat: 千分位格式化
 *      transform: ['formatToYMDHMS'. 'phoneMosaic'],
 *      minWidth: '140px' 
 *  }
 * }
 */
export const tableProps = ref<TableProps>({
    columns: [
        {
            prop: 'idStr',
            label: 'ID',
        }
})
