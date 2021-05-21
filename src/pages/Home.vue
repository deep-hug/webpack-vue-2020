<template>
    <div>
        <!-- 我是Home -->
        <ul>
            <li @click="goToBook">图书</li>
            <li @click="goToFood">美食</li>
        </ul>
        <el-button @click="goToBook" plain>图书</el-button>
        <el-button @click="goToFood" plain>美食</el-button>
        <el-button @click="loading" plain>loading</el-button>
        <el-button @click="toast" plain>toast</el-button>
        <el-button @click="dialog" plain>dialog</el-button>
        <div>
            <h3>计数器</h3>
            <p>当前数字是:{{num}}</p>
            <p>转换后的数字是:{{numAdd1}}</p>
            <el-button type="primary" @click="numIncrement(1)" plain>点我加1</el-button>
            <el-button type="primary" @click="numIncrementAsync" plain>加我400毫秒后加3</el-button>
        </div>
        <div>
            <el-button type="primary" @click="setStorage" plain>本地储存数据</el-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import storage from '../utils/storage.js';
export default {
    created () {

    },
    computed: {
        ...mapState('book', ['num']),
        ...mapGetters('book', ['numAdd1']),
    },
    methods: {
        ...mapMutations('book', ['numIncrement']),
        ...mapActions('book', ['numIncrementAsync']),
        goToFood() {
            this.$router.push('/food');
        },
        goToBook() {
            this.$router.push('/book');
        },
        loading() {
            this.$loading(true);
            setTimeout(() => {
                this.$loading(false);
            }, 3000);
        },
        toast() {
            this.$toast('请先登录');
        },
        dialog() {
            this.$dialog({
                show: true,
                dialogTitle: 'Dialog',  // 标题
                dialogStr: '您确定要注销此账户吗？',
                okBtnStr: '确定',
                cancelBtnStr: '取消',
                okFn:() => {
                    console.log('点击了确定');
                },
                cancelFn: () => {
                    console.log('点击了取消');
                }
            });
        },
        setStorage() {
            storage.setRequestHeader({name: 'deep-hug', age: '21'});
            setTimeout(() => {
                console.log(storage.getRequestHeader());
            }, 500);
        },
    }
};
</script>

<style>

</style>