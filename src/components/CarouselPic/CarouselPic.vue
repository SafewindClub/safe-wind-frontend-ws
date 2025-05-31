<template>
  <tiny-carousel :autoplay="true" :interval="3000" height="600px">
    <tiny-carousel-item v-for="(img, index) in images" :key="index">
      <img :src="img.url" :alt="img.alt" class="carousel-img">
    </tiny-carousel-item>
  </tiny-carousel>
</template>


<script setup>
import { Carousel as TinyCarousel, CarouselItem as TinyCarouselItem } from '@opentiny/vue'
import { ref } from "vue";

const images = ref([
  { url: '/images/back.jpg', alt: '图片1' },
  { url: '/images/back1.jpg', alt: '图片2' },
  { url: '/images/back2.jpg', alt: '图片3' }
])
/* 暂时布局，正在考虑便携更换 */
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>