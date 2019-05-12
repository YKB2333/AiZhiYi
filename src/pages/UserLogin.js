/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from "react";
// import './UserLogin.css'
//引入高阶组件
import withAxios from "../hoc/withAxios";
//引入connect高阶组件
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// 引入action
import loginAction from "../actions/loginAction";
class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      telNumber: "",
      password: ""
    };
  }
  handleTel = e => {
    this.setState({
      telNumber: e.target.value
    });
  };
  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  //用户登录
  login = () => {
    let { telNumber, password } = this.state;
    this.props.axios
      .post("/login", {
        telNumber: telNumber,
        password: password
      })
      .then(res => {
        if (res.data.code) {
          localStorage.setItem("telNumber", res.data.telNumber);
          localStorage.setItem("token", res.data.token);
          this.props.axios
            .get("/login/user_info", {
              params: {
                telNumber: telNumber
              }
            })
            .then(res => {
              console.log(res.data);
              localStorage.setItem("uImg", res.data[0].uImg);
              localStorage.setItem("nickname", res.data[0].nickname);
              localStorage.setItem("sex", res.data[0].sex);
              localStorage.setItem("birthday", res.data[0].birthday);
              this.props.history.push("/user");
            });
        } else {
          let { dialog_mask, dialog_tip, tips } = this.refs;

          dialog_mask.style.display = "block";
          dialog_tip.style.display = "block";
          tips.innerHTML = "手机号码或密码输入错误，请重新输入";
        }
      });
  };
  //关闭弹窗
  closeDialog = () => {
    let { dialog_mask, dialog_tip } = this.refs;
    dialog_mask.style.display = "none";
    dialog_tip.style.display = "none";
  };
  //返回上一个页面
  goBack = () => {
    this.props.history.goBack();
  };
  //点击去到注册页;
  gotoRegsiter = () => {
    this.props.history.push("/user_register");
  };
  render() {
    return (
      <div>
        <div className="Nlogin">
          <header id="header">
            <div className="header-wrap">
              <div className="header-l">
                <a href="javascript:;" onClick={this.goBack}>
                  <i className="back" />
                </a>
              </div>
              <div className="header-title">
                <h1>账号登录 </h1>
              </div>
            </div>
          </header>
          <div className="horn">
            <div className="img_box clearfix" id="img_box" />
            <h3>新用户注册立送160元大礼包</h3>
          </div>
          <div className="Nlogin-sc">
            <div className="portrait">
              <span />
            </div>
            <div className="nctouch-main-layout fixed-Width">
              <div className="nctouch-inp-con">
                <div>
                  <ul className="form-box">
                    <li className="form-item name">
                      <i className="nameico" />
                      <div className="input-box  login-btn">
                        <input
                          value={this.state.telNumber}
                          onChange={this.handleTel}
                          type="tel"
                          placeholder="请输入手机号"
                          maxLength="11"
                          className="inp"
                          name="username"
                          id="username"
                        />
                      </div>
                    </li>
                    <li className="form-item name">
                      <i className="pwdico" />
                      <div className="input-box  login-btn">
                        <input
                          value={this.state.password}
                          onChange={this.handlePassword}
                          type="password"
                          placeholder="请输入密码"
                          className="inp"
                          name="pwd"
                          id="userpwd"
                        />
                      </div>
                      <em className="eye" />
                    </li>
                  </ul>
                  <div className="remember-form">
                    <div className="form-btn go tel ok">
                      <a
                        href="javasript:;"
                        onClick={this.gotoRegsiter}
                        className="btn"
                      >
                        手机快速注册
                      </a>
                    </div>
                    <a href="javascript:;" className="forgot-password">
                      忘记密码
                    </a>
                  </div>
                  <div className="form-btn ok confirm active">
                    <input
                      type="button"
                      onClick={this.login}
                      className="btn"
                      id="loginbtn"
                      value="登 录"
                    />
                  </div>
                </div>
              </div>
              <div className="joint-login active">
                <h2>
                  <span>合作账号登录</span>
                </h2>
                <ul>
                  <li style={{ display: "listItem" }}>
                    <div className="disclick" />
                    <a className="qq" href="javascript:;">
                      {" "}
                      <i />
                    </a>
                  </li>
                  <li style={{ display: "listItem" }}>
                    <div className="disclick" />
                    <a className="weibo" href="javascript: void(0);">
                      {" "}
                      <i />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="simple-dialog-wrapper">
          <div
            ref="dialog_mask"
            className="s-dialog-mask"
            style={{ height: "13.34rem", display: "none" }}
          />
          <div
            ref="dialog_tip"
            style={{
              left: "50%",
              top: "333.5px",
              marginLeft: "-140px",
              display: "none"
            }}
            className="s-dialog-wrapper s-dialog-skin-block"
          >
            <div className="s-dialog-content">
              <p ref="tips" />
            </div>
            <div className="s-dialog-btn-wapper">
              <a
                href="javascript:void(0)"
                className="s-dialog-btn-ok"
                onClick={this.closeDialog}
              >
                <span>确定</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UserLogin = withAxios(UserLogin);

export default UserLogin;
