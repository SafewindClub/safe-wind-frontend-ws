<template>
    <tiny-container pattern="classic" :header-height="homeStore.headerHeight">
      <template #header>
        <HeaderView />
      </template>
        <MainView />
      <template #footer>
        <FooterView />
      </template>
    </tiny-container>
</template>

<script setup lang="ts">
import HeaderView from '@/components/HeaderView/HeaderView.vue'
import FooterView from '@/components/FooterView/FooterView.vue'
import MainView from '@/layout/MainView.vue'
import { useHomeStore } from '@/stores/home'
import {TinyContainer} from "@opentiny/vue";

const homeStore = useHomeStore()

</script>

<style scoped>

</style>