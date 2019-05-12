import React,{Component} from 'react';
import {Input,InputNumber,Select,Cascader ,Button,message } from "antd";
import withAxios from '../hoc/withAxios.js'
const Option = Select.Option;
 const addGoodStyle={
    padding:"50px 300px",
    minWidth:"400px",
    width:'1000px',

 }
 const spanStyle={
    width:80,
    display:"block",
    marginRight:20,
    float:'left',
    height:"32px",
    lineHeight:"32px",
    textAlign:"right",
 }
  const spanStyle1={
    width:80,
    display:"block",
    marginRight:20,
    float:'left',
    height:"32px",
    lineHeight:"32px",
    textAlign:"right",
    marginTop:"20px"
 }
const buttonStyle={marginLeft:100,marginTop:20}
const options = [{
  value: '传统工艺',
  label: '传统工艺',
  children: [{
    value: '陶瓷',
    label: '陶瓷',
    children: [{
    value: '青瓷',
    label: '青瓷',
    },{
    value: '汝窑',
    label: '汝窑',
    },{
    value: '彩瓷',
    label: '彩瓷',
    },{
    value: '荣昌陶',
    label: '荣昌陶',
    }],

  },{
    value: '布艺',
    label: '布艺',
    children: [{
    value: '刺绣',
    label: '刺绣',
    },{
    value: '绸缎',
    label: '绸缎',
    },{
    value: '棉织品',
    label: '棉织品',
    }],

  },{
    value: '锻造',
    label: '锻造',
    children: [{
    value: '兵器',
    label: '兵器',
    },{
    value: '景泰蓝',
    label: '景泰蓝',
    }],

  }],
}, {
  value: '民族文化',
  label: '民族文化',
  children: [{
    value: '匠工',
    label: '匠工',
    children: [{
    value: '摆件',
    label: '摆件',
    },{
    value: '景泰蓝',
    label: '景泰蓝',
    }],
  },{
    value: '文房',
    label: '文房',
    children: [{
    value: '文房四宝',
    label: '文房四宝',
    }],
  },{
    value: '民族',
    label: '民族',
    children: [{
    value: '旗袍',
    label: '旗袍',
    },{
    value: '传统乐器',
    label: '传统乐器',
    }],
  }],
},{
    value: '茶艺茶道',
    label: '茶艺茶道',
    children: [{
    value: '茶叶',
    label: '茶叶',
    children: [{
    value: '红茶',
    label: '红茶',
    },{
    value: '绿茶',
    label: '绿茶',
    },{
    value: '乌龙茶',
    label: '乌龙茶',
    },{
    value: '黑茶',
    label: '黑茶',
    },{
    value: '普洱茶',
    label: '普洱茶',
    },{
    value: '白茶',
    label: '白茶',
    },{
    value: '养生茶',
    label: '养生茶',
    }],
  },{
    value: '茶具',
    label: '茶具',
    children: [{
    value: '茶道/茶针',
    label: '茶道/茶针',
    },{
    value: '茶壶',
    label: '茶壶',
    },{
    value: '茶杯',
    label: '茶杯',
    },{
    value: '茶叶罐',
    label: '茶叶罐',
    },{
    value: '茶海',
    label: '茶海',
    },{
    value: '茶托/茶盘',
    label: '茶托/茶盘',
    },{
    value: '茶道配件',
    label: '茶道配件',
    }],
  },{
    value: '茶道',
    label: '茶道',
    children: [{
    value: '茶道',
    label: '茶道',
    },{
    value: '茶棚/茶柜',
    label: '茶棚/茶柜',
    },{
    value: '摆件',
    label: '摆件',
    }],
  }],

},{
    value: '特产美食',
  label: '特产美食',
},{
    value: '珠宝首饰',
  label: '珠宝首饰',
},{
    value: '文化创意',
  label: '文化创意',
},{
    value: '个性定制',
  label: '个性定制',
}];


class addGood extends Component{
    constructor(){
        super();
        this.state = {
            goods_name:'',
            price:1,
            fenlei:[],
            zhufenlei:'',
            zifenlei:''

        }
        this.tijiao = this.tijiao.bind(this)
    }
    changeName(e){
        
        this.setState({
            goods_name:e.target.value
        })
    }
    changePrice(e){
        
        this.setState({
            price:e
        })
    }
    changeFenlei(e){
        
        this.setState({
            fenlei:e,
            zhufenlei:e[0],
            zifenlei:e[2]
        })

    }
    async tijiao(){
        let {goods_name,price,zhufenlei,zifenlei} = this.state
        
        await this.props.axios.post('/adduser/addgood',{
            goods_name,
            price,
            zhufenlei,
            zifenlei
        })
        message.info('添加成功');

    }
    render(){
        return <div className="addGood" style={addGoodStyle}>

        <span style={spanStyle}>商品名称</span><Input value={this.state.goods_name} onChange={this.changeName.bind(this)} style={{float:"left",width:"300px"}} placeholder="请输入商品的简介或者是名称" /><br/>
        <span style={spanStyle1}>价格</span><InputNumber min={0} style={{marginTop:"20px"}} value={this.state.price} onChange={this.changePrice.bind(this)}  /><br />
        <span style={spanStyle1}>分类</span><Cascader style={{marginTop:"20px"}} options={options} onChange={this.changeFenlei.bind(this)} /><br/>
        <Button style={buttonStyle} onClick={this.tijiao} type="primary">提交</Button>
        </div>
    }
}

addGood = withAxios(addGood);
export default addGood;