/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-04-07 22:54:07
 * @LastEditTime: 2019-04-10 16:46:02
 * @ 首页头部菜单
 */
import React, { Component } from "react";
import { Icon } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./Top.css";
class Top extends Component {
  constructor(params) {
    super();
    this.state = {};
    // console.log(this);
  }

  componentWillMount() {
    this.props.show(this.props.location.pathname);
  }
  upper = () => {
    this.props.history.push("/home");
  };
  render() {
    return (
      <div className="Home_box">
        {/* 头部搜索框 */}
        <div className="top_box">
          <a href="JavaScript:;" className="log_box">
            {this.props.common.show === true ? (
              <img
                src={require("../../images/top_logo.png")}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block"
                }}
              />
            ) : (
              <Icon
                type="left"
                style={{
                  fontSize: "20px",
                  color: "#fff"
                }}
                onClick={this.upper}
              />
            )}
          </a>
          <h1>
            <div className="header-inp">
              <div className="search-cont">
                <Icon type="search" className="icon" />
                <span className="search-input">文化创意，玩转生活</span>
                <span className="comehere">
                  <Icon type="message" className="message" />
                </span>
              </div>
            </div>
          </h1>
        </div>
      </div>
    );
  }
}
Top = withRouter(Top);
Top = connect(
  state => state,
  (dispatch, owProps) => {
    // console.log("owProps");
    return {
      show(path) {
        if (path === "/list") {
          dispatch({ type: "hide_menu", payload: "" });
        } else {
          dispatch({ type: "show_menu", payload: "" });
        }
      }
    };
  }
)(Top);
export default Top;
