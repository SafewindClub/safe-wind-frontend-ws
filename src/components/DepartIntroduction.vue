<template>
  <section class="container">
    <h2 class="section-title responsive-title">{{ title }}</h2>
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>正在加载部门信息...</p>
    </div>
    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="fetchDepartments" class="retry-btn btn">重试</button>
    </div>
    <div v-else class="dept-grid">
      <div
          v-for="(dept, index) in departments"
          :key="dept.id || index"
          class="dept-card"
      >
        <div class="dept-icon-container">
          <img :src="dept.imageUrl" :alt="dept.name" class="dept-image">
          <div class="dept-overlay"></div>
        </div>
        <div class="dept-info">
          <h3 class="dept-name">{{ dept.name }}</h3>
          <p class="dept-description">{{ dept.content }}</p>
          <a
              :href="dept.jumpUrl || ''"
              class="jump-btn"
              target="_blank"
              rel="noopener noreferrer"
          >
            了解更多
          </a>
        </div>
      </div>
    </div>

    <div v-if="!loading && !error && departments.length === 0" class="empty-container">
      <p>暂无部门信息</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useResponsive } from '@/composables/useResponsive';
import { getAllDepartmentsApi } from '@/api/dept';

// 响应式数据
const departments = ref([]);
const loading = ref(true);
const error = ref('');

const { isMobile, isTablet, isDesktop } = useResponsive();

const props = defineProps({
  title: {
    type: String,
    default: '部门介绍'
  }
});

const truncateContent = (content) => {
  if (!content) return '';
  const maxLength = isMobile ? 60 : isTablet ? 80 : 100;
  return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
};

const fetchDepartments = async () => {
  try {
    loading.value = true;
    error.value = '';
    const response = await getAllDepartmentsApi();
    console.log("部门数据", response);
    if (response.code === 200) {
      departments.value = (response.data || []).map(dept => ({
        ...dept,
        jumpUrl: '/department' //跳转路径
      }));
    } else {
      error.value = response.message || '获取部门信息失败';
    }
  } catch (err) {
    console.error('获取部门信息失败:', err);
    error.value = '网络错误，请稍后重试';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDepartments();
});
</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

.container {
  width: 92%;
  max-width: 1400px;
  margin: 60px auto;
  padding: 0 20px;

  @include mobile {
    width: 95%;
    margin: 40px auto;
    padding: 0 15px;
  }

  @include tablet {
    width: 94%;
    margin: 50px auto;
    padding: 0 18px;
  }
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;
  color: #2c3e50;
  position: relative;
  padding-bottom: 15px;

  @include mobile {
    font-size: 22px;
    margin-bottom: 25px;
    padding-bottom: 12px;
  }

  @include tablet {
    font-size: 25px;
    margin-bottom: 30px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #3498db;
    border-radius: 3px;

    @include mobile {
      width: 50px;
      height: 2px;
    }
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;

  @include mobile {
    padding: 40px 15px;
  }

  @include tablet {
    padding: 50px 18px;
  }
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

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

.loading-container p {
  color: #666;
  font-size: 16px;

  @include mobile {
    font-size: 14px;
  }
}

.error-container {
  text-align: center;
  padding: 60px 20px;

  @include mobile {
    padding: 40px 15px;
  }

  @include tablet {
    padding: 50px 18px;
  }
}

.error-container p {
  color: #e74c3c;
  font-size: 16px;
  margin-bottom: 20px;

  @include mobile {
    font-size: 14px;
    margin-bottom: 15px;
  }
}

.retry-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  @include mobile {
    padding: 8px 16px;
    font-size: 13px;
    border-radius: 4px;
  }

  &:hover {
    background: #2980b9;
  }
}

.empty-container {
  text-align: center;
  padding: 60px 20px;

  @include mobile {
    padding: 40px 15px;
  }

  @include tablet {
    padding: 50px 18px;
  }
}

.empty-container p {
  color: #999;
  font-size: 16px;

  @include mobile {
    font-size: 14px;
  }
}

.dept-grid {
  display: grid;
  gap: 30px;

  @include mobile {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @include tablet {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  @include desktop {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.dept-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  @include mobile {
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);

    @include mobile {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .dept-image {
      transform: scale(1.08);

      @include mobile {
        transform: scale(1.05);
      }
    }
  }
}

.dept-icon-container {
  position: relative;
  height: 160px;
  overflow: hidden;

  @include mobile {
    height: 140px;
  }

  @include tablet {
    height: 150px;
  }
}

.dept-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.dept-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4));
}

.dept-info {
  padding: 22px 20px;

  @include mobile {
    padding: 18px 16px;
  }

  @include tablet {
    padding: 20px 18px;
  }
}

.dept-name {
  margin: 0 0 12px;
  font-size: 20px;
  color: #2c3e50;
  font-weight: 600;

  @include mobile {
    font-size: 18px;
    margin-bottom: 10px;
  }

  @include tablet {
    font-size: 19px;
  }
}

.dept-description {
  margin: 0 0 18px;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @include mobile {
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 15px;
    -webkit-line-clamp: 2;
  }

  @include tablet {
    -webkit-line-clamp: 2;
  }
}

/* 跳转按钮样式 */
.jump-btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
  align-self: flex-start;
  margin-top: 10px;

  &:hover {
    background-color: #2980b9;
    text-decoration: none;
    color: white;
  }
}

</style>