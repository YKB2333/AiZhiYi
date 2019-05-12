import React,{Component} from 'react';
import { Input,Select,Form, Icon,  Button,message } from 'antd';
import withAxios from '../hoc/withAxios.js';
import axios from 'axios'
const Option = Select.Option;
const spanStyle={
    display:"inline-block",
    width:"180px",
    textAlign:"right",
    marginTop:"20px"
}

class addUser extends Component{
    constructor(){
        super();
        this.state = {
            datalist:[],
            username:'',
            usertel:'',
            userpsw:'',
            userrepsw:'',
            sex:"男",
            shenfen:'普通用户',
            checkname:[],
            
        }
        this.tijiao = this.tijiao.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeTel = this.changeTel.bind(this);
        this.changePsw = this.changePsw.bind(this);
        this.changerePsw = this.changerePsw.bind(this);
        this.changeSex = this.changeSex.bind(this);
        this.changeShenfen = this.changeShenfen.bind(this);
    }
   async tijiao(){
    let {username,usertel,userpsw,userrepsw,sex,shenfen} = this.state;
    if(this.state.userpsw != this.state.userrepsw ){
        message.info('两次输入的密码不匹配');
    }else{
        let data = await this.props.axios.post('/adduser',{
        name:username,
        phone:usertel,
        pass:userpsw,
        sex:sex,
        shenfen:shenfen
    });
        message.info('添加成功');
    }
    
    
    
    
    }
    async checkname(name){
        console.log(name)
        if(name){
            let data = await this.props.axios.get('/adduser/check',{
            params:{
            name:name
            }
        });
        this.setState({
            checkname:data.data
        })
        console.log("自身数据",data.data)
        console.log(333333333)
        console.log("设置",this.state.checkname)
        }
    }

    changeName(e){
        this.setState({
            username:e.target.value
        })
    }
    changeTel(e){
        this.setState({
            usertel:e.target.value
        })
    }
    changePsw(e){
        this.setState({
            userpsw:e.target.value
        })
    }
    changerePsw(e){
        this.setState({
            userrepsw:e.target.value
        })
    }
    changeSex(e){
        this.setState({
            sex:e
        })   
    }
    changeShenfen(e){
        this.setState({
            shenfen:e
        })   
    }

    render(){
        console.log("阿虎",this.state.checkname)
        return <form className="addUser" style={{margin:"50px auto",width:"600px"}}>
        <span  style={spanStyle}>用户名</span><Input value={this.state.username} onChange={this.changeName} onBlur={this.checkname.bind(this,this.state.username)} placeholder="请输入用户名"  style={{width:'200px',marginLeft:"20px",marginTop:"20px"}}/>
        {
            this.state.checkname.length==0?<span></span>:<span style={{color:"red"}}>这个名字太瘦欢迎了</span>
        }<br/>
        <span style={spanStyle}>手机号码</span><Input value={this.state.usertel} onChange={this.changeTel} placeholder="请输入手机号码" type="tel" style={{width:'200px',marginLeft:"20px"}}/><br/>
       
        <span style={spanStyle}>密码</span><Input type="password"  value={this.state.userpsw} onChange={this.changePsw} placeholder="请输入密码"  style={{width:'200px',marginLeft:"20px"}}/><br/>
        <span style={spanStyle}>确认密码</span><Input type="password" value={this.state.userrepsw} onChange={this.changerePsw} placeholder="请确认密码"  style={{width:'200px',marginLeft:"20px"}}/><br/>
        <span style={spanStyle}>性别</span><Select onChange={this.changeSex} defaultValue="男" style={{ width: 200 ,marginLeft:20}} loading>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
            <Option value="不详">不详</Option>
        </Select><br/>
        <span style={spanStyle}>身份</span><Select onChange={this.changeShenfen} defaultValue="普通用户" style={{ width: 200 ,marginLeft:20}} loading>
            <Option value="管理员">管理员</Option>
            <Option value="普通用户">普通用户</Option>
            
        </Select><br/>
        <span style={spanStyle}></span> <Button onClick={this.tijiao} type="primary" style={{marginLeft:18,marginTop:20}}>提交</Button>
        </form>
    }
}
addUser = withAxios(addUser);
export default addUser;