<template>
  <section class="container">
    <h2>{{ title }}</h2>
      <div class="dept-list">
        <div
            v-for="(dept, index) in departments"
            :key="index"
            class="dept-item"
        >
          <img :src="dept.imageUrl" :alt="dept.name">
          <h3>{{ dept.name }}</h3>
          <p>{{ dept.description }}</p>
        </div>
      </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: '部门介绍'
  },
  departments: {
    type: Array,
    default: () => [
      {
        name: '软件部',
        imageUrl: 'https://picsum.photos/400/200?random=10',
        description: '负责各类软件系统的设计与开发，包括Web应用、移动应用和桌面应用等，掌握多种主流技术栈，注重代码质量与开发效率。'
      },
      {
        name: '维修部',
        imageUrl: 'https://picsum.photos/400/200?random=11',
        description: '负责社团设备的维护与修理，确保设备正常运行，为社团活动提供技术支持。'
      },
      {
        name: '设计部',
        imageUrl: 'https://picsum.photos/400/200?random=12',
        description: '负责社团宣传物料的设计与制作，包括海报、宣传册、PPT等，注重美观与实用，提升社团形象。'
      },
      {
        name: '新媒体部',
        imageUrl: 'https://picsum.photos/400/200?random=13',
        description: '负责社团在社交媒体平台上的运营与维护，包括微信公众号、微博、抖音等，通过内容创作与互动，扩大社团影响力。'
      },
      {
        name: '网络部',
        imageUrl: 'https://picsum.photos/400/200?random=14',
        description: '负责教授与网络有关的内容，包括社团网络设施的搭建与维护，服务器、网络设备等，保障社团活动的顺利进行。'
      },
      {
        name:'人工智能部',
        imageUrl: 'https://picsum.photos/400/200?random=15',
        description: '负责教授与人工智能有关的内容，包括机器学习、深度学习、自然语言处理等，培养成员在人工智能领域的技能。'
      },
      {
        name:'移动开发部',
        imageUrl: 'https://picsum.photos/400/200?random=16',
        description: '负责教授与移动开发有关的内容，包括iOS、Android、跨平台开发等，培养成员在移动开发领域的技能。'
      }
    ]
  }
});
</script>

<style scoped>
.container {
  width: 95%;
  margin: 40px auto;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

.dept-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.dept-item {
  min-width: 300px;
  max-width: 380px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.dept-item:hover {
  transform: translateY(-5px);
}

.dept-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.dept-item h3 {
  padding: 15px 15px 5px;
  margin: 0;
  font-size: 18px;
  color: #333;
}

.dept-item p {
  padding: 0 15px 15px;
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>