<template>
  <section class="haida-news-container">
    <h2 class="news-title">{{ title }}</h2>
    <div class="news-content-wrapper">
      <div class="news-scroller" ref="scroller">
        <div
            v-for="(activity, index) in visibleActivities"
            :key="activity.id"
            class="news-item"
            @mouseenter="setActiveIndex(index)"
            :class="{ 'active': activeIndex === index }"
            @click="handleActivityClick(activity)"
        >
          <h3>{{ activity.title }}</h3>
          <p class="news-date">{{ formatDate(activity.startTime) }}</p>
          <p class="news-desc">{{ truncateContent(activity.brief, 80) }}</p>
          <div class="news-link">
            {{ activity.isLink === '1' ? '查看原文' : '查看详情' }}
          </div>
          <div class="news-badge" v-if="activity.isLink === '1'">外链</div>
        </div>

        <button
            v-if="showLoadMore && !expanded"
            class="load-more-btn"
            @click="loadMore"
        >
          展开更多 ▼
        </button>

        <button
            v-if="expanded"
            class="collapse-btn"
            @click="collapse"
        >
          收起 ▲
        </button>
      </div>

      <!-- 右侧放大图片展示区 -->
      <div class="news-visual-expanded">
        <div class="visual-container" :class="{ 'expanded': expanded }">
          <div class="image-container">
            <img
                v-if="getImageUrl(currentActivity)"
                :src="getImageUrl(currentActivity)"
                :alt="currentActivity.title"
                class="enlarged-image"
            >
            <div v-else class="no-image-placeholder">
              <p>该活动没有图片</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRecentActivitiesApi } from '@/api/activity'

const props = defineProps({
  title: {
    type: String,
    default: "海风活动"
  }
})

const router = useRouter()
const activities = ref([])
const activeIndex = ref(0)
const loading = ref(false)
const visibleCount = ref(3)
const scroller = ref(null)
const expanded = ref(false)

// 获取活动数据
const fetchActivities = async () => {
  loading.value = true
  try {
    const res = await getRecentActivitiesApi()
    if (res.success) {
      activities.value = res.data.sort((a, b) =>
          new Date(b.startTime) - new Date(a.startTime)
      )
    }
  } finally {
    loading.value = false
  }
}

const visibleActivities = computed(() =>
    activities.value.slice(0, visibleCount.value)
)

const currentActivity = computed(() =>
    activities.value[activeIndex.value] || {}
)

const getImageUrl = (activity) => {
  if (!activity || !activity.picture) {
    return null ;
  }
  return activity.picture
}

const showLoadMore = computed(() =>
    activities.value.length > visibleCount.value
)

const setActiveIndex = (index) => {
  activeIndex.value = index
}

const handleActivityClick = (activity) => {
  if (activity.isLink === '1') {
    window.open(activity.externalLink || activity.link, '_blank')
  } else {
    router.push(`/activity/${activity.id}`)
  }
}

const loadMore = () => {
  visibleCount.value = activities.value.length
  expanded.value = true
}

const collapse = () => {
  visibleCount.value = 3
  expanded.value = false
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const truncateContent = (content, maxLength) => {
  if (!content) return ''
  return content.length <= maxLength ? content : content.slice(0, maxLength) + '...'
}

onMounted(() => {
  fetchActivities()
})
</script>

<style lang="scss" scoped>
.haida-news-container {
  width: 100%;
  padding: 30px;
  background: white;
  box-sizing: border-box;
  margin-bottom: 40px;
  transition: margin-bottom 0.3s ease;
}

.haida-news-container.expanded {
  margin-bottom: 120px;
}

.news-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;
  color: #2c3e50;
  position: relative;
  padding-bottom: 15px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #3498db;
    border-radius: 3px;
  }
}

.news-content-wrapper {
  display: grid;
  grid-template-columns: 35% 65%;
  gap: 30px;

}

.news-scroller {
  overflow-y: auto;
  padding-right: 15px;
  scrollbar-width: thin;
  scrollbar-color: #1a6dff #f0f4f8;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1a6dff;
    border-radius: 3px;
  }
}

.news-item {
  padding: 20px;
  margin-bottom: 15px;
  border-left: 3px solid transparent;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;

  &.active, &:hover {
    border-left-color: #1a6dff;
    background-color: #f5f9ff;

    .news-link {
      color: #1a6dff;
      text-decoration: underline;
    }
  }

  h3 {
    font-size: 18px;
    color: #222;
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .news-date {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }

  .news-desc {
    font-size: 14px;
    color: #555;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  .news-link {
    font-size: 14px;
    color: #666;
    transition: color 0.3s;
  }

  .news-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #1a6dff;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
}

.load-more-btn, .collapse-btn {
  width: 100%;
  padding: 12px;
  background: #f5f9ff;
  color: #1a6dff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 20px;
  transition: all 0.3s;
  font-size: 14px;

  &:hover {
    background: #1a6dff;
    color: white;
  }
}

.news-visual-expanded {
  position: relative;

  .visual-container {
    height: 90%;
    background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: height 0.3s ease;
    position: relative;
    border-radius: 12px;

    &.expanded {
      height: 95%;
    }

    .image-container {
      width: 80%;
      height: 0;
      padding-bottom: 60%;
      position: relative;
      overflow: hidden;
      z-index: 2;
      border-radius: 8px;
      box-shadow: 0 6px 16px rgba(26, 109, 255, 0.15);
      border: 1px solid rgba(26, 109, 255, 0.1);
    }

    .enlarged-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.3s ease;
    }

    &:hover .enlarged-image {
      transform: scale(1.03);
      box-shadow: 0 8px 25px rgba(26, 109, 255, 0.2);
    }
  }
}

.no-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  color: #6c757d;
  border-radius: 8px;
}

.no-image-placeholder p {
  font-size: 14px;
  margin: 0;
  text-align: center;
}

@media (max-width: 992px) {
  .news-visual-expanded {
    .visual-container {
      height: 350px;

      &.expanded {
        height: 450px;
      }

      .image-container {
        padding-bottom: 75%;
      }
    }
  }
}

@media (max-width: 768px) {
  .haida-news-container {
    padding: 20px;
    margin-bottom: 30px;
  }

  .haida-news-container.expanded {
    margin-bottom: 80px;
  }

  .news-title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .news-content-wrapper {
    display: block;
    gap: 0;
  }

  .news-visual-expanded {
    display: none !important;
  }

  .news-scroller {
    height: auto;
    overflow-y: visible;
  }

  .news-item {
    padding: 15px;
    margin-bottom: 12px;

    h3 {
      font-size: 16px;
      margin-bottom: 6px;
    }

    .news-date {
      font-size: 11px;
      margin-bottom: 8px;
    }

    .news-desc {
      font-size: 13px;
      margin-bottom: 10px;
      line-height: 1.5;
    }

    .news-link {
      font-size: 13px;
    }
  }

  .load-more-btn, .collapse-btn {
    padding: 10px;
    font-size: 13px;
    margin-top: 8px;
    margin-bottom: 15px;
  }
}

@media (max-width: 576px) {
  .haida-news-container {
    padding: 15px;
    margin-bottom: 20px;
  }

  .haida-news-container.expanded {
    margin-bottom: 60px;
  }

  .news-title {
    font-size: 22px;
    margin-bottom: 25px;
  }

  .news-item {
    padding: 12px;
    margin-bottom: 10px;

    h3 {
      font-size: 15px;
      margin-bottom: 5px;
    }

    .news-date {
      font-size: 10px;
      margin-bottom: 6px;
    }

    .news-desc {
      font-size: 12px;
      margin-bottom: 8px;
    }

    .news-link {
      font-size: 12px;
    }

    .news-badge {
      top: 12px;
      right: 12px;
      font-size: 11px;
      padding: 1px 6px;
    }
  }

  .load-more-btn, .collapse-btn {
    padding: 8px;
    font-size: 12px;
    margin-top: 6px;
    margin-bottom: 12px;
  }
}
</style>