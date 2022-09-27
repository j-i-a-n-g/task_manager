import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@js/htmlFontSize.js'
import { Toast, Dialog } from 'vant'
import 'vant/es/toast/style'

import 'vant/es/dialog/style'
import VueCookies from 'vue-cookies'

createApp(App).config.globalProperties.$cookies = VueCookies

createApp(App).use(store).use(router).use(Toast).use(Dialog).mount('#app')
