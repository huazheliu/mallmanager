<template>
  <el-card class="box-card">
    <my-bread level1="权限管理" level2="角色列表"></my-bread>

    <el-row class="addrolebtn">
      <el-button type="success">添加角色</el-button>
    </el-row>

    <el-table
      class="table"
      :data="rolelist"
      style="width: 100%;">
      <el-table-column type="expand" width="150">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag @close="deleRight(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="6">
                  <el-tag @close="deleRight(scope.row,item2.id)" type="success" closable>{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag @close="deleRight(scope.row,item3.id)" type="warning" closable
                          v-for="( item3 ,i) in item2.children" :key="i">
                    {{item3.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length===0">该角色未分配权限</span>
        </template>
      </el-table-column>

      <el-table-column type="index" label="#" width="150"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle
                     @click="showEditUserDia(scope.row)"></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle
                     @click="showSetUserRoleDia(scope.row)"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle
                     @click="showDeleUserDia(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
    export default {
        name: "role",
        data() {
            return {
                rolelist: [],
            }
        },
        created() {
            this.getRoleList();
        },
        methods: {
            async getRoleList() {
                const res = await this.$http.get(`roles`);
                //console.log(res);
                this.rolelist = res.data.data;
            },
            async deleRight(role, rightId) {
                const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
                //console.log(res);
                role.children = res.data.data
            }
        },
    }
</script>

<style scoped>
  .addrolebtn {
    margin-top: 20px;
    margin-bottom: 20px;
  }

</style>
