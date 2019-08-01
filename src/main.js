// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from "moment";
import MyBread from "./components/cuscom/myBread";

//导入并使用element插件，不要忘记引入样式文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入axios开发插件
import MyHttpServer from "./plugins/http";
Vue.use(MyHttpServer);

//引入自定义样式表
import './components/css/reset.css'


Vue.config.productionTip = false;


//全局时间过滤器
Vue.filter('fmtdate',(v)=>{
    return moment(v).format('YYYY-MM-DD');
});

//全局自定义组件
Vue.component(MyBread.name,MyBread);
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
