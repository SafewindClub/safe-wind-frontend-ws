<template>
  <section class="container">
    <h2 class="responsive-title">名人堂</h2>
    <div class="cardsWrapper">
      <div
          v-for="(item, index) in displayCards"
          :key="index"
          class="card-container"
          :class="getCardClass(index)"
          @click="switchToCard(index)"
      >
        <tiny-card
            :title="item.name"
            type="logo"
            :src="item.url"
            custom-class="card"
        >
          <p class="card-description">{{ truncateDescription(item.description) }}</p>
        </tiny-card>
      </div>
      <div class="arrow arrow-left" @click="switchToPrev" v-if="!isMobile">&lt;</div>
      <div class="arrow arrow-right" @click="switchToNext" v-if="!isMobile">&gt;</div>
      
      <!-- 移动端指示器 -->
      <div class="mobile-indicators" v-if="isMobile">
        <div 
          v-for="(_, index) in displayCards" 
          :key="index"
          class="indicator"
          :class="{ active: index === activeIndex }"
          @click="switchToCard(index)"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useResponsive } from '@/composables/useResponsive';
import { TinyCard } from "@opentiny/vue";

const { isMobile, isTablet, isDesktop } = useResponsive();

const props = defineProps({
  message: {
    type: Array,
    default: () => [
      {
        url: 'https://picsum.photos/300/300?random=4',
        alt: '林志远',
        name: '林志远',
        description: '人工智能专业研究生，曾带领团队在全国大学生AI竞赛中获奖，擅长机器学习与计算机视觉。'
      },
      {
        url: 'https://picsum.photos/300/300?random=5',
        alt: '张雨萌',
        name: '张雨萌',
        description: '计算机科学毕业生，现任某科技公司前端开发工程师，热衷于开源项目和技术分享。'
      },
      {
        url: 'https://picsum.photos/300/300?random=6',
        alt: '王浩然',
        name: '王浩然',
        description: '软件工程硕士，在知名互联网企业从事后端架构设计，对微服务和分布式系统有深入研究。'
      },
      {
        url: 'https://picsum.photos/300/300?random=7',
        alt: '刘美琪',
        name: '刘美琪',
        description: '数据科学专家，专注于大数据分析和商业智能，曾主导多个企业级数据分析项目。'
      },
      {
        url: 'https://picsum.photos/300/300?random=8',
        alt: '陈嘉伟',
        name: '陈嘉伟',
        description: '网络安全工程师，擅长渗透测试和漏洞挖掘，积极参与国家级网络安全攻防演练。'
      },
      {
        url: 'https://picsum.photos/300/300?random=9',
        alt: '李晓雯',
        name: '李晓雯',
        description: '人工智能研究员，在自然语言处理领域有深入研究和应用，致力于智能客服系统开发。'
      },
      {
        url: 'https://picsum.photos/300/300?random=10',
        alt: '赵瑞',
        name: '赵瑞',
        description: '计算机视觉专家，在图像识别和物体检测领域有丰富经验，参与多个国际学术会议。'
      }
    ]
  }
});

const activeIndex = ref(0);
const currentCardText = computed(() => {
  return props.message[activeIndex.value].name;
});

// 根据设备类型调整显示数量
const displayCount = computed(() => {
  const count = props.message.length;
  if (isMobile.value) {
    return Math.min(count, 3); // 移动端最多显示3个
  } else if (isTablet.value) {
    return Math.min(count, 5); // 平板最多显示5个
  } else {
    return Math.min(count, 7); // 桌面端最多显示7个
  }
});

const displayCards = computed(() => {
  return props.message.slice(0, displayCount.value);
});

const prevIndex = computed(() => (activeIndex.value - 1 + displayCards.value.length) % displayCards.value.length);
const nextIndex = computed(() => (activeIndex.value + 1) % displayCards.value.length);
const prevIndex2 = computed(() => (activeIndex.value - 2 + displayCards.value.length) % displayCards.value.length);
const nextIndex2 = computed(() => (activeIndex.value + 2) % displayCards.value.length);

const getCardClass = (index) => {
  if (isMobile.value) {
    // 移动端只显示当前卡片
    return index === activeIndex.value ? 'active' : 'hidden';
  }
  
  let diff = index - activeIndex.value;
  const cardCount = displayCards.value.length;
  if (diff > Math.floor(cardCount / 2)) {
    diff -= cardCount;
  } else if (diff < -Math.floor(cardCount / 2)) {
    diff += cardCount;
  }
  const diffMap = {
    "-2": "prev-2",
    "-1": "prev-1",
    "0": "active",
    "1": "next-1",
    "2": "next-2",
  };

  return diffMap[diff] || "hidden";
};

// 截断描述文本
const truncateDescription = (description) => {
  if (!description) return '';
  const maxLength = isMobile.value ? 40 : isTablet.value ? 60 : 80;
  return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
};

const switchToCard = (index) => {
  activeIndex.value = index;
};

const switchToNext = () => {
  activeIndex.value = (activeIndex.value + 1) % displayCards.value.length;
};

const switchToPrev = () => {
  activeIndex.value = (activeIndex.value - 1 + displayCards.value.length) % displayCards.value.length;
};

let intervalId = null;
const startAutoPlay = () => {
  intervalId = setInterval(() => {
    switchToNext();
  }, isMobile.value ? 3000 : 4000); // 移动端更快切换
};

const resumeAutoPlay = () => {
  if (!intervalId) {
    startAutoPlay();
  }
};

const stopAutoPlay = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

const handleMouseEnter = () => {
  if (!isMobile.value) {
    stopAutoPlay();
  }
};

const handleMouseLeave = () => {
  if (!isMobile.value) {
    resumeAutoPlay();
  }
};

onMounted(() => {
  startAutoPlay();
  const cardsWrapper = document.querySelector('.cardsWrapper');
  if (cardsWrapper) {
    cardsWrapper.addEventListener('mouseenter', handleMouseEnter);
    cardsWrapper.addEventListener('mouseleave', handleMouseLeave);
  }
});

onBeforeUnmount(() => {
  stopAutoPlay();
  const cardsWrapper = document.querySelector('.cardsWrapper');
  if (cardsWrapper) {
    cardsWrapper.removeEventListener('mouseenter', handleMouseEnter);
    cardsWrapper.removeEventListener('mouseleave', handleMouseLeave);
  }
});
</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

.container {
  width: 90%;
  margin: 40px auto;
  
  @include mobile {
    width: 95%;
    margin: 30px auto;
  }
  
  @include tablet {
    width: 92%;
    margin: 35px auto;
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

.cardsWrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
  height: 450px;
  overflow: hidden;
  
  @include mobile {
    height: 400px;
    gap: 15px;
  }
  
  @include tablet {
    height: 420px;
    gap: 18px;
  }
}

.card-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 450px;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  
  @include mobile {
    width: 280px;
    height: 380px;
    transition: all 0.3s ease;
  }
  
  @include tablet {
    width: 290px;
    height: 420px;
  }
}

.card-description {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  
  @include mobile {
    font-size: 13px;
    margin-top: 8px;
    line-height: 1.4;
  }
  
  @include tablet {
    font-size: 13px;
  }
}

.card {
  flex-shrink: 0;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  
  @include mobile {
    border-radius: 6px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }
  
  :deep(.tiny-card--logo__head) {
    width: 150px !important;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 20px;
    
    @include mobile {
      width: 120px !important;
      height: 120px;
      margin-top: 15px;
    }
    
    @include tablet {
      width: 140px !important;
      height: 140px;
      margin-top: 18px;
    }
  }
}

// 桌面端卡片位置
@include desktop {
  .card-container.active {
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    z-index: 5;
    opacity: 1;
  }

  .card-container.prev-1 {
    left: 30%;
    transform: translate(-50%, -50%) scale(0.9);
    z-index: 4;
    opacity: 0.8;
  }

  .card-container.next-1 {
    left: 70%;
    transform: translate(-50%, -50%) scale(0.9);
    z-index: 4;
    opacity: 0.8;
  }

  .card-container.prev-2 {
    left: 20%;
    transform: translate(-50%, -50%) scale(0.8);
    z-index: 3;
    opacity: 0.6;
  }

  .card-container.next-2 {
    left: 80%;
    transform: translate(-50%, -50%) scale(0.8);
    z-index: 3;
    opacity: 0.6;
  }
}

// 平板端卡片位置
@include tablet {
  .card-container.active {
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    z-index: 5;
    opacity: 1;
  }

  .card-container.prev-1 {
    left: 25%;
    transform: translate(-50%, -50%) scale(0.85);
    z-index: 4;
    opacity: 0.7;
  }

  .card-container.next-1 {
    left: 75%;
    transform: translate(-50%, -50%) scale(0.85);
    z-index: 4;
    opacity: 0.7;
  }
}

// 移动端卡片位置
@include mobile {
  .card-container.active {
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    z-index: 5;
    opacity: 1;
  }
}

.card-container.hidden {
  opacity: 0;
  pointer-events: none;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  color: #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: background-color 0.2s ease;
  
  @include mobile {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
}

.arrow-left {
  left: 20px;
  
  @include mobile {
    left: 15px;
  }
}

.arrow-right {
  right: 20px;
  
  @include mobile {
    right: 15px;
  }
}

/* 移动端指示器 */
.mobile-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.active {
    background-color: white;
    transform: scale(1.2);
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
}

/* 针对超小屏幕的特殊优化 */
@media (max-width: 480px) {
  .container {
    width: 98%;
    margin: 25px auto;
  }
  
  h2 {
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .cardsWrapper {
    height: 350px;
  }
  
  .card-container {
    width: 260px;
    height: 330px;
  }
  
  .card :deep(.tiny-card--logo__head) {
    width: 100px !important;
    height: 100px;
    margin-top: 12px;
  }
  
  .card-description {
    font-size: 12px;
    margin-top: 6px;
  }
  
  .mobile-indicators {
    bottom: 15px;
  }
  
  .indicator {
    width: 6px;
    height: 6px;
  }
}

/* 横屏手机优化 */
@media (max-width: 768px) and (orientation: landscape) {
  .cardsWrapper {
    height: 300px;
  }
  
  .card-container {
    width: 240px;
    height: 280px;
  }
  
  .card :deep(.tiny-card--logo__head) {
    width: 80px !important;
    height: 80px;
    margin-top: 10px;
  }
  
  .card-description {
    font-size: 11px;
    margin-top: 5px;
  }
}

/* 平板横屏优化 */
@media (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {
  .cardsWrapper {
    height: 380px;
  }
  
  .card-container {
    width: 270px;
    height: 380px;
  }
  
  .card :deep(.tiny-card--logo__head) {
    width: 120px !important;
    height: 120px;
    margin-top: 15px;
  }
}

/* 超大屏幕优化 */
@media (min-width: 1400px) {
  .cardsWrapper {
    height: 500px;
  }
  
  .card-container {
    width: 320px;
    height: 480px;
  }
  
  .card :deep(.tiny-card--logo__head) {
    width: 160px !important;
    height: 160px;
    margin-top: 25px;
  }
  
  .card-description {
    font-size: 15px;
    margin-top: 12px;
  }
}
</style>