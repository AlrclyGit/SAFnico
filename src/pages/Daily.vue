<script setup>

let text = "XA 系列的入门对新手足够用的，14-55 的套头对我用处不大，自己配了一个几百块钱的国产 35mm f1.2 的手动定焦大光圈，只要不抓拍孩子，平时拍人像、拍静物、扫街，完全足够，景深也很给力！而且富士的直出色彩很棒，完全不用后期再调色。#摄像 "


const urlRE = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
let url = text.split(urlRE)
if (url.length > 1) {
    let urlShow = url[2].split('//')[1]
    let rulLabel = `<a href="${url[1]}">${urlShow}</a>`
    text = text.replace(urlRE, rulLabel)
}
const tagRE = /#[^\s]*/g
text = text.replace(tagRE, `<span>$&<\span>`)
console.log(text)

</script>



<template></template>

<style>
</style>
