// 通用类型
export interface CommonResult<T> {
    code: number;
    message: string;
    success: boolean;
    data: T;
}

// 定义分页类型
export interface PageData {
    pageNum: number;
    pageSize: number;
}

// 定义分页返回类型
export interface PageResult<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
    pages: number;
}