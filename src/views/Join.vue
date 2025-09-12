<template>
  <tiny-container pattern="classic" footer-height="0">
    <template #header>
      <HeaderView />
    </template>
    <template #default class="main-content">
      <div class="join-page">
        <div class="header">
          <h1 class="responsive-title">加入我们</h1>
          <p class="responsive-text">扫描下方二维码，成为海风学社的一员</p>
        </div>

        <div class="qr-code-container">
          <img
              v-if="!imageError"
              :src="qrCode"
              alt="海风学社加入二维码"
              class="qr-code-image"
              @error="handleImageError"
          />
          <div v-else class="qr-code-placeholder">
            <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="4" y="4" width="16" height="16" rx="1" ry="1"></rect>
              <path d="M10 10h4v4h-4z"></path>
              <path d="M10 14h4v4h-4z"></path>
              <path d="M14 10h4v4h-4z"></path>
            </svg>
            <p>二维码加载失败</p>
            <p class="join-text">请前往活动中心现场获取加入方式</p>
          </div>
        </div>

        <div class="join-instruction">
          <p>长按识别二维码，加入海风学社</p>
          <p>或前往活动中心咨询</p>
        </div>
      </div>
      <FooterView />
    </template>
  </tiny-container>
</template>

<script setup>
import { ref } from 'vue';
import HeaderView from '@/components/HeaderView/HeaderView.vue';
import FooterView from "@/components/FooterView/FooterView.vue";
import { TinyContainer } from "@opentiny/vue";

const imageError = ref(false);
const qrCode = ref('/public/qrcode.jpg');//二维码路径

const handleImageError = () => {
  imageError.value = true;
};
</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

.main-content {
  width: 100%;
}

.join-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  padding: 0 10px;
  width: 100%;
}

.responsive-title {
  font-size: 28px;
  margin-bottom: 12px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.responsive-text {
  font-size: 16px;
  opacity: 0.95;
  line-height: 1.5;
  margin: 0;
}

.qr-code-container {
  width: 280px;
  height: 280px;
  margin: 0 auto 25px;
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.qr-code-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.qr-code-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #4facfe;
  text-align: center;
}

.placeholder-icon {
  width: 60px;
  height: 60px;
  stroke-width: 1.5;
  margin-bottom: 15px;
  color: #4facfe;
}

.qr-code-placeholder p {
  font-size: 14px;
  margin: 6px 0;
  color: #333;
  font-weight: 500;
}

.join-text {
  font-size: 13px;
  color: #666;
  margin-top: 8px;
}

.join-instruction {
  text-align: center;
  color: white;
  margin-top: 25px;
  font-size: 15px;
  line-height: 1.6;
  padding: 0 20px;
}

.join-instruction p {
  margin: 8px 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .join-page {
    padding: 15px 12px;
    min-height: 80vh;
    justify-content: flex-start;
    padding-top: 40px;
  }

  .header {
    margin-bottom: 25px;
    padding: 0 5px;
  }

  .responsive-title {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .responsive-text {
    font-size: 14px;
    line-height: 1.4;
  }

  .qr-code-container {
    width: 240px;
    height: 240px;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 12px;
  }

  .placeholder-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 12px;
  }

  .qr-code-placeholder p {
    font-size: 13px;
    margin: 5px 0;
  }

  .join-text {
    font-size: 12px;
  }

  .join-instruction {
    margin-top: 20px;
    font-size: 14px;
    padding: 0 15px;
  }

  .join-instruction p {
    margin: 6px 0;
  }
}

@media (max-width: 480px) {
  .join-page {
    padding: 12px 10px;
    padding-top: 30px;
  }

  .responsive-title {
    font-size: 22px;
  }

  .responsive-text {
    font-size: 13px;
  }

  .qr-code-container {
    width: 200px;
    height: 200px;
    padding: 12px;
    border-radius: 10px;
  }

  .placeholder-icon {
    width: 45px;
    height: 45px;
    margin-bottom: 10px;
  }

  .qr-code-placeholder p {
    font-size: 12px;
  }

  .join-text {
    font-size: 11px;
  }

  .join-instruction {
    font-size: 13px;
    margin-top: 18px;
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  .join-page {
    min-height: 100vh;
    padding-top: 20px;
  }

  .qr-code-container {
    width: 180px;
    height: 180px;
    margin-bottom: 15px;
  }

  .header {
    margin-bottom: 20px;
  }
}

@media (max-height: 600px) {
  .join-page {
    padding-top: 20px;
  }

  .qr-code-container {
    width: 160px;
    height: 160px;
    margin-bottom: 15px;
  }

  .header {
    margin-bottom: 15px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .qr-code-container {
    width: 320px;
    height: 320px;
  }
}

.qr-code-container,
.load-more-btn,
.collapse-btn {
  min-height: 44px;
  min-width: 44px;
}

.join-page * {
  -webkit-tap-highlight-color: transparent;
}

.qr-code-image {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>