<template>
  <div class="login-wrap">
    <el-form :label-position="labelPosition" label-width="80px" :model="formdata" class="login-form">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click.prevent="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                labelPosition: 'top',
                formdata: {
                    username: '',
                    password: '',
                }
            };
        },
        methods:{
            async login(){
                const res = await this.$http.post('login',this.formdata);

                const {data,meta:{msg,status}}=res.data;

                if(status===200){
                    this.$message.success(msg);
                    this.$router.push({name:'home'});
                }
                else {
                    this.$message.error(msg);
                }
                console.log(res);
            }
        }
    }
</script>

<style scoped>
  .login-wrap{
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-form{
    width:400px;
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
  }

  .login-btn{
    width: 100%;
  }
</style>
