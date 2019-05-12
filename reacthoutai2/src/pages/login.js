
import React from 'react';
import {withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import withAxios from '../hoc/withAxios'
import glist from './Glist'
const FormItem = Form.Item;

class Login extends React.Component {
	constructor(props){
		super();
		this.state={
			user:{},
			_user:'',
			_psw:'',
			_jizhu:''
		}
		let user = localStorage.getItem('user');
		 if(!user){
					this.state.user = {}
		}else{
					this.state.user = JSON.parse(user);	
		}
		if(this.state.user.name){
				props.history.push('/app/glist')
		}else{
				props.history.push('/login')
		}
	}

	user(e){
		if(e.target.value){
			this.state._user=e.target.value	
		}else{
			message.info('用户名不能为空');
		}
	}
	psw(e){
		if(e.target.value){
			this.state._psw=e.target.value
		}else{
			message.info('密码不能为空');
		}
	}
	jizhu(){
	}
	async login(){
		if(this.state._user&&this.state._psw){
			let {data}=await this.props.axios.post('/login',{
				name:this.state._user,
				pass:this.state._psw
			})
			if(data.code==200){
				data=JSON.stringify(data)
				localStorage.setItem('user',data)				
				message.info('登录成功');
				this.props.history.push('/app/glist')
			}else{
				message.info('用户名与密码不匹配');
			}
		}
	}
    render() {
        // const { getFieldDecorator } = this.props.form;
        return (
            <div className="login" style={{'position':'absolute','left':'50%','top':'50%','transform':'translate(-50%,-50%)'}}>
                <div className="login-form" >
                    <div className="login-logo">
                        <span>React Admin</span>
                    </div>
                    <Form  style={{maxWidth: '300px'}}>
                        <FormItem>
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" onBlur={this.user.bind(this)}/>
                        </FormItem>
                        <FormItem>
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" onBlur={this.psw.bind(this)}/>           
                        </FormItem>
                        <FormItem>                       
                                <Checkbox onClick={this.jizhu.bind(this)}>记住我</Checkbox>
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" onClick={this.login.bind(this)} className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                          
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}
Login=withAxios(Login);
Login=withRouter(Login);
export default Login;
