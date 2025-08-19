import request from '../utils/request'
import type { CommonResult, PageData, PageResult } from './commonType'

// 设置返回值
export interface NewsVO {
    /**
     * 新闻ID
     */
    id: number;

    /**
     * 新闻标题
     */
    title: string;

    /**
     * 发布时间
     */
    publishTime: string;

    /**
     * 新闻内容
     */
    content: string;

    /**
     * 新闻内容/html
     */
    htmlContent: string;

    /**
     * 封面图片
     */
    coverImg: string;

    /**
     * 是否是链接
     */
    is_link: string;
    /**
     * 链接
     */
    external_link: string;
    
    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 更新时间
     */
    updateTime: string;
}

// 首页查看最新新闻
export const getLatestNewsApi = (data: any): Promise<CommonResult<NewsVO[]>> => {
    return request.get("/api/ws-news/getLatestNews",
        {
            params: {
                limit: data.limit
            }
        }
    )
}

// 所有新闻详情-分页查询
export const getAllNewsApi = (data: any): Promise<CommonResult<PageResult<NewsVO>>> => {
    return request.get("/api/ws-news/getAllNews", {
        params: {
            pageNum: data.pageNum,
            pageSize: data.pageSize
        }
    })
}

// 根据ID获取新闻详情
export const getNewsById = (data: any): Promise<CommonResult<NewsVO>> => {
    return request.get("/api/ws-news/getNewsById", { params: { id: data.id } })
}