// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import pHeader from '@/components/Header';
import pAside from '@/components/Aside';
import locale from 'element-ui/lib/locale/lang/en'


Vue.prototype.$axios = axios;

Vue.use(ElementUI, {locale});

Vue.config.productionTip = false;
Vue.component('icon', Icon);
Vue.component('pHeader', pHeader);
Vue.component('pAside', pAside);

axios.defaults.withCredentials=true;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
