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
                     @click="showSetRightDia(scope.row)"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle
                     @click="showDeleUserDia(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--修改权限对话框-->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <el-tree
        ref="tree"
        :data="treelist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrcheck"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
    export default {
        name: "role",
        data() {
            return {
                rolelist: [],
                dialogFormVisibleRight: false,
                treelist: [],
                defaultProps: {
                    label: 'authName',
                    children: 'children'
                },
                arrexpand: [],
                arrcheck: [],
                currentRoleId:-1,
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
            },
            async showSetRightDia(role) {

                this.currentRoleId=role.id;

                this.dialogFormVisibleRight = true;

                const res = await this.$http.get(`rights/tree`);

                this.treelist = res.data.data;

                const arrtemp = [];

                role.children.forEach(item1 => {
                    //arrtemp.push(item1.id);
                    item1.children.forEach(item2 => {
                        //arrtemp.push(item2.id);
                        item2.children.forEach(item3 => {
                            arrtemp.push(item3.id);
                        })
                    })
                });
                this.arrcheck = arrtemp;
            },
            async setRoleRight(){
                const arr1=this.$refs.tree.getCheckedKeys();

                const arr2=this.$refs.tree.getHalfCheckedKeys();

                const arr=[...arr1,...arr2];

                const res=await this.$http.post(`roles/${this.currentRoleId}/rights`,{rids:arr.join(',')});

                this.getRoleList();

                this.dialogFormVisibleRight = false

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
