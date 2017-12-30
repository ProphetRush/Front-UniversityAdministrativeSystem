<template>
    <el-row>
        <el-row>
            <el-col :span="24" class="warp-breadcrum">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }"><b>HomePage</b></el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top:20px">
            <el-col :span="24" class="warp-main">
                <h2>Welcome, {{user.username}}!</h2>
                <el-card class="box-card">
                    <div slot="header">
                        <el-row type="flex">
                            <h3 style="width: 70%">Announcement and Notice</h3>
                            <el-button style="margin-left: 25%" type="text" @click="noticeCardCollapsed=!noticeCardCollapsed" >Collapse</el-button>
                        </el-row>
                    </div>
                    <el-collapse v-model="activeName" v-if="!noticeCardCollapsed">
                        <template v-for="(item,index) in notice">
                            <el-collapse-item :name="item.title"  :key="index">
                                <template slot="title">
                                    <el-row type="flex">
                                        <h3 style="margin: 0 20px; width:50%;">{{item.title}}</h3>
                                        <p style="margin-left: 20%">by {{item.author}}</p>
                                        <time class="time" style="margin-left: 40px;">{{ item.date }}</time>
                                    </el-row>
                                </template>
                                <div style="margin-left: 60px; margin-top: 20px">{{item.content}}</div>
                            </el-collapse-item>
                        </template>
                    </el-collapse>
                </el-card>

                <el-row type="flex" justify="center" style="margin-top:30px">
                    <el-col :span="11">
                        <el-card class="box-card" v-if="user.user_group === 'Student'">
                            <div slot="header">
                                <el-row type="flex">
                                    <h3 style="width: 70%">Academic progress</h3>
                                    <el-button style="margin-left: 20%" type="text" @click="progressCollapse" >Collapse</el-button>
                                </el-row>
                            </div>
                            <div v-if="!progressCardCollapsed">
                                <el-row type="flex">
                                    <el-col :span="10" style="margin-left: 30px">
                                        <h4>Student Profile</h4>
                                        <p style="font-size: 14px; margin-left: 20px;">Student ID: <span>{{student.id}}</span> </p>
                                        <p style="font-size: 14px; margin-left: 20px;">Student Name: <span>{{student.name}}</span> </p>
                                        <p style="font-size: 14px; margin-left: 20px;">Department: <span>{{student.dept_name}}</span> </p>
                                        <p style="font-size: 14px; margin-left: 20px;">Advisor: <span>{{student.advisor}}</span> </p>
                                    </el-col>
                                    <el-col :span="14">
                                        <h4 style="margin-left: 30%">Graduate Progress</h4>
                                        <div ref="creditsPie" style="width:100%;height:200px; margin-left: 40px"></div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <h4 v-if="graduated" style="text-align: center; margin: 0">You've Completed all credits! Congratulate! </h4>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="11">
                        <el-card class="box-card" v-if="user.user_group === 'Student'">
                            <div slot="header">
                                <el-row type="flex">
                                    <h3 style="width: 70%">Grade Distribution</h3>
                                    <el-button style="margin-left: 20%" type="text" @click="gradeCollapse" >Collapse</el-button>
                                </el-row>
                            </div>
                            <div v-if="!gradeCollapsed">
                                <el-row type="flex">
                                    <div ref="gradeChart" style="width:100%;height:280px; margin-left: 40px"></div>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    import ElCollapse from "element-ui/packages/collapse/src/collapse";

    export default {
        components: {ElCollapse},
        name: "brief-page",
        data(){
            return{
                user:{
                    uuid: '',
                    username: '',
                    user_group: '',
                    group_id: ''
                },
                activeName: '',
                notice: [
                    {title:'Introduction to this system', content: 'sadgsgAGESRG GSDGv stE Gse GWfcreVWETW F Wfvf', date: new Date(), author: 'Admin Prophet'},
                    {title:'This is an announcement', content: 'sadgsgAGESRG GSDGv stE Gse GWfcreVWETW F Wfvf', date: new Date(), author: 'Admin Prophet'},
                    {title:'Important Notice!', content: 'sadgsgAGESRG GSDGv stE Gse GWfcreVWETW F Wfvf sadgsgAGESRG GSDGv stE Gse GWfcreVWETW F WfvfsadgsgAGESRG GSDGv stE Gse GWfcreVWETW F Wfvf', date: new Date(), author: 'Admin Prophet'},
                ],
                noticeCardCollapsed: false,
                progressCardCollapsed: false,
                student:{
                    id: '',
                    name: '',
                    dept_name: '',
                    totalCredits: '',
                    leftCredits: '',
                    advisor: '',
                },
                grades: [],
                gradeCollapsed: false,
                graduated: false,
            }
        },
        mounted: function(){
            this.getUser();
            this.getGrades();
            this.getProfile();
            setTimeout(()=>{
                this.makePie();
            }, 250);
            setTimeout(()=>{
                this.makeChart();
            }, 250);
        },
        methods: {
            progressCollapse: function () {
                this.progressCardCollapsed=!this.progressCardCollapsed;
                if(!this.progressCardCollapsed) setTimeout(()=>{
                    this.makePie();
                }, 50);
            },

            gradeCollapse: function () {
                this.gradeCollapsed=!this.gradeCollapsed;
                if(!this.gradeCollapsed) setTimeout(()=>{
                    this.makeChart();
                }, 50);
            },

            getUser: function () {
                var that = this;
                this.$axios.get("/api/getUser").then((resp) => {
                    if(resp.data.status === 'success'){
                        that.user.username = resp.data.data.username;
                        that.user.user_group = resp.data.data.user_group;
                        that.user.uuid = resp.data.data.id;
                        that.user.group_id = resp.data.data.group_id;
                        console.log(that.user);
                    }else{
                        this.$router.push("/login");
                    }
                }).catch((err) =>{
                    console.log(err);
                    this.$router.push("/login");
                })
            },
            makePie: function () {
                var that=this;
                var creditsPie = this.$echarts.init(this.$refs.creditsPie);
                var passed=0, failed=0, ongoing=0;
                for(let item of this.grades){
                    if(item.grade === 'C-') failed+=item.credits;
                    else if(item.grade === undefined) ongoing+=item.credits;
                    else passed+=item.credits;
                }
                creditsPie.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['Passed', 'Unused', 'Failed', 'Ongoing']
                    },
                    series: [
                        {
                            name:'Credits Info',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '16',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:failed, name:'Failed'},
                                {value:passed, name:'Passed'},
                                {value:that.student.leftCredits, name:'Unused'},
                                {value: ongoing, name:'Ongoing'}
                            ]
                        }
                    ]
                })

            },

            getGrades: function(){
                let that = this;
                this.loading = true;
                this.$axios.get("/api/getGradesByTerms", {params:{
                        year: '',
                        semester: ''
                    }}).then((resp) => {
                    if(resp.data.status === 'success'){
                        that.grades = resp.data.data;
                        this.loading = false;
                    }else{
                        console.log(resp.data.msg, 'Error');
                    }
                }).catch((err) =>{
                    console.log(err);
                })
            },

            makeChart: function () {
                var that=this;
                var gradeChart = this.$echarts.init(this.$refs.gradeChart);
                var ap=0, a=0, am=0, bp=0, b=0, bm=0, cp=0, c=0, cm=0;
                for(let item of this.grades){
                    if(item.grade === 'A+') ap+=1;
                    if(item.grade === 'A') a+=1;
                    if(item.grade === 'A-') am+=1;
                    if(item.grade === 'B+') bp+=1;
                    if(item.grade === 'B') b+=1;
                    if(item.grade === 'B-') bm+=1;
                    if(item.grade === 'C+') cp+=1;
                    if(item.grade === 'C+') c+=1;
                    if(item.grade === 'C-') cm+=1;
                }
                gradeChart.setOption({
                    title: { text: 'Your Grades' },
                    tooltip: {},
                    xAxis: {
                        data: ["A+", "A", "A-", "B+", "B", "B-", 'C+', 'C', 'Failed']
                    },
                    yAxis: {},
                    series: [{
                        name: 'count',
                        type: 'bar',
                        data: [ap, a, am, bp, b, bm, cp, c, cm]
                    }]
                });
            },

            getProfile: function () {
                let that = this;
                this.loading = true;
                this.$axios.get("/api/getProfile").then((resp) => {
                    if(resp.data.status === 'success'){
                        that.student.name = resp.data.data[0].name;
                        that.student.id = resp.data.data[0].id;
                        that.student.dept_name = resp.data.data[0].dept_name;
                        that.student.advisor = resp.data.data[0].advisor;
                        that.student.leftCredits = resp.data.data[0].leftCredits;
                        if(that.student.leftCredits === 0) that.graduated=true;
                        this.loading = false;
                        console.log(that.student.leftCredits);
                    }else{
                        console.log(resp.data.msg, 'Error');
                    }
                }).catch((err) =>{
                    console.log(err);
                })
            },


        }
    }
</script>

<style scoped>
    @import "../../static/css/animate.css";
    .warp-breadcrum{
        margin-top: 10px;
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



    .time {
        font-size: 13px;
        color: #999;
    }


    .el-footer{
        color: #848484;
        font-size: 16px;
    }

    h2{
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 20px;
        margin: 0 0 50px 0;
        color: #523737;
        text-align: left;
    }

    .el-table{
        font-size: 13px;
    }
</style>

<style>
    .el-card__header{
        padding: 0 20px;
    }
</style>
