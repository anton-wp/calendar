

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import vClickOutside from "click-outside-vue3"

const app = createApp(App)

app.use(router)
app.use(vClickOutside)
app.use(VueVirtualScroller)
app.use(ElementPlus)

app.mount('#app')

