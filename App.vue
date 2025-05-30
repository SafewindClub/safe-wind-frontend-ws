<template>
<!--  默认主页，后续如果需要再进行修改  -->
  <tiny-container :pattern="pattern">
    <template #header>
      <Header/>
    </template>
    <template #default >
      <CarouselPic  />
    </template>
    <template #footer>
      <Footer/>
    </template>
  </tiny-container>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/header/Header.vue'
import Footer from './components/footer/Footer.vue'
import CarouselPic from './components/carouselpic/CarouselPic.vue'
import {TinyContainer} from "@opentiny/vue";

const pattern = ref('classic')
</script>

<style scoped>

</style>