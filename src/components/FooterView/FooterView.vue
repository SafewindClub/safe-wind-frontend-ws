<template>
  <footer>
    <div class="footer-container">
      <div class="footer-section">
        <h4>海风学社</h4>
        <p>致力于推动科技创新和技术交流的学生组织</p>
      </div>
      <div class="footer-section">
        <h4>联系我们</h4>
        <router-link
            v-for="link in links_1"
            :key="link.path"
            :to="link.path"
        >
          {{link.name}}
        </router-link>
      </div>
      <div class="footer-section">
        <h4>快速链接</h4>
        <router-link
            v-for="link in links"
            :key="link.path"
            :to="link.path"
        >
          {{link.name}}
        </router-link>
      </div>
      <div class="footer-section">
        <h4>关注我们</h4>
        <tiny-image
          src="src/components/FooterView/qrcode.jpg"
          :preview-src-list="[qrcodeSrc]"
          fit="cover"
          style="width: 120px; height: 120px; margin: 0 auto;"
          >
          <template #error>
            <div class="qrcode-placeholder">
              error
              <span>公众号微信</span>
            </div>
          </template>
        </tiny-image>

      </div>
    </div>
    <div class="copyright">©2025 海风学社 版权所有</div>
  </footer>
</template>

<script setup>
import {Image as TinyImage} from '@opentiny/vue'
const qrcodeSrc = 'src/components/FooterView/qrcode.jpg'//二维码地址

const links = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/' },
  { name: '活动中心', path: '/' },
  { name: '海风墙', path: '/' },
  { name: '部门介绍', path: '/'},
  { name: '加入我们', path: '/' }
]

const links_1 = [
  { name: 'contact@techclub.com', path: '/join' },
  { name: '海风学社公众号', path: '/join' },
  { name: '学生活动中心4楼', path: '/join' }
]

</script>

<style scoped>
footer {
  width: 100%;
  background-color: #222;
  color: #fff;
  padding: 30px 0;
}

.footer-container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-section {
  width: 22%;
  margin-bottom: 20px;
}

.footer-section h4 {
  font-size: 16px;
  margin-bottom: 10px;
}

.footer-section p,
.footer-section a {
  font-size: 14px;
  color: #ccc;
  text-decoration: none;
  display: block;
  margin-bottom: 5px;
}

.copyright {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 20px;
}

</style>