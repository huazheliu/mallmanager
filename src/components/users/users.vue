<template>

  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="userlist" style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态">
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作"
        width="180">
      </el-table-column>

    </el-table>
  </el-card>

</template>

<script>
    export default {
        name: "users",
        data() {
            return {
                query: '',
                pagenum:1,
                pagesize:2,
                userlist:[],
                total:0,
            }
        },
        mounted() {
            this.getUserList();
        },
        methods:{
            async getUserList(){
                this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                const res=await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
                console.log(res);
                const {meta:{msg,status},data:{total,users}}=res.data;
                if(status===200){
                    this.userlist=users;
                    this.total=total;
                    this.message.success(msg);
                }else {
                    this.message.warning(msg);
                }
            }
        }
    }
</script>

<style scoped>
  .box-card {
    height: 100%;
  }

  .inputSearch {

    width: 350px;
  }

  .searchRow {
    margin-top: 15px;
  }
</style>
