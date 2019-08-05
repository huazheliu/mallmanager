import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import Home from '../components/home/home'
import Users from '../components/users/users'
import Right from '../components/rights/right'
import Role from '../components/rights/roles'
import { Message } from 'element-ui';

Vue.use(Router);

const router =new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:Login,
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children:[
        {
          name:'users',
          path:'users',
          component:Users,
        },{
          name:'right',
          path: '/rights',
          component: Right,
        },{
          name:'roles',
          path:'/roles',
          component:Role,
        }
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  //console.log(to,from);
  if(to.path==='/login'){
    next();
  }else{
    const token=localStorage.getItem('token');
    if(!token){
      Message.warning('请先登录');
      router.push({name:'login'});
    }else{
      next();
    }
  }
});

export default router;
