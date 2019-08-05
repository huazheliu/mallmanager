<template>
  <el-card class="box-card">
    <my-bread level1="用户管理" level2="用户列表"></my-bread>

    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="inputSearch" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="userlist" style="width: 100%" height="300px">
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
        label="创建日期"
        width="180">
        <template slot-scope="scope">
          {{scope.row.create_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"
                     @change="changeUserStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[4, 6, 8,10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>


    <!--添加用户对话框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑用户对话框-->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!--设置角色-->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{currentUsername}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="currentRoleId" placeholder="请选择角色">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="item.roleName" :value="item.id" v-for="(item,i) in rolelist" :key="i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setUserRole()">确 定</el-button>
      </div>
    </el-dialog>


  </el-card>
</template>

<script>
    export default {
        name: "users",
        data() {
            return {
                query: '',
                pagenum: 1,
                pagesize: 4,
                userlist: [],
                total: 0,
                form: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: '',
                },
                dialogFormVisibleAdd: false,
                dialogFormVisibleEdit: false,
                dialogFormVisibleRol: false,
                currentRoleId: -1,
                currentUsername: '',
                rolelist: [],
                currentUserId: -1,
            };
        },
        mounted() {
            this.getUserList();
        },
        methods: {
            async getUserList() {
                const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
                //console.log(res);
                const {meta: {msg, status}, data: {total, users}} = res.data;
                if (status === 200) {
                    this.userlist = users;
                    this.total = total;
                    this.$message.success(msg);
                } else {
                    this.$message.warning(msg);
                }
            },
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
                this.pagesize = val;
                this.pagenum = 1;
                this.getUserList();
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                this.pagenum = val;
                this.getUserList();
            },
            searchUser() {
                this.getUserList();
            },
            showAddUserDia() {
                this.form = {};
                this.dialogFormVisibleAdd = true;
            },
            async addUser() {
                const res = await this.$http.post(`users`, this.form);
                const {meta: {status, msg}, data} = res.data;
                if (status === 201) {
                    this.$message.success(msg);
                    this.dialogFormVisibleAdd = false;
                    this.getUserList();
                    this.form = {};
                } else {
                    this.$message.warning(msg);
                }
               // console.log(res);
            },
            showDeleUserDia(userId) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(async () => {
                    const res = await this.$http.delete(`users/${userId}`);
                    //console.log(res);
                    const {meta: {msg, status}} = res.data;
                    if (status === 200) {
                        this.$message.success(msg);
                        this.pagenum = 1;
                        this.getUserList();
                    }
                }).catch(() => {
                    this.$message.info('已取消删除');
                });

            },
            showEditUserDia(user) {
                this.dialogFormVisibleEdit = true;
                this.form = user;
            },
            async editUser() {
                const res = await this.$http.put(`users/${this.form.id}`, this.form);
                if (res.data.meta.status === 200) {
                    this.dialogFormVisibleEdit = false;
                    this.getUserList();
                    this.$message.success(res.data.meta.msg);
                }
            },
            async changeUserStatus(user) {

                this.currentUsername = user.username;

                const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
                if (res.data.meta.status === 200) {
                    this.$message.success(res.data.meta.msg);
                    this.getUserList();
                }
            },
            async showSetUserRoleDia(user) {

                this.currentUserId = user.id;

                //获取角色列表
                const res = await this.$http.get(`roles`);
                this.rolelist = res.data.data;

                //获取当前角色列表
                const currentRes = await this.$http.get(`users/${user.id}`);
                this.currentRoleId = currentRes.data.data.rid;

                this.dialogFormVisibleRol = true;
            },
            async setUserRole() {
                const res = await this.$http.put(`users/${this.currentUserId}/role`, {rid: this.currentRoleId});
                this.dialogFormVisibleRol = false;
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
