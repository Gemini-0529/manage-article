<template>
    <div class="cover-container" @click="showDialog">
        <div class="cover-wrap">
            <img class="cover-image" ref="cover-image" :src="value">
        </div>
        <el-dialog :visible.sync="dialogVisible" width="50%" append-to-body>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="素材库" name="images">
                    <!-- 定制组件 不显示上传按钮和鼠标移入的操作控件 -->
                    <image-list :is-show-add="false"
                                :is-show-control="false"
                                is-show-selected
                                ref="image-list"
                                />
                </el-tab-pane>
                <el-tab-pane label="上传图片" name="upLoadimage">
                    <input type="file" ref="file" @change="onFileChange">
                    <img ref="preview-img" width="100">
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="chooseCover">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { uploadImage } from '@/api/images'
import  imageList  from '@/views/image/components/image-list'
    export default {
        name: 'ArticleCover',
        props: ['value'],//接收父组件传来的图片url
        components: {imageList},
        data() {
            return {
                dialogVisible: false,
                activeName: 'images'
            }
        },
        methods: {
            showDialog() {
                this.dialogVisible = true
            },
            onFileChange() {
                //获得用户选择的图片
                const file = this.$refs.file.files[0]
                const blob = window.URL.createObjectURL(file)
                //将图片文件加入预览img的src属性中
                this.$refs['preview-img'].src = blob
                //防止用户选择相同图片不触发change事件
                // this.$refs.file.value=''
            },
            chooseCover() {//选择封面
                const file = this.$refs.file.files[0]
                //首先判断点的是素材库还是上传图片选项卡
                if(this.activeName === 'upLoadimage'){
                    //判断用户是否选择了图片
                    if(!file){
                        //如果没选
                        this.$message('请选择文件')
                        return
                    }
                    //如果选择了文件
                    const fd = new FormData()
                    fd.append('image',file)
                    uploadImage(fd).then(res=>{
                        // this.$refs['cover-image'].src = res.data.data.url
                        this.dialogVisible = false
                        //将图片地址发送给父组件
                        this.$emit('input',res.data.data.url)
                    })
                }else if(this.activeName === 'images'){//如果选择了素材库
                    const selected = this.$refs['image-list'].selected//选中的图片的索引
                    if(selected === null){//如果没选择图片
                        this.$message('请选择封面图片')
                        return
                    }
                    //选择了图片
                    //关闭对话框
                    this.dialogVisible = false
                    //修改父组件
                    this.$emit('input',imageList.images[selected].url)

                }
            }
        }
    }
</script>
<style lang="less" scoped>

    .cover-wrap{
        width: 120px;
        height: 120px;
        border: 1px dashed #409EFF;
        border-radius: 4px;
        float: left;
        .cover-image{
            height: 120px;
            max-width: 100%;
        }
    }

</style>