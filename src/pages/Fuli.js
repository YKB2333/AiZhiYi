import React,{Component} from 'react';
import ReactDom from 'react-dom';
import { Icon,Menu } from 'antd';
import {Switch,Route,Redirect} from 'react-router-dom';
import Zero from './zero.js';
import Pingtuan from './pingtuan.js';
import Limit from './limit.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

/*
    h2的样式
 */

const h2Style={
    background:"red",
    color:"white",
    textAlign:"center",
    height:"0.88rem",
    lineHeight:"0.88rem",
    fontSize:'0.4rem',
    width:"7.5rem",
    paddingLeft:"0.8rem"
}
const MenuItemStyle={
    width:"2.5rem",
    height:"0.9rem",
    textAlign:"center",
    fontSize:"0.32rem"

}
const contentStyle={
   height:"10.36rem",
   overflowX:"hidden"
}


class Fuli extends Component{
    constructor(){
        super();
        this.state={
            datalist:[],
            route:[
                {
                    text:'0元抢购',
                    path:'/zero',
                    name:'Zero'
                },
                {
                    text:'拼团',
                    path:'/pingtuan',
                    name:'Pingtuan'
                },
                {
                    text:'限时购',
                    path:'/limit',
                    name:'Limit'
                }
            ],
            current:"/zero"
        }
    this.handleClick =this.handleClick.bind(this);
    }

   
    componentDidMount(){
        console.log("创建了")
       
        console.log(this.state.current)
        this.setState({
            current:"/"+this.props.location.pathname.split('/')[2]
        })
        console.log("r",this.props);
        if(this.props.location.pathname.split('/')[2]){
            this.setState({
                current: "/"+this.props.location.pathname.split('/')[2]
            });
        }else{
            this.setState({
                current: '/zero'
            });
        }
        
    }
    
    
    /*
        点击切换下标
     */
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
                current: e.key
            });
       this.props.history.push('/fuli'+e.key)
           
    }
    dianji(){
        console.log("点击了");
    }



    render(){
        
        let {path} = this.props.match;
      
        return <div className="fuli" >
            <h2 style={h2Style}>会员福利<Icon type="message" style={{float:"right",lineHeight:"0.9rem",marginRight:"0.4rem"}}/>
            </h2>

            <div className="fuliContent">
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}

                    mode="horizontal">

                {
                    this.state.route.map(item=>
                        <Menu.Item key={item.path} style={MenuItemStyle}>{item.text}</Menu.Item>
                    )
                }
                </Menu>
                <div style={contentStyle}>
                    <Switch>
                         <Route  path={path+"/zero"} component={Zero}/>
                         <Route path={path+"/pingtuan"} component={Pingtuan}/>
                         <Route path={path+"/limit"} component={Limit}/>
                         <Redirect from={path}  to={path+"/zero"}/>
                        
                    </Switch>
                </div>
                
                
            </div>


        </div>
    }
}

Fuli = connect((state)=>{
    return {
        toGoodXq:()=>{
            console.log("youyouyou")
        }
    }
},(dispatch)=>{
    return {

    }
})(Fuli);
export default Fuli;