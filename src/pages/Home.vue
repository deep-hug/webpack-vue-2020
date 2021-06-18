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
        <div>
            <el-button type="primary" @click="getAddressList" plain>请求接口数据</el-button>
        </div>
        <div>
            <div v-for="(item, index) in addressList" :key="index">
                {{item.title}}
            </div>
        </div>
        <div>
            <el-button type="primary" @click="getMockData" plain>获取mock数据</el-button>
        </div>
        <div class="flex">
            <div>1</div>
            <div>2</div>
        </div>
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-button type="text" @click="showDateChooseFlag = true">点击打开 Dialog</el-button>
        <DateDialog :value="showDateChooseFlag" @closeDateChooseDialog="closeDateChooseDialog"></DateDialog>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import storage from '../utils/storage.js';
import requestsTest from '@requests/requestsTest.js';
import DateDialog from '../components/common/TestDialog.vue';
export default {
    components: {
        DateDialog,
    },
    data () {
        return {
            addressList: [],
            ruleForm: {
                name: '',
            },
            rules: {
                name: { validator: this.checkName, trigger: 'blur' },
            },
            showDateChooseFlag: false,
        };
    },
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
        getAddressList() {
            requestsTest.getAddressList({page: 1, tab: 'good', limit: 20}).then(res => {
                if (res && res.data && res.data.length) {
                    console.log(res, '得到的列表');
                    this.addressList = res.data;
                }
            });
        },
        getMockData() {
            requestsTest.getMockData().then(res => {
                console.log(res, 'mock数据');
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        async checkName(rule, value, callback) {
            if (!value) return callback(new Error('不能为空'));

            if (value != 111) {
                let res = await 1;
                console.log(res);
                return callback(new Error('不允许提交'));
            }
            callback();
        },
        closeDateChooseDialog() {
            this.showDateChooseFlag = false;
        },
    }
};
</script>

<style>

</style>