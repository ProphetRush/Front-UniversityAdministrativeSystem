<template>
    <el-row>
        <el-row>
            <el-col :span="24" class="warp-breadcrum">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }"><b>HomePage</b></el-breadcrumb-item>
                    <el-breadcrumb-item>Course Registration Management</el-breadcrumb-item>
                    <el-breadcrumb-item>Query Sections</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="22" class="warp-main" :style="activeName==='resultView'?'height: 760px;margin-top: 2em;':'height: 640px; margin-top: 4em;'" v-loading="loading" element-loading-text="Loading...">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item name="queryForm">
                        <template slot="title"><h2>Query Form</h2></template>
                        <el-form :model="queryForm" label-width="150px" ref="queryForm" class="animated fadeIn" status-icon :rules="rules" style="margin-top: 50px">
                            <el-row type="flex" style="margin-top: 20px">
                                <el-form-item label="Course ID" prop="course_id" :rules="[
                              { type: 'number', message: 'Please input correct ID type!'}
                            ]" style="width: 40%; margin-left: 5%;">
                                    <el-input v-model.number="queryForm.course_id" placeholder="Course code" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="Course Name" style="width: 40%; margin-left: 5%;">
                                    <el-input v-model="queryForm.title" placeholder="Course Name" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex" style="margin-top: 20px">
                                <el-form-item label="Year" prop="year" style="width: 40%; margin-left: 5%;">
                                    <el-input v-model.number="queryForm.year" placeholder="Please input the year" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="Semester" style="width: 40%; margin-left: 5%;">
                                    <el-select placeholder="Semester" v-model="queryForm.semester" style="text-align: center">
                                        <el-option value="" label=""></el-option>
                                        <el-option label="Spring" value="Spring"></el-option>
                                        <el-option value="Fall" label="Fall"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex" style="margin-top: 20px">
                                <el-form-item label="Department" style="width: 40%; margin-left: 5%;">
                                    <template>
                                        <el-select v-model="queryForm.dept_name" placeholder="Department Name">
                                            <el-option v-for="(item,index) in depts" :key="index" :label="item" :value="item"></el-option>
                                        </el-select>
                                    </template>
                                </el-form-item>
                                <el-form-item label="Instructor" style="width: 40%; margin-left: 5%;">
                                    <el-input v-model="queryForm.instructor_name" placeholder="Instructor's Name" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex" style="margin-top: 20px">
                                <el-form-item label="Credits" prop="credits" style="width: 40%; margin-left: 5%;">
                                    <el-input v-model.number="queryForm.credits" placeholder="Credits take" prop="credits" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="Pre-required Course" style="width: 40%; margin-left: 5%;">
                                    <el-input v-model="queryForm.prereq" placeholder="The Pre-required Course" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex"  style="margin-top: 50px; margin-left: 20%">
                                <el-button type="primary" style="width: 25%;font-size:18px;letter-spacing: 2px" plain @click="getResults">QUERY</el-button>
                                <el-button type="success" style="width:25%; margin-left: 32%;font-size:18px;letter-spacing: 2px" plain @click="resetForm">RESET</el-button>
                            </el-row>
                        </el-form>

                    </el-collapse-item>
                    <el-collapse-item name="resultView">
                        <template slot="title"><h2>Result View</h2></template>
                        <div>
                            <el-table :data="results" stripe border  height="600" style="text-align: center" class="animated fadeIn">
                                <el-table-column prop="course_id" label="Course ID" width="90px"></el-table-column>
                                <el-table-column prop="title" label="Course Name" width="280" sortable></el-table-column>
                                <el-table-column prop="instructor" label="Instructor" width="115px"  sortable></el-table-column>
                                <el-table-column prop="dept_name" label="Department" width="140px"sortable></el-table-column>
                                <el-table-column prop="year" label="Year"  width="80px" sortable></el-table-column>
                                <el-table-column prop="semester" label="Semester" width="90px"></el-table-column>
                                <el-table-column prop="credits" label="Credits" width="75px"></el-table-column>
                                <el-table-column prop="building" label="Building" width="110px" sortable></el-table-column>
                                <el-table-column prop="room_number" label="Classroom" width="100px"></el-table-column>
                                <!--<el-table-column prop="capacity" label="Capacity" width="100"></el-table-column>-->
                                <el-table-column prop="time_slot_id" label="Time" width="60px"></el-table-column>
                                <el-table-column prop="prereq_title" label="Pre Course"></el-table-column>
                                <!--<el-table-column label="Status">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<el-tag v-if="scope.row.grade !== 'C-' && scope.row.grade !== ''" type="success">Passed</el-tag>-->
                                        <!--<el-tag v-if="scope.row.grade === 'C-'" type="danger">Failed</el-tag>-->
                                        <!--<el-tag v-if="scope.row.grade === ''" >Ongoing</el-tag>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
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
                    semester:'',
                    year: '',
                    credits:'',
                    dept_name:'',
                    instructor_name:'',
                    time:'',
                    prereq: ''
                },
                depts: [],
                rules: {
                    year: [
                        { validator: (rule, value, callback) => {
                                if (value<2001 || value>2018 || typeof value !== 'number') {
                                    callback(new Error('Please input correct year!'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur' }
                    ],
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
                this.$axios.get("http://localhost:8000/getAllDept").then((resp) => {
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
                    semester:'',
                    year: '',
                    credits:'',
                    dept_name:'',
                    instructor_name:'',
                    time:'',
                    prereq: ''
                };
                this.$refs.queryForm.resetFields();
                this.results = [];
            },
            getResults: function(){
                let that = this;
                this.loading = true;
                this.$axios.get("http://localhost:8000/querySections", {params:this.queryForm}).then((resp) => {
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
