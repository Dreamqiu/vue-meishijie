import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    userInfo: {}
  },
  //在vue的computed中：
  // userInfo(){
  //   return this.$store.state.userInfo;
  // },
  getters:{
    isLogin(state){
      return !!Object.keys(state.userInfo).length;
    }
  },
  mutations:{
    //`mutation` 中的函数被 `commit` 执行的时候，接收两个参数(`state` 对象; `commit` 提交的 `payload`);
    //我们就可以通过 `state` 对象进行状态数据的修改
    //router.js中有使用Store.commit('chnageUserInfo',data.data)
    chnageUserInfo(state, data){
      state.userInfo = data;
    }
  },
  actions:{}
})

export default store;