import React,{Component} from 'react';
import axios from 'axios';
import withAxios from '../hoc/withAxios.js';


const imgStyle={
    width:'2.64rem',
    height:"2.94rem",
    float:"left"
}
const liStyle = {
    boxSizing:"borderBox",
    marginTop:"0.2rem",
    paddingTop:'0.12rem',
    width:'7.5rem',
    height:"3.26rem"
}
const zeroCStyle={
    height:"2.94rem",
    width:'4.46rem',
    float:"left",
    oxSizing:"borderBox",
    paddingLeft:"0.15rem"
}
const h4Style={
    height:"0.8rem",
    lineHeight:"0.8rem",
    width:'4.26rem',
    textOverflow:'ellipsis',
    whiteSpace:"nowrap",
    overflow:"hidden"
}
const p1Style ={
    lineHeight:"0.4rem",

    height:"0.4rem",
    marginBottom:"0.3rem",
    color:"red",
    

}
const p2Style ={
    textAlign:"right",
    marginTop:"0.4rem",
    marginBottom:"0.3rem",
}
const p3Style={
    float:"left",
    color:"red",
    height:"0.6rem",
    lineHeight:"0.6rem",
    fontSize:"16px"
}
const p4Style={
    float:"left",
    height:"0.6rem",
    lineHeight:"0.6rem",
    fontSize:"12px",
    textDecoration:"line-through"
}
const p5Style={
    float:"right",
    height:"0.6rem",
    lineHeight:"0.4rem",
    fontSize:"16px",
    padding:"0.1rem",
    background:"#ccc",

}
const p5Style1={
    float:"right",
    height:"0.6rem",
    lineHeight:"0.4rem",
    fontSize:"16px",
    padding:"0.1rem",
    background:"red",
}

class Pingtuan extends Component{
    constructor(){
        super();
        this.state=({
            datalist:[]
        })
    }
  
 
 /*
 去详情页
  */
    toGoods(_id){
        
        console.log(_id);
        this.props.history.push({
            pathname:'/goods',
            search:'?_id='+_id
        })

    }


    async componentWillMount(){
        //请求数据
        
      let {data}= await this.props.axios.get('/fuli/pingtuan')
      this.setState({
        datalist:data
      })
      console.log("现在",this.state.datalist)
    }

    render(){

        return <div className="zero">
            <img src={require("../img/pingtuan.jpg")} style={{width:"7.5rem",height:"3.5rem"}} />
            <ul>{
                this.state.datalist.map(item =><li onClick={this.toGoods.bind(this,item._id)} style={liStyle} key={item._id}>
                    <img style={imgStyle } src={item.gImg} />

                    <div className="neirong" style={zeroCStyle}>
                        <h4 style={h4Style}>{item.gTitle}</h4>
                        <p style={p1Style}>邀请好友，共赢拼团福利</p>
                        <p style={p2Style}><span>{item.goods_fic_count}</span>人已团</p>
                        <p style={p3Style}><span>{item.groupbuy_price5}</span>元</p>
                        <p style={p4Style}>￥<span>{item.gPrice}</span></p>
                        <p style={
                           item.end_time2 >= Date.now()?p5Style1:p5Style
                        }>{
                            item.end_time2 >= Date.now()?"去拼团":"已结束"
                        }</p>

                    </div>
                </li> )
            }
                
            </ul>


        </div>
    }
}
Pingtuan = withAxios(Pingtuan)
export default Pingtuan;