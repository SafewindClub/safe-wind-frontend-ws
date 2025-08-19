import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import TinyVue from '@opentiny/vue'

// 导入全局样式
import './styles/global.scss'

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(TinyVue)
app.mount('#app')
