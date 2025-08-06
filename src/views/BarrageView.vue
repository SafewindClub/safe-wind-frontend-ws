<template>
  <tiny-container pattern="classic" footer-height="0">
    <template #header>
      <HeaderView />
    </template>
    <template #default class="main-content">
      <Barrage />
      <FooterView />
    </template>
  </tiny-container>
</template>

<script setup lang="ts">
  import HeaderView from '@/components/HeaderView/HeaderView.vue'
  import Barrage from '@/components/Barrage.vue'
  import FooterView from "@/components/FooterView/FooterView.vue";
</script>

<style scoped>

</style>
