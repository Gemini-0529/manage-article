<template>
    <div class="publish-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{this.$route.query.id ? '修改文章':'发布文章'}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-form ref="publish-form" :model="article" label-width="60px" :rules="formRules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
                    <el-tiptap v-model="article.content" :extensions="extensions"
                        height="350" placeholder="请输入文章内容" lang="zh"></el-tiptap>
                </el-form-item>
                <el-form-item label="封面">
                    <el-radio-group v-model="article.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    <template v-if="article.cover.type > 0">
                        <!-- type为1或3时，遍历显示 -->
                        <article-cover v-for="(cover,index) in article.cover.type"
                            :key="cover"
                            v-model="article.cover.images[index]"/>
                            <!-- v-model=== :value="article.cover.images[index]"+
                                            @input="article.cover.images[index]" -->
                    </template>
                    <!-- <template v-if="article.cover.type > 0">
                         type为1或3时，遍历显示 
                        <article-cover v-for="(cover,index) in article.cover.type"
                        :key="index" :cover-image="article.cover.images[index]"
                         @update-cover="onUpdateCover(index,$event)"/>
                         监听子组件传来的数据           索引 ，对应url
                            选择三图时，有了索引参数，所以之前的url变成了索引
                            当你给事件处理函数传递了自定义参数以后，无法得到原本的数据参数
                            需要手动指定$event，他代表原来的数据参数
                            :cover-image="article.cover.images[index]"   父组件将images数组传给子组件
                    </template> -->
                    
                </el-form-item>
                <el-form-item label="频道" prop="channel_id">
                    <el-select v-model="article.channel_id" placeholder="请选择频道">
                    <el-option
                        v-for="(channel,index) in channels" :key="index"
                        :label="channel.name" :value="channel.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onPublish(false)">{{this.$route.query.id ? '修改':'发表'}}
                    </el-button>
                    <el-button @click="onPublish(true)">存入草稿</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { getArticleChannels,addArticle,getArticle,updateArticle } from '@/api/article'
import {// 需要的 extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Preview,
  Fullscreen,
  Image,
  CodeBlock
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import { uploadImage } from '@/api/images'
import ArticleCover from './components/article-cover'
export default {
    name:'publishIndex',
    data() {
        return {//return后，如果组件复用，会重新创建变量，相互不会影响
            channels: [],//文章频道
            article: {
                title:'',//文章标题
                content:'',//文章内容
                cover: {
                    type:1,//封面类型  -1：自动  0：无图  1：1张  3：3张
                    images: []
                },
                channel_id: null
            },
            extensions: [
                new Doc(),
                new Text(),
                new Paragraph(),
                new Heading({ level: 5 }),
                new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
                new Underline({ bubble: true, menubar: false }), 
                new Italic(),//斜体
                new Strike(),//中划线
                new ListItem(),
                new BulletList(),//无序列表
                new OrderedList(),//有序列表
                new TodoItem(),
                new TodoList(),//待办列表
                new Image({
                    //默认会把用户上传的本地图片生成base64字符串和内容存储在一起
                    //自定义图片上传
                    uploadRequest(file) {
                        console.log(file)
                        const fd = new FormData()
                        fd.append('image',file)
                        //返回promise对象
                        return uploadImage(fd).then(res => {
                            //返回url结果
                            return res.data.data.url
                        })
                    }
                }),
                new CodeBlock(),
                new HorizontalRule(),//横线
                new Preview(),
                new Fullscreen()//全屏
            ],
            formRules: {
                title: [
                    {required: true,message: '请输入文章标题',trigger: 'blur'},
                    { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
                ],
                content: [
                    {
                        validator(rule,value,callback) {
                            if(value === '<p></p>'){
                                callback(new Error('请输入文章内容'))
                            }else {
                                callback()
                            }
                        }
                    },
                    {required: true,message: '请输入文章内容',trigger: 'blur'}
                ],
                channel_id: [
                    {required: true,message: '请选择文章频道'}
                ]
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
    components: {
        'el-tiptap': ElementTiptap,
        ArticleCover
    },
    methods: {
        loadChannels() {
            getArticleChannels().then(res=>{
                this.channels = res.data.data.channels
            })
        },
        onPublish(draft=false) {
            this.$refs['publish-form'].validate(valid =>{//表单验证
                if(!valid){//验证失败，停止提交表单
                    return
                }
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
            })
            
        },
        loadArticle() {//修改文章:加载文章内容
            getArticle(this.$route.query.id).then(res =>{
                this.article = res.data.data
            })
        },
        onUpdateCover(index,url) {//接收子组件传来的封面图
            //将article-cover-images的索引分别添加子组件传来的图片url
            this.article.cover.images[index] = url
            
        }
    }
}
</script>
<style lang="less" scoped>

</style>