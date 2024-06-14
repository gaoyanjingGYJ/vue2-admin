<template>
    <div>
        <deal-data></deal-data>
        <table-data></table-data>
        <operation-log></operation-log>
    </div>
</template>

<script>
import DealData from "./DealData.vue"
import TableData from "./TableData.vue"
import OperationLog from "./OperationLog.vue"
export default {
    components:{DealData,TableData,OperationLog}
};
</script>

<style lang="less" scoped>

</style>