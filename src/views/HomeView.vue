<template>
    <tiny-container pattern="classic">
      <template #header>
        <HeaderView />
      </template>
        <Banner
            title="海风学社"
            description="致力于推动科技创新和技术交流的学生组织"
        /><!-- 此处根据需要可以更改标题，背景，描述 -->
      <template #footer>
        <FooterView />
      </template>
    </tiny-container>
</template>

<script setup lang="ts">
import HeaderView from '@/components/HeaderView/HeaderView.vue'
import FooterView from '@/components/FooterView/FooterView.vue'
import Banner from "@/components/Banner.vue";
import { useHomeStore } from '@/stores/home'
import {TinyContainer} from "@opentiny/vue";

const homeStore = useHomeStore()

</script>

<style scoped>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
</style>