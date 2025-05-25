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
import HeaderView from '@/layout/HeaderView.vue'
import FooterView from '@/layout/FooterView.vue'
import MainView from '@/layout/MainView.vue'
import { useHomeStore } from '@/stores/home'

const homeStore = useHomeStore()
</script>

<style scoped>

</style>