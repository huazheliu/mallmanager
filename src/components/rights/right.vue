<template>
  <el-card class="box-card">
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
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

</style>
