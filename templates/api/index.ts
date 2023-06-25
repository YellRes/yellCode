import { javaInstance, extendInstance } from '@/utils/axios'
import { formatToSTRangeObj } from '@/utils/dayjs/format'
import { saveAs } from 'file-saver'

/**
 * 获取功能模块和页面来源
 */
export function getFunctionalModuleAndPageSource() {
    return javaInstance.get('/api/v1/getPaySourceList')
}

/**
 * 分页接口
 *
 * 通过 memberExpirationTime 来
 * formatToSTRangeObj(memberExpirationTime, 'startTimexxx', 'endTimexxx')
 */
export function getPageList(data: Record<string, any>) {
    const { memberExpirationTime, ...others } = data
    const params = {
        ...formatToSTRangeObj(memberExpirationTime),
        ...others,
    }
    return javaInstance.post('/userManagerCenter/vipUserManager/getList', params, {
        needTransformToForm: true,
    })
}

/**
 * 导出列表
 */
export async function exportList(data: Record<string, any>) {
    const res = await extendInstance.post('/order/orderExtend/B_export', processSearchParams(data), {
        needTransformToForm: true,
        responseType: 'blob',
    })
    saveAs(res.data.blob, res.data.filename || `数据导出.xlsx`)
}
