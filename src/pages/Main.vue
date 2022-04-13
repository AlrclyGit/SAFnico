<script setup>
// 引入
import { ref } from 'vue'
import { RefreshLeft } from '@element-plus/icons-vue'
import Search from '../components/Search.vue'
import InputText from '../components/InputText.vue'
import List from '../components/List.vue'
// 变量
const searcValue = ref('')

</script>

<template>
    <div class="header">
        <div class="left">
            <div class="memo">MEMO</div>
            <el-icon :size="16" color="#9D9D9D">
                <refresh-left />
            </el-icon>
        </div>
        <Search v-model="searcValue"></Search>
    </div>
    <InputText class="input-text"></InputText>
    <List></List>
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
