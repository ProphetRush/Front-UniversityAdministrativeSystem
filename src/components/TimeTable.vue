<template>
    <el-row>
        <el-row>
            <el-col :span="24" class="warp-breadcrum">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }"><b>HomePage</b></el-breadcrumb-item>
                    <el-breadcrumb-item>Course Registration Management</el-breadcrumb-item>
                    <el-breadcrumb-item>TimeTable</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 2em">
            <el-col :span="20" class="warp-main" v-loading="loading" element-loading-text="Loading...">
                <h2>Time Table</h2>
                <div>
                    <el-table :data="timetable" stripe border style="text-align: center" class="timetable">
                        <el-table-column prop="period" label=""></el-table-column>
                        <el-table-column prop="mon" label="Monday">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top" v-if="scope.row.mon.title!==undefined" style="margin: 20px;">
                                    <h3>Details</h3>
                                    <p>Course Name: {{ scope.row.mon.title}}</p>
                                    <p>Course ID: {{ scope.row.mon.course_id }}</p>
                                    <p>Department: {{ scope.row.mon.dept_name }}</p>
                                    <p>Instructor: {{ scope.row.mon.instructor }}</p>
                                    <p>Location: Room{{ scope.row.mon.room_number }} {{scope.row.mon.building}} Building</p>
                                    <p>Credits: {{scope.row.mon.credits}}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <p style="font-weight: bold;">{{scope.row.mon.title}}</p>
                                        <p style="font-size: 12px; margin-bottom: 0">Room{{ scope.row.mon.room_number }}</p>
                                        <p style="font-size: 12px; margin:0">{{scope.row.mon.building}} Building</p>
                                        <div></div>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column prop="tue" label="Tuesday">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top" v-if="scope.row.tue.title!==undefined" style="margin: 20px;">
                                    <h3>Details</h3>
                                    <p>Course Name: {{ scope.row.tue.title}}</p>
                                    <p>Course ID: {{ scope.row.tue.course_id }}</p>
                                    <p>Department: {{ scope.row.tue.dept_name }}</p>
                                    <p>Instructor: {{ scope.row.tue.instructor }}</p>
                                    <p>Location: Room{{ scope.row.tue.room_number }} {{scope.row.tue.building}} Building</p>
                                    <p>Credits: {{scope.row.tue.credits}}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <p style="font-weight: bold;">{{scope.row.tue.title}}</p>
                                        <p style="font-size: 12px; margin-bottom: 0">Room{{ scope.row.tue.room_number }}</p>
                                        <p style="font-size: 12px; margin:0">{{scope.row.tue.building}} Building</p>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column prop="wen" label="Wednesday">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top" v-if="scope.row.wen.title!==undefined" style="margin: 20px;">
                                    <h3>Details</h3>
                                    <p>Course Name: {{ scope.row.wen.title}}</p>
                                    <p>Course ID: {{ scope.row.wen.course_id }}</p>
                                    <p>Department: {{ scope.row.wen.dept_name }}</p>
                                    <p>Instructor: {{ scope.row.wen.instructor }}</p>
                                    <p>Location: Room{{ scope.row.wen.room_number }} {{scope.row.wen.building}} Building</p>
                                    <p>Credits: {{scope.row.wen.credits}}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <p style="font-weight: bold;">{{scope.row.wen.title}}</p>
                                        <p style="font-size: 12px; margin-bottom: 0">Room{{ scope.row.wen.room_number }}</p>
                                        <p style="font-size: 12px; margin:0">{{scope.row.wen.building}} Building</p>
                                        <div></div>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column prop="thu" label="Thursday">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top" v-if="scope.row.thu.title!==undefined" style="margin: 20px;">
                                    <h3>Details</h3>
                                    <p>Course Name: {{ scope.row.thu.title}}</p>
                                    <p>Course ID: {{ scope.row.thu.course_id }}</p>
                                    <p>Department: {{ scope.row.thu.dept_name }}</p>
                                    <p>Instructor: {{ scope.row.thu.instructor }}</p>
                                    <p>Location: Room{{ scope.row.thu.room_number }} {{scope.row.thu.building}} Building</p>
                                    <p>Credits: {{scope.row.thu.credits}}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <p style="font-weight: bold;">{{scope.row.thu.title}}</p>
                                        <p style="font-size: 12px; margin-bottom: 0">Room{{ scope.row.thu.room_number }}</p>
                                        <p style="font-size: 12px; margin:0">{{scope.row.thu.building}} Building</p>
                                        <div></div>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column prop="fri" label="Friday">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top" v-if="scope.row.fri.title!==undefined" style="margin: 20px;">
                                    <h3>Details</h3>
                                    <p>Course Name: {{ scope.row.fri.title}}</p>
                                    <p>Course ID: {{ scope.row.fri.course_id }}</p>
                                    <p>Department: {{ scope.row.fri.dept_name }}</p>
                                    <p>Instructor: {{ scope.row.fri.instructor }}</p>
                                    <p>Location: Room{{ scope.row.fri.room_number }} {{scope.row.fri.building}} Building</p>
                                    <p>Credits: {{scope.row.fri.credits}}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <p style="font-weight: bold;">{{scope.row.fri.title}}</p>
                                        <p style="font-size: 12px; margin-bottom: 0">Room{{ scope.row.fri.room_number }}</p>
                                        <p style="font-size: 12px; margin:0">{{scope.row.fri.building}} Building</p>
                                        <div></div>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sat" label="Saturday">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top" v-if="scope.row.sat.title!==undefined" style="margin: 20px;">
                                    <h3>Details</h3>
                                    <p>Course Name: {{ scope.row.sat.title}}</p>
                                    <p>Course ID: {{ scope.row.sat.course_id }}</p>
                                    <p>Department: {{ scope.row.sat.dept_name }}</p>
                                    <p>Instructor: {{ scope.row.sat.instructor }}</p>
                                    <p>Location: Room{{ scope.row.sat.room_number }} {{scope.row.sat.building}} Building</p>
                                    <p>Credits: {{scope.row.sat.credits}}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <p style="font-weight: bold;">{{scope.row.sat.title}}</p>
                                        <p style="font-size: 12px; margin-bottom: 0">Room{{ scope.row.sat.room_number }}</p>
                                        <p style="font-size: 12px; margin:0">{{scope.row.sat.building}} Building</p>
                                        <div></div>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sun" label="Sunday">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top" v-if="scope.row.sun.title!==undefined" style="margin: 20px;">
                                    <h3>Details</h3>
                                    <p>Course Name: {{ scope.row.sun.title}}</p>
                                    <p>Course ID: {{ scope.row.sun.course_id }}</p>
                                    <p>Department: {{ scope.row.sun.dept_name }}</p>
                                    <p>Instructor: {{ scope.row.sun.instructor }}</p>
                                    <p>Location: Room{{ scope.row.sun.room_number }} {{scope.row.sun.building}} Building</p>
                                    <p>Credits: {{scope.row.sun.credits}}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <p style="font-weight: bold;">{{scope.row.sun.title}}</p>
                                        <p style="font-size: 12px; margin-bottom: 0">Room{{ scope.row.sun.room_number }}</p>
                                        <p style="font-size: 12px; margin:0">{{scope.row.sun.building}} Building</p>
                                        <div></div>
                                    </div>
                                </el-popover>
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
        name: "time-table",
        data() {
            return{
                loading: false,
                selectedSection: '',
                timetable: [
                    {period: 'Morning', mon:'', tue:'', wen: '', thu: '', fri:'', sat:'', sun:''},
                    {period: 'Afternoon', mon:'', tue:'', wen: '', thu: '', fri:'', sat:'', sun:''},
                    {period: 'Evening', mon:'', tue:'', wen: '', thu: '', fri:'', sat:'', sun:''},
                ],
            }

        },
        mounted: function () {
            this.getSelectedSections();
            console.log(this.timetable);

        },
        methods: {
            getSelectedSections(){
                let that = this;
                this.$axios.get("/api/getSectionsTaken").then((resp) => {
                    if(resp.data.status === 'success'){
                        that.selectedSection = resp.data.data;
                        that.makeTimeTable();
                    }else{
                        that.$alert(resp.data.msg, 'Error');

                    }
                }).catch((err) =>{
                    console.log(err);
                })
            },
            makeTimeTable(){
                var chr = 'ABCDEFGHIJKLMNOPQRESTU';
                var week = ['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun'];
                debugger
                for(let sec of this.selectedSection){
                    if(chr.indexOf(sec.time_slot_id) !== -1){
                        console.log((chr.indexOf(sec.time_slot_id)/3));
                        this.timetable[chr.indexOf(sec.time_slot_id)%3][week[Math.floor(chr.indexOf(sec.time_slot_id)/3)]] = sec;
                    }
                }
                console.log(this.timetable);
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


    .el-footer{
        color: #848484;
        font-size: 16px;
    }

    h2{
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 20px;
        margin: 0 0 40px 0;
        color: #523737;
        text-align: left;
    }

    .el-table{
        font-size: 13px;
    }

</style>

<style>
    .timetable tbody tr{
        height:180px !important;
    }

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


