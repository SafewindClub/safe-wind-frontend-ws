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
const qrCode = ref('/public/qrcode.jpg');

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
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include mobile {
    padding: 15px 0;
  }
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 20px;
  padding: 30px 20px;
  width: 100%;

  @include mobile {
    margin-bottom: 15px;
    padding: 20px 15px;
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 10px;
    font-weight: 700;

    @include mobile {
      font-size: 1.8rem;
    }
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;

    @include mobile {
      font-size: 0.95rem;
    }
  }
}

.qr-code-container {
  width: 40vmin; /* 使用视口较小边的百分比 */
  height: 40vmin;
  max-width: 300px;
  max-height: 300px;
  min-width: 200px;
  min-height: 200px;
  margin: 0 auto 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  @include mobile {
    width: 60vmin;
    height: 60vmin;
    margin-bottom: 20px;
  }
}

.qr-code-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  width: 50px;
  height: 50px;
  stroke-width: 1.5;
  margin-bottom: 15px;
  color: #4facfe;
}

.qr-code-placeholder p {
  font-size: 1rem;
  margin: 5px 0;
  color: #333;
}

.join-text {
  font-size: 0.9rem;
  color: #666;
}

.join-instruction {
  text-align: center;
  color: white;
  margin-top: 20px;
  font-size: 1rem;
  line-height: 1.6;

  p {
    margin: 5px 0;
  }

  @include mobile {
    font-size: 0.9rem;
  }
}
</style>