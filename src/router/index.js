import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 路由文件自动配置，不需要手动引用
const requireContext = require.context('./', false, /\.js$/);
let moduleRouter = [];
requireContext.keys().forEach(fileName => {
    // 排除本文件
    if (!/index/g.test(fileName)) {
        let list = requireContext(fileName).default;
        moduleRouter.push(...list);
    }
});
let baerArr = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */'../pages/Home.vue'),
        meta: {
            title: '首页'
        }
    },
];
// 路由错误页面配置
let errorList = [
    {
        path: '/errorpage',
        component: () => import(/* webpackChunkName: "errorpage" */'../pages/ErrorPage.vue'),
        meta: {
            title: '缺省页'
        }
    },
    {
        path: '*',
        redirect: '/errorpage'
    }
];
let routes = [
    ...baerArr,
    ...moduleRouter,
    ...errorList,
];
const index = new VueRouter({
    // mode: 'history',  // hash history
    routes
});
// 路由狗子
index.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
export default index;