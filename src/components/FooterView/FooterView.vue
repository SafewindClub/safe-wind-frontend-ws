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
      <div class="footer-section qrcode-section">
        <h4>关注我们</h4>
        <tiny-image
          :src="qrcodeSrc"
          :preview-src-list="[qrcodeSrc]"
          fit="cover"
          class="qrcode-image"
          >
          <template #error>
            <div class="qrcode-placeholder">
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
import { useResponsive } from '@/composables/useResponsive';
import {TinyImage} from '@opentiny/vue'

const { isMobile, isTablet, isDesktop } = useResponsive();

import qrcodeSrc from '@/components/FooterView/qrcode.jpg'//二维码地址

const links = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/' },
  { name: '活动中心', path: '/' },
  { name: '新闻动态', path: '/news' },
  { name: '海风墙', path: '/' },
  { name: '部门介绍', path: '/'},
  { name: '加入我们', path: '/' }
]

const links_1 = [
  // { name: 'contact@techclub.com', path: '/' },
  { name: '海风学社公众号', path: '/' },
  { name: '学生活动中心4楼', path: '/' }
]

</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

footer {
  width: 100%;
  background-color: #222;
  color: #fff;
  padding: 30px 0;
  
  @include mobile {
    padding: 20px 0;
  }
  
  @include tablet {
    padding: 25px 0;
  }
}

.footer-container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  @include mobile {
    width: 95%;
    flex-direction: column;
    gap: 20px;
  }
  
  @include tablet {
    width: 92%;
    gap: 15px;
  }
}

.footer-section {
  width: 22%;
  margin-bottom: 20px;
  
  @include mobile {
    width: 100%;
    margin-bottom: 0;
    text-align: center;
  }
  
  @include tablet {
    width: 48%;
    margin-bottom: 15px;
  }
  
  h4 {
    font-size: 16px;
    margin-bottom: 10px;
    
    @include mobile {
      font-size: 15px;
      margin-bottom: 8px;
    }
    
    @include tablet {
      font-size: 15px;
      margin-bottom: 8px;
    }
  }
  
  p,
  a {
    font-size: 14px;
    color: #ccc;
    text-decoration: none;
    display: block;
    margin-bottom: 5px;
    transition: color 0.3s ease;
    
    @include mobile {
      font-size: 13px;
      margin-bottom: 4px;
    }
    
    @include tablet {
      font-size: 13px;
      margin-bottom: 4px;
    }
    
    &:hover {
      color: #fff;
    }
  }
}

.qrcode-section {
  @include mobile {
    order: -1; // 移动端二维码放在最前面
  }
  
  @include tablet {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
}

.qrcode-image {
  width: 120px !important;
  height: 120px !important;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  
  @include mobile {
    width: 100px !important;
    height: 100px !important;
    border-radius: 6px;
  }
  
  @include tablet {
    width: 110px !important;
    height: 110px !important;
    border-radius: 7px;
  }
}

.qrcode-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #999;
  font-size: 12px;
  
  @include mobile {
    font-size: 11px;
  }
  
  span {
    margin-top: 5px;
    
    @include mobile {
      margin-top: 3px;
    }
  }
}

.copyright {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #333;
  
  @include mobile {
    font-size: 11px;
    margin-top: 15px;
    padding-top: 15px;
  }
  
  @include tablet {
    font-size: 11px;
    margin-top: 18px;
    padding-top: 18px;
  }
}

/* 针对超小屏幕的特殊优化 */
@media (max-width: 480px) {
  footer {
    padding: 15px 0;
  }
  
  .footer-container {
    width: 98%;
    gap: 15px;
  }
  
  .footer-section {
    h4 {
      font-size: 14px;
      margin-bottom: 6px;
    }
    
    p,
    a {
      font-size: 12px;
      margin-bottom: 3px;
    }
  }
  
  .qrcode-image {
    width: 80px !important;
    height: 80px !important;
  }
  
  .qrcode-placeholder {
    font-size: 10px;
  }
  
  .copyright {
    font-size: 10px;
    margin-top: 12px;
    padding-top: 12px;
  }
}

/* 横屏手机优化 */
@media (max-width: 768px) and (orientation: landscape) {
  .footer-container {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .footer-section {
    width: 48%;
    text-align: left;
    margin-bottom: 10px;
  }
  
  .qrcode-section {
    order: 0;
    width: 48%;
    text-align: center;
  }
  
  .qrcode-image {
    width: 80px !important;
    height: 80px !important;
  }
}

/* 平板横屏优化 */
@media (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {
  .footer-container {
    gap: 20px;
  }
  
  .footer-section {
    width: 23%;
    margin-bottom: 10px;
  }
  
  .qrcode-section {
    width: 23%;
    text-align: center;
  }
}

/* 超大屏幕优化 */
@media (min-width: 1400px) {
  .footer-container {
    max-width: 1400px;
    gap: 30px;
  }
  
  .footer-section {
    h4 {
      font-size: 17px;
      margin-bottom: 12px;
    }
    
    p,
    a {
      font-size: 15px;
      margin-bottom: 6px;
    }
  }
  
  .qrcode-image {
    width: 130px !important;
    height: 130px !important;
  }
  
  .copyright {
    font-size: 13px;
    margin-top: 25px;
    padding-top: 25px;
  }
}

/* 打印样式优化 */
@media print {
  footer {
    background-color: #fff !important;
    color: #000 !important;
    padding: 15px 0;
  }
  
  .footer-container {
    flex-direction: column;
    gap: 10px;
  }
  
  .footer-section {
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
  }
  
  .qrcode-section {
    order: 0;
    text-align: center;
  }
  
  .qrcode-image {
    width: 80px !important;
    height: 80px !important;
  }
  
  .copyright {
    border-top: 1px solid #ccc;
    color: #666;
  }
}
</style>