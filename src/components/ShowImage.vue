<script setup>
import { ref, watch } from 'vue'
let props = defineProps({
    url: String,
    state: Number
})
// 监听数据变化
watch(() => props.state, () => {
    dialogVisible.value = true
})
// 弹窗是否显示
const dialogVisible = ref(false)
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
    <div>
        <el-dialog v-model="dialogVisible" :width="imageWidth">
            <el-image :src="props.url" widht="100%" @load="imageLoad" />
        </el-dialog>
    </div>
</template>

<style>
</style>
