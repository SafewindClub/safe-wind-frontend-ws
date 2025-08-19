import request from "@/utils/request";
import type { CommonResult,PageData, PageResult } from "./commonType";

// 定义返回类型
export interface WsActivityVO {
    /** 活动ID */
    id: number;
    /** 活动标题 */
    title: string;
    /** 活动简介 */
    brief: string;
    /** 活动详情 */
    introduction: string;
    /** 活动时间 */
    startTime: string; // LocalDateTime 在前端通常用字符串表示
    /** 活动图片 */
    picture: string;
    /**
    * 是否是链接
    */
    isLink: string;
    /**
     * 链接
     */
    externalLink: string;
    /** 创建时间 */
    createTime: string; // LocalDateTime 在前端通常用字符串表示
    /** 更新时间 */
    updateTime: string; // LocalDateTime 在前端通常用字符串表示
}


// 获取近期活动
export const getRecentActivitiesApi = (): Promise<CommonResult<WsActivityVO[]>> => {
    return request.get("/api/ws-activity/getLatestActivities", { params: { limit: 5 } })
}

// 分页查询活动列表
export const getAllActivityApi = (data: PageData): Promise<CommonResult<PageResult<WsActivityVO>>> => {
    return request.get("/api/ws-activity/getAllActivity",
        { params: { pageNum: data.pageNum, pageSize: data.pageSize } })
}

// 根据ID获取活动详情
export const getActivityByIdApi = (id: number): Promise<CommonResult<WsActivityVO>> => {
    return request.get("/api/ws-activity/getActivityById", { params: { id: id } })
}
