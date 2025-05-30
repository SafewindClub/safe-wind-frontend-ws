import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import TinyVue from '@opentiny/vue'





const app = createApp(App)
app.use(TinyVue)
app.mount('#app')
