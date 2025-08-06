<template>
  <div class="danmu-container">
    <div class="danmu-display" ref="containerRef">
      <div
          v-for="(danmu, index) in activeDanmus"
          :key="index"
          class="danmu-box"
          :style="{
          top: danmu.top + 'px',
          color: danmu.color,
          transform: `translateX(${danmu.progress}px)`,
          opacity: danmu.opacity
        }"
          ref="danmuElements"
      >
        {{ danmu.text }}
      </div>
    </div>

    <!-- 弹幕发送表单 -->
    <div class="danmu-input-area">
      <input
          v-model="newDanmuText"
          type="text"
          placeholder="输入弹幕内容..."
          @keyup.enter="sendDanmu"
          class="danmu-input"
      />
      <button @click="sendDanmu" class="send-btn">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

//弹幕数据
const activeDanmus = ref([]);
const danmuList = ref([]);
const newDanmuText = ref('');
const containerRef = ref(null);
const danmuElements = ref([]);

//定时器+颜色生成
let timerId = null;
let animationFrameId = null;
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};
//弹幕位置
const getRandomTop = () => {
  if (!containerRef.value) return 0;
  const maxTop = containerRef.value.clientHeight - 50;
  return Math.random() * maxTop;
};
//速度
const getRandomSpeed = () => {
  return 50 + Math.random() * 100;
};
//弹幕数据读入
const loadDanmuData = async () => {
  try {
    const response = await fetch('/Barrage/barrage.json');
    if (!response.ok) throw new Error('Failed to load barrage data');
    danmuList.value = await response.json();
  } catch (error) {
    console.error('Error loading barrage data:', error);
    danmuList.value = [
      { text: "Hello World" },
      { text: "一键三连呦" },
      { text: "火钳刘明" },
      { text: "助力每一个梦想" }
    ];
  }
};

//创建弹幕
const createDanmu = (text) => {
  if (!containerRef.value || !text) return;

  const newDanmu = {
    text,
    top: getRandomTop(),
    color: getRandomColor(),
    speed: getRandomSpeed(),
    progress: containerRef.value.clientWidth,
    opacity: 1,
    width: 0
  };
  activeDanmus.value.push(newDanmu);
  nextTick(() => {
    const index = activeDanmus.value.indexOf(newDanmu);
    if (index !== -1 && danmuElements.value[index]) {
      const rect = danmuElements.value[index].getBoundingClientRect();
      activeDanmus.value[index].width = rect.width;
      activeDanmus.value[index].progress = containerRef.value.clientWidth;
    }
  });
};
//发送弹幕
const sendDanmu = () => {
  if (!newDanmuText.value.trim()) return;

  danmuList.value.push({ text: newDanmuText.value });
  createDanmu(newDanmuText.value);
  newDanmuText.value = '';
};
// 机发送弹幕
const sendRandomDanmu = () => {
  if (danmuList.value.length === 0) return;
  const randomIndex = Math.floor(Math.random() * danmuList.value.length);
  createDanmu(danmuList.value[randomIndex].text);
};
//动画循环
const animate = (timestamp) => {
  if (!containerRef.value) return;
  const containerWidth = containerRef.value.clientWidth;
  activeDanmus.value.forEach((danmu, index) => {
    if (danmu.width === 0 && danmuElements.value[index]) {
      const rect = danmuElements.value[index].getBoundingClientRect();
      danmu.width = rect.width;
      danmu.progress = containerWidth;
    }
    // 更新位置
    danmu.progress -= danmu.speed / 60;
    // 计算透明度
    const leftEdge = -danmu.width;
    if (danmu.progress < leftEdge + 100) {
      danmu.opacity = Math.max(0, (danmu.progress - leftEdge) / 100);
    }
    if (danmu.progress < leftEdge) {
      danmu.shouldRemove = true;
    }
  });
  activeDanmus.value = activeDanmus.value.filter(danmu => !danmu.shouldRemove);
  animationFrameId = requestAnimationFrame(animate);
};

onMounted(async () => {
  await loadDanmuData();
  timerId = setInterval(() => {
    sendRandomDanmu();
  }, 200);//发送时间（ms）
  animationFrameId = requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  if (timerId) {
    clearInterval(timerId);
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.danmu-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}

.danmu-display {
  position: relative;
  width: 100%;
  height: 100%;
}

.danmu-box {
  position: absolute;
  white-space: nowrap;
  font-size: 20px;
  padding: 8px 15px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  user-select: none;
  will-change: transform;
  transition: opacity 0.3s ease;
}

.danmu-input-area {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 20;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.danmu-input {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  width: 300px;
  outline: none;
  font-size: 16px;
  transition: border-color 0.3s;
}

.danmu-input:focus {
  border-color: #409eff;
}

.send-btn {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
}

.send-btn:hover {
  background-color: #66b1ff;
}
</style>