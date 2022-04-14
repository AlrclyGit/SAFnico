<script setup>
// 引入
import { ref, computed } from 'vue'
import { PictureFilled, Plus } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import axios from 'axios'
import ShowImage from '../components/ShowImage.vue'

// 对象
let store = useStore() // Vuex 对象
let postID = -1 // 更新文章 ID
const apiState = ref(true)  // 请求状态
const textareaaValue = ref('') // 输入框的值
const isUpdate = ref(false) // 是否是更新需求
// 计算属性：当文本发生改变的时，设置按钮样式
const sendBgc = computed(() => {
    if (textareaaValue.value == '') {
        return 'unsend-bgc'
    } else {
        return 'send-bgc'
    }
})
// 方法：当点击发送按钮时，提示为空，或者发送给服务器
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
        fileList.value.forEach(element => {
            imgIdArray.push(element.id)
        });
        // 拼接需要发送的 Data 数据
        let data = {
            'textareaa_value': textareaaValue.value,
            'img_id_array': imgIdArray
        }
        // 根据请求构建
        if (isUpdate.value === true) {
            data.id = postID
            // 请求 API
            axios({
                method: 'POST',
                url: 'https://flow.alrcly.com/api/updataPost',
                data: data
            }).then((result) => {
                console.log(result.data.data)
                store.commit('listUpdata', result.data.data)
                // 恢复默认状态
                cancel()
            })
        } else {
            console.log(data)
            console.log(fileList.value)
            // 请求 API
            axios({
                method: 'POST',
                url: 'https://flow.alrcly.com/api/setPost',
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
    fileList.value = []
    showImageTag.value = false
    isUpdate.value = false
    apiState.value = true
}
/**
 * 图片上传
 */
const showImageTag = ref(false) // 决定图片区域是否显示，默认不显示
const showImageRef = ref(null) // 图片秀的 Dom
const fileList = ref([]) //存放图片的数组
// 当图片的 icon 被点击
function clickImageIcon() {
    showImageTag.value = true //显示图片上传区域
}
// 当删除时
function onRemove(e) {
    // console.log(e.response.data.id)
    console.log('通知服务器删除相片')
}
// 当点击图片时
function onPreview(data) {
    // 调用「秀图片」控件的方法
    showImageRef.value.clickImg(data.url)
}
// 
function onSuccess(data) {
    console.log(data)
}
/**
 * 外部数据
 */
function externalData(post) {
    postID = post.id
    textareaaValue.value = post.post_text
    fileList.value = post.img
    if (post.img.length != 0) {
        showImageTag.value = true
    } else {
        showImageTag.value = false
    }
    isUpdate.value = true
}
// 将私有属性暴露给外部
defineExpose({ externalData })
</script>

<template>
    <div class="input-text-box" v-loading="!apiState">
        <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="textareaaValue" />
        <div class="upload-image" v-if="showImageTag">
            <img v-for="item in fileList" :src="item.url">
            <ShowImage ref="showImageRef"></ShowImage>
        </div>
        <div class="icon-button-box">
            <el-icon :size="20" color="#9D9D9D" @click="clickImageIcon">
                <picture-filled />
            </el-icon>
        </div>
        <div class="button cancel" @click="cancel" v-if="isUpdate">取消</div>
        <div class="button send" :class="sendBgc" @click="send">发送</div>
    </div>
</template>

<style scoped lang="less">
.input-text-box {
    position: relative;
    border: 2px solid #e8e8e8;
    border-radius: 8px;
    background: #fff;
    margin-top: 10px;
    padding: 10px;

    :deep(.el-textarea__inner) {
        box-shadow: none;
        border: none;
        resize: none;
        margin-bottom: 6px;
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
        margin-bottom: 10px;

        img {
            width: 100px;
            height: 100px;
            border-radius: 6px;
            border: 1px solid #e6e6e6;
            object-fit: cover;
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
