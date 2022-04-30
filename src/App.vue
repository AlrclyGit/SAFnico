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
body {
    padding: 0;
    margin: 0;
    overflow: hidden;
}
</style>
