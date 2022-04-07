<script setup>
// Import
import { reactive } from 'vue'
// Props
let props = defineProps({
    value: Array,
})
// Data
let data = props.value
// 绿色图标展示
const section = reactive([]);
for (let i = 0, len = data.length; i < len;) {
    section.push(data.slice(i, i + 7));
    i += 7
}
// 计算日期
const date = reactive([]);
let oldMonth = -1
for (let i = 0, len = section.length; i < len;) {
    let month = new Date(section[i][0].date).getMonth();
    if (oldMonth != month) {
        date.push(`${month + 1}月`)
        oldMonth = month
    } else if (oldMonth == month) {
        date.push('')
    }
    i++;
}
// 点击绿色图标
function clickBlock() {
    // API 导航跳转到搜索页面
}

</script>

<template>
    <el-row class="honor-wall-box">
        <el-col :span="2" v-for="blockList in section" class="li">
            <el-tooltip
                v-for="item in blockList"
                placement="top"
                :content="`${item.count} memo on ${item.date}`"
                :show-after="500"
            >
                <div :class="'block ' + 'color' + item.count" @click="clickBlock()"></div>
            </el-tooltip>
        </el-col>
    </el-row>
    <el-row class="honor-wall-data">
        <el-col v-for="item in date" :span="2" class="item">{{ item }}</el-col>
    </el-row>
</template>

<style scoped lang="less">
.honor-wall-box {
    display: flex;
    flex-direction: row-reverse;

    .li {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
    }
}

.block {
    width: 12px;
    height: 12px;
    background: #efefef;
    color: #d3ecdd;
    border: 1px solid transparent;
    border-radius: 2px;
    margin-bottom: 4px;
    cursor: pointer;
}

.honor-wall-data {
    display: flex;
    flex-direction: row-reverse;
    font-size: 12px;
    color: #9d9d9d;
    margin-top: 5px;

    .item {
        white-space: nowrap;
    }
}

.color1 {
    background: #d3ecdd;
}

.color2 {
    background: #9be9a8;
}

.color3 {
    background: #40c463;
}

.color4 {
    background: #30a14e;
}

.color5 {
    background: #216e39;
}
</style>