import React, { Component } from 'react';
import { Route, Redirect, Switch ,withRouter} from 'react-router-dom';
import { Link } from 'react-router';
import AddGood from './pages/addGood.js';
import AddUser from './pages/addUser.js';
import Glist from './pages/Glist.js';
import OrderList from './pages/orderList.js';
import UserList from './pages/UserList.js';
import Login from './pages/login.js';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import "antd/dist/antd.css"
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const headerStyle = {
  display:"none"
}
const { Header, Content, Footer, Sider} = Layout;
 const test = true;




class App extends Component {
  constructor() {
    super();
    this.state = {
      current:"/glist",
      login:false,
			user:{}
    }
    this.toGoodlist = this.toGoodlist.bind(this);
    this.toAddgood = this.toAddgood.bind(this);
    this.toAdduser = this.toAdduser.bind(this);
    this.toOrderlist = this.toOrderlist.bind(this);
    this.toUserlist = this.toUserlist.bind(this);
		
  }
	componentWillMount(){
			let user = localStorage.getItem('user');
		 if(!user){
					this.state.user = {}
			}else{
					this.state.user = JSON.parse(user);	
      }
      this.setState({
        current:this.props.location.pathname
      })
	}
  toGoodlist(){
    console.log(this)
    this.props.history.push('/app/glist')
  }
  toAddgood(){
    console.log(this)
    this.props.history.push('/app/addgood')
  }
  toAdduser(){
    console.log(this)
    this.props.history.push('/app/adduser')
  }
  toOrderlist(){
    console.log(this)
    this.props.history.push('/app/orderlist')
  }
  toUserlist(){
    console.log(this)
    this.props.history.push('/app/userlist')
  }
	logout(){
		this.props.history.push('/login')
		localStorage.setItem('user','');
	}
  render() {
    return  (<Layout>
    <Header className="header">
    <div style={{width:'200px',float:"left",color:"white",fontSize:"22px"}} >后台管理系统</div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px',float:"right" }}
      > 
          <SubMenu title={<span className="submenu-title-wrapper"><img src={this.state.user.uImg} style={{'widdth':"20px",'height':'20px'}}/>我的</span>}>
                
                  <Menu.Item key="setting:1">我的信息</Menu.Item>
                  <Menu.Item key="setting:2">修改信息</Menu.Item>
                
              </SubMenu>
              <Menu.Item key="alipay" onClick={this.logout.bind(this)}>
                退出
              </Menu.Item>
        </Menu>
    </Header>

    <Content >
      
      <Layout style={{  background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[this.state.current]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" title={<span>商品管理</span>}>
              <Menu.Item key="/glist" onClick={this.toGoodlist}>商品列表</Menu.Item>
              <Menu.Item key="/addgood" onClick={this.toAddgood}>添加商品</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span>用户管理</span>}>
              <Menu.Item key="/userlist" onClick={this.toUserlist}>用户列表</Menu.Item>
              <Menu.Item key="/adduser" onClick={this.toAdduser}>添加用户</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span>订单管理</span>}>
              <Menu.Item key="/orderlist" onClick={this.toOrderlist}>订单列表</Menu.Item>
              
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
         
          <Switch>
            <Route path="/app/addgood" component={AddGood} />
            <Route path="/app/adduser" component={AddUser} />
            <Route path="/app/glist" component={Glist} />
            <Route path="/app/orderlist" component={OrderList} />
            <Route path="/app/userlist" component={UserList} />
            <Redirect from="/app"  to="/app/glist" />
          </Switch>

        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
	)
  }
}
App = withRouter(App);
export default App;
