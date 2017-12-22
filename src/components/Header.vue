<template>
    <el-header>
        <el-row class="container">
            <el-col :span="24" class="topbar-wrap">
                <div class="topbar-logo topbar-btn">
                    <a href="/" class="logo" style="padding-left:16px; text-align: center">PROPHET</a>
                </div>
                <div class="topbar-title">
                    <span style="font-size: 24px; color:#848484;">University  Administrative System</span>
                </div>
                <div class="topbar-account topbar-btn">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner"><icon name="user-o"></icon><i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item class="AccountInfo">
                                <h3>Welcome, <span>{{username}}</span>!</h3>
                                <p>Role: <span>{{user_group}}</span></p>
                            </el-dropdown-item>
                            <el-dropdown-item divided>
                                <router-link to="/user/profile"><span style="color: #555;font-size: 14px;">User Profile</span></router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link to="/user/changepwd"><span style="color: #555;font-size: 14px;">Change Password</span></router-link>
                            </el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">Log Out</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </div>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>

    import Icon from "vue-awesome/components/Icon";

    export default {
        components: {Icon},
        name: "header",
        props: ['username', 'user_group'],
        methods: {
            logout: function () {
                let that = this;
                this.$confirm('Confirm Log out?', 'Warning', {
                    type: 'warning',
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    center: true
                }).then(() => {
                    that.$axios.get("http://localhost:8000/logout").then((resp) => {
                        if(resp.data.status === 'success'){
                            this.$message({
                                message: "Logout Success! Going to login page...",
                                type: 'success',
                                duration: 2000
                            });
                            setTimeout(()=>{
                                that.$router.push('/login');
                            }, 2000);
                        }else{
                            that.$message({
                                message: resp.data.message,
                                type: 'error',
                                duration: 2000
                            });
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>
    .logo{
        font-size: 32px;
        color: #49505b;
        float: left;
        width: 17% !important;
    }
    .logo:hover{
        color: #858786;
        transform: scale(1.05);
        transition: all 0.3s ease-in-out;
    }
    .container{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        left: 0;
    }

    .topbar-wrap {
        line-height: 70px;
        padding: 0;
    }


    .el-header{
        background: #f1f1f1;
        height: 70px !important;
    }

    .topbar-title {
        float: left;
        text-align: center;
        width: 75% !important;
        padding-left: 10px;
    }

    .AccountInfo:hover{
        background: #fff !important;
    }

    .el-dropdown:hover{
        transform: scale(1.2) !important;
        transition: all 0.3s ease-in-out !important;

    }

    .el-button--primary{
        background: #f1f1f1 !important;
    }

    .el-dropdown{
        padding-left: 30px;
    }
</style>
