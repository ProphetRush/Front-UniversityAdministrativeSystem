<template>
    <div class="container">
        <aside class="showSidebar">
            <div class="menu-toggle" style="margin-top:30px; margin-bottom: 30px;" @click.prevent="collapse">
                <icon name="bars" scale="1.5" style="margin-left: 160px" v-show="!collapsed"></icon>
                <icon name="minus" scale="1.5" style="margin-left: 25px" v-show="collapsed"></icon>
            </div>
            <el-menu default-active="0" router :collapse="collapsed">
                <template v-for="(item,index) of $router.options.routes" v-if="shouldShow(item)">
                    <el-submenu v-if="!item.leaf" :index="index+''">
                        <template slot="title">
                            <icon :name="item.iconName" scale="1.5" :style="collapsed?'padding-left: 5;padding-right: 0;':'padding-left: 10px;padding-right: 10px;'"></icon>
                            <span slot="title">{{item.name}}</span>
                            <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right" v-show="!collapsed"></i>-->
                        </template>
                        <el-menu-item v-for="term of item.children" :key="term.path" :index="term.path" v-if="shouldShow(term)" :class="$route.path===term.path?'is-active':''">
                            <icon :name="term.iconName" scale="1.5" style="padding-right: 10px"></icon><span slot="title" style="padding-left: 5px">{{term.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                                  :class="$route.path===item.children[0].path?'is-active':''" style="padding-left: 30px">
                        <icon :name="item.iconName" scale="1.5" :style="collapsed?'padding-left:5':'padding-right: 15px'"></icon><span slot="title">{{item.children[0].name}}</span>
                    </el-menu-item>
                </template>
            </el-menu>

        </aside>
    </div>
</template>

<script>
    import Icon from "vue-awesome/components/Icon";

    export default {
        components: {
            Icon},
        name: "aside",
        data(){
            return {
                collapsed: false,
                user_group: 'Student'

            }
        },
        methods: {
            collapse: function(){
                this.collapsed = !this.collapsed;
            },
            shouldShow(item){
                return item.menuShow&&item.menuShow.indexOf(this.user_group) !== -1;
            }

        },
        mounted: function(){

        }
    }
</script>

<style scoped>
    .container{
        height: 100%;
    }
    aside{
        min-width: 50px;
        background: #f1f1f1;
        height: 100%;
    }
    .showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
    }

    .el-menu {
        height: 100%;
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        background-color: #f1f1f1;
    }
    .el-submenu .el-menu-item {
        min-width: 60px;
        background-color: #f1f1f1;
    }
    .el-menu {
        width: 360px;
    }
    .el-menu--collapse {
        width: 80px;
    }
    .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 56px;
        line-height: 56px;
    }

    .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df !important;
    }
    .fa-icon{
        width: 25px !important;
    }


</style>

<style>
    .el-submenu__title:hover{
        background-color: #7ed2df !important;
    }
    .fa-icon{
        width: 25px !important;
    }

</style>
