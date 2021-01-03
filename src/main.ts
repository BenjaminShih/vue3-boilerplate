import {
    createApp
} from 'vue';
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import UI from '@/libs/ui'

createApp(App)
    .use(router)
    .use(store)
    .use(UI)
    .mount('#app')