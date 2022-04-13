<script setup>
// 引入
import { ref, defineEmits, defineProps, computed } from 'vue'
import { PictureFilled, Plus } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import axios from 'axios'
import ShowImage from '../components/ShowImage.vue'
// 对象
let store = useStore() // Vuex 对象
const textareaaValue = ref('') // 输入框的值
const showImageRef = ref(null) // 图片秀的 Dom
// 计算属性：当文本发生改变的时，设置按钮样式
const SendClass = computed(() => {
    if (textareaaValue.value == '') {
        return 'unsend'
    } else {
        return 'send'
    }
})
// 方法：当点击发送按钮时，提示为空，或者发送给服务器
function send() {
    if (textareaaValue.value === '') {
        ElMessageBox.alert('你还没有输入任何内容呢，小淘气～', '提示', {
            confirmButtonText: 'OK',
        })
    } else {
        // 从图片数组里循环出需要的数据
        let imgIdArray = [];
        fileList.value.forEach(element => {
            imgIdArray.push(element.response.data.id)
        });
        // 拼接需要发送的 Data 数据
        let data = {
            'textareaa_value': textareaaValue.value,
            'img_id_array': imgIdArray
        }
        // 请求 API
        axios({
            method: 'POST',
            url: 'https://flow.alrcly.com/api/setPost',
            data: data
        }).then((result) => {
            // 将数据更新到列表
            store.commit('listUnshift', result.data.data)
            // 恢复默认状态
            textareaaValue.value = ''
            fileList.value = []
            showImageTag.value = 'none'
        })
    }
}
// 图片上传
const showImageTag = ref('none') // 决定图片区域是否显示，默认不显示
const fileList = ref([]) //存放图片的数组
// 当图片的 icon 被点击
function clickImageIcon() {
    showImageTag.value = 'flex' //显示图片区域
}
// 当删除时
function handleRemove(uploadFile) {
    // console.log(uploadFile.response.data.id)
    console.log('通知服务器删除相片')
}
// 当点击图片时
function handlePictureCardPreview(uploadFile) {
    // 调用「秀图片」控件的方法
    showImageRef.value.clickImg(uploadFile.url)
}
</script>

<template>
    <div class="input-text-box">
        <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="textareaaValue" />

        <div class="upload-image" :style="`display: ${showImageTag}`">
            <el-upload action="https://flow.alrcly.com/api/updateImage" list-type="picture-card" name="file"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <ShowImage ref="showImageRef"></ShowImage>
        </div>

        <div class="icon-button-box">
            <el-icon :size="20" color="#9D9D9D" @click="clickImageIcon">
                <picture-filled />
            </el-icon>
        </div>
        <div class="big-button" :class="SendClass" @click="send">发送</div>
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
    }

    .upload-image {
        margin-bottom: 10px;
    }

    :deep(.el-upload:focus) {
        border-color: #9d9d9d;
        color: #9d9d9d;
    }

    .big-button {
        position: absolute;
        right: 6px;
        bottom: 5px;
        color: #fff;
        font-size: 12px;
        padding: 9px 15px;
        border-radius: 3px;
    }

    .unsend {
        background: #aaddc6;
        border-color: #aaddc6;
    }

    .send {
        background: #55bb8e;
        border-color: #55bb8e;
    }
}
</style>
