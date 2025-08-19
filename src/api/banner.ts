import request from "@/utils/request";
import type { CommonResult } from './commonType'

export interface Banner {
    /**
     * 横幅ID
     */
    id: number;

    /**
     * 横幅标题
     */
    title: string;

    /**
     * 副标题
     */
    subTitle: string;

    /**
     * 背景图
     */
    backgroundPicture: string;

    /**
     * 创建时间
     */
    createTime: string;
    /**
     * 更新时间
     */
    updateTime: string;
}

export const getAllBannersApi = (): Promise<CommonResult<Banner[]>> => { return request.get('/api/ws-banner/getAllBanners') }