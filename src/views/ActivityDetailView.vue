<template>
    <tiny-container pattern="classic" footer-height="0">
        <template #header>
            <HeaderView />
        </template>
        <template #default class="main-content">
            <div class="activity-detail-page">
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

                    <div v-else-if="activityDetail" class="content-layout">
                        <!-- 左侧内容区 -->
                        <div class="main-content">
                            <div class="activity-header">
                                <h1 class="activity-title responsive-title">{{ activityDetail.title }}</h1>
                                <div class="activity-meta">
                                    <span class="start-time">
                                        {{ isMobile ? '时间' : '活动时间' }}：{{ formatDate(activityDetail.startTime) }}
                                    </span>
                                    <span class="update-time">
                                        {{ isMobile ? '更新' : '更新时间' }}：{{ formatDate(activityDetail.updateTime) }}
                                    </span>
                                </div>
                            </div>

                            <div class="activity-body">
                                <div class="activity-introduction">
                                    <div v-if="activityDetail.introduction" v-html="activityDetail.introduction"></div>
                                    <div v-else class="plain-content">{{ activityDetail.introduction }}</div>
                                </div>
                            </div>
                        </div>

                        <!-- 右侧最近活动区 -->
                        <div class="sidebar" :class="{ 'show': showSidebar }">
                            <div class="recent-activities">
                                <h3 class="sidebar-title">
                                    {{ isMobile ? '相关活动' : '最近活动' }}
                                </h3>
                                <div class="activity-list">
                                    <div 
                                        v-for="activity in recentActivities" 
                                        :key="activity.id"
                                        class="activity-item"
                                        @click="goToActivity(activity)"
                                    >
                                        <div class="activity-item-image" v-if="activity.picture">
                                            <img :src="activity.picture" :alt="activity.title" />
                                        </div>
                                        <div class="activity-item-content">
                                            <h4 class="activity-item-title">{{ activity.title }}</h4>
                                            <p class="activity-item-time">{{ formatDate(activity.startTime) }}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div v-if="recentActivities.length === 0" class="no-activities">
                                    <p>暂无其他活动</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 移动端侧边栏切换按钮 -->
                        <div v-if="isMobile && recentActivities.length > 0" class="mobile-sidebar-toggle" @click="toggleSidebar">
                            <span>{{ showSidebar ? '隐藏相关活动' : '显示相关活动' }}</span>
                            <svg :class="{ 'rotated': showSidebar }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                    </div>

                    <div v-else class="error">
                        <p>活动不存在或已被删除</p>
                    </div>
                </div>
            </div>
            <FooterView />
        </template>
    </tiny-container>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useResponsive} from '@/composables/useResponsive';
import {getActivityByIdApi, getRecentActivitiesApi} from '@/api/activity';
import HeaderView from '@/components/HeaderView/HeaderView.vue';
import FooterView from "@/components/FooterView/FooterView.vue";
import {TinyContainer} from "@opentiny/vue";

const route = useRoute();
const router = useRouter();
const { isMobile } = useResponsive();

const activityDetail = ref(null);
const recentActivities = ref([]);
const loading = ref(true);
const showSidebar = ref(true); // 默认显示侧边栏

const getActivityDetail = async () => {
    try {
        loading.value = true;
        const res = await getActivityByIdApi(Number(route.params.id));
        if (res.success) {
            activityDetail.value = res.data;
        }
    } catch (error) {
        console.error('获取活动详情失败:', error);
    } finally {
        loading.value = false;
    }
};

const getRecentActivities = async () => {
    try {
        const res = await getRecentActivitiesApi();
        if (res.success) {
            const currentId = Number(route.params.id);
          recentActivities.value = res.data.filter(activity => activity.id !== currentId).slice(0, 5);
            showSidebar.value = !isMobile.value;
        }
    } catch (error) {
        console.error('获取最近活动失败:', error);
    }
};

const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
};

const goBack = () => {
    router.push('/activity');
};

const goToActivity = (activity) => {
    if (activity.isLink === '1') {
        window.open(activity.externalLink, '_blank');
    } else {
        router.replace(`/activity/${activity.id}`);
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
    return isMobile.value ? dateStr : `${dateStr} ${timeStr}`;
};



onMounted(() => {
    getActivityDetail();
    getRecentActivities();
});


</script>

<style lang="scss" scoped>
@use '@/styles/responsive' as *;

.main-content {
    width: 100%;
}

.activity-detail-page {
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

.activity-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
    
    @include mobile {
        margin-bottom: 20px;
        padding-bottom: 15px;
    }
}

.activity-title {
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

.activity-meta {
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

.activity-body {
    line-height: 1.8;
    color: #333;
    font-size: 16px;
    
    @include mobile {
        font-size: 15px;
        line-height: 1.7;
    }
}

.activity-introduction {
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

.recent-activities {
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

.activity-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    @include mobile {
        gap: 12px;
    }
}

.activity-item {
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

.activity-item-image {
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

.activity-item-content {
    flex: 1;
    min-width: 0;
}

.activity-item-title {
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

.activity-item-time {
    font-size: 12px;
    color: #666;
    
    @include mobile {
        font-size: 11px;
    }
}

.no-activities {
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
    .activity-detail-page {
        padding: 10px 0;
    }
    
    .main-content {
        padding: 15px;
    }
    
    .activity-title {
        font-size: 1.4rem;
    }
    
    .activity-meta {
        font-size: 12px;
    }
    
    .activity-body {
        font-size: 14px;
    }
    
    .recent-activities {
        padding: 15px;
    }
    
    .activity-item {
        padding: 8px;
    }
    
    .activity-item-image {
        width: 45px;
        height: 45px;
    }
}

/* 横屏手机优化 */
@media (max-width: 768px) and (orientation: landscape) {
    .activity-detail-page {
        padding: 10px 0;
    }
    
    .main-content {
        padding: 15px;
    }
    
    .activity-header {
        margin-bottom: 15px;
        padding-bottom: 10px;
    }
    
    .activity-introduction {
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
    
    .recent-activities {
        padding: 20px;
    }
}
</style>