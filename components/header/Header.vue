<template>
  <header class="header-container">
    <!-- 主容器占用80%空间 -->
    <div class="header-content">
      <!-- 左侧Logo和标题 -->
      <div class="brand-area">
        <router-link to="/" class="logo-link">
          <img
              src="/src/components/header/logo.png"
              alt="网站Logo"
              class="logo-image"
          >
          <h1 class="site-title">海风学社</h1>
        </router-link>
      </div>

      <!-- 右侧导航区 -->
      <div class="nav-area">
        <!-- 第一组导航 -->
        <div class="nav-group">
          <router-link
              v-for="item in navGroup1"
              :key="item.path"
              :to="item.path"
              class="nav-link"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- 分隔线 -->
        <div class="divider"></div>

        <!-- 第二组导航 -->
        <div class="nav-group">
          <router-link
              v-for="item in navGroup2"
              :key="item.path"
              :to="item.path"
              class="nav-link"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>

const navGroup1 = [
  { name: '首页', path: '/' },
  { name: '活动中心', path: '/activities' },
  { name: '新闻动态', path: '/news' },
  { name: '学长学姐说', path: '/alumni' }
]

const navGroup2 = [
  { name: '部门介绍', path: '/departments' },
  { name: '加入我们', path: '/join-us' }
]
</script>

<style scoped>
/* 基础定位样式 */
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
}

/* 80%宽度内容区 */
.header-content {
  width: 80%;
  max-width: 1200px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 左侧logo区 */
.brand-area {
  display: flex;
  align-items: center;
  min-width: 200px;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-image {
  height: 36px;
  margin-right: 12px;
}

.site-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  white-space: nowrap;
}

/* 右侧导航区 */
.nav-area {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.divider {
  width: 1px;
  height: 24px;
  background: #e0e0e0;
}

.nav-link {
  color: #555;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-link:hover {
  color: #409EFF;
  font-weight: 500;
  cursor: pointer;
}


</style>