<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../assets/logo.png" alt="logo">
          </div>
        </el-col>
        <el-col :span="18" class="title">
          <div class="grid-content bg-purple-light">
            <h2>电商后台管理系统</h2>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="quit" href="#" @click="loginout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu :unique-opened="true" :router="true">
          <el-submenu :index=" '' + item1.order" v-for="(item1,index) in  menus" :key="index">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>{{item1.authName}}</span>
            </template>
              <el-menu-item :index="item2.path" v-for="(item2,index) in  item1.children" :key="index">
                <i class="el-icon-location"></i>
                <span>{{item2.authName}}</span>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main class="main">
        <router-view>

        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                menus:[],
            }
        },
        beforeCreate() {
            /*const token=localStorage.getItem('token');
            if(!token){
                this.$router.push({name:'login'});
            }*/
        },
        created(){
            this.getMenus();
        },
        methods:{
            loginout(){
                localStorage.clear();
                this.$message.success("退出成功");
                this.$router.push({name:'login'});
            },
            async getMenus(){
                const res=await this.$http.get(`menus`);
                this.menus=res.data.data;
                //console.log(res);
            }
        },

    }
</script>

<style scoped>
  .container {
    height: 100%;
  }

  /*头部样式*/
  .header {
    background-color: #b3c0d1;
  }

  .title {
    text-align: center;
    vertical-align: center;
    color: white;
  }

  .quit {
    line-height: 60px;
    text-decoration: none;
  }


  /*侧边栏样式*/
  .aside {
    background-color: #d3dce6;
  }

  .main {
    background-color: #e9eef3;
    height: 100%;
  }
</style>
