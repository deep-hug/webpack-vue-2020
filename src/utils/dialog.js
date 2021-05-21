/*
 * @Description: 动态的loading和toast和dialog弹框组件
 */
import Dialog from '../components/common/Dialog.vue';

/**
 * @param {注册toast组件} Vue对象
 */
function registryToast(Vue) {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$toast()
    Vue.prototype.$toast = showToast;
    Vue.prototype.$loading = showLoading;
    Vue.prototype.$dialog = showDialog;
    const DialogConstructor = Vue.extend(Dialog);
    let loadingDom = null;
    let dialogDom = null; //弹框调用状态
    /**
     * loading框显示或隐藏
     * @param {状态位} flag 
     * @param {提示文本} dialogStr 
     */
    function showLoading(flag, dialogStr) {
        if (!loadingDom) {
            // 实例化一个 toast.vue
            loadingDom = new DialogConstructor({
                el: document.createElement('div'),
                data() {
                    return {
                        type: 1,
                        show: flag,
                        dialogStr: dialogStr || '加载中'
                    };
                }
            });
            document.body.appendChild(loadingDom.$el);
        }
        // 把 实例化的 toast.vue 添加到 body 里
        loadingDom.show = flag;
    }
    /**
     * 显示toast弹框
     * @param {toast弹框文本串} dialogStr 
     */
    function showToast(dialogStr, time) {
        // 实例化一个 toast.vue
        const toastDom = new DialogConstructor({
            el: document.createElement('div'),
            data() {
                return {
                    dialogStr: dialogStr,
                    type: 2,
                    show: true
                };
            }
        });
        // 把 实例化的 toast.vue 添加到 body 里
        document.body.appendChild(toastDom.$el);
        // 过了 duration 时间后隐藏
        let timer = setTimeout(() => {
            toastDom.show = false;
            clearTimeout(timer);
        }, time || 1800);
    }
    /**
     * 基础的dialog框
     * @param {弹框参数} options 
     */
    function showDialog(options) {
        let defaultOptions = {
            show: true, //是否显示
            type: 3, //类型
            dialogStr: '提示内容', //弹框内容
            dialogTitle: '', //标题
            okBtnStr: '确定', //确定按钮文本
            cancelBtnStr: '取消', //取消按钮文本
            okFn: () => { //确定点击回调事件
                console.log('你点击了确定按钮');
            },
            cancelFn: () => { //取消点击回调事件
                console.log('你点击了取消按钮');
            }
        };
        Object.assign(defaultOptions, options);
        if (!dialogDom) {
            dialogDom = new DialogConstructor({
                el: document.createElement('div'),
                data() {
                    return defaultOptions;
                }
            });
            document.body.appendChild(dialogDom.$el);
        }else{
            Object.assign(dialogDom, options);
        }
        dialogDom.show = true;
    }
}
export default registryToast;