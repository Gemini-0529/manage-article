<template>
    <el-container class="layout-container">
        <el-aside width="200px" class="aside">
            <!-- ↓侧边栏组件 -->
            <app-aside class= "aside-menu" />
        </el-aside>
        <el-container>
            <el-header class="header">
                <div class="header-left">
                    <i class="el-icon-s-fold"></i>
                    <span>后台管理系统</span>
                </div>
                <el-dropdown>
                    <div class="header-right">
                        <img :src="user.photo" alt="">
                        <span>{{user.name}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main class="main">
                <!-- 子路由出口，切换子路由 -->
                <router-view />
            </el-main>
            <el-footer class="footer">Copyright 2020</el-footer>
        </el-container>
    </el-container>
</template>
<script>
    import AppAside from './components/aside'
    import { getUserProfile } from '@/api/user'
    export default {
        name:'LayoutIndex',
        data(){
            return {
                user: {}
            }
        },
        methods: {
            loadUserProfile() {
                getUserProfile().then( res => {//发送请求
                    this.user = res.data.data
                })
            }
        },
        components: { AppAside},
        created() {
            this.loadUserProfile()
        }
    }
</script>
<style lang="less" scoped>
    .layout-container {
        position:fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        .aside {
            background-color: brown;
            .aside-menu{
                height: 100%;
            }
        }
        .header {
            border-bottom: 1px solid #ccc;
            display:flex;
            align-items: center;
            justify-content: space-between;
            line-height: 60px;
            color: #606266;
            .header-left{
                display: flex;
                align-items: center;
                i{
                    margin-right: 10px;
                }
                span{
                    letter-spacing: 1px;
                }
            };
            .header-right{
                display:flex;
                align-items: center;
                img{
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    margin-right: 5px;
                }
            }
        }
        .main {
            background-color: rgb(226, 255, 98);
        }
        .footer {
            background-color: darkolivegreen;
        }
        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
    }
    
</style>