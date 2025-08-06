<template>
  <section class="container">
    <h2>海风墙</h2>
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
          <p class="card-description">{{ item.description }}</p>
        </tiny-card>
      </div>
      <div class="arrow arrow-left" @click="switchToPrev">&lt;</div>
      <div class="arrow arrow-right" @click="switchToNext">&gt;</div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { TinyCard } from "@opentiny/vue";

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

const displayCount = computed(() => {
  const count = props.message.length;
  if (count >= 7) return 7;
  if (count >= 5) return 5;
  return 3;
});
const displayCards = computed(() => {
  return props.message.slice(0, displayCount.value);
});

const prevIndex = computed(() => (activeIndex.value - 1 + displayCards.value.length) % displayCards.value.length);
const nextIndex = computed(() => (activeIndex.value + 1) % displayCards.value.length);
const prevIndex2 = computed(() => (activeIndex.value - 2 + displayCards.value.length) % displayCards.value.length);
const nextIndex2 = computed(() => (activeIndex.value + 2) % displayCards.value.length);

const getCardClass = (index) => {
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
  }, 4000);
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
onMounted(() => {
  startAutoPlay();
});
onBeforeUnmount(() => {
  stopAutoPlay();
});
const handleMouseEnter = () => {
  stopAutoPlay();
};
const handleMouseLeave = () => {
  resumeAutoPlay();
};
onMounted(() => {
  const cardsWrapper = document.querySelector('.cardsWrapper');
  if (cardsWrapper) {
    cardsWrapper.addEventListener('mouseenter', handleMouseEnter);
    cardsWrapper.addEventListener('mouseleave', handleMouseLeave);
  }
});
onBeforeUnmount(() => {
  const cardsWrapper = document.querySelector('.cardsWrapper');
  if (cardsWrapper) {
    cardsWrapper.removeEventListener('mouseenter', handleMouseEnter);
    cardsWrapper.removeEventListener('mouseleave', handleMouseLeave);
  }
});
</script>

<style scoped>
.container {
  width: 90%;
  margin: 40px auto;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
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
}

.card-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 450px;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
}

.card-description {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.card {
  flex-shrink: 0;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card :deep(.tiny-card--logo__head){
  width: 150px !important;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 20px;

}

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
}
.arrow:hover {
  background-color: rgba(255, 255, 255, 1);
}
.arrow-left {
  left: 20px;
}
.arrow-right {
  right: 20px;
}


</style>