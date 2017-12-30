<template>
    <div class="container">
        <p-header :username="user.username" :user_group="user.user_group"></p-header>
        <el-container>
            <p-aside :user_group="user.user_group"></p-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>

</template>

<script>
    import ElContainer from "element-ui/packages/container/src/main";

    export default {
        components: {ElContainer},
        name: "home",
        data(){
            return {
                user:{
                    uuid: '',
                    username: '',
                    user_group: '',
                    group_id: ''
                }
            }
        },
        mounted: function () {
            var that = this;
            this.$axios.get("/api/getUser").then((resp) => {
                if(resp.data.status === 'success'){
                    that.user.username = resp.data.data.username;
                    that.user.user_group = resp.data.data.user_group;
                    that.user.uuid = resp.data.data.id;
                    that.user.group_id = resp.data.data.group_id;
                }else{
                    this.$router.push("/login");
                }
            }).catch((err) =>{
                console.log(err);
                this.$router.push("/login");
            })
        }
    }
</script>

<style scoped>
    .container{
        height: 100%;
    }
    .el-container{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        top: 50px;
        bottom: 0;
        overflow: hidden;
        width: 100%;
    }

    header{
        border-bottom: solid 1px #e6e6e6;
    }
</style>
