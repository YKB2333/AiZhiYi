import React, { Component } from "react";
import { Icon } from "antd";
import Home from "./pages/Home";
import Fuli from "./pages/Fuli";
import Cate from "./pages/Cate";
import Cart from "./pages/Cart";
import User from "./pages/User";
import List from "./pages/list";
import Goods from "./pages/goods";
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import UserInfo from "./pages/UserInfo";
import UserSetting from "./pages/UserSetting";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import "./base/base.css";
import "./App.css";
import "./rem";
class App extends Component {
  constructor() {
    super();
    this.state = {
      navs: [
        {
          text: "首页",
          name: "Home",
          path: "/home",
          icon: "home"
        },
        {
          text: "福利",
          name: "Fuli",
          path: "/fuli",
          icon: "gift"
        },
        {
          text: "分类",
          name: "Cate",
          path: "/cate",
          icon: "appstore"
        },
        {
          text: "购物车",
          name: "Cart",
          path: "/cart",
          icon: "shopping-cart"
        },
        {
          text: "我的",
          name: "User",
          path: "/user",
          icon: "user"
        }
      ],
      current: "Home",
      listNav: "none"
    };
    // console.log(this);
  }
  componentWillMount() {
    let { pathname } = this.props.location;
    // console.log(pathname);
    if (pathname !== "/list" && pathname !== "/goods") {
      this.setState({
        listNav: "show"
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    let { pathname } = nextProps.location;

    if (pathname === "/list" || pathname === "/goods") {
      this.setState({
        listNav: "none"
      });
    }
    this.state.navs.map(item => {
      if (pathname === item.path) {
        this.setState({
          listNav: "show"
        });
      }
      return item;
    });

    // console.log(this.state);
  }
  handleClick(key) {
    this.setState(
      {
        current: key
      },
      () => {
        this.props.history.push("/" + key.toLowerCase());
      }
    );
  }
  render() {
    let { history } = this.props;
    let { location } = history;
    return (
      <div>
        <div className="head">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/fuli" component={Fuli} />
            <Route path="/list" component={List} />
            <Route path="/goods" component={Goods} />
            {/* 动态路由 */}
            <Route path="/cate" component={Cate} />
            <Route path="/cart" component={Cart} />
            <Route path="/user" component={User} />
            <Route path="/user_info" component={UserInfo} />
            <Route path="/user_setting" component={UserSetting} />
            <Route path="/user_login" component={UserLogin} />
            <Route path="/user_register" component={UserRegister} />
            {/* <Route path="/" render={()=><div>我的首页</div>} exact/> */}
            <Redirect from="/" to="/home" />
            {/* 404 */}
          </Switch>
        </div>
        {this.state.listNav === "show" ? (
          <footer className="footer-nav" id="footer">
            <ul>
              {this.state.navs.map(item => (
                <li
                  key={item.name}
                  onClick={this.handleClick.bind(this, item.name)}
                >
                  <Icon
                    type={item.icon}
                    style={{
                      fontSize: "21px",
                      color: item.name === this.state.current ? "red" : ""
                    }}
                  />
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </footer>
        ) : (
          ""
        )}
        {this.state.navs.some(item => {
          if (item.path === location.pathname) {
            return true;
          } else {
            return false;
          }
        }) ? (
          <footer className="footer-nav" id="footer">
            <ul>
              {this.state.navs.map(item => (
                <li
                  key={item.name}
                  onClick={this.handleClick.bind(this, item.name)}
                >
                  <Icon
                    type={item.icon}
                    style={{
                      fontSize: ".42rem",
                      color: item.path === location.pathname ? "red" : ""
                    }}
                  />
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </footer>
        ) : (
          ""
        )}
      </div>
    );
  }
}
App = withRouter(App);
App = connect(state => state)(App);
export default App;
