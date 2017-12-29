<template>
    <el-row>
        <el-row>
            <el-col :span="24" class="warp-breadcrum">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }"><b>HomePage</b></el-breadcrumb-item>
                    <el-breadcrumb-item>Examination Results Management</el-breadcrumb-item>
                    <el-breadcrumb-item>My Examination Results</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 6em">
            <el-col :span="16" class="warp-main" v-loading="loading" element-loading-text="Loading...">
                <h2>User Profile</h2>
                <el-form :model="submitForm"  class="animated fadeIn" status-icon>
                    <el-row type="flex" style="margin-left: 10%">
                        <el-form-item  style="width: 50%">
                            <el-row type="flex">
                                <p>ID: <span  style="margin-left: 20px">{{profile.id}}</span></p>
                            </el-row>
                        </el-form-item>
                        <el-form-item  style="width: 50%">
                            <el-row type="flex">
                                <p>Username: <span  style="margin-left: 20px" v-if="!changemode">{{profile.username}}</span></p>
                                <el-input v-model="submitForm.username" v-if="changemode" placeholder="Change your username" clearable style="margin-left: 20px"></el-input>
                            </el-row>
                        </el-form-item>
                    </el-row>
                    <el-row type="flex"  style="margin-left: 10%">
                        <el-form-item  style="width: 50%">
                            <el-row type="flex">
                                <p>RealName: <span  style="margin-left: 20px">{{profile.name}}</span></p>
                            </el-row>
                        </el-form-item>
                        <el-form-item  style="width: 50%">
                            <el-row type="flex">
                                <p>Role: <span  style="margin-left: 20px">{{profile.user_group}}</span></p>
                            </el-row>
                        </el-form-item>
                    </el-row>
                    <el-row type="flex"  style="margin-left: 10%">
                        <el-form-item  style="width: 50%">
                            <el-row type="flex">
                                <p>Department: <span  style="margin-left: 20px">{{profile.dept_name}}</span></p>
                            </el-row>
                        </el-form-item>
                        <el-form-item  style="width: 50%">
                            <el-row type="flex">
                                <p>Advisor: <span  style="margin-left: 20px">{{profile.advisor}}</span></p>
                            </el-row>
                        </el-form-item>
                    </el-row>
                    <el-row type="flex"  style="margin-left: 10%">
                        <el-form-item  style="width: 50%" prop="email"  :rules="[
                                          { type: 'email', message: 'Please enter correct email type!', trigger: 'blur,change' }]">
                            <el-row type="flex">
                                <p>E-Mail: <span v-if="!changemode">{{profile.email}}</span></p>
                                <el-input v-model="submitForm.email" v-if="changemode" placeholder="Change your email" clearable style="margin-left: 20px; width: 70%;"></el-input>
                            </el-row>
                        </el-form-item>
                        <el-form-item  style="width: 50%" prop="phone" :rules="[
                              { type: 'number', message: 'Please input correct phone number!'}
                            ]">
                            <el-row type="flex" >
                                <p>Phone Number: <span  style="margin-left: 20px" v-if="!changemode">{{profile.phone}}</span></p>
                                <el-input v-model.number="submitForm.phone" v-if="changemode" placeholder="Change your phone" clearable style="margin-left: 20px; width: 70%;" ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-row>
                    <el-row type="flex"  style="margin-top: 50px; margin-left: 20%">
                        <el-button type="primary" style="width: 30%;letter-spacing: 2px" plain @click="changemode=!changemode">MODIFY</el-button>
                        <el-button type="success" style="width:30%; margin-left: 25%;letter-spacing: 2px" plain @click="submit">SUBMIT</el-button>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        <el-footer style="margin-top: 20px; text-align: center">
            <p><small>&copy; All Rights Reserved. Designed by Prophet.</small></p>
        </el-footer>
    </el-row>

</template>

<script>
    import qs from 'qs';
    export default {
        name: "user-profile",
        data(){
            return{
                profile: "",
                changemode: false,
                submitForm: {
                    username: '',
                    email: '',
                    phone: '',
                },
                loading: false
            }
        },
        mounted: function () {
            this.getProfile();
        },
        methods: {
            getProfile: function () {
                let that = this;
                this.loading = true;
                this.$axios.get("http://localhost:8000/getProfile").then((resp) => {
                    if(resp.data.status === 'success'){
                        that.profile = resp.data.data[0];
                        this.loading = false;
                        console.log(this.profile);
                    }else{
                        that.$alert(resp.data.msg, 'Error');
                        this.loading = false;
                    }
                }).catch((err) =>{
                    console.log(err);
                    this.loading = false;
                })
            },
            submit: function (){
                let that = this;
                this.$axios.post("http://localhost:8000/updateProfile", qs.stringify(this.submitForm), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((resp) => {
                    console.log(resp);
                    if(resp.data.status === 'success'){
                        this.$alert("You've successfully update the Profile!", 'Success', {
                            type: 'success'
                        });
                        this.getProfile();
                        this.changemode = false;
                    }else if(resp.data.status === 'Failed'){
                        this.$alert(resp.data.message, 'Error', {
                            type: 'error'
                        });
                    }else {
                        this.$alert("Unknown Error! Please try again!", 'Error', {
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    this.$alert("Unknown Error! Please try again!<br>"+err, 'Error', {
                        type: 'error'
                    });
                })
            }
        }
    }
</script>

<style scoped>
    @import "../../static/css/animate.css";
    .warp-breadcrum{
        margin-top: 20px;
        margin-left: 10px;
    }
    .warp-main{
        height: 100%;
        padding: 30px 40px;

        -webkit-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        -o-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        background: #ffffff;
    }


    p{
        margin: 0;
    }
    .el-footer{
        color: #848484;
        font-size: 16px;
    }

    h2{
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 20px;
        margin: 0 0 60px 0;
        color: #523737;
        text-align: left;
    }
</style>
