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
            <h2>电商管理系统</h2>
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
        <el-menu :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-location"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-location"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-location"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>数据报表</span>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "home",
        beforeCreate() {
            const token=localStorage.getItem('token');
            if(!token){
              this.$router.push({name:'login'});
            }
        },
        methods:{
            loginout(){
                localStorage.clear();
                this.$message.success("退出成功");
                this.$router.push({name:'login'});
            }
        }
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
