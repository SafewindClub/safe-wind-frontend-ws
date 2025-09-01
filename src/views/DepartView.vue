<template>
  <tiny-container pattern="classic" footer-height="0">
    <template #header>
      <HeaderView />
    </template>

    <template #default class="main-content">
      <div class="join-page">
        <div class="header-section">
          <h1 class="page-title">加入我们</h1>
          <p class="page-subtitle">探索海风学社的各个部门，找到属于你的技术舞台(点击部门获取二维码)</p>
        </div>

        <div class="departments-section">
          <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>正在加载信息...</p>
          </div>

          <div v-else class="depart-grid">
            <div
                v-for="(depart, index) in departs"
                :key="depart.id || index"
                class="depart-card"
                @click="showQRCode(depart.qrCode)"
                @mouseenter="hoveredDepartIndex = index"
                @mouseleave="hoveredDepartIndex = null"
            >
              <div class="depart-bg-image" :style="{ backgroundImage: `url(${depart.imageUrl})` }"></div>
              <div v-if="hoveredDepartIndex !== index" class="depart-default-view">
                <div class="depart-name">{{ depart.name }}</div>
              </div>
              <div v-else class="depart-hover-view">
                <div class="depart-details">
                  <h3 class="depart-fullname">{{ depart.name }}</h3>
                  <p class="depart-description">{{ depart.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="showQRCodeModal" class="qr-modal" @click="showQRCodeModal = false">
          <div class="qr-content" @click.stop>
            <img :src="currentQRCode" alt="二维码" class="qr-image">
            <button class="close-btn" @click="showQRCodeModal = false">×</button>
          </div>
        </div>
      </div>
      <FooterView />
    </template>
    <template #footer>
    </template>
  </tiny-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderView from '@/components/HeaderView/HeaderView.vue';
import FooterView from "@/components/FooterView/FooterView.vue";
import { TinyContainer } from "@opentiny/vue";

const departs = ref([
  {
    id: 1,
    name: '软件部',
    imageUrl: 'https://tu.ltyuanfang.cn/api/fengjing.php',
    description: '负责学社的技术研发和项目管理工作，包括前端开发、后端开发和移动端开发等方向。',
    qrCode: '/public/qrcode.jpg'
  },
  {
    id: 2,
    name: '设计部',
    imageUrl: 'https://tu.ltyuanfang.cn/api/fengjing.php',
    description: '负责学社的视觉设计和用户体验工作，包括UI设计、平面设计和视频制作等方向。',
    qrCode: '/public/qrcode.jpg'
  },
  {
    id: 3,
    name: '维修部',
    imageUrl: 'https://tu.ltyuanfang.cn/api/fengjing.php',
    description: '负责学社的设备维护和技术支持工作，包括硬件设备管理和软件故障排除等方向。',
    qrCode: '/public/qrcode.jpg'
  },
  {
    id: 4,
    name: '新媒体部',
    imageUrl: 'https://tu.ltyuanfang.cn/api/fengjing.php',
    description: '负责学社的新媒体运营和内容创作工作，包括社交媒体管理、视频制作和内容策划等方向。',
    qrCode: '/public/qrcode.jpg'
  },
  {
    id: 5,
    name: '人工智能部',
    imageUrl: 'https://tu.ltyuanfang.cn/api/fengjing.php',
    description: '负责学社的人工智能研究和应用开发工作，包括机器学习、深度学习和自然语言处理等方向。',
    qrCode: '/public/qrcode.jpg'
  },
  {
    id: 6,
    name: '网络部',
    imageUrl: 'https://tu.ltyuanfang.cn/api/fengjing.php',
    description: '负责学社的网络建设和网络安全工作，包括网络架构设计、网络安全防护和服务器管理等方向。',
    qrCode: '/public/qrcode.jpg'
  },
  {
    id: 7,
    name: '移动开发部',
    imageUrl: 'https://tu.ltyuanfang.cn/api/fengjing.php',
    description: '负责学社的移动应用开发和跨平台开发工作，包括iOS、Android和混合应用开发等方向。',
    qrCode: '/public/qrcode.jpg'
  }
]);

const loading = ref(false);
const hoveredDepartIndex = ref(null);
const showQRCodeModal = ref(false);
const currentQRCode = ref('');

const showQRCode = (qrCode) => {
  currentQRCode.value = qrCode;
  showQRCodeModal.value = true;
};

onMounted(() => {
  document.title = '加入我们 - 海风学社';
});
</script>

<style lang="scss" scoped>
/* 电脑端样式保持不变 */
.join-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  padding: 30px 20px;

  .header-section {
    text-align: center;
    color: white;
    margin-bottom: 50px;

    .page-title {
      font-size: 2.5rem;
      margin-bottom: 15px;
      font-weight: 700;
    }

    .page-subtitle {
      font-size: 1.1rem;
      opacity: 0.9;
    }
  }

  .depart-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: center;
    margin: 0 auto;
    max-width: 1200px;
  }

  .depart-card {
    width: calc(25% - 20px);
    aspect-ratio: 3/4;
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }
    .depart-bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      z-index: 1;
    }
    .depart-default-view {
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding: 25px;
      z-index: 2;

      .depart-name {
        font-size: 1.3rem;
        font-weight: 600;
        color: white;
        margin-bottom: 10px;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      }
    }
    .depart-hover-view {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.95);
      display: flex;
      flex-direction: column;
      padding: 25px;
      z-index: 3;
      clip-path: inset(0 0 0 0 round 15px);

      .depart-details {
        flex: 1;
        display: flex;
        flex-direction: column;

        .depart-fullname {
          font-size: 1.4rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }

        .depart-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.5;
          flex: 1;
          overflow: hidden;
        }
      }
    }
  }

  .qr-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
  }

  .qr-content {
    background: white;
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    max-height: 500px;
    position: relative;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  .qr-image {
    width: 400px;
    height: 400px;
    margin-bottom: 25px;
    object-fit: contain;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(0, 0, 0, 0.1);
    color: #666;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      color: #333;
      transform: scale(1.1);
    }
  }
}

.loading-container {
  text-align: center;
  padding: 50px 20px;
  color: white;

  .loading-spinner {
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 3px solid white;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin: 0 auto 15px;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 767px) {
  .join-page {
    padding: 20px 15px;

    .header-section {
      margin-bottom: 30px;

      .page-title {
        font-size: 2rem;
        margin-bottom: 10px;
      }

      .page-subtitle {
        font-size: 0.95rem;
      }
    }

    .depart-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      max-width: 100%;
    }

    .depart-card {
      width: 100%;
      height: 180px;
      aspect-ratio: unset;

      .depart-default-view {
        padding: 20px;
        justify-content: center;

        .depart-name {
          font-size: 1.2rem;
        }
      }

      .depart-hover-view {
        padding: 15px;

        .depart-fullname {
          font-size: 1.2rem;
        }

        .depart-description {
          font-size: 0.9rem;
          -webkit-line-clamp: 4;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }

    .qr-content {
      padding: 20px;
      max-width: 300px;
    }

    .qr-image {
      width: 100%;
      height: auto;
      max-height: 300px;
    }

    .close-btn {
      width: 30px;
      height: 30px;
      font-size: 20px;
    }
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .join-page {
    .depart-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .depart-card {
      width: calc(50% - 15px);
    }
  }
}
</style>