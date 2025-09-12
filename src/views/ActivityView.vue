<template>
    <tiny-container pattern="classic" footer-height="0">
        <template #header>
            <HeaderView />
        </template>
        <template #default class="main-content">
            <div class="activity-page">
                <div class="header">
                    <h1 class="responsive-title">活动中心</h1>
                    <p class="responsive-text">参与海风学社精彩活动，展现你的才华</p>
                </div>

                <div class="responsive-container">
                    <div v-if="loading" class="loading">
                        <div class="spinner"></div>
                        <p>加载中...</p>
                    </div>

                    <div v-else class="activity-grid">
                        <div v-for="activity in activityList" :key="activity.id" class="activity-card"
                            @click="handleActivityClick(activity)">
                            <div class="activity-image">
                                <img :src="activity.picture" :alt="activity.title" />
                                <div class="activity-badge" v-if="activity.isLink === '1'">
                                    {{ isMobile ? '外链' : '外部链接' }}
                                </div>
                            </div>
                            <div class="activity-content">
                                <div class="activity-date">{{ formatDate(activity.startTime) }}</div>
                                <h3 class="activity-title">{{ activity.title }}</h3>
                                <p class="activity-summary">{{ truncateContent(activity.brief) }}</p>
                                <div class="activity-action">
                                    <span class="read-more">
                                        {{ activity.isLink === '1' ? (isMobile ? '查看' : '查看原文') : (isMobile ? '详情' : '查看详情') }}
                                    </span>
                                    <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 分页组件 -->
                    <div class="pagination" v-if="total > 0">
                        <button class="page-btn btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
                            {{ isMobile ? '上页' : '上一页' }}
                        </button>
                        <span class="page-info">
                            <template v-if="isMobile">
                                {{ currentPage }}/{{ totalPages }}
                            </template>
                            <template v-else>
                                第 {{ currentPage }} 页，共 {{ totalPages }} 页 (共{{ total }}条)
                            </template>
                        </span>
                        <button class="page-btn btn" :disabled="currentPage === totalPages"
                            @click="changePage(currentPage + 1)">
                            {{ isMobile ? '下页' : '下一页' }}
                        </button>
                    </div>
                </div>
            </div>
            <FooterView />
        </template>
    </tiny-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useResponsive } from '@/composables/useResponsive';
import { getAllActivityApi } from '@/api/activity';
import HeaderView from '@/components/HeaderView/HeaderView.vue';
import FooterView from "@/components/FooterView/FooterView.vue";
import { TinyContainer } from "@opentiny/vue";

const router = useRouter();
const { isMobile, isTablet, isDesktop } = useResponsive();

const activityList = ref([]);
const currentPage = ref(1);
const pageSize = ref(6);
const total = ref(0);
const loading = ref(false);

const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

const adjustPageSize = () => {
    if (isMobile.value) {
        pageSize.value = 4;
    } else {
        pageSize.value = 6;
    }
};

const getActivityList = async () => {
    loading.value = true;
    try {
        const res = await getAllActivityApi({
            pageNum: currentPage.value,
            pageSize: pageSize.value
        });
        if (res.success) {
            console.log('活动列表数据:', res.data);
            activityList.value = res.data.data || res.data;
            total.value = res.data.totalSize || res.data.total || res.data.length;
            console.log('总数:', total.value, '总页数:', totalPages.value, '每页显示:', pageSize.value);
        }
    } catch (error) {
        console.error('获取活动列表失败:', error);
    } finally {
        loading.value = false;
    }
};

const changePage = (page) => {
    currentPage.value = page;
    getActivityList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleActivityClick = (activity) => {
    if (activity.isLink === '1' && activity.externalLink) {
        window.open(activity.externalLink, '_blank');
    } else {
        router.push(`/activity/${activity.id}`);
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const truncateContent = (content) => {
    if (!content) return '';
    const maxLength = isMobile.value ? 60 : isTablet.value ? 80 : 100;
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
};

onMounted(() => {
    adjustPageSize();
    getActivityList();
});
</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

.main-content {
    width: 100%;
}

.activity-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    padding: 20px 0;
    
    @include mobile {
        padding: 15px 0;
    }
}

.header {
    text-align: center;
    color: white;
    margin-bottom: 40px;
    padding: 40px 20px;
    
    @include mobile {
        margin-bottom: 20px;
        padding: 20px 15px;
    }
    
    @include tablet {
        margin-bottom: 30px;
        padding: 30px 20px;
    }
    
    h1 {
        font-size: 2.5rem;
        margin-bottom: 10px;
        font-weight: 700;
        
        @include mobile {
            font-size: 1.8rem;
            margin-bottom: 8px;
        }
        
        @include tablet {
            font-size: 2.2rem;
        }
    }
    
    p {
        font-size: 1.1rem;
        opacity: 0.9;
        
        @include mobile {
            font-size: 0.95rem;
        }
        
        @include tablet {
            font-size: 1rem;
        }
    }
}

.loading {
    text-align: center;
    padding: 60px 0;
    color: white;
    
    @include mobile {
        padding: 40px 0;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
        
        @include mobile {
            width: 32px;
            height: 32px;
            border-width: 3px;
            margin-bottom: 15px;
        }
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.activity-grid {
    display: grid;
    gap: 30px;
    margin-bottom: 40px;

    @include mobile {
        grid-template-columns: 1fr;
        gap: 20px;
        margin-bottom: 30px;
    }
    
    @include tablet {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
    }
}

.activity-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    
    @include mobile {
        border-radius: 10px;
        box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
    }
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        
        @include mobile {
            transform: translateY(-4px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
        }
        
        .activity-image img {
            transform: scale(1.05);
        }
        
        .arrow-icon {
            transform: translateX(4px);
        }
    }
}

.activity-image {
    position: relative;
    height: 200px;
    overflow: hidden;
    
    @include mobile {
        height: 180px;
    }
    
    @include tablet {
        height: 190px;
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
}

.activity-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.95);
    color: #4facfe;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    backdrop-filter: blur(10px);
    
    @include mobile {
        top: 8px;
        right: 8px;
        padding: 3px 6px;
        font-size: 11px;
        border-radius: 3px;
    }
}

.activity-content {
    padding: 20px;
    
    @include mobile {
        padding: 15px;
    }
    
    @include tablet {
        padding: 18px;
    }
}

.activity-date {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
    
    @include mobile {
        font-size: 11px;
        margin-bottom: 8px;
    }
}

.activity-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
    @include mobile {
        font-size: 16px;
        margin-bottom: 10px;
        -webkit-line-clamp: 2;
    }
    
    @include tablet {
        font-size: 17px;
    }
}

.activity-summary {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
    @include mobile {
        font-size: 13px;
        margin-bottom: 12px;
        -webkit-line-clamp: 2;
        line-height: 1.5;
    }
    
    @include tablet {
        -webkit-line-clamp: 2;
    }
}

.activity-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.read-more {
    color: #4facfe;
    font-size: 14px;
    font-weight: 500;
    
    @include mobile {
        font-size: 13px;
    }
}

.arrow-icon {
    width: 16px;
    height: 16px;
    color: #4facfe;
    transition: transform 0.3s ease;
    
    @include mobile {
        width: 14px;
        height: 14px;
    }
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
    padding: 20px 0;
    
    @include mobile {
        flex-direction: column;
        gap: 15px;
        margin-top: 30px;
        padding: 15px 0;
    }
    
    @include tablet {
        gap: 15px;
        margin-top: 35px;
    }
}

.page-btn {
    background: white;
    border: 2px solid #4facfe;
    color: #4facfe;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    font-size: 14px;
    
    @include mobile {
        padding: 8px 16px;
        font-size: 13px;
        border-radius: 6px;
        min-width: 80px;
    }
    
    &:hover:not(:disabled) {
        background: #4facfe;
        color: white;
        transform: translateY(-2px);
        
        @include mobile {
            transform: none;
        }
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        
        &:hover {
            transform: none;
        }
    }
}

.page-info {
    color: white;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    
    @include mobile {
        font-size: 13px;
        order: -1;
    }
}

</style>