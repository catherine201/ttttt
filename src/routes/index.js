import React from 'react';
import Loadable from 'react-loadable';
import Router from 'react-concise-router';
// import Home from '../views/home';
// import Login from '../views/login';
// import Demo from '../views/demo';
// import NotMatch from '../views/404';
// import NProgress from 'NProgress';
import AppLayout from '../components/AppLayout';
import store from '../store';
// const Home = () => import('../views/home');
// const Login = () => import('../views/login');
// const Demo = () => import('../views/demo');
// const NotMatch = () => import('../views/404');
// const AppLayout = () => import('../components/AppLayout');
const Loading = () => <div>Loading...</div>;

const page = name =>
  Loadable({
    loader: () => import(`../views/${name}`),
    loading: Loading
  });

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', component: page('home') },
    { path: '/demo', component: page('demo') },
    { path: '/login', component: page('login') },
    { path: '/register', component: page('register') },
    {
      path: '/admin',
      component: AppLayout,
      name: 'admin-view',
      children: [
        { path: '/', component: page('demo') },
        { path: '/demo', component: page('demo') },
        { path: '/baidu', component: page('iframe') },
        { path: '/aliyun', component: page('iframe') },
        {
          path: '/game',
          name: 'game-view',
          component: page('game'),
          children: [{ path: '/ga', component: page('demo') }]
        },
        // { path: '/redux-demo', component: page('ReduxDemo') },
        // { path: '/model', component: page('Model') },
        // { path: '/components/button', component: page('components/button') },
        // { path: '/components/tabs', component: page('components/tabs') },
        { name: 404, component: page('404') }
      ]
    },
    {
      path: '/personalCenter',
      component: AppLayout,
      name: 'personalCenter-view',
      children: [
        {
          path: '/',
          name: 'info',
          component: page('personalCenter/info')
        }, // 个人信息
        {
          path: '/changePassword',
          name: 'changePassword',
          component: page('personalCenter/changePassword')
        }, // 修改密码
        {
          path: '/binding',
          name: 'binding',
          component: page('personalCenter/binding')
        }, // 绑定
        {
          path: '/safetyCheck',
          name: 'safetyCheck',
          component: page('personalCenter/safetyCheck')
        }, // 安全验证
        {
          path: '/console',
          name: 'console',
          component: page('personalCenter/console')
        }, // 控制台
        {
          path: '/group',
          name: 'group',
          component: page('personalCenter/groupMsg')
        }, // 分组管理
        {
          path: '/menu',
          name: 'menu',
          component: page('personalCenter/menuMsg')
        }, // 菜单管理
        { name: 404, component: page('404') }
      ]
    },
    { name: 404, component: page('404') }
  ]
});

// const modulesContext = require.context('../views/', true, /route\.js$/);
// modulesContext.keys().forEach(element => {
//   console.log(element);
//   // console.log(modulesContext(element).default);
//   routes.push(...modulesContext(element).default);
// });

router.beforeEach = function(ctx, next) {
  console.log(ctx);
  console.log('luyoubianh ');
  // NProgress.start();
  store.dispatch.demo.setCountLoading([]);
  next();
  // next();
  setTimeout(() => {
    // NProgress.done();
  }, 300);
};
export default router;
