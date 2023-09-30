import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Tres from '@tresjs/core'

createApp(App)
  .use(Tres)
  .use(router)
  .mount('#app')
