import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { MotionPlugin } from '@vueuse/motion'
//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './interceptors/axios'
import { loadFonts } from './plugins/webfontloader'
import CanvasJSChart from '@canvasjs/vue-charts';


loadFonts()

createApp(App)
  .use(MotionPlugin)
  .use(router)
  .use(store)
  .use(CanvasJSChart)
  .use(vuetify)
  .mount('#app')
