
<!-- 只有 VSearchTable 一个组件 -->
<script setup lang="ts">

import {
  formProps,
  tableProps,
} from './config'
import { getPageList } from '@/api/xxxx'

const vSearchTable = ref<any>(null)
const handleRowAction = (btnName: string, rowData: any) => {
  if (btnName === 'provideDeliveryCode') {
    return ''
  }
}
</script>

<template>
    <VSearchTable
        :request="getPageList"
        :form="formProps"
        :table="tableProps"
        ref="vSearchTable"
        @row-action="handleRowAction"
    >
        <template #tools_right>
            <el-row justify="end" class="mb-4">
                <el-button
                    @click="exportContentToExcel"
                    :loading="exportBtnLoading"
                    v-if="checkButtonAuth(exportAuth)"
                    >导出</el-button
                    >
            </el-row>
        </template>

        <template #table_cell_xxx="{ row }">
            <!-- xxxxxx -->
        </template>
    </VSearchTable>
</template>