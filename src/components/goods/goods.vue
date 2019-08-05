<template>
  <el-card class="box-card">
    <my-bread level1="商品管理" level2="商品列表"></my-bread>

    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="inputSearch" clearable @clear="getGoodList()">
          <el-button slot="append" icon="el-icon-search" @click="searchGoods()"></el-button>
        </el-input>
        <el-button type="success" @click="showAddGoodsDia">添加商品</el-button>
      </el-col>
    </el-row>

    <el-table
      height="500px"
      :data="goodlist"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="80">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格（元）"
        width="180">
      </el-table-column>

      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="80">
      </el-table-column>
      <el-table-column
        label="商品日期"
        width="180">
        <template slot-scope="scope">
          {{scope.row.add_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle
                     @click="showEditGoodsDia(scope.row)"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circl
                     @click="showDeleteGoodsDia(scope.row.goods_id)"></el-button>
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

    <!--添加商品对话框-->
    <el-dialog title="添加商品" :visible.sync="dialogFormVisibleAddGoods">
      <el-form :model="form">
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="form.goods_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="100px">
          <el-input v-model="form.goods_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" label-width="100px">
          <el-input v-model="form.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" label-width="100px">
          <el-input v-model="form.goods_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" label-width="100px">
          <el-input v-model="form.goods_cat" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAddGoods = false">取 消</el-button>
        <el-button type="primary" @click="addGoods()">确 定</el-button>
      </div>
    </el-dialog>


    <!--编辑商品对话框-->
    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisibleEditGoods">
      <el-form :model="form">
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="form.goods_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="100px">
          <el-input v-model="form.goods_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" label-width="100px">
          <el-input v-model="form.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" label-width="100px">
          <el-input v-model="form.goods_number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEditGoods = false">取 消</el-button>
        <el-button type="primary" @click="editGoods()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
    export default {
        name: "goods",
        data() {
            return {
                query: '',
                pagenum: 1,
                pagesize: 10,
                goodlist: [],
                total:0,
                form: {
                    goods_name: '',
                    goods_price: '',
                    goods_weight: '',
                    goods_number: '',
                    goods_cat: '',
                },
                dialogFormVisibleAddGoods: false,
                dialogFormVisibleEditGoods: false,
            }
        },
        created() {
            this.getGoodList();
        },
        methods: {
            async getGoodList() {
                const res = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
                this.goodlist = res.data.data.goods;
                this.total=res.data.data.total;
                console.log(res);
            },
            async searchGoods() {
                this.getGoodList();
            },
            showAddGoodsDia() {
                this.form={};
                this.dialogFormVisibleAddGoods = true;
            },
            async addGoods() {

                const res = await this.$http.post(`goods`, this.form);
                console.log(res);
                if (res.data.meta.status === 200) {
                    this.getGoodList();
                    this.$message.success(res.data.meta.msg);
                }
                this.dialogFormVisibleAddGoods = false

            },
            showDeleteGoodsDia(goodsId) {
                this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`goods/${goodsId}`);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getGoodList();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            showEditGoodsDia(goods) {
                this.form=goods;
                this.dialogFormVisibleEditGoods = true;
                //console.log(this.form);
            },
            async editGoods() {
              const res=await this.$http.put(`goods/${this.form.goods_id}`,this.form);
              this.dialogFormVisibleEditGoods=false;
              this.$message.success(res.data.meta.msg);
              this.getGoodList();
            },
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
                this.pagesize=val;
                this.pagenum=1;
                this.getGoodList();
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                this.pagenum = val;
                this.getGoodList();
            }
        },
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
    margin-bottom: 15px;
  }
</style>
