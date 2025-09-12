<template>
  <header>
    <div class="nav-container">
      <div class="logo" @click="goHome">
        <img src="./logo.png" alt="海风学社" class="logo-img" />
        <span class="logo-text">海风学社</span>
      </div>

      <!-- 汉堡菜单 -->
      <div class="hamburger" :class="{ active: isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- 导航菜单 -->
      <nav class="nav-responsive" :class="{ active: isMenuOpen }">
        <ul>
          <li><a href="/" @click="closeMenu" :class="{ active: currentRoute === '/' }">首页</a></li>
          <li><a href="/activity" @click="closeMenu" :class="{ active: currentRoute === '/activity' }">活动中心</a></li>
          <li><a href="/news" @click="closeMenu" :class="{ active: currentRoute === '/news' }">新闻动态</a></li>
          <li><a href="/barrage" @click="closeMenu" :class="{ active: currentRoute === '/barrage' }">海风墙</a></li>
          <li><a href="/department" @click="closeMenu" :class="{ active: currentRoute === '/department' }">部门介绍</a></li>
          <li><a href="/join" @click="closeMenu" :class="{ active: currentRoute === '/join' }">加入我们</a></li>
        </ul>
      </nav>

      <!-- 遮罩层 -->
      <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed} from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);

// 计算当前路由路径
const currentRoute = computed(() => {
  return route.path;
});

const goHome = () => {
  router.push('/');
  closeMenu();
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
header {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: relative;
  z-index: 100;
}

.nav-container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  z-index: 101;
}

.logo:hover {
  opacity: 0.8;
}

.logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-left: 10px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-size: 14px;
  transition: all 0.3s ease;
  display: block;
  padding: 8px 16px;
  border-radius: 6px;
  position: relative;
}

nav ul li a:hover {
  color: #4facfe;
}

/* 当前激活菜单项的样式 */
nav ul li a.active {
  background-color: #4facfe;
  color: white;
  font-weight: bold;
}

nav ul li a.active:hover {
  background-color: #3a9cea;
  color: white;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  z-index: 102;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background: #333;
  margin: 3px 0;
  transition: 0.3s;
}

.overlay {
  display: none;
}

/* 移动端样式 */
@media (max-width: 768px) {
  .logo-img {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    font-size: 18px;
  }

  .hamburger {
    display: flex;
  }

  .hamburger.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }

  nav {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100vh;
    background: white;
    z-index: 1000;
    transition: left 0.3s ease;
    padding-top: 80px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }

  nav.active {
    left: 0;
  }

  nav ul {
    flex-direction: column;
    padding: 20px;
  }

  nav ul li {
    margin: 0;
    margin-bottom: 10px;
  }

  nav ul li a {
    font-size: 16px;
    padding: 12px 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  /* 移动端激活菜单样式 */
  nav ul li a.active {
    background-color: #4facfe;
    color: white;
    font-weight: bold;
    border-bottom: 1px solid #4facfe;
  }

  .overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}

/* 平板样式 */
@media (min-width: 769px) and (max-width: 1024px) {
  .nav-container {
    width: 95%;
  }

  nav ul li {
    margin-left: 15px;
  }

  nav ul li a {
    font-size: 13px;
    padding: 6px 12px;
  }
}
</style>