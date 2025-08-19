<template>
  <section class="container">
    <h2 class="responsive-title">{{ title }}</h2>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>
    
    <!-- 活动列表 -->
    <div v-else-if="activities.length > 0">
      <!-- 滚动控制按钮 -->
      <button 
        class="scroll-btn scroll-left" 
        @click="scrollBy(-370)" 
        :class="{ 'hidden': isAtStart }"
        aria-label="向左滚动查看更多活动"
        v-if="!isMobile"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <button 
        class="scroll-btn scroll-right" 
        @click="scrollBy(370)" 
        :class="{ 'hidden': isAtEnd }"
        aria-label="向右滚动查看更多活动"
        v-if="!isMobile"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
      
      <div class="scroll-wrapper">
        <div class="scroll-container" ref="scrollContainerRef">
          <div class="activity-list">
            <div 
              v-for="activity in activities" 
              :key="activity.id || index" 
              class="activity-item"
              @click="handleActivityClick(activity)"
            >
              <div class="activity-img">
                <img :src="activity.picture" :alt="activity.title" />
                <div class="activity-badge" v-if="activity.isLink === '1'">
                  {{ isMobile ? '外链' : '外部链接' }}
                </div>
              </div>
              <div class="activity-content">
                <h3>{{ activity.title }}</h3>
                <p class="activity-date">{{ formatDate(activity.startTime) }}</p>
                <p class="activity-desc">{{ truncateContent(activity.brief, isMobile ? 30 : 50) }}</p>
                <div class="activity-link">
                  {{ activity.isLink === '1' ? (isMobile ? '查看' : '查看原文') : (isMobile ? '详情' : '查看详情') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 空状态 -->
    <div v-else class="empty-state">
      <p>暂无活动数据</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useResponsive } from '@/composables/useResponsive'
import { getRecentActivitiesApi } from '@/api/activity'

const { isMobile, isTablet, isDesktop } = useResponsive();

// 定义 props
const props = defineProps({
  title: {
    type: String,
    default: "近期活动",
  },
})

// 定义 emits
const emit = defineEmits(['view-details'])

// 获取 router 实例
const router = useRouter()

// 响应式数据
const scrollContainerRef = ref(null)
const isAtStart = ref(true)
const isAtEnd = ref(false)
const loading = ref(false)
const activities = ref([])

// 获取活动数据
const fetchActivities = async () => {
  loading.value = true;
  try {
    const res = await getRecentActivitiesApi();
    if (res.success) {
      activities.value = res.data;
    } else {
      console.error('获取活动数据失败:', res.message);
    }
  } catch (error) {
    console.error('获取活动数据失败:', error);
  } finally {
    loading.value = false;
  }
}

// 处理活动点击
const handleActivityClick = (activity) => {
  if (activity.isLink === '1') {
    // 跳转到外链
    window.open(activity.externalLink, '_blank');
  } else {
    // 跳转到活动详情页
    router.push(`/activity/${activity.id}`);
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

const truncateContent = (content, maxLength) => {
  if (!content) return ''
  if (content.length <= maxLength) return content
  return content.slice(0, maxLength) + '...'
}

// 滚动指定距离
const scrollBy = (distance) => {
  scrollContainerRef.value.scrollBy({
    left: distance,
    behavior: 'smooth'
  })
}

// 更新滚动状态
const updateScrollStatus = () => {
  const container = scrollContainerRef.value
  if (!container) return
  
  const scrollLeft = container.scrollLeft
  const maxScrollLeft = container.scrollWidth - container.clientWidth
  
  isAtStart.value = scrollLeft <= 10
  isAtEnd.value = scrollLeft >= maxScrollLeft - 10
  
  if (isAtStart.value) {
    container.classList.add('start-visible')
  } else {
    container.classList.remove('start-visible')
  }
  
  if (isAtEnd.value) {
    container.classList.add('end-visible')
  } else {
    container.classList.remove('end-visible')
  }
}

// 生命周期钩子
onMounted(async () => {
  // 获取活动数据
  await fetchActivities();
  
  // 监听滚动事件
  if (scrollContainerRef.value) {
    scrollContainerRef.value.addEventListener('scroll', updateScrollStatus)
    updateScrollStatus()
    scrollContainerRef.value.style.webkitOverflowScrolling = 'touch'
  }
})

onBeforeUnmount(() => {
  if (scrollContainerRef.value) {
    scrollContainerRef.value.removeEventListener('scroll', updateScrollStatus)
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  
  @include mobile {
    padding: 15px;
  }
  
  @include tablet {
    padding: 18px;
  }
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
  
  @include mobile {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  @include tablet {
    font-size: 22px;
    margin-bottom: 25px;
  }
}

.loading {
  text-align: center;
  padding: 60px 0;
  color: #666;
  
  @include mobile {
    padding: 40px 0;
  }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4facfe;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
  
  @include mobile {
    width: 32px;
    height: 32px;
    border-width: 3px;
    margin-bottom: 15px;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #666;
  
  @include mobile {
    padding: 40px 0;
  }
}

/* 滚动按钮样式 */
.scroll-btn {
  position: absolute;
  top: 50%;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #eee;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  color: #666;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  transform: translateY(-50%);
  
  @include mobile {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  &:hover {
    background: white;
    color: #4facfe;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) scale(1.05);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.98);
  }
}

.scroll-left {
  left: -10px;
  
  @include mobile {
    left: -5px;
  }
}

.scroll-right {
  right: -10px;
  
  @include mobile {
    right: -5px;
  }
}

.hidden {
  opacity: 0;
  pointer-events: none;
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

.scroll-container::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(to right, #fff, transparent);
  z-index: 5;
  pointer-events: none;
  transition: opacity 0.3s ease;
  
  @include mobile {
    width: 30px;
  }
}

.scroll-container::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(to left, #fff, transparent);
  z-index: 5;
  pointer-events: none;
  transition: opacity 0.3s ease;
  
  @include mobile {
    width: 30px;
  }
}

.scroll-container.start-visible::before {
  opacity: 0;
}

.scroll-container.end-visible::after {
  opacity: 0;
}

.activity-list {
  display: inline-flex;
  gap: 20px;
  padding-bottom: 10px;
  
  @include mobile {
    gap: 15px;
    padding-bottom: 8px;
  }
}

.activity-item {
  width: 350px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  white-space: normal;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  
  @include mobile {
    width: 280px;
    border-radius: 6px;
  }
  
  @include tablet {
    width: 320px;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    
    @include mobile {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
}

.activity-img {
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
    transition: transform 0.3s ease;
  }
}

.activity-item:hover .activity-img img {
  transform: scale(1.05);
  
  @include mobile {
    transform: scale(1.03);
  }
}

.activity-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.95);
  color: #4facfe;
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
    border-radius: 3px;
  }
}

.activity-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  @include mobile {
    padding: 15px;
  }
  
  @include tablet {
    padding: 18px;
  }
}

.activity-item h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
  
  @include mobile {
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  @include tablet {
    font-size: 17px;
  }
}

.activity-date {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
  
  @include mobile {
    font-size: 11px;
    margin-bottom: 8px;
  }
}

.activity-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  flex: 1;
  
  @include mobile {
    font-size: 13px;
    margin-bottom: 12px;
    line-height: 1.5;
  }
}

.activity-link {
  font-size: 14px;
  color: #4facfe;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  
  @include mobile {
    font-size: 13px;
  }
  
  &:hover {
    text-decoration: underline;
  }
}

/* 针对超小屏幕的特殊优化 */
@media (max-width: 480px) {
  .container {
    padding: 10px;
  }
  
  .activity-item {
    width: 260px;
  }
  
  .activity-img {
    height: 140px;
  }
  
  .activity-content {
    padding: 12px;
  }
  
  .activity-item h3 {
    font-size: 15px;
  }
}

/* 横屏手机优化 */
@media (max-width: 768px) and (orientation: landscape) {
  .container {
    padding: 12px;
  }
  
  .activity-img {
    height: 120px;
  }
  
  .activity-content {
    padding: 12px;
  }
}
</style>
    
    