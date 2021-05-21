const state = {
    num : 0
};
const getters = {
    numAdd1 : (state) => {
        return state.num + 1;
    }
};
const mutations = {
    // 提交载荷（Payload）
    numIncrement(state,n){
        state.num += n;
    }
};
const actions = {
    // 异步
    numIncrementAsync({commit}){
        setTimeout(()=>{
            commit('numIncrement',3);
        },400);
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};