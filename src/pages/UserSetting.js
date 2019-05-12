/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

// import './UserSetting.css'
class UserSetting extends Component {
    loginout = ()=>{
        localStorage.removeItem('telNumber');
        localStorage.removeItem('token');
        this.props.history.push('/user_login');
    }
    goBack = ()=>{
        this.props.history.goBack();
    }
    render() {
        return <div>
            <header id="header">
                <div className="header-wrap">
                    <div className="header-l">
                        <a href="javascript:;" onClick={this.goBack}>
                            <i className="back"></i>
                        </a>
                    </div>
                    <div className="header-title">
                        <h1>设置</h1>
                    </div>
                </div>
            </header>
            <div className="nctouch-main-layout" style={{ marginTop: "0.88rem" }}>

                <div className="setLsit">
                    <ul className="one">
                        <li><a href="javascript:;"><span>账号管理</span><i></i></a></li>
                        <li><a href="javascript:;"><span>消息推送</span><em>已开启</em></a></li>
                    </ul>
                    <ul className="three">
                        <li><a href="javascript:;"><span>意见反馈</span><i></i></a></li>
                        <li><a href="javascript:;"><span>关于我们</span><i></i></a></li>
                    </ul>
                </div>
                <ul className="nctouch-default-list set loginout">
                    <li><a id="logoutbtn" href="javascript:void(0);" onClick={this.loginout}><h4>退出登录</h4></a></li>
                </ul>
            </div>
        </div>
    }
}

export default UserSetting;