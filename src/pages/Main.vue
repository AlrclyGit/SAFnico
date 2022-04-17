<script setup>
// 引入
import { ref } from 'vue'
import { RefreshLeft } from '@element-plus/icons-vue'
import Search from '../components/Search.vue'
import InputText from '../components/InputText.vue'
import List from '../components/List.vue'
// 变量
const searcValue = ref('') // 搜索框的值
// 刷新列表
const listRef = ref(null) // 列表的 Ref 对象
const inputTextRef = ref(null) // 输入框的 Ref 对象
// 点击刷新列表
function clickRefreshList() {
    // 将点击刷新列表事件，传递到列表组件
    listRef.value.refreshPostList()
}
// 列表自定义的编辑事件
function editPostAtcion(e) {
    // 将列表编辑事件的参数，传递到文本输入组件
    inputTextRef.value.externalData(e)
}
</script>

<template>
    <div class="header">
        <div class="left">
            <div class="memo">MEMO</div>
            <el-icon :size="16" color="#9D9D9D" @click="clickRefreshList">
                <refresh-left />
            </el-icon>
        </div>
        <Search v-model="searcValue"></Search>
    </div>
    <InputText class="input-text" ref="inputTextRef"></InputText>
    <List ref="listRef" @editPost="editPostAtcion"></List>
</template>

<style scoped lang="less">
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;

        .memo {
            font-weight: 900;
            color: #9d9d9d;
            margin-right: 10px;
        }
    }
}

.input-text {
    margin-bottom: 10px;
}
</style>
