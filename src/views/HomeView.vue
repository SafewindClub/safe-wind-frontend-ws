<template>
    <tiny-container pattern="classic" footer-height="0">
      <template #header>
        <HeaderView />
      </template>
      <template #default class="main-content">
        <div class="home-page">
          <Banner
              title="海风学社"
              description="致力于推动科技创新和技术交流的学生组织"
          />
          <Activity/>
          <News />
          <DepartIntroduction />
          <SeaWall
              :message="cardData"
          />
          <FooterView />
        </div>
      </template>
      <template #footer >
      </template>
    </tiny-container>
</template>

<script setup>
import HeaderView from '@/components/HeaderView/HeaderView.vue'
import FooterView from '@/components/FooterView/FooterView.vue'
import Banner from "@/components/Banner.vue";
import { useHomeStore } from '@/stores/home'
import {TinyContainer} from "@opentiny/vue";
import News from "@/components/News.vue";
import SeaWall from "@/components/SeaWall.vue";
import Activity from "@/components/Activity.vue";
import DepartIntroduction from "@/components/DepartIntroduction.vue";
import { onMounted,ref } from 'vue';
import { useResponsive } from '@/composables/useResponsive';

import { getRecentActivitiesApi, getAllActivityApi, getActivityByIdApi } from "@/api/activity";


const { isMobile, isTablet, isDesktop } = useResponsive();

let cardData=ref([]);
const homeStore = useHomeStore()

// 获得首页活动数据
const getHomeActivityData = async () => {
  const response = await getRecentActivitiesApi();
  console.log(response);
}

const fetchData = () => {
  // 海风社团社员模拟数据
  const mockData = [
    {
      url: 'https://picsum.photos/300/300?random=1',
      name: '待定中',
      description: '待定中'
    },
    {
      url: 'https://picsum.photos/300/300?random=2',
      name: '待定中',
      description: '待定中'
    },
    {
      url: 'https://picsum.photos/300/300?random=3',
      name: '待定中',
      description: '待定中'
    },
    {
      url: 'https://picsum.photos/300/300?random=4',
      name: '待定中',
      description: '待定中'
    },
    {
      url: 'https://picsum.photos/300/300?random=5',
      name: '待定中',
      description: '待定中'
    },
    {
      url: 'https://picsum.photos/300/300?random=6',
      name: '待定中',
      description: '待定中'
    },
    {
      url: 'https://picsum.photos/300/300?random=7',
      name: '待定中',
      description: '待定中'
    },
    {
      url: 'https://picsum.photos/300/300?random=8',
      name: '待定中',
      description: '待定中'
    },
    {
      url: 'https://picsum.photos/300/300?random=9',
      name: '待定中',
      description: '待定中'
    },
    {
      url: 'https://picsum.photos/300/300?random=10',
      name: '待定中',
      description: '待定中'
    },
    {
      url: 'https://picsum.photos/300/300?random=11',
      name: '待定中',
      description: '待定中'
    },
    {
      url: 'https://picsum.photos/300/300?random=12',
      name: '待定中',
      description: '待定中'
    }
  ];
  
  cardData.value = mockData;
}

onMounted(() => {
  fetchData()
  getHomeActivityData()
})

</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

.main-content {
  width: 100%;
}

.home-page {
  // 为首页添加一些基础的响应式间距
  @include mobile {
    // 移动端可以减少一些组件间的间距
    :deep(.banner-container) {
      margin-bottom: 20px;
    }
    
    :deep(.container) {
      padding: 15px 0;
    }
  }
  
  @include tablet {
    :deep(.container) {
      padding: 20px 0;
    }
  }
  
  @include desktop {
    :deep(.container) {
      padding: 25px 0;
    }
  }
}

// 针对超小屏幕的优化
@media (max-width: 480px) {
  .home-page {
    :deep(.banner-container) {
      margin-bottom: 15px;
    }
    
    :deep(.container) {
      padding: 10px 0;
    }
  }
}

// 横屏手机优化
@media (max-width: 768px) and (orientation: landscape) {
  .home-page {
    :deep(.banner-container) {
      margin-bottom: 15px;
    }
    
    :deep(.container) {
      padding: 15px 0;
    }
  }
}
</style>