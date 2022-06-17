<script setup>
import { defineProps, computed } from 'vue'
import moment from 'moment'
// 定义 props 变量
let props = defineProps({ value: Array, })
// 原始数据
const data = computed(() => props.value)
// 绿色图标展示
const section = computed(() => {
    let array = [];
    for (let i = 0, len = data.value.length; i < len;) {
        array.push(data.value.slice(i, i + 7));
        i += 7
    }
    return array;
})
// 计算日期
const date = computed(() => {
    let oldMonth = -1
    let array = [];
    for (let i = 0, len = section.value.length; i < len;) {
        let month = moment(section.value[i][0]['date']).format('M')
        if (oldMonth != month) {
            array.push(`${month}月`)
            oldMonth = month
        } else if (oldMonth == month) {
            array.push('')
        }
        i++;
    }
    return array
})
// 点击绿色图标
function clickBlock() {
    // API 导航跳转到搜索页面
    console.log('API 导航跳转到搜索页面')
}

</script>

<template>
    <el-row class="honor-wall-box">
        <el-col :span="2" v-for="blockList in section" class="li">
            <el-tooltip v-for="item in blockList" placement="top" :content="`${item.count} memo on ${item.date}`"
                :show-after="500">
                <div class='block' :class="item.count >= 5 ? 'color5' : `color` + item.count" @click="clickBlock()">
                </div>
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