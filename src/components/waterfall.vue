<template>
  <div class="waterfall" ref="waterfall">
    <slot></slot>
    <div class="waterfall-loading" ref='loading' v-show="isLoading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>
<script>
// 什么时候到可视区中了,即需要下刷新请求加载图片了
// waterfall 元素的下边距 < 可视区的高度 即为到达可视区
import {throttle} from 'throttle-debounce'  //节流函数组件库的引入;debounce防抖

export default {
  name: 'Waterfall',
  data(){
    return {
      isLoading: false
    }
  },
  mounted(){
    // 优化，每隔一段时间再去执行函数，不用频繁触发  节流函数throttle()
    this.scrollHandler = throttle(300, this.scrolldd.bind(this)); //.bind(this) 用于指向当前组件实例，避免this指向window
    window.addEventListener('scroll', this.scrollHandler);
  },
  destroyed(){
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods:{
    scrolldd(){
      console.log(123)
      if(this.isLoading) return;
      if(this.$refs.waterfall.getBoundingClientRect().bottom < document.documentElement.clientHeight){
        console.log('已到达可视区')
        this.isLoading = true;
        this.$emit('view') ///到达可视区后向外面（父组件home）传递信息，在home中监听事件@view
      }
    }
  }
}
</script>
<style lang="stylus">
.waterfall-loading
  width 100%
  height 20px
  text-align center
</style>