<template>
  <tiny-container pattern="classic" footer-height="0">
    <template #header>
      <HeaderView />
    </template>
    <template #default class="main-content">
      <div class="barrage-page">
        <Barrage />
        <FooterView />
      </div>
    </template>
  </tiny-container>
</template>

<script setup lang="ts">
import { useResponsive } from '@/composables/useResponsive';
import HeaderView from '@/components/HeaderView/HeaderView.vue'
import Barrage from '@/components/Barrage.vue'
import FooterView from "@/components/FooterView/FooterView.vue";
import {TinyContainer} from "@opentiny/vue";

const { isMobile, isTablet, isDesktop } = useResponsive();
</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

.main-content {
  width: 100%;
}

.barrage-page {
  // 为弹幕页面添加响应式优化
  @include mobile {
    // 移动端优化弹幕容器
    :deep(.barrage-container) {
      height: calc(100vh - 120px); // 减去头部和底部高度
      padding: 10px;
    }
    
    :deep(.input-section) {
      padding: 15px;
    }
  }
  
  @include tablet {
    :deep(.barrage-container) {
      height: calc(100vh - 140px);
      padding: 15px;
    }
    
    :deep(.input-section) {
      padding: 20px;
    }
  }
  
  @include desktop {
    :deep(.barrage-container) {
      height: calc(100vh - 160px);
      padding: 20px;
    }
    
    :deep(.input-section) {
      padding: 25px;
    }
  }
}

// 针对超小屏幕的优化
@media (max-width: 480px) {
  .barrage-page {
    :deep(.barrage-container) {
      height: calc(100vh - 100px);
      padding: 8px;
    }
    
    :deep(.input-section) {
      padding: 12px;
    }
  }
}

// 横屏手机优化
@media (max-width: 768px) and (orientation: landscape) {
  .barrage-page {
    :deep(.barrage-container) {
      height: calc(100vh - 80px);
      padding: 10px;
    }
    
    :deep(.input-section) {
      padding: 15px;
    }
  }
}
</style>