import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import CMSStore from "./store";
import router from './router'

const store = createStore(CMSStore)
createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
