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
        <span class="danmu-name">{{ danmu.name }}:</span>
        <span class="danmu-text">{{ danmu.text }}</span>
      </div>
    </div>

    <!-- 弹幕发送表单 -->
    <div class="danmu-input-area">
      <input
          v-model="newDanmuName"
          type="text"
          placeholder="输入你的名字..."
          class="danmu-input name-input"
      />
      <input
          v-model="newDanmuText"
          type="text"
          placeholder="输入弹幕内容..."
          @keyup.enter="sendDanmu"
          class="danmu-input content-input"
      />
      <button @click="sendDanmu" class="send-btn">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { getWallApi, addWallApi } from '@/api/wall';

//弹幕数据
const activeDanmus = ref([]);
const danmuList = ref([]);
const newDanmuName = ref('');
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
    const res = await getWallApi(50); // 获取50条弹幕数据
    if (res.success) {
      danmuList.value = res.data.map(item => ({
        text: item.content,
        name: item.name
      }));
    } else {
      throw new Error('Failed to load barrage data');
    }
  } catch (error) {
    console.error('Error loading barrage data:', error);
    // 备用数据
    danmuList.value = [
      { text: "Hello World", name: "海风学社" },
      { text: "一键三连呦", name: "技术达人" },
      { text: "火钳刘明", name: "编程小白" },
      { text: "助力每一个梦想", name: "海风学社" }
    ];
  }
};

//创建弹幕
const createDanmu = (text, name) => {
  if (!containerRef.value || !text || !name) return;

  const newDanmu = {
    text,
    name,
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
const sendDanmu = async () => {
  if (!newDanmuText.value.trim() || !newDanmuName.value.trim()) {
    alert('请输入名字和弹幕内容');
    return;
  }

  try {
    // 发送到服务器
    const res = await addWallApi({
      name: newDanmuName.value.trim(),
      content: newDanmuText.value.trim()
    });
    
    if (res.success) {
      // 添加到本地列表
      danmuList.value.push({ 
        text: newDanmuText.value.trim(), 
        name: newDanmuName.value.trim() 
      });
      
      // 立即显示弹幕
      createDanmu(newDanmuText.value.trim(), newDanmuName.value.trim());
      
      // 清空输入框
      newDanmuText.value = '';
      // 保留名字，方便继续发送
      // newDanmuName.value = '';
    } else {
      alert('发送失败，请重试');
    }
  } catch (error) {
    console.error('发送弹幕失败:', error);
    alert('发送失败，请检查网络连接');
  }
};

// 机发送弹幕
const sendRandomDanmu = () => {
  if (danmuList.value.length === 0) return;
  const randomIndex = Math.floor(Math.random() * danmuList.value.length);
  const randomDanmu = danmuList.value[randomIndex];
  createDanmu(randomDanmu.text, randomDanmu.name);
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
  font-size: 18px;
  padding: 8px 15px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  user-select: none;
  will-change: transform;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

.danmu-name {
  font-weight: bold;
  color: #409eff;
  font-size: 16px;
}

.danmu-text {
  color: #333;
}

.danmu-input-area {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 20;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px 20px;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.danmu-input {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
  transition: border-color 0.3s;
}

.name-input {
  width: 120px;
}

.content-input {
  width: 250px;
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
  font-size: 14px;
}

.send-btn:hover {
  background-color: #66b1ff;
}

@media (max-width: 768px) {
  .danmu-input-area {
    flex-direction: column;
    width: 90%;
    max-width: 400px;
  }
  
  .name-input,
  .content-input {
    width: 100%;
  }
  
  .danmu-box {
    font-size: 16px;
    padding: 6px 12px;
  }
  
  .danmu-name {
    font-size: 14px;
  }
}
</style>