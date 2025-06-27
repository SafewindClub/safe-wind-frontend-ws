<template>
    <div class="banner" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="banner-content">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
    </div>
</template>

<script setup>
    defineProps({
      backgroundImage: {
        type: String,
        default: 'https://picsum.photos/1200/400'
      },
      title: {
        type: String,
        default: '探索科技的无限可能'
      },
      description: {
        type: String,
        default: '加入我们，一起开启创新之旅'
      }
    });
</script>

<style scoped>
    .banner {
      width: 100%;
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      text-align: center;
      position: relative;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .banner-content {
      width: 100%;
      padding: 0 20px;
    }

    .banner-content h1 {
      font-size: 28px;
      margin-bottom: 10px;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    .banner-content p {
      font-size: 16px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
</style>