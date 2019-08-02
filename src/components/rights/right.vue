<template>
  <el-card class="box-card">

    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <el-table
      class="table"
      height="400px"
      :data="rightlist"
      border
      style="width: 100%;">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
    export default {
        name: "right",
        data(){
            return{
                rightlist:[],
            }
        },
        created() {
            this.getRightList();
        },
        methods:{
            async getRightList(){
                const res=await this.$http.get(`rights/list`);
                //console.log(res);
                this.rightlist=res.data.data;
            }
        },
    }
</script>

<style scoped>
.table{
    margin-top: 20px;
}
</style>
