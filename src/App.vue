<script setup>
let token = JSON.parse(localStorage.getItem('token') || null)
if (!token) {
    let token = prompt('请速入 token')
    localStorage.setItem('token', JSON.stringify(token))
}
</script>

<template>
    <router-view></router-view>
</template>

<style>
:root {
    --main-color: #55bb8e;
    --back-color: #FAFAFA;
    --back-color-h2: #FFFFFF;
    --font-color: #323232;
    --font-color-h2: #9d9d9d;
    --tag-color: #5783f7;
    --tag-back: #eef3fe;
    --list-shadow: #DDDDDD;
    --honor-wall: #efefef;
}

@media (prefers-color-scheme:dark) {
    :root {
        --main-color: #395345;
        --back-color: #171514;
        --back-color-h2: #232222;
        --font-color: #9d9d9d;
        --font-color-h2: #7F7F7F;
        --tag-color: #000000;
        --tag-back: #6f7174;
        --list-shadow: #000000;
        --honor-wall: #3d3d3d;
    }
}

body {
    font-family: sans-serif;
    padding: 0;
    margin: 0;
}
</style>
