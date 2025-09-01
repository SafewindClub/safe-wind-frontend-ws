<template>
  <section class="campus-news">
    <div class="section-header">
      <div class="section-title">
        <div class="events-label">NEWS</div>
        <div class="chinese-title">海风新闻</div>
      </div>
      <div class="header-right">
        <div class="nav-buttons">
          <button
              class="nav-button"
              :class="{ disabled: isAtStart }"
              @click="scrollBy(-370)"
          >
            <i class="fas fa-chevron-left"><</i>
          </button>
          <button
              class="nav-button"
              :class="{ disabled: isAtEnd }"
              @click="scrollBy(370)"
          >
            <i class="fas fa-chevron-right">></i>
          </button>
        </div>
      </div>
    </div>

    <p class="events-description">
      大师讲座、学术论坛、文体活动、演出展览......海风学社365天精彩活动，邀您共见。
    </p>

    <div class="scroll-wrapper">
      <div class="scroll-container" ref="scrollContainerRef">
        <div class="events-list">
          <div
              v-for="news in newsList"
              :key="news.id"
              class="event-card"
              @click="handleNewsClick(news)"
          >
            <div class="event-image">
              <img :src="news.coverImg" :alt="news.title" />
              <div class="event-badge" v-if="news.isLink === '1'">
                {{ '外链' }}
              </div>
            </div>
            <div class="event-content">
              <div class="event-type">{{ news.type || '新闻' }}</div>
              <h3 class="event-title">{{ news.title }}</h3>
              <div class="event-details">
                <div class="event-date">
                  <i class="far fa-calendar-alt"></i>
                  {{ formatDate(news.publishTime) }}
                </div>
                <div class="event-location">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ news.location || '海风学社' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination-dots">
      <div
          v-for="(dot, index) in dots"
          :key="index"
          class="dot"
          :class="{ active: currentDot === index }"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useResponsive } from '@/composables/useResponsive';
import { getLatestNewsApi } from '@/api/news';

const router = useRouter();
const { isMobile, isTablet, isDesktop } = useResponsive();

const newsList = ref([]);
const scrollContainerRef = ref(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);
const currentDot = ref(0);

const getLatestNews = async () => {
  const res = await getLatestNewsApi({ limit: 5 });
  if (res.success) {
    console.log("新闻列表", res.data);
    newsList.value = res.data;
  }
};

// 处理新闻点击事件
const handleNewsClick = (news) => {
  if (news.isLink === '1') {
    window.open(news.externalLink, '_blank');
  } else {
    router.push(`/news/${news.id}`);
  }
};

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// 滚动指定距离
const scrollBy = (distance) => {
  scrollContainerRef.value.scrollBy({
    left: distance,
    behavior: 'smooth'
  });
};

// 更新滚动状态
const updateScrollStatus = () => {
  const container = scrollContainerRef.value;
  if (!container) return;

  const scrollLeft = container.scrollLeft;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  isAtStart.value = scrollLeft <= 10;
  isAtEnd.value = scrollLeft >= maxScrollLeft - 10;

  // 更新当前指示点
  const cardWidth = 350; // 假设每个卡片宽度为350px
  const gap = 20; // 卡片间距
  const visibleCards = Math.floor(container.clientWidth / (cardWidth + gap));
  currentDot.value = Math.floor(scrollLeft / ((cardWidth + gap) * visibleCards));
};

onMounted(async () => {
  await getLatestNews();

  if (scrollContainerRef.value) {
    scrollContainerRef.value.addEventListener('scroll', updateScrollStatus);
    updateScrollStatus();
    scrollContainerRef.value.style.webkitOverflowScrolling = 'touch';
  }
});

onBeforeUnmount(() => {
  if (scrollContainerRef.value) {
    scrollContainerRef.value.removeEventListener('scroll', updateScrollStatus);
  }
});

// 计算指示点数量
const dots = computed(() => {
  if (!scrollContainerRef.value || newsList.value.length === 0) return [];

  const container = scrollContainerRef.value;
  const cardWidth = 350; // 假设每个卡片宽度为350px
  const gap = 20; // 卡片间距
  const visibleCards = Math.floor(container.clientWidth / (cardWidth + gap));

  return new Array(Math.ceil(newsList.value.length / visibleCards)).fill(0);
});
</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

.campus-news {
  width: 85%;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;

  @include mobile {
    padding: 15px;
  }

  @include tablet {
    padding: 18px;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding: 0 10px;

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}

.section-title {
  display: flex;
  align-items: center;
}

.events-label {
  font-size: 16px;
  font-weight: 600;
  color: #1e88e5;
  margin-right: 12px;
  letter-spacing: 1px;

  @include mobile {
    font-size: 14px;
  }
}

.chinese-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;

  @include mobile {
    font-size: 20px;
  }

  @include tablet {
    font-size: 22px;
  }
}

.header-right {
  display: flex;
  align-items: center;

  @include mobile {
    width: 100%;
    justify-content: space-between;
  }
}

.view-more {
  font-size: 14px;
  color: #666;
  text-decoration: none;
  margin-right: 15px;
  transition: color 0.3s;

  &:hover {
    color: #1e88e5;
  }

  @include mobile {
    font-size: 13px;
  }
}

.nav-buttons {
  display: flex;
  gap: 10px;
}

.nav-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f5f5f5;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #1e88e5;
    color: white;
    border-color: #1e88e5;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: #f5f5f5;
      color: inherit;
      border-color: #eee;
    }
  }
}

.events-description {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
  padding: 0 10px;

  @include mobile {
    font-size: 14px;
    margin-bottom: 20px;
  }
}

/* 滚动容器包装器 */
.scroll-wrapper {
  overflow: hidden;
  position: relative;
}

.scroll-container {
  overflow-x: auto;
  padding-bottom: 20px;
  position: relative;
  width: calc(100% + 20px);
  margin-right: -20px;

  @include mobile {
    width: calc(100% + 10px);
    margin-right: -10px;
    padding-bottom: 15px;
  }
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.events-list {
  display: inline-flex;
  gap: 20px;
  padding-bottom: 10px;

  @include mobile {
    gap: 15px;
    padding-bottom: 8px;
  }
}

.event-card {
  width: 350px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  @include mobile {
    width: 280px;
    border-radius: 8px;
  }

  @include tablet {
    width: 320px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    @include mobile {
      transform: translateY(-3px);
    }
  }
}

.event-image {
  height: 200px;
  overflow: hidden;
  position: relative;

  @include mobile {
    height: 160px;
  }

  @include tablet {
    height: 180px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
}

.event-card:hover .event-image img {
  transform: scale(1.05);
}

.event-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.95);
  color: #1e88e5;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  backdrop-filter: blur(10px);

  @include mobile {
    top: 8px;
    right: 8px;
    padding: 3px 6px;
    font-size: 11px;
  }
}

.event-content {
  padding: 18px;

  @include mobile {
    padding: 15px;
  }
}

.event-type {
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;

  @include mobile {
    font-size: 13px;
  }
}

.event-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.4;
  height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @include mobile {
    font-size: 16px;
    height: 44px;
  }

  @include tablet {
    font-size: 17px;
  }
}

.event-details {
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
}

.event-date, .event-location {
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
  display: flex;
  align-items: center;

  @include mobile {
    font-size: 12px;
  }
}

.event-date i, .event-location i {
  margin-right: 6px;
  color: #999;
}

.pagination-dots {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  gap: 8px;

  @include mobile {
    margin-top: 15px;
  }
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
  cursor: pointer;
  transition: background 0.3s;

  &.active {
    background: #1e88e5;
    transform: scale(1.2);
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .campus-news {
    padding: 10px;
  }

  .event-card {
    width: 260px;
  }

  .event-image {
    height: 140px;
  }

  .event-content {
    padding: 12px;
  }

  .event-title {
    font-size: 15px;
  }
}

/* 横屏手机优化 */
@media (max-width: 768px) and (orientation: landscape) {
  .campus-news {
    padding: 12px;
  }

  .event-image {
    height: 120px;
  }

  .event-content {
    padding: 12px;
  }
}
</style>