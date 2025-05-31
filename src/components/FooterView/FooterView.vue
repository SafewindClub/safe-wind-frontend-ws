<template>
  <footer class="site-footer">
    <!-- 主要内容区 -->
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-col">
          <h3 class="footer-title">海风学社</h3>
          <p class="footer-desc">
            致力于推进科技创新和技术交流的学生社团
          </p>
        </div>

        <!-- 联系方式 -->
        <div class="footer-col">
          <h3 class="footer-title">联系我们</h3>
          <div class="quick-links">
            <router-link
                v-for="link in links_1"
                :key="link.path"
                :to="link.path"
                class="footer-link"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>

        <!-- 快速链接 -->
        <div class="footer-col">
          <h3 class="footer-title">快速链接</h3>
          <div class="quick-links">
            <router-link
                v-for="link in links"
                :key="link.path"
                :to="link.path"
                class="footer-link"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>

        <!-- 二维码 -->
        <div class="footer-col">
          <h3 class="footer-title">关于我们</h3>
          <div class="qrcode-box">
            <tiny-image
                src="src/components/FooterView/qrcode.jpg"
                :preview-src-list="[qrcodeSrc]"
                fit="cover"
                style="width:120px;height:120px"
            >
              <template #error>
                <div class="qrcode-placeholder">
                  error<!-- 此处是错误信息 -->
                  <span>公众号二维码</span>
                </div>
              </template>
            </tiny-image>
          </div>
        </div>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="copyright">
      © 2025 海风学社 版权所有
    </div>
  </footer>
</template>

<script setup>
import {Image as TinyImage} from '@opentiny/vue'
const qrcodeSrc = 'src/components/FooterView/qrcode.jpg'//二维码地址

const links = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/' },
  { name: '新闻中心', path: '/' },
  { name: '成员风采', path: '/' },
  { name: '联系我们', path: '/' }
]

const links_1 = [
  { name: 'contact@techclub.com', path: '/join' },
  { name: '海风学社公众号', path: '/join' },
  { name: '学生活动中心4楼', path: '/join' }
]

</script>

<style scoped>
/* 基础样式 */
.site-footer {
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
}

/* 内容宽度 */
.footer-content {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
}

/* 四栏网格布局设定 */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

/* 每列样式 */
.footer-col {
  display: flex;
  flex-direction: column;
}

/* 标题样式 */
.footer-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 8px;
}

/* 文字样式 */
.footer-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
}

/* 链接样式 */
.quick-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
  cursor: pointer;
}

.footer-link:hover {
  color: #1890ff;
  transform: translateX(4px);
}

/* 二维码区域 */
.qrcode-box {
  margin-top: 10px;
}

.qrcode-placeholder {
  width: 120px;
  height: 120px;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  gap: 8px;
}

.qrcode-placeholder svg {
  margin-bottom: 8px;
}

/* 版权信息 */
.copyright {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #eee;
  color: #999;
  font-size: 14px;
}

</style>