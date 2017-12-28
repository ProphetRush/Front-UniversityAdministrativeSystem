import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Header from '@/components/Header'
import Home from '@/page/Home'
import BriefPage from '@/components/BriefPage'
import ExaminationResults from '@/components/ExaminationResults'
import QueryGrades from '@/components/QueryGrades'
import QueryAndSelectSecs from '@/components/QueryAndSelectSecs'
import QuerySec from '@/components/QuerySec'
import TimeTable from '@/components/TimeTable'
import CourseInfo from '@/components/CourseInfo'
import changepwd from '@/components/ChangePassword'
import profile from '@/components/UserProfile'
import pAside from '@/components/Aside'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            redirect: '/BriefPage',
            leaf: true,
            menuShow: ['Student','Instructor','Root'],
            iconName: 'home',
            children: [
                {path: '/BriefPage', component: BriefPage, name: 'Brief Page', menuShow: ['Student','Instructor','Root']}
            ]

        },

        {
            path: '/login',
            name: 'Login',
            component: Login
        },

        {
            path: '/test',
            name: 'test',
            component: pAside
        },

        {
            path: '/',
            component: Home,
            name: 'Examination Results Management',
            menuShow: ['Student'],
            iconName: 'graduation-cap',
            secondPath: '/grades',
            children: [
                {path: '/grades/MyResults', component:ExaminationResults, name: 'My Examination Results', menuShow: ['Student']},
                {path: '/grades/Query', component: QueryGrades, name: 'Query Results by Terms', menuShow: ['Student']}
            ]

        },

        {
            path: '/',
            component: Home,
            name: 'Course Registration Management',
            menuShow: ['Student', 'Instructor', 'Root'],
            iconName: 'book',
            secondPath: 'RegCourse',
            children: [
                {path: '/RegCourse/QueryPrevious', component: QuerySec, name: 'Query Sections',  menuShow: ['Student', 'Instructor', 'Root']},
                {path: '/RegCourse/QueryAndSelect', component: QueryAndSelectSecs, name: 'Query & Select Sections', menuShow: ['Student']},
                {path: '/RegCourse/TimeTable', component: QueryAndSelectSecs, name: 'TimeTable', menuShow: ['Student']}


            ]
        },

        {
            path: '/',
            component: Home,
            name: 'Course Information Management',
            menuShow: ['Student', 'Instructor', 'Root'],
            leaf: true,
            iconName: 'info',
            children: [
                {path: '/course', component: CourseInfo, name: 'Course Information Center', menuShow: ['Student', 'Instructor', 'Root']}
            ]
        },

        {
            path: '/',
            component: Home,
            name: 'Settings',
            menuShow: ['Student','Instructor','Root'],
            iconName: 'cog',
            secondPath: '/settings',
            children: [
                {path: '/settings/profile', component: profile, name: 'User Profile', menuShow: ['Student','Instructor','Root']},
                {path: '/settings/changepwd', component: changepwd, name: 'Change Password', menuShow: ['Student','Instructor','Root']}
            ]
        }



    ]
})
