<template>
  <div class="stuff">
    <div class="clearfix">
      {{value}}
      <div class="raw-item" v-for="(item,index) in value" :key="index" >
        <el-input placeholder="请输入内容" style="width: 200px" v-model="item.name" ></el-input>
        <el-input placeholder="请输入内容" style="width: 100px" v-model="item.specs"></el-input>
        <i class="delete-icon el-icon-close" v-show="value.length !== 1" @click="remove(index)"></i>
      </div>
    </div>
    <el-button  class="eaeaea" type="primary" size="medium" icon="el-icon-plus" @click="add">增加一项</el-button>
  </div>
</template>
<script>
// v-model 在组件上面双向绑定 value 发布事件input 
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  methods:{
    remove(index){  
      //this.value.splice(index, 1); //在props上面操作的，因为value是个对象所以可以操作但是实际是不允许的，所以用下面的方法
      const newValue = this.value.filter((item, i) => {
        return i !== index;
      })
      this.$emit('input', newValue)
    },
    add(){
      this.$emit('input', [
        ...this.value,
        { "name": "", "specs": "" }
      ])
    }
  }
}
</script>

<style lang="stylus">
.delete-icon 
  background-color #ccc
  border-radius 50%
  color #fff
  :hover
    background: #ff3232;
    color: #fff;
.raw-item
  float left
  margin-right 65px
  margin-bottom 20px
  .el-input 
    margin-right 5px
</style>

