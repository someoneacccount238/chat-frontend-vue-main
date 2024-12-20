import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import router from './router'

import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            userName: '',
            userEmail: ''
        }
    }
})

const app = createApp(App)
app.use(router)

app.use(store)
app.mount('#app')