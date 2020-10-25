<template>
    <div class="login-container">
        <!-- 配置form表单验证
                给el-form组件绑定model为表单数据对象
                给需要验证的表单项el-form-item绑定prop属性
                通过el-form组件的rules属性配置验证规则
         -->
        <el-form class="login-form" ref="form" :model="user" :rules="formRules">
            <el-form-item>
                <div class="login-logo"></div>
            </el-form-item>
            <el-form-item prop="mobile">
                <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item prop="agree">
                <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loginLoading" @click="onLogin" class="login-btn">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { userLogin } from '@/api/user'//导入请求模块的用户登录函数
    export default {
        data() {
            return {
                user: {
                    mobile: '13911111111',
                    code: '246810',
                    agree: true,
                },
                loginLoading: false,//登录的loading状态，防止用户一直点登录按钮
                formRules: {//表单验证
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'}
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        {pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur'}
                    ],
                    agree: [//自定义验证规则，验证通过 callback()，失败 callback(new Error('xxx'))
                        {validator: (rule, value, callback) => {
                            if(value){
                                callback()
                            }else{
                                callback(new Error('请勾选用户协议'))
                            }
                        },trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            onLogin() {
                const user = this.user
                //表单验证
                this.$refs['form'].validate( valid => {
                    if(!valid) {//如果验证失败，停止请求
                        return
                    }
                    //验证通过，提交
                    this.loginLoading = true//开启登录loading
                    //调用登录函数，传入用户数据
                    userLogin(user).then( res => {
                        //成功
                        this.$message({
                            message: '恭喜你，登录成功',
                            type: 'success'
                        });
                        this.loginLoading = false//关闭loading
                        //跳转路由
                        this.$router.push({
                            name:'home'
                        })
                    }).catch(err =>{
                        //失败
                        this.$message.error('登录失败，手机号或密码错误');
                        this.loginLoading = false//关闭loading
                    })
                })
            },
            
        }
    }
</script>
<style scoped lang="less">
    .login-container{
        position: fixed;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background:url('./images/login_bg.jpg') no-repeat;
        background-size: cover;
        .login-form{
            .login-logo{
                width: 300px;
                height: 57px;
                background:url('./images/logo_index.png') no-repeat;
                background-position:center;
                text-align: center;
            }
            background-color: white;
            min-width: 300px;
            padding: 30px;
            border-radius: 4px;
            .login-btn{
                width:100%;
            }
        }

    }
</style>