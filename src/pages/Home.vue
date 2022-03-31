<script setup>
import { reactive } from 'vue'
import { Bell, Setting, Grid, List, Sunny, Bicycle } from '@element-plus/icons-vue'
import HonorWall from '../components/HonorWall.vue'

const honorWallData = reactive([
    { count: 1, date: '2022,3,12' },
    { count: 2, date: '2022,3,11' },
    { count: 3, date: '2022,3,10' },
    { count: 3, date: '2022,3,9' },
    { count: 4, date: '2022,3,8' },
    { count: 0, date: '2022,3,7' },
    { count: 2, date: '2022,3,6' },
    { count: 2, date: '2022,3,5' },
    { count: 3, date: '2022,3,4' },
    { count: 5, date: '2022,3,3' },
    { count: 5, date: '2022,3,2' },
    { count: 1, date: '2022,3,1' },
    { count: 0, date: '2022,2,28' },
    { count: 1, date: '2022,2,27' },
    { count: 2, date: '2022,2,26' },
    { count: 1, date: '2022,2,25' },
    { count: 4, date: '2022,2,24' },
    { count: 0, date: '2022,2,23' },
    { count: 2, date: '2022,2,22' },
    { count: 3, date: '2022,2,21' },
    { count: 2, date: '2022,2,20' },
])
</script>

<template>
    <div class="sa-app-box">
        <div class="sa-box">
            <!-- 侧边栏 -->
            <div class="sa-aside">
                <!-- 信息栏目 -->
                <div class="sa-aside-row1">
                    <div class="clo1">
                        <div class="sa-aside-name">萧俊介</div>
                        <div class="sa-asid-pro">PRO</div>
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
                        <div class="sa-number">63</div>
                        <div class="sa-text">MEMO</div>
                    </div>
                    <div>
                        <div class="sa-number">1</div>
                        <div class="sa-text">TAT</div>
                    </div>
                    <div>
                        <div class="sa-number">185</div>
                        <div class="sa-text">DAY</div>
                    </div>
                </div>
                <!-- 荣誉墙 -->
                <HonorWall :value="honorWallData"></HonorWall>
                <!-- 导航 -->
                <div class="sa-aside-row3">
                    <router-link to="/main" class="sa-button sa-show">
                        <el-icon :size="14" color="white">
                            <grid />
                        </el-icon>MEMO
                    </router-link>
                    <router-link to="/daily" class="sa-button">
                        <el-icon :size="14" color="#9D9D9D">
                            <list />
                        </el-icon>每日回顾
                    </router-link>
                    <router-link to="/random" class="sa-button">
                        <el-icon :size="14" color="#9D9D9D">
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

<style lang="less">
.sa-app-box {
    display: flex;
    justify-content: center;
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
                background: #9d9d9d;
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
            width: 100%;
            line-height: 36px;
            padding-left: 17px;
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