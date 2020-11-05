<template>
    <div class="image-contain">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>素材管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>    
            <!-- 图片列表 -->
            <image-list />
            <!-- /图片列表 -->
        </el-card>
    </div>
</template>
<script>
import imageList from './components/image-list'
    export default {
        name:'ImageIndex',
        components: {imageList},
        data() {
            return {}
        },
        created() {},
        methods: {}
    }
</script>
<style lang="less" scoped>
    
</style>