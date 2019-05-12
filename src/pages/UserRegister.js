/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from 'react';
import withAxios from '../hoc/withAxios';
// import './UserRegister.css';
class UserRegister extends Component{
    constructor(){
        super();
        this.state = {
            telNumber:"",
            password:"",
            rePassword:"",
            code:"",
            yzm:"",
            telNumberOk:false,
            passwordOk:false,
            rePasswordOk:false,
            codeOk:false,
            checkOk:false,
            dialog_mask:"",
            dialog_tip:"",
            tips:''
        }    }
    componentDidMount(){
        function randomNum(min, max) {
            return parseInt(Math.random() * (max - min + 1)) + min;
          }
          var str = '';
          var str2 = '0123456789zxcvbnmlkjhgfdsaqwertyuiopZXCVBNMLKJHGFDSAQWERTYUIOP';
          for (var i = 0; i < 4; i++) {
            var num = randomNum(0, str2.length - 1);
            str += str2.charAt(num);
          }
          let code = this.refs.code;
          code.innerHTML = str;
          this.setState({
              code:str
          })
          this.setState({
            dialog_mask : this.refs.dialog_mask,
            dialog_tip : this.refs.dialog_tip,
            tips : this.refs.tips
        })
    }
    //input表单输入后修改this.state内容并显示在ui界面上
    handle = (obj)=>{
        this.setState(obj)
    }
    handleTel = (e)=>{
        this.handle({telNumber : e.target.value});
    }
    handlePassword = (e)=>{
        this.handle({password : e.target.value});
    }
    handleRepassword = (e)=>{
        this.handle({rePassword : e.target.value});
    }
    handleYzm = (e)=>{
        this.handle({yzm : e.target.value});
    }
    handleCheck = (e)=>{
        if(e.target.checked){
            this.state.checkOk = true;
        }else{
            this.state.checkOk = false;
        }
    }
    //验证注册手机号
    veryfi = (isok,tel_value,str1,str2,obj1,obj2)=>{
        let {dialog_mask,dialog_tip,tips} = this.state;
        if(!isok){
            dialog_mask.style.display = 'block'
            dialog_tip.style.display = 'block';
            if(tel_value.length>0){
                tips.innerHTML = str1;
            }else{
                tips.innerHTML = str2;
            }
            this.setState(obj1,()=>{
                setTimeout(function(){
                    dialog_mask.style.display = 'none'
                    dialog_tip.style.display = 'none';
                },1000)
            })
        }else{
            this.setState(obj2,()=>{
            })
        }
    }
    veryTel = (e)=>{
        let tel_value = e.target.value;
        var reg = /^1[3-9]\d{9}$/
        var isok = reg.test(tel_value);
        let str1 = '您输入的手机号码错误，请重新输入';
        let str2 = '请输入手机号码';
        this.veryfi(isok,tel_value,str1,str2,{telNumberOk:false},{telNumberOk:true})
        
    }
    veryPassword = (e)=>{
        let password = e.target.value;
        var reg = /^\w{6,20}$/;
        var isok = reg.test(password);
        let str1 = '请输入6-20位英文字母或数字';
        let str2 = '请设置密码';
        this.veryfi(isok,password,str1,str2,{passwordOk:false},{passwordOk:true})
    }
    veryRepassword = (e)=>{
        let isok =false;
        let rePassword = e.target.value;
        let str1 = '密码不一致，请重新输入';
        let str2 = '密码不一致，请重新输入';
        if(rePassword===this.state.password){
            isok = true;
        }
        this.veryfi(isok,rePassword,str1,str2,{rePasswordOk:false},{rePasswordOk:true})
    }
    veryYzm = (e)=>{
        let isok = false;
        let yzm = e.target.value;
        let {dialog_mask,dialog_tip,tips,code} = this.state;
        code = code.toLowerCase();
        yzm = yzm.toLowerCase();
        if(yzm === code){
            isok = true;
            this.state.codeOk = true;
        }else{
            this.state.codeOk = false;
        }
        if(!isok){
            dialog_mask.style.display = 'block'
            dialog_tip.style.display = 'block';
            tips.innerHTML = '验证码填写错误';
        }
        let timer = setTimeout(function(){
            dialog_mask.style.display = 'none'
            dialog_tip.style.display = 'none';
            clearTimeout(timer);
        },1000)
    }
    closeDialog = ()=>{
        let {dialog_mask,dialog_tip} = this.state;
        dialog_mask.style.display = 'none'
        dialog_tip.style.display = 'none';
    }
    register = ()=>{
        let {dialog_mask,dialog_tip,tips,telNumber,password,rePassword,telNumberOk,passwordOk,rePasswordOk,codeOk,checkOk} = this.state;
        if(telNumber.length<=0||password.length<=0||rePassword.lenght<=0){
            dialog_mask.style.display = 'block'
            dialog_tip.style.display = 'block';
            let timer = setTimeout(function(){
                dialog_mask.style.display = 'none'
                dialog_tip.style.display = 'none';
                clearTimeout(timer);
            },1000)
            tips.innerHTML = "请输入相关用户信息";
        }else{
            if(!codeOk){
                dialog_mask.style.display = 'block'
                dialog_tip.style.display = 'block';
                tips.innerHTML = "请输入验证码"
            }else{
                if(!checkOk){
                    dialog_mask.style.display = 'block'
                    dialog_tip.style.display = 'block';
                    tips.innerHTML = "请勾选服务协议";
                }
            }
        }
        
        if(telNumberOk&&passwordOk&&rePasswordOk&&codeOk){
            this.props.axios.get('/register/telNumber',{
                params:{
                    telNumber:telNumber
                }
            }).then(res=>{
                if(res.data){
                    this.props.axios.post('/register/insert',{
                        uImg:"https://www.aizhiyi.com/data/upload/shop/avatar/1.png?timestemp=1554122083174",
                        telNumber: telNumber,
                        password: password,
                        nickname:"",
                        sex:"",
                        birthday:""
                    }).then(res=>{
                        if(res.data.ok){
                            dialog_mask.style.display = 'block'
                            dialog_tip.style.display = 'block';
                            tips.innerHTML = "注册成功";
                            let _this = this;
                            setTimeout(function(){
                                _this.props.history.push('/user_login');
                            },1000);
                            
                        }
                    })
                }else{
                    dialog_mask.style.display = 'block'
                    dialog_tip.style.display = 'block';
                    tips.innerHTML = "当前手机号已被注册，请更换其他号码。";
                }
            })
            
        }
    }
    goBack = ()=>{
        this.props.history.goBack();
    }
    render(){
        return <div>
            <div className="Nlogin register_wrap">
                <header id="header" className="fixed">
                    <div className="header-wrap">
                        <div className="header-l"><a href="javascript:;" onClick={this.goBack}><i className="back"></i></a></div>
                        <div className="header-title">
                            <h1>注册</h1>
                        </div>
                    </div>
                </header>
                <div className="nctouch-main-layout fixed-Width register-top Nfor">
                    <div className="nctouch-inp-con new-nctouch">
                        <form>
                            <ul className="form-box">
                                <li className="form-item">
                                    <div className="input-box">
                                        <input 
                                        value={this.state.telNumber}
                                        onChange={this.handleTel}
                                        onBlur={this.veryTel}
                                        type="tel"
                                        placeholder="请输入手机号"
                                        className="inp"
                                        name="usermobile"
                                        maxLength="11" />
                                        <span></span>
                                    </div>
                                </li>
                                <li className="form-item">
                                    <div className="input-box">
                                        <input 
                                        value={this.state.password}
                                        onChange={this.handlePassword}
                                        onBlur={this.veryPassword}
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        maxLength="20" 
                                        size="20" 
                                        className="inp message-text" 
                                        autoComplete="off" 
                                        placeholder="设置密码 (6-20位英文字母或数字)"
                                        />      
                                        <span></span>
                                    </div>
                                </li>
                                <li className="form-item">
                                    <div className="input-box">
                                        <input 
                                        value={this.state.repassword}
                                        onChange={this.handleRepassword}
                                        onBlur={this.veryRepassword}
                                        type="password" 
                                        id="repassword" 
                                        name="repassword" 
                                        maxLength="20"
                                        size="20" 
                                        className="inp message-text" 
                                        autoComplete="off" 
                                        placeholder="请再次输入密码" 

                                        />
                                        <span></span>
                                    </div>
                                </li>
                                <li className="form-item">
                                    <div className="input-box">
                                        <input 
                                        value={this.state.yzm}
                                        onChange={this.handleYzm}
                                        onBlur={this.veryYzm}
                                        type="text" 
                                        id="captcha" 
                                        name="captcha" 
                                        maxLength="4" 
                                        size="10" 
                                        className="inp" 
                                        autoComplete="off" 
                                        placeholder="输入4位验证码"
                                        />
                                        <span className="input-del code"></span>
                                        <a href="javascript:;" id="refreshcode" className="code-img" ref='code'>
                                            
                                        </a>
                                    </div>
                                </li>
                            </ul>
                            <div className="form-btn" style={{marginTop:'1.0rem'}}>
                                <a href="javascript:;" onClick={this.register} style={{lineHeight:'0.95rem'}} className="btn">
                                    确认注册
                                </a>
                            </div>
                            <div className="remember-form">
                                <input
                                onChange={this.handleCheck}
                                type="checkbox" 
                                name="" 
                                id="checkbox"
                                />
                                <label htmlFor="checkbox">阅读并同意</label>
                                <a href="javascript:;" className="reg-cms">
                                    《服务协议》
                                </a>
                                <a className="reg-cms" href="javascript:;">《隐私协议》</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="simple-dialog-wrapper">
                <div ref='dialog_mask'
                    className="s-dialog-mask"
                    style={{height:'13.34rem',display:"none"}}
                >
                </div>
                <div ref='dialog_tip'
                    style={{left: '50%', top: '333.5px', marginLeft: '-140px',display:"none"}}
                    className="s-dialog-wrapper s-dialog-skin-block"
                >
                    <div className="s-dialog-content">
                        <p ref="tips"></p>
                    </div>
                    <div className="s-dialog-btn-wapper">
                        <a href="javascript:void(0)" className="s-dialog-btn-ok" onClick={this.closeDialog}>
                            <span>确定</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    }
}
UserRegister = withAxios(UserRegister);
export default UserRegister;