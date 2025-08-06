<template>
  <section class="container">
    <h2>新闻动态</h2>
    <div class="scroll-container">
      <div class="news-list">
        <div
            v-for="news in newsList"
            :key="news.id"
            class="news-item"
        >
          <div class="news-img">
            <img :src="news.coverImg" :alt="news.title" />
          </div>
          <div class="news-content">
            <div class="news-date">{{ formatDate(news.publishTime) }}</div>
            <div class="news-title">{{ news.title }}</div>
            <div class="news-desc">{{ truncateContent(news.content) }}</div>
            <a href="#" class="news-link">阅读全文</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const newsList = ref([
  {
    "id": 56,
    "title": "客机进入嗯嗯实际上哇哦",
    "publishTime": "2025-07-08 23:17:46",
    "content": "sed",
    "htmlContent": "irure aliquip minim",
    "coverImg": "https://picsum.photos/600/400?random=7"
  },
  // 可以添加更多新闻数据
  {
    "id": 57,
    "title": "社团招新活动圆满结束",
    "publishTime": "2024-03-10 00:00:00",
    "content": "海风学社于3月5日至8日成功举办了新学期招新活动...",
    "htmlContent": "<p>海风学社于3月5日至8日成功举办了新学期招新活动...</p>",
    "coverImg": "https://picsum.photos/600/400?random=20"
  },
  {
    "id": 58,
    "title": "我校代表队在全国AI竞赛中获奖",
    "publishTime": "2024-02-25 00:00:00",
    "content": "由海风学社成员组成的我校代表队在第十届全国大学生人工智能竞赛中表现出色...",
    "htmlContent": "<p>由海风学社成员组成的我校代表队在第十届全国大学生人工智能竞赛中表现出色...</p>",
    "coverImg": "https://picsum.photos/600/400?random=21"
  }
]);

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// 截断内容
const truncateContent = (content) => {
  return content.length > 50 ? content.substring(0, 50) + '...' : content;
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.scroll-container {
  overflow-x: auto;
  padding-bottom: 20px;
}

.news-list {
  display: inline-flex;
  gap: 20px;
}

.news-item {
  width: 350px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  white-space: normal;
}

.news-img {
  height: 200px;
  overflow: hidden;
}

.news-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-item:hover .news-img img {
  transform: scale(1.05);
}

.news-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-date {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}

.news-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.news-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  flex: 1;
}

.news-link {
  font-size: 14px;
  color: #0066cc;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.news-link:hover {
  text-decoration: underline;
}
</style>