const book = [
    {
        path: '/book',
        component: () => import(/* webpackChunkName: "book" */'../pages/book/Index.vue'),
        meta: {
            title: '书籍'
        }
    },
    {
        path: '/bookDetail',
        component: () => import(/* webpackChunkName: "book" */'../pages/book/BookDetail.vue'),
        meta: {
            title: '书本详情'
        }
    },
    {
        path: '/price',
        component: () => import(/* webpackChunkName: "book" */'../pages/book/Price.vue'),
        meta: {
            title: '书本价格'
        }
    },
];
export default book;