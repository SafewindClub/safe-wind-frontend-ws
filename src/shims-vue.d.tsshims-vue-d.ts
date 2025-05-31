//模块声明，用于让 TypeScript 能够正确识别和处理 Vue 的单文件组件

declare module '*.vue' {            // 声明所有 .vue 文件模块
    import { DefineComponent } from 'vue'  // 从 vue 导入类型工具
    const component: DefineComponent<{}, {}, any>  // 定义组件类型
    export default component          // 声明默认导出类型
}