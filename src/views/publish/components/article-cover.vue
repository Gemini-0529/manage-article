<template>
    <div class="cover-container" @click="showDialog">
        <div class="cover-wrap">
            <img class="cover-image" ref="cover-image">
        </div>
        <el-dialog :visible.sync="dialogVisible" width="50%" append-to-body>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="素材库" name="images">素材库</el-tab-pane>
                <el-tab-pane label="上传图片" name="upLoadimage">
                    <input type="file" ref="file" @change="onFileChange">
                    <img src="" ref="preview-img" width="100">
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="chooseCover">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { uploadImage } from '@/api/images'
    export default {
        name: 'articleCover',
        data() {
            return {
                dialogVisible: false,
                activeName: 'second'
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
            chooseCover() {
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
                        this.$refs['cover-image'].src = res.data.data.url
                        this.dialogVisible = false
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.cover-container{
    display: flex;
    justify-content: flex-start;
    .cover-wrap{
        width: 120px;
        height: 120px;
        border: 1px dashed #409EFF;
        border-radius: 4px;
    }
}
</style>