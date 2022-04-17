<script setup>
import { ref, defineExpose } from 'vue'
const dialogImageUrl = ref('') // 弹窗里的图片地址
const dialogVisible = ref(false) // 弹窗是否显示
// 接收外部数据
function clickImg(url) {
    dialogImageUrl.value = url
    dialogVisible.value = true
}
// 弹窗随图片大小改变
const imageWidth = ref(0)
// 图片加载完毕
function imageLoad(e) {
    const img = e.target;
    let width = 0;
    if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
        width = img.width > 1024 ? 1064 : img.width
    }
    imageWidth.value = width + 'px';
}
// 将私有属性暴露给外部
defineExpose({ clickImg }) 
</script>

<template>
    <el-dialog v-model="dialogVisible" :width="imageWidth">
        <el-image :src="dialogImageUrl" widht="100%" @load="imageLoad" />
    </el-dialog>
</template>

<style>
</style>
