<template>
<!-- 默认激活项 当前激活菜单的 / -->
    <el-menu default-active="/"
    background-color="#2F4858" text-color="#fff" :collapse="isCollapse"
    active-text-color="#ffd04b" class="menu-class" router>
        <el-menu-item index="/">
            <i class="iconfont iconhome"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
            <i class="iconfont iconfile"></i>
            <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/material">
            <i class="iconfont iconimage"></i>
            <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
            <i class="iconfont iconic-published"></i>
            <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
            <i class="iconfont iconmessage1"></i>
            <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
            <i class="iconfont iconfriendadd"></i>
            <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
            <i class="iconfont iconset"></i>
            <span slot="title">设置</span>
        </el-menu-item>
    </el-menu>
</template>
<script>
    export default {
        name:'AppAside',
        data() {
            return {}
        },
        methods: {
            
        },
        props: ['is-collapse']
    }
</script>
<style lang="less" scoped>
    .el-menu{
        border: 0;
    }
    .menu-class{
        .iconfont{
            margin-right: 10px;
            padding-left: 10px;
        }
    }
</style>