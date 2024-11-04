// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(ElementPlus, VueAxios, axios)
app.mount('#app')