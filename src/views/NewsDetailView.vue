<template>
    <tiny-container pattern="classic" footer-height="0">
        <template #header>
            <HeaderView />
        </template>
        <template #default class="main-content">
            <div class="news-detail-page">
                <div class="responsive-container">
                    <div class="back-button" @click="goBack">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        {{ isMobile ? '返回' : '返回列表' }}
                    </div>

                    <div v-if="loading" class="loading">
                        <div class="spinner"></div>
                        <p>加载中...</p>
                    </div>

                    <div v-else-if="newsDetail" class="content-layout">
                        <!-- 左侧内容区 -->
                        <div class="main-content">
                            <div class="news-header">
                                <h1 class="news-title responsive-title">{{ newsDetail.title }}</h1>
                                <div class="news-meta">
                                    <span class="publish-time">
                                        {{ isMobile ? '时间' : '发布时间' }}：{{ formatDate(newsDetail.publishTime) }}
                                    </span>
                                    <span class="update-time">
                                        {{ isMobile ? '更新' : '更新时间' }}：{{ formatDate(newsDetail.updateTime) }}
                                    </span>
                                </div>
                            </div>

                            <div class="news-body">
                                <div class="news-introduction">
                                    <div v-if="newsDetail.htmlContent" v-html="newsDetail.htmlContent"></div>
                                    <div v-else class="plain-content">{{ newsDetail.htmlContent }}</div>
                                </div>
                            </div>
                        </div>

                        <!-- 右侧最近新闻区 -->
                        <div class="sidebar" :class="{ 'show': showSidebar }">
                            <div class="recent-news">
                                <h3 class="sidebar-title">
                                    {{ isMobile ? '相关新闻' : '最近新闻' }}
                                </h3>
                                <div class="news-list">
                                    <div 
                                        v-for="news in recentNews" 
                                        :key="news.id"
                                        class="news-item"
                                        @click="goToNews(news)"
                                    >
                                        <div class="news-item-image" v-if="news.coverImg">
                                            <img :src="news.coverImg" :alt="news.title" />
                                        </div>
                                        <div class="news-item-content">
                                            <h4 class="news-item-title">{{ news.title }}</h4>
                                            <p class="news-item-time">{{ formatDate(news.publishTime) }}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div v-if="recentNews.length === 0" class="no-news">
                                    <p>暂无其他新闻</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 移动端侧边栏切换按钮 -->
                        <div v-if="isMobile && recentNews.length > 0" class="mobile-sidebar-toggle" @click="toggleSidebar">
                            <span>{{ showSidebar ? '隐藏相关新闻' : '显示相关新闻' }}</span>
                            <svg :class="{ 'rotated': showSidebar }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                    </div>

                    <div v-else class="error">
                        <p>新闻不存在或已被删除</p>
                    </div>
                </div>
            </div>
            <FooterView />
        </template>
    </tiny-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useResponsive } from '@/composables/useResponsive';
import { getNewsById, getLatestNewsApi } from '@/api/news';
import HeaderView from '@/components/HeaderView/HeaderView.vue';
import FooterView from "@/components/FooterView/FooterView.vue";
import { TinyContainer } from "@opentiny/vue";

const route = useRoute();
const router = useRouter();
const { isMobile, isTablet, isDesktop } = useResponsive();

const newsDetail = ref(null);
const recentNews = ref([]);
const loading = ref(true);
const showSidebar = ref(true); // 默认显示侧边栏

const getNewsDetail = async () => {
    try {
        loading.value = true;
        const res = await getNewsById({
            id: Number(route.params.id)
        });
        if (res.success) {
            newsDetail.value = res.data;
        }
    } catch (error) {
        console.error('获取新闻详情失败:', error);
    } finally {
        loading.value = false;
    }
};

const getRecentNews = async () => {
    try {
        const res = await getLatestNewsApi(5);
        if (res.success) {
            // 过滤掉当前新闻，取前5个作为最近新闻
            const currentId = Number(route.params.id);
            const newsData = res.data.data || res.data;
            const news = newsData
                .filter(news => news.id !== currentId)
                .slice(0, 5);
            recentNews.value = news;
            
            // 桌面端默认显示侧边栏，移动端默认隐藏
            showSidebar.value = !isMobile.value;
        }
    } catch (error) {
        console.error('获取最近新闻失败:', error);
    }
};

const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
};

const goBack = () => {
    // 直接跳转到新闻列表页面，不返回历史
    router.push('/news');
};

const goToNews = (news) => {
    // 判断是否为外链接
    if (news.isLink === '1') {
        // 外链接，在新窗口打开
        window.open(news.externalLink, '_blank');
    } else {
        // 内部链接，使用 replace 替换当前路由，不加入历史记录
        router.replace(`/news/${news.id}`);
        // 移动端切换新闻时隐藏侧边栏
        if (isMobile.value) {
            showSidebar.value = false;
        }
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    
    // 移动端只显示日期，桌面端显示完整日期时间
    return isMobile.value ? dateStr : `${dateStr} ${timeStr}`;
};

// 监听路由参数变化，只在首次加载时获取数据
let isInitialLoad = true;

onMounted(() => {
    getNewsDetail();
    getRecentNews();
    isInitialLoad = false;
});

// 监听路由变化，但不重新获取数据
watch(() => route.params.id, (newId, oldId) => {
    if (newId !== oldId && !isInitialLoad) {
        // 路由变化时，只更新当前新闻ID，不重新获取数据
        // 这里可以添加一些状态更新逻辑，比如高亮当前新闻等
    }
});
</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

.main-content {
    width: 100%;
}

.news-detail-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    padding: 20px 0;
    
    @include mobile {
        padding: 15px 0;
    }
}

.back-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: white;
    cursor: pointer;
    margin-bottom: 30px;
    padding: 10px 0;
    font-weight: 500;
    transition: color 0.3s ease;
    
    @include mobile {
        margin-bottom: 20px;
        padding: 8px 0;
        font-size: 14px;
    }
    
    &:hover {
        color: #f0f0f0;
    }
    
    svg {
        width: 20px;
        height: 20px;
        
        @include mobile {
            width: 18px;
            height: 18px;
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

/* 左右分栏布局 */
.content-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 30px;
    align-items: start;
    
    @include mobile {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    @include tablet {
        grid-template-columns: 1fr 280px;
        gap: 25px;
    }
}

/* 左侧主内容区 */
.main-content {
    background: white;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    @include mobile {
        padding: 20px;
        border-radius: 10px;
    }
    
    @include tablet {
        padding: 30px;
    }
}

.news-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
    
    @include mobile {
        margin-bottom: 20px;
        padding-bottom: 15px;
    }
}

.news-title {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 15px;
    line-height: 1.3;
    
    @include mobile {
        font-size: 1.5rem;
        margin-bottom: 12px;
        line-height: 1.4;
    }
    
    @include tablet {
        font-size: 1.8rem;
    }
}

.news-meta {
    display: flex;
    gap: 20px;
    color: #666;
    font-size: 14px;
    
    @include mobile {
        flex-direction: column;
        gap: 8px;
        font-size: 13px;
    }
    
    @include tablet {
        gap: 15px;
    }
}

.news-body {
    line-height: 1.8;
    color: #333;
    font-size: 16px;
    
    @include mobile {
        font-size: 15px;
        line-height: 1.7;
    }
}

.news-introduction {
    margin-bottom: 20px;
    
    @include mobile {
        margin-bottom: 15px;
    }
    
    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
        margin: 20px 0 10px;
        color: #333;
        
        @include mobile {
            margin: 15px 0 8px;
        }
    }
    
    :deep(p) {
        margin-bottom: 15px;
        
        @include mobile {
            margin-bottom: 12px;
        }
    }
    
    :deep(img) {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 15px 0;
        
        @include mobile {
            border-radius: 6px;
            margin: 12px 0;
        }
    }
    
    :deep(a) {
        color: #4facfe;
        text-decoration: none;
        
        &:hover {
            text-decoration: underline;
        }
    }
}

.plain-content {
    white-space: pre-wrap;
}

/* 右侧边栏 */
.sidebar {
    position: sticky;
    top: 20px;
    
    @include mobile {
        position: static;
        order: 2;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: all 0.3s ease;
        
        &.show {
            max-height: 1000px;
            opacity: 1;
        }
    }
}

.recent-news {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    @include mobile {
        padding: 20px;
        border-radius: 10px;
    }
    
    @include tablet {
        padding: 22px;
    }
}

.sidebar-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #4facfe;
    
    @include mobile {
        font-size: 1.1rem;
        margin-bottom: 15px;
        padding-bottom: 8px;
    }
}

.news-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    @include mobile {
        gap: 12px;
    }
}

.news-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    
    @include mobile {
        padding: 10px;
        gap: 10px;
    }
    
    &:hover {
        background: #f8f9fa;
        border-color: #e9ecef;
        transform: translateY(-2px);
        
        @include mobile {
            transform: translateY(-1px);
        }
    }
}

.news-item-image {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    overflow: hidden;
    flex-shrink: 0;
    
    @include mobile {
        width: 50px;
        height: 50px;
        border-radius: 5px;
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.news-item-content {
    flex: 1;
    min-width: 0;
}

.news-item-title {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 6px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
    @include mobile {
        font-size: 13px;
        margin-bottom: 4px;
        -webkit-line-clamp: 2;
    }
}

.news-item-time {
    font-size: 12px;
    color: #666;
    
    @include mobile {
        font-size: 11px;
    }
}

.no-news {
    text-align: center;
    padding: 30px 0;
    color: #999;
    
    @include mobile {
        padding: 20px 0;
    }
}

.error {
    text-align: center;
    padding: 60px 0;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    
    @include mobile {
        padding: 40px 0;
        border-radius: 10px;
    }
}

/* 移动端侧边栏切换按钮 */
.mobile-sidebar-toggle {
    display: none;
    
    @include mobile {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: white;
        color: #4facfe;
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        margin-top: 15px;
        
        &:hover {
            background: #f8f9fa;
            transform: translateY(-1px);
        }
        
        svg {
            width: 16px;
            height: 16px;
            transition: transform 0.3s ease;
            
            &.rotated {
                transform: rotate(180deg);
            }
        }
    }
}

/* 针对超小屏幕的特殊优化 */
@media (max-width: 480px) {
    .news-detail-page {
        padding: 10px 0;
    }
    
    .main-content {
        padding: 15px;
    }
    
    .news-title {
        font-size: 1.4rem;
    }
    
    .news-meta {
        font-size: 12px;
    }
    
    .news-body {
        font-size: 14px;
    }
    
    .recent-news {
        padding: 15px;
    }
    
    .news-item {
        padding: 8px;
    }
    
    .news-item-image {
        width: 45px;
        height: 45px;
    }
}

/* 横屏手机优化 */
@media (max-width: 768px) and (orientation: landscape) {
    .news-detail-page {
        padding: 10px 0;
    }
    
    .main-content {
        padding: 15px;
    }
    
    .news-header {
        margin-bottom: 15px;
        padding-bottom: 10px;
    }
    
    .news-introduction {
        margin-bottom: 10px;
    }
}

/* 平板横屏优化 */
@media (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {
    .content-layout {
        grid-template-columns: 1fr 250px;
        gap: 20px;
    }
    
    .main-content {
        padding: 25px;
    }
    
    .recent-news {
        padding: 20px;
    }
}
</style>