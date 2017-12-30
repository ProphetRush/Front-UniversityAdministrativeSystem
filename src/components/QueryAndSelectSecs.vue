<template>
    <el-row>
        <el-row>
            <el-col :span="24" class="warp-breadcrum">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }"><b>HomePage</b></el-breadcrumb-item>
                    <el-breadcrumb-item>Course Registration Management</el-breadcrumb-item>
                    <el-breadcrumb-item>Query & Select Sections</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="22" class="warp-main" :style="activeName==='resultView'||activeName==='mySelection'?'height: 760px;margin-top: 2em;':'height: 640px; margin-top: 4em;'" v-loading="loading" element-loading-text="Loading...">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item name="queryForm">
                        <template slot="title"><h2>Section Options</h2></template>
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
                                <el-form-item label="Time" style="width: 40%; margin-left: 5%;">
                                    <el-select v-model="queryForm.time" placeholder="Time Slot">
                                        <el-option label="Monday Morning" value="A"></el-option>
                                        <el-option label="Monday Afternoon" value="B"></el-option>
                                        <el-option label="Monday Evening" value="C"></el-option>
                                        <el-option label="Tuesday Morning" value="D"></el-option>
                                        <el-option label="Tuesday Afternoon" value="E"></el-option>
                                        <el-option label="Tuesday Evening" value="F"></el-option>
                                        <el-option label="Wednesday Morning" value="G"></el-option>
                                        <el-option label="Wednesday Afternoon" value="H"></el-option>
                                        <el-option label="Wednesday Evening" value="I"></el-option>
                                        <el-option label="Thursday Morning" value="J"></el-option>
                                        <el-option label="Thursday Afternoon" value="K"></el-option>
                                        <el-option label="Thursday Evening" value="L"></el-option>
                                        <el-option label="Friday Morning" value="M"></el-option>
                                        <el-option label="Friday Afternoon" value="N"></el-option>
                                        <el-option label="Friday Evening" value="O"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex"  style="margin-top: 40px; margin-left: 20%">
                                <el-button type="primary" style="width: 25%;font-size:18px;letter-spacing: 2px" plain @click="querySections">QUERY</el-button>
                                <el-button type="success" style="width:25%; margin-left: 32%;font-size:18px;letter-spacing: 2px" plain @click="resetForm">RESET</el-button>
                            </el-row>
                        </el-form>
                    </el-collapse-item>
                    <el-collapse-item name="resultView">
                        <template slot="title"><h2 style="display: flex">Result View<p v-show="activeName==='resultView'" style="margin-left: 25%; color: #848484;
                            font-size: 16px; text-transform: none">You have {{leftCredits}} credits remain to be selected.</p></h2></template>
                        <div>
                            <el-table :data="results" stripe border  height="540" style="text-align: center" class="animated fadeIn">
                                <el-table-column prop="course_id" label="Course ID" width="90px"></el-table-column>
                                <el-table-column prop="title" label="Course Name" width="270px" sortable></el-table-column>
                                <el-table-column prop="instructor" label="Instructor" width="100px"></el-table-column>
                                <el-table-column prop="dept_name" label="Department" width="140px"sortable></el-table-column>
                                <el-table-column prop="credits" label="Credits" width="75px"></el-table-column>
                                <el-table-column prop="time_slot_id" label="Time" sortable width="80px"></el-table-column>
                                <el-table-column prop="building" label="Building" width="100px"></el-table-column>
                                <el-table-column prop="room_number" label="Classroom" width="100px"></el-table-column>
                                <el-table-column prop="capacity" label="Limit"  width="55px"></el-table-column>
                                <el-table-column prop="selected" label="Selected" width="80px"></el-table-column>
                                <el-table-column prop="prereq_title" label="Pre Course" min-width="100px"></el-table-column>
                                <el-table-column label="Ops" width="100px">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="success"
                                            @click="takeSection(scope.$index, scope.row)">Select</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="sec_id" label="sec_id" v-if="false"></el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="mySelection">
                        <template slot="title"><h2>My Selection</h2></template>
                        <div>
                            <el-table :data="selectedSection" stripe border  height="540" style="text-align: center" class="animated fadeIn">
                                <el-table-column prop="course_id" label="Course ID" width="90px"></el-table-column>
                                <el-table-column prop="title" label="Course Name" min-width="280px" sortable></el-table-column>
                                <el-table-column prop="instructor" label="Instructor"   sortable></el-table-column>
                                <el-table-column prop="dept_name" label="Department" sortable></el-table-column>
                                <el-table-column prop="credits" label="Credits" width="75px"></el-table-column>
                                <el-table-column prop="time_slot_id" label="Time" width="80px"></el-table-column>
                                <el-table-column prop="building" label="Building"  sortable></el-table-column>
                                <el-table-column prop="room_number" label="Classroom" ></el-table-column>
                                <el-table-column label="Ops">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="success"
                                            @click="deleteSection(scope.$index, scope.row)">Delete</el-button>
                                    </template>
                                </el-table-column>
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
    import qs from 'qs';
    export default {
        name: "query-and-select-secs",
        data(){
            return {
                loading: false,
                activeName: 'queryForm',
                queryForm: {
                    course_id:'',
                    title:'',
                    semester:'Spring',
                    year: '2018',
                    credits:'',
                    dept_name:'',
                    instructor_name:'',
                    time:'',
                    prereq: ''
                },
                leftCredits: '',
                depts: [],
                results: [],
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
                selectedSection: []
            }
        },
        mounted: function () {
            this.getDepts();
            this.getLeftCredits();
            this.getSelectedSections();
        },
        methods: {
            getDepts: function () {
                let that = this;
                this.loading = true;
                this.$axios.get("/api/getAllDept").then((resp) => {
                    if (resp.data.status === 'success') {
                        that.depts = resp.data.data;
                        this.loading = false;
                    } else {
                        that.$alert(resp.data.msg, 'Error');
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            resetForm: function () {
                this.queryForm = {
                    course_id:'',
                    title:'',
                    semester:'Spring',
                    year: '2018',
                    credits:'',
                    dept_name:'',
                    instructor_name:'',
                    time:'',
                    prereq: ''
                };
                this.$refs.queryForm.resetFields();
                this.results = [];
            },
            querySections: function () {
                let that = this;
                this.loading = true;
                this.$axios.get("/api/querySections", {params:this.queryForm}).then((resp) => {
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
            },
            getLeftCredits: function () {
                let that = this;
                this.$axios.get("/api/getLeftCredits").then((resp) => {
                    if(resp.data.status === 'success'){
                        that.leftCredits = resp.data.data;
                    }else{
                        that.$alert(resp.data.msg, 'Error');
                    }
                }).catch((err) =>{
                    console.log(err);
                })
            },
            takeSection(index, row){
                let that = this;
                let args = {
                    course_id: row.course_id,
                    sec_id: row.sec_id,
                    semester: row.semester,
                    yr: row.year
                };
                this.$axios.post("/api/takeSection", qs.stringify(args), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((resp) => {
                    console.log(resp);
                    if(resp.data.status === 'success'){
                        this.$alert("You've successfully take the selected section!", 'Success', {
                           type: 'success'
                        });
                        this.getSelectedSections();
                        this.getLeftCredits();
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
            },
            deleteSection(index, row){
                let that = this;
                let args = {
                    course_id: row.course_id,
                    sec_id: row.sec_id,
                    semester: row.semester,
                    yr: row.year
                };
                this.$axios.post("/api/deleteTakenSection", qs.stringify(args), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((resp) => {
                    console.log(resp);
                    if(resp.data.status === 'success'){
                        this.$alert(resp.data.message, 'Success', {
                            type: 'success'
                        });
                        this.getSelectedSections();
                        this.getLeftCredits();
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
                    this.$alert("Unknown Error! Please try again!"+err, 'Error', {
                        type: 'error'
                    });
                })
            },
            getSelectedSections(){
                let that = this;
                this.$axios.get("/api/getSectionsTaken").then((resp) => {
                    if(resp.data.status === 'success'){
                        that.selectedSection = resp.data.data;
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
