<script setup>
// 引入
import { ref, computed } from 'vue'
import { PictureFilled, Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import axios from 'axios'
import ShowImage from '../components/ShowImage.vue'
import selectImg from '../utils/selectImage.js'
// 接收父组件变量
let props = defineProps({
    postID: null,
    textareaaValue: null,
    imgList: null
})
let emits = defineEmits(['endEditPost']) // 自定义结束编辑事件
// 对象
let store = useStore() // Vuex 对象
let postID = props.postID ? props.postID : -1 // 更新文章 ID
const textareaaValue = props.textareaaValue ? ref(props.textareaaValue) : ref('') // 输入框的值
const isUpdate = computed(() => {
    if (postID != -1) {
        return true
    } else {
        return false
    }
})
const apiState = ref(true)  // 请求状态
// 当文本发生改变的时，设置按钮样式
const sendBgc = computed(() => {
    if (textareaaValue.value == '') {
        return 'unsend-bgc'
    } else {
        return 'send-bgc'
    }
})
// 当点击发送按钮时，提示为空，或者发送给服务器
function send() {
    if (textareaaValue.value === '') {
        ElMessageBox.alert('你还没有输入任何内容呢，小淘气～', '提示', {
            confirmButtonText: 'OK',
        })
    } else if (apiState.value) {
        // 修改请求状态
        apiState.value = false
        // 从图片数组里循环出需要的数据
        let imgIdArray = [];
        imgList.value.forEach(element => {
            imgIdArray.push(element.id)
        });
        // 拼接需要发送的 Data 数据
        let data = {
            'textareaa_value': textareaaValue.value,
            'img_id_array': imgIdArray,
            'token': JSON.parse(localStorage.getItem('token'))
        }
        // 根据请求构建
        if (isUpdate.value === true) {
            data.id = postID
            // 请求 API
            axios({
                method: 'POST',
                url: 'https://api.fnico.alrcly.com/api/updataPost',
                data: data
            }).then((result) => {
                store.commit('listUpdata', result.data.data)
                // 恢复默认状态
                emits('endEditPost')
            })
        } else {
            // 请求 API
            axios({
                method: 'POST',
                url: 'https://api.fnico.alrcly.com/api/setPost',
                data: data
            }).then((result) => {
                // 将数据更新到列表
                store.commit('listUnshift', result.data.data)
                // 恢复默认状态
                cancel()
            })
        }
    } else {
        ElMessageBox.alert('这么着急干嘛，小淘气～', '提示', {
            confirmButtonText: 'OK',
        })
    }
}
function cancel() {
    textareaaValue.value = ''
    imgList.value = []
    isUpdate.value = false
    apiState.value = true
}

/**
 * 图片上传
 */
const showImageTag = computed(() => {
    if (imgList.value.length != 0) {
        return true
    } else {
        return false
    }
})
const showImageUrl = ref('') // 图片秀接收的 URL
const showImageState = ref(0) // 图片秀接收的状态
const imgList = props.imgList ? ref(props.imgList) : ref([]) //存放图片的数组
const showimgAction = ref(-1)
// 当图片的 icon 被点击
function clickImageIcon() {
    imageUpdate()
}
// 当点击上传图片时
function imageUpdate() {
    selectImg().then((val) => {
        let param = new FormData()
        param.append('file', val)
        param.append('token', JSON.parse(localStorage.getItem('token')))
        axios({
            method: 'POST',
            url: 'https://api.fnico.alrcly.com/api/updateImage',
            data: param
        }).then((result) => {
            if (result.data.code == 0) {
                console.log(result.data.data)
                imgList.value.push(result.data.data)
            }
        })
    })
}
// 当删除图片时
function onRemove(data) {
    imgList.value = imgList.value.filter((currentValue) => {
        return currentValue.id === data.id ? false : true
    })
}

</script>

<template>
    <div class="input-text-box" v-loading="!apiState">
        <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="textareaaValue" />
        <div class="upload-image" v-if="showImageTag">
            <div class="imgItemBox" v-for="item in imgList">
                <div class="imgAction" v-show="showimgAction == item.id" @mouseleave="showimgAction = -1">
                    <el-icon :size="20" color="#FFFFFF" @click="showImageUrl = item.url; showImageState++">
                        <zoom-in />
                    </el-icon>
                    <el-icon :size="20" color="#FFFFFF" @click="onRemove(item)">
                        <delete />
                    </el-icon>
                </div>
                <img :src="item.url" @mouseover="showimgAction = item.id">
            </div>
            <div class="upload-button" @click="imageUpdate">
                <el-icon :size="30" color="#9D9D9D">
                    <plus />
                </el-icon>
            </div>
            <ShowImage :url="showImageUrl" :state="showImageState"></ShowImage>
        </div>
        <div class="icon-button-box">
            <el-icon :size="20" color="#9D9D9D" @click="clickImageIcon">
                <picture-filled />
            </el-icon>
        </div>
        <div class="button cancel" @click="emits('endEditPost')" v-if="isUpdate">取消</div>
        <div class="button send" :class="sendBgc" @click="send">发送</div>
    </div>
</template>

<style scoped lang="less">
.input-text-box {
    position: relative;
    border: 2px solid var(--main-color);
    border-radius: 8px;
    background: var(--back-color-h2);
    margin-top: 10px;
    padding: 10px;

    :deep(.el-textarea__inner) {
        box-shadow: none;
        border: none;
        resize: none;
        margin-bottom: 6px;
        color: var(--font-color);
        background-color: var(--back-color-h2);
    }

    :deep(.el-upload) {
        width: 68px;
        height: 68px;
    }

    :deep(.el-upload-list__item) {
        width: 68px;
        height: 68px;
    }

    .icon-button-box {
        display: flex;
        flex-direction: row;
        height: 20px;
        cursor: pointer;
    }

    .upload-image {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        flex-wrap: wrap;

        .imgItemBox {
            width: 68px;
            height: 68px;
            position: relative;
            margin-right: 10px;
            object-fit: cover;

            .imgAction {
                width: 100%;
                height: 100%;
                position: absolute;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.4);
                border-radius: 6px;
                border: 1px solid #e6e6e6;
            }

            img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
                border: 1px solid #e6e6e6;
                object-fit: cover;
            }
        }

        .upload-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 68px;
            height: 68px;
            border-radius: 6px;
            object-fit: cover;
            background-color: #fbfdff;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
        }

        .upload-button:hover {
            border-color: #409EFF;
            color: #409EFF;
        }
    }

    :deep(.el-upload:focus) {
        border-color: #9d9d9d;
        color: #9d9d9d;
    }

    .button {
        position: absolute;
        font-size: 12px;
        padding: 9px 15px;
        border-radius: 3px;
        cursor: pointer;
    }

    .cancel {
        right: 70px;
        bottom: 5px;
        color: #fff;
        background: #fab6b6;
        border-color: #fab6b6;
    }

    .send {
        right: 6px;
        bottom: 5px;
        color: #fff;
    }

    .unsend-bgc {
        background: #aaddc6;
        border-color: #aaddc6;
    }

    .send-bgc {
        background: #55bb8e;
        border-color: #55bb8e;
    }

}
</style>
