import React, { Component } from 'react';
import { Route, Redirect, Switch ,withRouter} from 'react-router-dom';
import { Link } from 'react-router';
import App from './App.js';
import Login from './pages/login.js';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Header, Content, Footer, Sider} = Layout;
 


class Apptest extends Component {
  constructor(props) {
    super();
    this.state = {
		user:{}
    } 
  }
  render() {
    return  (<div>
			 <Switch>
			  <Route path="/login" component={Login} />
			  <Route path="/app" component={App} />
			  <Redirect from="/"  to="/login" />
			</Switch>
		</div>
	)
  }
}
Apptest = withRouter(Apptest);
export default Apptest;
