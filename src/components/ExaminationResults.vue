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
        <el-row type="flex" justify="center">
            <el-col :span="20" class="warp-main" v-loading="loading" element-loading-text="Loading...">
                <el-col :span="24" class="toolbar">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <el-select placeholder="Arguments" v-model="filters.kwType">
                                <el-option label="Course Name" value="title"></el-option>
                                <el-option value="instructor" label="Instructor"></el-option>
                                <el-option value="passed" label="Passed"></el-option>
                                <el-option value="failed" label="Failed"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="filters.kw" placeholder="Please input the keyword" :disabled="filters.kwType==='passed'||filters.kwType==='failed'||filters.kwType===''" @keyup.enter.native="useFilter"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" plain @click="useFilter">Search</el-button>
                            <el-button type="success" plain @click="resetFilter">Reset</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <div>
                    <el-table :data="showResults" stripe border  height="640" style="text-align: center">
                        <el-table-column prop="title" label="Course Name" width="300" sortable></el-table-column>
                        <el-table-column prop="name" label="Instructor"  sortable></el-table-column>
                        <el-table-column prop="year" label="Year"  sortable></el-table-column>
                        <el-table-column prop="semester" label="Semester" width="150"></el-table-column>
                        <el-table-column prop="course_id" label="Course ID" width="100"></el-table-column>
                        <el-table-column prop="credits" label="Credits" width="100" sortable></el-table-column>
                        <el-table-column prop="grade" label="Grade" width="100" sortable></el-table-column>
                        <el-table-column label="Status">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.grade !== 'C-'" type="success">Passed</el-tag>
                                <el-tag v-if="scope.row.grade === 'C-'" type="danger">Failed</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>

        </el-row>
        <el-footer style="height: 20px; margin-top:10px; text-align: center">
            <p><small>&copy; All Rights Reserved. Designed by Prophet.</small></p>
        </el-footer>
    </el-row>


</template>

<script>


    export default {
        name: "my-examination-results",
        data(){
            return{
                filters:{
                    kwType: '',
                    kw: ''
                },
                results: [],
                showResults: [],
                loading: false,
            }
        },
        mounted: function () {
            this.getResults();
        },
        methods: {
            useFilter: function () {
                this.showResults = [];
                let that=this;
                debugger
                if(this.filters.kwType === 'title'){
                    for(let item of that.results){
                        item.show = item.title.indexOf(that.filters.kw.trim()) !== -1;
                    }
                }
                if(this.filters.kwType === 'instructor'){
                    for(let item of that.results){
                        item.show = (item.name === that.filters.kw.trim());
                    }
                }
                if(this.filters.kwType === 'passed'){
                    for(let item of that.results){
                        item.show = item.grade !== 'C-';
                    }
                }
                if(this.filters.kwType === 'failed'){
                    for(let item of that.results){
                        item.show = item.grade === 'C-';
                    }
                }
                for(let item of that.results){
                    if(item.show) that.showResults.push(item);
                }
            },

            resetFilter: function () {
                this.showResults = this.results.slice(0);
                this.filters.kwType = '';
                this.filters.kw = '';
            },

            getResults: function(){
                let that = this;
                this.loading = true;
                this.$axios.get("http://localhost:8000/getGrades").then((resp) => {
                    if(resp.data.status === 'success'){
                        that.results = resp.data.data;
                        that.showResults = that.results.slice(0);
                        this.loading = false;
                    }else{
                        that.$alert(resp.data.msg, 'Error');
                        that.$router.push("/");
                    }
                }).catch((err) =>{
                    console.log(err);
                    that.$router.push("/");
                })
            }
        }
    }
</script>

<style scoped>
    .warp-breadcrum{
        margin-top: 20px;
        margin-left: 10px;
    }
    .warp-main{
        height: 100%;
        padding: 30px 40px;
        margin-top: 2em;
        -webkit-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        -o-box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
        background: #ffffff;
    }

    .el-table{
        font-size: 13px;
    }

    p{
        margin: 0;
    }

    .el-footer{
        color: #848484;
        font-size: 16px;
    }


</style>

<style>
    thead tr{
        background: #f1f1f1 !important;
    }
    .el-table thead{
        color: #555961;
    }
</style>
