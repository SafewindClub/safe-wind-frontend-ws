// 首页全局状态
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useHomeStore = defineStore('home', ()=>{
    // 头部高度
    const headerHeight = ref(100)

    return { headerHeight }
})
