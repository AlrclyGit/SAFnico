<script setup>
import { ref, computed, watch } from 'vue'
import { Bell, Setting, Grid, List, Sunny } from '@element-plus/icons-vue'
import axios from 'axios'
import { useStore } from 'vuex'
import HonorWall from '../components/HonorWall.vue'
// 全局
const infoData = ref([]) // 左侧信息
const honorWallData = ref([]) // Post 列表
// 监听 info 的变化
let store = useStore()
let info = computed(() => store.state.info)
watch(info, () => {
    getInfo()
})
// 设置选中项目的名字
const linkName = ref('main')
function reds(link) {
    linkName.value = link
}
// 获取 info
getInfo()
function getInfo() {
    // 获取信息
    axios({
        method: 'GET',
        url: `https://flow.alrcly.com/api/info?token=${JSON.parse(localStorage.getItem('token'))}`,
    }).then((result) => {
        if (result.data.code == 0) {
            infoData.value = result.data.data
        }
    })
    // 获取荣誉墙数据
    axios({
        method: 'GET',
        url: `https://flow.alrcly.com/api/honorWall?token=${JSON.parse(localStorage.getItem('token'))}`,
    }).then((result) => {
        if (result.data.code == 0) {
            honorWallData.value = result.data.data
        }
    })
}
</script>

<template>
    <div class="sa-app-box">
        <div class="sa-box">
            <!-- 侧边栏 -->
            <div class="sa-aside">
                <!-- 信息栏目 -->
                <div class="sa-aside-row1">
                    <div class="clo1">
                        <div class="sa-aside-name">卡片笔记</div>
                        <div class="sa-asid-pro">俊介</div>
                    </div>
                    <div class="clo2">
                        <el-icon :size="20" color="#9D9D9D">
                            <bell />
                        </el-icon>
                        <div style="width:10px"></div>
                        <el-icon :size="20" color="#9D9D9D">
                            <setting />
                        </el-icon>
                    </div>
                </div>
                <!-- 数据栏目 -->
                <div class="sa-aside-row2">
                    <div>
                        <div class="sa-number">{{ infoData.count }}</div>
                        <div class="sa-text">MEMO</div>
                    </div>
                    <div>
                        <div class="sa-number">1</div>
                        <div class="sa-text">TAG</div>
                    </div>
                    <div>
                        <div class="sa-number">{{ infoData.day }}</div>
                        <div class="sa-text">DAY</div>
                    </div>
                </div>
                <!-- 荣誉墙 -->
                <HonorWall :HonorWallData="honorWallData"></HonorWall>
                <!-- 导航 -->
                <div class="sa-aside-row3">
                    <router-link to="/main" class="sa-button" :class="{ 'sa-show': linkName === 'main' }"
                        @click="reds('main')">
                        <el-icon :size="14" :color="linkName === 'main' ? 'white' : '#9D9D9D'">
                            <grid />
                        </el-icon>MEMO
                    </router-link>
                    <router-link to="/daily" class="sa-button" :class="{ 'sa-show': linkName === 'daily' }"
                        @click="reds('daily')">
                        <el-icon :size="14" :color="linkName === 'daily' ? 'white' : '#9D9D9D'">
                            <list />
                        </el-icon>每日回顾
                    </router-link>
                    <router-link to="/random" class="sa-button" :class="{ 'sa-show': linkName === 'random' }"
                        @click="reds('random')">
                        <el-icon :size="14" :color="linkName === 'random' ? 'white' : '#9D9D9D'">
                            <sunny />
                        </el-icon>随机漫步
                    </router-link>
                </div>
            </div>
            <div class="sa-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.sa-app-box {
    display: flex;
    justify-content: center;
    background-color: #FAFAFA;
    margin: 0;
    padding: 10px;
    font-family: 'JetBrains Mono', 'PingFang SC', monospace, sans-serif;
}

.sa-box {
    width: 900px;
    display: flex;
    flex-direction: row;
}

.sa-aside {
    width: 25%;
    color: #9d9d9d;

    .sa-aside-row1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: bold;

        .clo1 {
            display: flex;
            flex-direction: row;
            align-items: center;

            .sa-aside-name {
                font-size: 18px;
                color: #5f5f5f;
                margin: 3px;
            }

            .sa-asid-pro {
                color: white;
                background: #55bb8e;
                font-size: 12px;
                padding: 2px 4px;
                border-radius: 4px;
            }
        }

        .clo2 {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: end;
        }
    }

    .sa-aside-row2 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 20px 0;
        font-weight: bold;

        .sa-number {
            font-size: 24px;
        }

        .sa-text {
            font-size: 12px;
        }
    }

    .sa-aside-row3 {
        display: flex;
        flex-direction: column;
        margin-top: 24px;

        .el-icon {
            margin-right: 10px;
        }

        .sa-button {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 90%;
            line-height: 36px;
            padding-left: 10%;
            font-size: 14px;
            border-radius: 5px;
            color: #9d9d9d;
            text-decoration: none;
        }

        .sa-show {
            background-color: #55bb8e;
            color: white;
        }
    }
}

.sa-main {
    width: 70%;
    margin-left: 5%;
}
</style>