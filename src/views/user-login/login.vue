<template>
  <div class="login-section">
    <!-- :rules="rules" -->
    <el-form 
      label-position="top"
      :rules="rules"
      :model="ruleForm" status-icon 
       ref="ruleForm" label-width="100px" class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button> <!--ruleForm验证表单提交的数据是否通过--->
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {login} from '@/service/api';

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        // console.log(valid);//validate为传入的一个方法，valid为验证表格中是否传入参数，传入为ture，没传为false
        if (valid) {
          // 在这里向后端发送登录用户名和密码,调用api中的login
          login({
            name: this.ruleForm.name,
            password: this.ruleForm.password
          }).then((data) => {
            // console.log(data)
            if(data.code === 0) {  // 表示登录成功
              localStorage.setItem('token', data.data.token); //localStorage.setItem('key',value)：将value存储到key字段
              window.location.href = '/';
            }
            if(data.code === 1){ 
              this.$message.error(data.mes);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="stylus">
.login-section
  padding 0px 20px
</style>
