<script setup>
import { ref, watch } from 'vue'
const dialogVisible = ref(false) // 弹窗是否显示
let props = defineProps({ imageData: Number }) // 接收父组件变量
// 接收外部数据
watch(() => props.imageData, () => {
    dialogVisible.value = true
})
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
</script>

<template>
    <el-dialog v-model="dialogVisible" :width="imageWidth">
        <el-image :src="props.imageData" widht="100%" @load="imageLoad" />
    </el-dialog>
</template>

<style>
</style>
