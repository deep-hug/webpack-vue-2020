<template>
    <div>
        <!-- 我是book -->
        <ul>
            <li v-for="(item, index) in bookList" :key="index" @click="goToBookDetail(item)">
                {{item}}
            </li>
        </ul>
        <ul>
            <li v-for="(item, index) in bookPrice" :key="index" @click="goToBookPrice(item)">{{item}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            bookList: ['西游记', '红楼梦', '水浒传', '三国演义'],
            bookPrice: [10,20,30,40]
        };
    },
    methods: {
        goToBookDetail(item) {
            this.$router.push({path: '/bookDetail', query: {item}});
        },
        goToBookPrice(item) {
            this.$router.push({path: '/price', query: {price: item}});
        }
    }
};
</script>

<style>

</style>