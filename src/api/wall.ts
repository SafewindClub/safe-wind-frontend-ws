import request from '../utils/request'
import type { CommonResult } from './commonType'

export interface WallVO {
    /**
     * 弹幕ID
     */
    id: number;

    /**
     * 用户名字
     */
    name: string;

    /**
     * 弹幕内容
     */
    content: string;

    /**
     * 用户头像
     */
    avatar: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 更新时间
     */
    updateTime: string;
}

export interface WallData {
    name: string;
    content: string;
    avatar?: string;
}

// 获取弹幕墙
export const getWallApi = (limit:number): Promise<CommonResult<WallVO[]>> => {
    return request.get("/api/ws-wall/getWalls",{params:{limit:limit}})
}

// 添加弹幕
export const addWallApi = (data: WallData): Promise<CommonResult<WallVO>> => {
    return request.post("/api/ws-wall/addWall", data)
}
