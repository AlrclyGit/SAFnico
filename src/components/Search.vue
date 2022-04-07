<script setup>
// 引入
import { ref, defineEmits, defineProps, computed } from 'vue'
import { Search, CircleClose } from '@element-plus/icons-vue'
// 定义通用变量
const inputValue = ref('')
// 接收父组件变量
let props = defineProps({
    modelValue: null
})
// 自定义事件
let emits = defineEmits(['update:modelValue'])
// 发送数据到父组件
function enterInput() {
    emits('update:modelValue', inputValue.value)
}
// 是否显示删除按钮
const isCircleClose = computed(() => {
    if (inputValue.value == '') {
        return false
    } else {
        return true
    }
})
// 清空输入框内容
function clickCircleClose() {
    inputValue.value = ''
}

</script>

<template>
    <div class="search-box">
        <el-icon :size="16" color="#9D9D9D" class="left">
            <search />
        </el-icon>

        <input v-model="inputValue" @input="inputInput" @keyup.enter="enterInput" />

        <el-icon
            :size="18"
            color="#9D9D9D"
            class="right"
            v-if="isCircleClose"
            @click="clickCircleClose"
        >
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
