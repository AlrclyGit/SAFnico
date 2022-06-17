<script setup>
// 引入
import { ref, defineEmits, computed } from 'vue'
import { Search, CircleClose } from '@element-plus/icons-vue'
// 搜索框的值
const searchValue = ref('')
// 自定义事件
let emits = defineEmits(['update:modelValue'])
// 触发搜索框回车
function enterInput() {
    // 将搜索框的值，发送到父组件
    emits('update:modelValue', searchValue.value)
}
// 是否显示删除按钮
const isCircleClose = computed(() => {
    if (searchValue.value == '') {
        return false
    } else {
        return true
    }
})
// 清空输入框内容
function clickCircleClose() {
    searchValue.value = ''
    // 将搜索框的值，发送到父组件
    emits('update:modelValue', searchValue.value)
}

</script>

<template>
    <div class="search-box">
        <el-icon :size="16" color="#9D9D9D" class="left">
            <search />
        </el-icon>
        <input v-model="searchValue" @keyup.enter="enterInput" />
        <el-icon :size="18" color="#9D9D9D" class="right" v-if="isCircleClose" @click="clickCircleClose">
            <circle-close />
        </el-icon>
    </div>
</template>

<style scoped lang="less">
.search-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    .el-icon {
        position: absolute;
    }

    .left {
        left: 10px;
    }

    .right {
        right: 10px;
    }

    input {
        padding: 0 30px;
        height: 40px;
        line-height: 40px;
        outline: 0;
        color: #606266;
        background: #efefef;
        width: 100%;
        border-radius: 8px;
        border: none;
    }
}
</style>
