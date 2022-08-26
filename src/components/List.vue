<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { MoreFilled } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import ShowImage from '../components/ShowImage.vue'
import InputText from '../components/InputText.vue'
import useWindowSize from '../utils/windowSize.js'
// 插件变量
const store = useStore() // Vuex 对象
const windowSize = useWindowSize() // 窗口大小对象
// 接收父组件变量
const props = defineProps({
    refreshList: Number,
    keyword: String
})
watch(() => { props.refreshList }, () => { getPostList(true) }) // 刷新量发生变化时，重新请求列表
const keyword = computed(() => encodeURIComponent(props.keyword)) // 搜索词
watch(keyword, () => { getPostList(true) }) // 搜索词发生变化时，重新请求列表
// 
const lists = computed(() => store.state.lists) // 列表数据
const boxHeight = computed(() => windowSize.height.value - 180) // List 列表 DIV 的高度
const page = ref(1) // 页面
const boxRef = ref(null) //  列表 Box 的 Dom
const showImageUrl = ref('') // 图片秀的 URL 地址
const showImageState = ref(0) // 图片秀的状态
const geting = ref(false) // 请求中
const getEnd = ref(false) // 没有更多数据可以加载
const inputTextShow = ref(-1) // 发生编辑操作的 Post

// 删除列表条目
function deletePsot(id) {
    // 弹窗
    ElMessageBox.confirm('你确定要删除吗？', '提醒', {
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        axios({
            method: 'POST',
            url: `https://fnico.alrcly.com/api/deletePost/${id}`,
            data: { 'token': JSON.parse(localStorage.getItem('token')) }
        }).then((result) => {
            if (result.data.code == 0) {
                store.commit('listDelete', id)
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
            } else {
                ElMessage({
                    type: 'error',
                    message: '删除失败',
                })
            }
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消删除',
        })
    })
}

onMounted(() => { //构造时
    // 请求数据
    getPostList(true)
    // 监听滚动
    boxRef.value.addEventListener('scroll', (e) => {
        let boxSt = e.target.scrollTop // 滚动高度
        let boxScrollHeight = e.target.scrollHeight // 文档高度
        if (boxSt + boxHeight.value >= boxScrollHeight) {
            if (geting.value == true) {
                console.log('数据请求中')
                return null;
            }
            if (getEnd.value == true) {
                console.log('我是有底线的')
                return null;
            }
            page.value += 1
            getPostList()
        }
    })
})

// 获取列表数据（API）
function getPostList(isFirst = false) {
    geting.value = true
    if (isFirst) {
        page.value = 1
        getEnd.value = false
    }
    axios({
        method: 'GET',
        url: `https://fnico.alrcly.com/api/getPostList?token=${JSON.parse(localStorage.getItem('token'))}&page=${page.value}&keyword=${keyword.value}`,
    }).then((result) => {
        if (isFirst) {
            store.commit('listCover', result.data.data)
        } else {
            store.commit('listJoin', result.data.data)
        }
        if (result.data.data.length == 0) {
            getEnd.value = true
        }
        geting.value = false
    })
}

// 格式化 Post
function getPostHtml(text) {
    const urlRE = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    let url = text.split(urlRE)
    if (url.length > 1) {
        let urlShow = url[2].split('//')[1]
        let rulLabel = `<a target=“_blank” href="${url[1]}">${urlShow}</a>`
        text = text.replace(urlRE, rulLabel)
    }
    const tagRE = /#[^\s]*/g
    return text.replace(tagRE, `<span>$&</span>`)
}

</script>

<template>
    <ShowImage :url="showImageUrl" :state="showImageState"></ShowImage>
    <div class="box" ref="boxRef" :style="`height:${boxHeight}px`">
        <transition-group name="flip-list">
            <div class="item" v-for="item in lists" :key="item.id">
                <div v-if="item.id != inputTextShow">
                    <div class="top">
                        <div class="time">{{ moment(item.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                        <el-popover placement="bottom" trigger="hover">
                            <template #reference>
                                <el-icon :size="14" color="#9D9D9D">
                                    <more-filled />
                                </el-icon>
                            </template>
                            <div class="operate">
                                <div class="item" @click="inputTextShow = item.id">编辑</div>
                                <div class="item" @click="deletePsot(item.id)">删除</div>
                            </div>
                        </el-popover>
                    </div>
                    <div class="text" v-html="getPostHtml(item.post_text)"></div>
                    <div class="image-box">
                        <img v-for="i in item.img" :src="i.url" @click="showImageUrl = i.url; showImageState++">
                    </div>
                </div>
                <InputText v-else class="input-text" @endEditPost="inputTextShow = -1" :postID="item.id"
                    :textareaaValue="item.post_text" :imgList="item.img">
                </InputText>
            </div>
        </transition-group>
        <div class="item" v-if="getEnd">
            <div style="text-align: center;margin-bottom: 10px;">---------- 我是有底线的 ----------</div>
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
        background: var(--back-color-h2);
        border-radius: 6px;
        padding: 15px;
        margin: 6px 5px;

        &:hover {
            box-shadow: 0px 2px 16px var(--list-shadow);
        }

        .top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 10px;
            cursor: pointer;

            .time {
                font-size: 12px;
                color: #8f9193
            }
        }

        .text {
            line-height: 1.8;
            min-height: 20px;
            margin: 0;
            color: var(--font-color);
            font-size: 14px;
            position: relative;
            overflow: hidden;
            word-break: break-word;
            letter-spacing: 0.1px;
            white-space: pre-wrap;

            :deep(a) {
                color: #5783f7;
                text-decoration: none;
            }

            :deep(span) {
                color: var(--tag-color);
                cursor: pointer;
                background-color: var(--tag-back);
                padding: 4px;
                font-size: 12px;
                border-radius: 3px;
            }
        }

        .image-box {
            img {
                width: 100px;
                height: 100px;
                border: 1px solid #e6e6e6;
                border-radius: 4px;
                margin-right: 12px;
                margin-top: 6px;
                cursor: pointer;
                object-fit: cover;
            }
        }

    }
}

.operate {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    .item {
        margin: 5px;
    }

    .item:hover {
        color: #40c463;
    }
}

.flip-list-move {
    transition: transform 0.8s ease;
}

.flip-list-enter-active,
.flip-list-leave-active {
    transition: all 1s ease;
}

.flip-list-enter-from,
.flip-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
