<script setup>
import { ref, onMounted, computed, defineExpose, defineEmits } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import ShowImage from '../components/ShowImage.vue'
import InputText from '../components/InputText.vue'

// 设定
let store = useStore() // Vuex 对象
// 变量
let lists = computed(() => store.state.lists) // 列表数据
let boxHeight = computed(() => window.innerHeight - 180) // 列表 Box 的高度
const page = ref(1) // 页面
const boxRef = ref(null) //  列表 Box 的 Dom
const showImageRef = ref(null) // 图片秀的 Dom
const geting = ref(false) // 请求中
const getEnd = ref(false) // 没有更多数据可以加载
const inputTextShow = ref(-1) // 
// 刷新列表
function refreshPostList() {
    page.value = 1
    getPostList(true)
}

// 点击列表图片
function clickPostImg(url) {
    // 把图片信息传递到「图片秀」组件
    showImageRef.value.clickImg(url)
}

// 编辑列表条目
function editPost(id) {
    inputTextShow.value = id
}

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
            url: `https://flow.alrcly.com/api/deletePost/${id}`,
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

onMounted(() => {
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
    axios({
        method: 'GET',
        url: `https://flow.alrcly.com/api/getPostList?page=${page.value}`,
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

// 将私有属性暴露给外部
defineExpose({ refreshPostList })

</script>

<template>
    <ShowImage ref="showImageRef"></ShowImage>
    <div class="box" ref="boxRef" :style="`height:${boxHeight}px`">
        <transition-group name="flip-list">
            <div class="item" v-for="item in lists" :key="item.id">
                <div v-if="inputTextShow != item.id">
                    <div class="top">
                        <div class="time">{{ moment(item.created_at).format('YYYY-MM-DD HH:mm:ss') }}</div>
                        <el-popover placement="bottom" trigger="hover">
                            <template #reference>
                                <el-icon :size="14" color="#9D9D9D">
                                    <more-filled />
                                </el-icon>
                            </template>
                            <div class="operate">
                                <div class="item" @click="editPost(item.id)">编辑</div>
                                <div class="item" @click="deletePsot(item.id)">删除</div>
                            </div>
                        </el-popover>
                    </div>
                    <div class="text" v-html="getPostHtml(item.post_text)"></div>
                    <div class="image-box">
                        <img v-for="i in item.img" :src="i.url" @click="clickPostImg(i.url)">
                    </div>
                </div>
                <InputText class="input-text" @editPost="editPost(-1)" v-if="inputTextShow == item.id" :postID="item.id"
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
            color: #323232;
            font-size: 14px;
            position: relative;
            overflow: hidden;
            word-break: break-word;
            letter-spacing: 0.1px;

            :deep(a) {
                color: #5783f7;
                text-decoration: none;
            }

            :deep(span) {
                color: #5783f7;
                cursor: pointer;
                background-color: #eef3fe;
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
