<script setup>
import { ref, onMounted, computed } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import axios from 'axios'
import moment from 'moment'

let store = useStore()
let lists = computed(() => store.state.lists)
const page = ref(1)

onMounted(() => {
    axios({
        method: 'GET',
        url: `https://flow.alrcly.com/api/getPostList?page=${page}`,
    }).then((result) => {
        store.commit('listCover', result.data.data)
    })
})

</script>

<template>
    <div class="box">
        <div class="item" v-for="item in lists" :key="item.id">
            <div class="top">
                <div class="time">{{ moment(item.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                <el-icon :size="14" color="#9D9D9D">
                    <more-filled />
                </el-icon>
            </div>
            <div class="text">{{ item.post_text }}</div>
            <div class="image-box">
                <img v-for="i in item.img" :src="i">
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.box {
    display: flex;
    flex-direction: column;
    height: 800px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
    }

    .item {
        position: relative;
        background: #ffffff;
        border-radius: 6px;
        padding: 15px;
        margin: 6px 5px;

        &:hover {
            box-shadow: 0px 2px 16px #dddddd;
        }

        .top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 10px;

            .time {
                font-size: 12px;
                color: #8f9193
            }
        }

        .text {
            line-height: 1.8;
            min-height: 20px;
            margin: 0;
            color: #323232;
            font-size: 14px;
            position: relative;
            overflow: hidden;
            word-break: break-word;
            letter-spacing: 0.1px;
        }

        .image-box {
            img {
                max-width: 100px;
                max-height: 100px;
                border: 1px solid #e6e6e6;
                cursor: pointer;
                border-radius: 4px;
                margin-right: 12px;
                margin-top: 6px;
            }
        }

    }
}
</style>
