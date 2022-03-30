<script setup>
//
import { reactive } from 'vue'
let props = defineProps({
    value: Array,
})
//

const data = reactive(props.value)
const result = reactive([]);
for (let i = 0, len = data.length; i < len;) {
    result.push(data.slice(i, i + 7));
    i += 7
}

</script>

<template>
    <div class="honor-wall-box">
        <div v-for="blockList in result" class="honor-wall-li">
            <div v-for="item in blockList" :class="'honor-wall-block ' + 'color' + item"></div>
        </div>
    </div>
</template>

<style lang="less">
.honor-wall-box {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}
.honor-wall-li {
    display: flex;
    flex-direction: column-reverse;
}
.honor-wall-block {
    width: 12px;
    height: 12px;
    background: #efefef;
    color: #d3ecdd;
    border: 1px solid transparent;
    border-radius: 2px;
    margin-bottom: 4px;
    cursor: pointer;
}

.color1 {
    background: #d3ecdd;
}

.color2 {
    background: #9be9a8;
}

.color3 {
    background: #40c463;
}

.color4 {
    background: #30a14e;
}

.color5 {
    background: #216e39;
}
</style>