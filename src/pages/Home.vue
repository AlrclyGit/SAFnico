<script setup>
import { reactive } from 'vue'
import { Bell, Setting } from '@element-plus/icons-vue'
import HonorWall from '../components/HonorWall.vue'

const honorWallData = reactive([1, 2, 0, 4, 0, 3, 0, 5, 0, 1, 2, 0, 4, 0, 3, 0, 5, 0, 0, 4, 0, 1, 2, 0, 4, 0, 3, 0, 1, 2, 0, 4, 0, 3, 0, 1, 2, 0, 4, 0, 3, 0, 1, 2, 0, 4, 0, 3, 0, 1, 2, 0, 4, 0, 3, 0, 1, 2, 0, 4, 0, 3, 0, 1, 2, 0, 4, 0, 3, 0, 1, 2, 0, 4, 0, 3, 0, 1, 2, 0, 4, 0, 3, 0])

</script>

<template>
    <div class="sa-app-box">
        <div class="sa-box">
            <div class="sa-aside">
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
                <HonorWall :value="honorWallData"></HonorWall>
            </div>
            <div class="sa-main"></div>
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
        color: #9d9d9d;
        font-weight: bold;

        .sa-number {
            font-size: 24px;
        }

        .sa-text {
            font-size: 12px;
        }
    }
}

.sa-main {
    width: 70%;
    margin-left: 5%;
}
</style>