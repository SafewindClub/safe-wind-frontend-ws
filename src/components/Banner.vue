<template>
  <div class="banner-container">
      <!-- 轮播主体 -->
      <div class="banner" 
           :style="{ 
              backgroundImage: `url(${currentImage})`,
              transition: 'background-image 1s ease-in-out'
           }">
          <!-- 渐进放大效果的遮罩层 -->
          <div class="zoom-overlay" :class="{ 'zooming': isZooming }"></div>
          
          <div class="banner-content">
              <h1>{{ currentTitle }}</h1>
              <p>{{ currentDescription }}</p>
          </div>
          
          <!-- 左右切换按钮 -->
          <button class="carousel-btn prev" @click="prevSlide" v-if="!isMobile">
              <i class="fas fa-chevron-left"></i>
          </button>
          <button class="carousel-btn next" @click="nextSlide" v-if="!isMobile">
              <i class="fas fa-chevron-right"></i>
          </button>
      </div>
      
      <!-- 轮播指示器 -->
      <div class="carousel-indicators">
          <button 
              v-for="(slide, index) in displaySlides" 
              :key="index"
              :class="{ 'active': currentIndex === index }"
              @click="goToSlide(index)"
              :aria-label="`切换到第 ${index + 1} 张幻灯片`">
          </button>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useResponsive } from '@/composables/useResponsive';
import { getAllBannersApi } from '@/api/banner';

const { isMobile, isTablet, isDesktop } = useResponsive();

// 轮播数据，可以通过props传入
const props = defineProps({
  slides: {
      type: Array,
      default: () => []
  },
  interval: {
      type: Number,
      default: 5000 // 轮播间隔时间，默认5秒
  },
  zoomDuration: {
      type: Number,
      default: 4500 // 放大动画持续时间，默认4.5秒
  }
});

// 轮播状态
const currentIndex = ref(0);
const isZooming = ref(true);
const banners = ref([]);
const loading = ref(false);
let timer = null;

// 计算显示的轮播数据
const displaySlides = computed(() => {
  if (banners.value.length > 0) {
    return banners.value.map(banner => ({
      image: banner.backgroundPicture,
      title: banner.title,
      description: banner.subTitle
    }));
  }
  return props.slides;
});

// 当前轮播项数据
const currentImage = computed(() => {
  return displaySlides.value[currentIndex.value]?.image || '';
});

const currentTitle = computed(() => {
  return displaySlides.value[currentIndex.value]?.title || '';
});

const currentDescription = computed(() => {
  return displaySlides.value[currentIndex.value]?.description || '';
});

// 获取横幅数据
const fetchBanners = async () => {
  loading.value = true;
  try {
    const res = await getAllBannersApi();
    if (res.success) {
      banners.value = res.data;
      console.log("横幅数据", res.data);
    } else {
      console.error('获取横幅数据失败:', res.message);
    }
  } catch (error) {
    console.error('获取横幅数据失败:', error);
  } finally {
    loading.value = false;
  }
};

// 切换到下一张
const nextSlide = () => {
  if (displaySlides.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % displaySlides.value.length;
  }
};

// 切换到上一张
const prevSlide = () => {
  if (displaySlides.value.length > 0) {
    currentIndex.value = (currentIndex.value - 1 + displaySlides.value.length) % displaySlides.value.length;
  }
};

// 跳转到指定幻灯片
const goToSlide = (index) => {
  if (index >= 0 && index < displaySlides.value.length) {
    currentIndex.value = index;
  }
};

// 启动轮播定时器
const startTimer = () => {
  stopTimer();
  if (displaySlides.value.length > 1) {
    timer = setInterval(nextSlide, props.interval);
  }
};

// 停止轮播定时器
const stopTimer = () => {
  if (timer) {
      clearInterval(timer);
      timer = null;
  }
};

// 监听当前索引变化，重置放大动画
watch(currentIndex, () => {
  // 重置放大动画
  isZooming.value = false;
  // 在下一帧重置动画状态以重新触发动画
  setTimeout(() => {
      isZooming.value = true;
  }, 50);
});

// 监听横幅数据变化
watch(banners, () => {
  if (banners.value.length > 0) {
    currentIndex.value = 0;
    startTimer();
  }
});

// 组件挂载时获取数据并启动轮播
onMounted(async () => {
  await fetchBanners();
  startTimer();
});

// 组件卸载时清理定时器
onUnmounted(() => {
  stopTimer();
});
</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

.banner-container {
  position: relative;
  width: 100%;
}

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
  overflow: hidden;
  
  @include mobile {
    height: 250px;
  }
  
  @include tablet {
    height: 350px;
  }
  
  @include desktop {
    height: 400px;
  }
}

/* 渐进放大效果层 */
.zoom-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform var(--zoom-duration) ease-in-out;
  transform: scale(1);
  z-index: 0;
}

/* 应用放大动画 */
.zooming {
  --zoom-duration: 4500ms; /* 默认放大动画持续时间 */
  transform: scale(1.1); /* 放大10% */
  
  @include mobile {
    transform: scale(1.05); /* 移动端减少放大效果 */
  }
}

/* 让内容显示在放大层上方 */
.banner-content {
  width: 100%;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  
  @include mobile {
    padding: 0 15px;
  }
}

.banner-content h1 {
  font-size: 28px;
  margin-bottom: 10px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  transition: opacity 1s ease-in-out;
  
  @include mobile {
    font-size: 22px;
    margin-bottom: 8px;
  }
  
  @include tablet {
    font-size: 32px;
  }
  
  @include desktop {
    font-size: 42px;
  }
}

.banner-content p {
  font-size: 16px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  transition: opacity 1s ease-in-out;
  
  @include mobile {
    font-size: 14px;
  }
  
  @include tablet {
    font-size: 17px;
  }
  
  @include desktop {
    font-size: 18px;
  }
}

/* 轮播控制按钮 */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.3s ease;
  
  @include mobile {
    width: 36px;
    height: 36px;
  }
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
}

.prev {
  left: 20px;
  
  @include mobile {
    left: 15px;
  }
}

.next {
  right: 20px;
  
  @include mobile {
    right: 15px;
  }
}

/* 轮播指示器 */
.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
  
  @include mobile {
    bottom: 15px;
    gap: 6px;
  }
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  @include mobile {
    width: 8px;
    height: 8px;
  }
  
  &.active {
    background-color: white;
    width: 30px;
    border-radius: 5px;
    
    @include mobile {
      width: 24px;
    }
  }
}

/* 针对超小屏幕的特殊优化 */
@media (max-width: 480px) {
  .banner {
    height: 200px;
  }
  
  .banner-content h1 {
    font-size: 20px;
  }
  
  .banner-content p {
    font-size: 13px;
  }
  
  .carousel-indicators {
    bottom: 10px;
  }
}

/* 横屏手机优化 */
@media (max-width: 768px) and (orientation: landscape) {
  .banner {
    height: 180px;
  }
  
  .banner-content h1 {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .banner-content p {
    font-size: 12px;
  }
}
</style>