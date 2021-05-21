const food = [
    {
        path: '/food',
        component: () => import(/* webpackChunkName: "food" */'../pages/food/Index.vue'),
        meta: {
            title: '食物'
        }
    },
];
export default food;