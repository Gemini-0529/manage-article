<template>
    <div class="publish-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{this.$route.query.id ? '修改文章':'发布文章'}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-form ref="form" :model="article" label-width="40px">
                <el-form-item label="标题">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="article.content"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-radio-group v-model="article.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <el-select v-model="article.channel_id" placeholder="请选择频道">
                    <el-option
                        v-for="(channel,index) in channels" :key="index"
                        :label="channel.name" :value="channel.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onPublish(false)">{{this.$route.query.id ? '修改':'发表'}}</el-button>
                    <el-button @click="onPublish(true)">存入草稿</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { getArticleChannels,addArticle,getArticle,updateArticle } from '@/api/article'
export default {
    name:'publishIndex',
    data() {
        return {//return后，如果组件复用，会重新创建变量，相互不会影响
            channels: [],//文章频道
            article: {
                title:'',//文章标题
                content:'',//文章内容
                cover: {
                    type:0,//封面类型  -1：自动  0：无图  1：1张  3：3张
                    images: []
                },
                channel_id: null
            }
        }
    },
    created(){
        this.loadChannels()
        //点击修改后跳转到发布组件，做判断来展示文章内容
        if(this.$route.query.id) {//如果url中有id参数，证明点击的是修改后跳过来的
            this.loadArticle()
        }
    },
    methods: {
        loadChannels() {
            getArticleChannels().then(res=>{
                this.channels = res.data.data.channels
            })
        },
        onPublish(draft=false) {
            const articleId = this.$route.query.id
            if(articleId) {//如果有id则修改
                updateArticle(articleId,this.article,draft).then(res=>{
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    //修改成功后跳转到内容管理
                    this.$router.push('/article')
                })
            }else {//没有id则发布
                addArticle(this.article,draft).then(res=>{
                    this.$message({
                        message: '发布成功',
                        type: 'success'
                    })
                    //发布成功后跳转到内容管理
                    this.$router.push('/article')
                })
            }
        },
        loadArticle() {//修改文章:加载文章内容
            getArticle(this.$route.query.id).then(res =>{
                this.article = res.data.data
            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>