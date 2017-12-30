<template>
    <el-row>
        <el-row>
            <el-col :span="24" class="warp-breadcrum">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }"><b>HomePage</b></el-breadcrumb-item>
                    <el-breadcrumb-item>Course Information Center</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="16" class="warp-main" :style="activeName==='resultView'?'height: 760px;margin-top: 2em;':'height: 540px; margin-top: 6em;'" v-loading="loading" element-loading-text="Loading...">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item name="queryForm">
                        <template slot="title"><h2>Query Course Info</h2></template>
                        <el-row type="flex" justify="center">
                            <el-form :model="queryForm" label-width="150px" ref="queryForm" class="animated fadeIn" status-icon :rules="rules" style="margin-top: 50px; width: 50%;" label-position="left">
                                <el-form-item label="Course ID" prop="course_id" :rules="[
                              { type: 'number', message: 'Please input correct ID type!'}
                            ]">
                                    <el-input v-model.number="queryForm.course_id" placeholder="The Course ID" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="Course Name">
                                    <el-input v-model="queryForm.title" placeholder="Name of the course" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="Department">
                                    <template>
                                        <el-select v-model="queryForm.dept_name" placeholder="Department Name">
                                            <el-option v-for="(item,index) in depts" :key="index" :label="item" :value="item"></el-option>
                                        </el-select>
                                    </template>
                                </el-form-item>
                                <el-form-item label="Credits" prop="credits">
                                    <el-input v-model.number="queryForm.credits" placeholder="Credits take" prop="credits" clearable></el-input>
                                </el-form-item>
                                <el-row type="flex"  style="margin-top: 50px; margin-left: 20%">
                                    <el-button type="primary" style="width: 30%;letter-spacing: 2px" plain @click="getResults">QUERY</el-button>
                                    <el-button type="success" style="width:30%; margin-left: 25%;letter-spacing: 2px" plain @click="resetForm">RESET</el-button>
                                </el-row>
                            </el-form>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item name="resultView">
                        <template slot="title"><h2>Result View</h2></template>
                        <div>
                            <el-table :data="results" stripe border  height="600" style="text-align: center" class="animated fadeIn">
                                <el-table-column prop="course_id" label="Course ID" sortable></el-table-column>
                                <el-table-column prop="title" label="Course Name" min-width="280px" sortable></el-table-column>
                                <el-table-column prop="dept_name" label="Department" sortable></el-table-column>
                                <el-table-column prop="credits" label="Credits" sortable></el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
        </el-row>
        <el-footer style="height: 20px; margin-top:10px; text-align: center">
            <p><small>&copy; All Rights Reserved. Designed by Prophet.</small></p>
        </el-footer>

    </el-row>
</template>

<script>
    export default {
        name: "query-sec",
        data(){
            return{
                loading: false,
                activeName: 'queryForm',
                queryForm: {
                    course_id:'',
                    title:'',
                    credits:'',
                    dept_name:'',
                },
                depts: [],
                rules: {
                    credits: [
                        {
                            validator: (rule, value, callback) => {
                                if (value<0 || value>10 || typeof value !== 'number') {
                                    callback(new Error('Credits should be between 1-10!'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur' }
                    ]

                },
                results: []

            }
        },
        mounted: function () {
            this.getDepts();
        },
        methods: {
            getDepts: function () {
                let that = this;
                this.loading = true;
                this.$axios.get("/api/getAllDept").then((resp) => {
                    if(resp.data.status === 'success'){
                        that.depts = resp.data.data;
                        this.loading = false;
                    }else{
                        that.$alert(resp.data.msg, 'Error');
                    }
                }).catch((err) =>{
                    console.log(err);
                })
            },
            resetForm: function () {
                this.queryForm = {
                    course_id:'',
                    title:'',
                    credits:'',
                    dept_name:'',
                };
                this.$refs.queryForm.resetFields();
                this.results = [];
            },
            getResults: function(){
                let that = this;
                this.loading = true;
                this.$axios.get("/api/getCourse", {params:this.queryForm}).then((resp) => {
                    if(resp.data.status === 'success'){
                        that.results = resp.data.data;
                        this.loading = false;
                        that.activeName = 'resultView';
                    }else{
                        that.$alert(resp.data.msg, 'Error');
                    }
                }).catch((err) =>{
                    console.log(err);
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

    .el-table{
        font-size: 13px;
    }
</style>

<style>
    thead tr{
        background: #f1f1f1 !important;
    }
    .el-table thead{
        color: #555961;
    }
    .el-table th{
        text-align: center;
    }
</style>
