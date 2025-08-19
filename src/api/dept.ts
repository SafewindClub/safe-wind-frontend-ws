import request from "@/utils/request";
import type { CommonResult } from "./commonType";

export interface Dept {
    /**
     * 部门ID，主键
     */
    id: number;

    /**
     * 部门名称，如：技术部、宣传部等
     */
    name: string;

    /**
     * 部门介绍内容，支持富文本格式
     */
    content: string;

    /**
     * 部门图片
     */
    imageUrl: string;

    /**
     * 创建者用户名
     */
    createBy: string;

    /**
     * 创建时间
     */
    createTime: string;

    /**
     * 更新者用户名
     */
    updateBy: string;

    /**
     * 更新时间
     */
    updateTime: string;
}

export const getAllDepartmentsApi = (): Promise<CommonResult<Dept[]>> => {
    return request.get('/api/ws-department/getAllDepartments')
}

// 查看部门详细
export const getDeptDetailApi = (data: any): Promise<CommonResult<Dept>> => {
    return request.get('/api/ws-department/getDepartmentById', { params: { id: data.id } })
}