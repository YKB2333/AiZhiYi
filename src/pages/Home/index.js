/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-04-03 11:13:45
 * @LastEditTime: 2019-04-13 16:54:49
 * @ 首页
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Carousel } from "antd";

// 获取组件
import Top from "./top";
import withAxios from "../../hoc/withAxios";
import "./index.css";
// loading
import Loading from "../loading";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      saleNum: [],
      saleNumber: [],
      nav: [
        {
          text: "传统工艺",
          gc_id_1: "1378"
        },
        {
          text: "民俗文化",
          gc_id_1: "1383"
        },
        {
          text: "茶艺茶道",
          gc_id_1: "1379"
        },
        {
          text: "特产美食",
          gc_id_1: "1382"
        },
        {
          text: "文化创意",
          gc_id_1: "1384"
        },
        {
          text: "个性定制",
          gc_id_1: "1309"
        },
        {
          text: "专馆基地",
          gc_id_1: "1383"
        },

        {
          text: "珠宝首饰",
          gc_id_1: "1381"
        }
      ]
    };
    // console.log(this);
  }
  skip(val) {
    // console.log(this);
    // console.log(val);
    this.props.history.push({
      pathname: "/list",
      search: `?gc_id_1=${val}`,
      state: {
        text: val
      }
    });
  }
  // 直接跳转详情页
  addGoods = id => {
    this.props.history.push({
      pathname: "/goods",
      search: "id=" + id
    });
  };
  // 请求热销商品
  componentWillMount() {
    let { axios } = this.props;
    axios
      .post("/routeHome", {
        a: "saleNum",
        num: 500
      })
      .then(res => {
        this.setState({
          saleNum: res.data
        });
        // console.log(this.state.saleNum);
        // ul宽度
        let vw = 155 * this.state.saleNum.length;

        this.refs.ul_box.style.width = (vw + 15) / 50 + "rem";
        // console.log(vw);
      });
    // 请求精品推荐
    setTimeout(() => {
      axios
        .post("/routeHome", {
          a: "saleNum",
          num: 300
        })
        .then(res => {
          this.setState({
            saleNumber: res.data
          });
          this.forceUpdate();
          // console.log(this.state.saleNumber);
        });
    }, 1000);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.saleNum == this.state.saleNum) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    // let path = this.props.location.pathname;
    // console.log(this.state);
    return (
      <div className="home">
        <Top />
        console.console.log();
        {/* 遮盖 */}
        {this.state.saleNum.length != 0 ? (
          <main className="scroll_wrap">
            <div
              style={{
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div className="Box">
                {/* 轮播图 */}
                <Carousel autoplay>
                  <div>
                    <h3>
                      <img
                        src={require("../../images/s0_05887823099743207.jpg")}
                        alt=""
                      />
                    </h3>
                  </div>
                  <div>
                    <h3>
                      <img
                        src={require("../../images/s0_06064954048617157.jpg")}
                        alt=""
                      />
                    </h3>
                  </div>
                  <div>
                    <h3>
                      <img
                        src={require("../../images/s0_06065063469953376.jpg")}
                        alt=""
                      />
                    </h3>
                  </div>
                  <div>
                    <h3>
                      <img
                        src={require("../../images/s0_06071963883756446.jpg")}
                        alt=""
                      />
                    </h3>
                  </div>
                  <div>
                    <h3>
                      <img
                        src={require("../../images/s0_06074671247457566.jpg")}
                        alt=""
                      />
                    </h3>
                  </div>
                </Carousel>
                {/* 菜单栏 */}
                <nav className="menu-list">
                  <ul className="category_index  clearfix">
                    {this.state.nav.map(item => {
                      return (
                        <li
                          key={item.text}
                          onClick={this.skip.bind(this, item.gc_id_1)}
                        >
                          <i className="icon icon-culture" />
                          <p>{item.text}</p>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                {/*  主要区 */}
                <div className="main-container2" style={{ width: "100%" }}>
                  {/* 广告1 */}
                  <div className="voucher-img mid-recommend">
                    <img src={require("../../images/z112.png")} alt="" />
                  </div>
                  {/* 抢购 */}
                  <div className="yuan">
                    <div className="yuan-top free">
                      <i className="one" />
                      <span className="one">热门抢购</span>
                      <span className="three">免费包邮</span>
                      <i className="two" />
                      <div className="yuan-bot">
                        <div className="active-con" />
                      </div>
                    </div>
                    <div className="yuan-bot">
                      <div className="active-con">
                        <div className="wrap">
                          <ul className="clearfix " ref="ul_box">
                            {this.state.saleNum.map(item => {
                              return (
                                <li
                                  key={item.goods_id}
                                  onClick={this.addGoods.bind(
                                    this,
                                    item.goods_id
                                  )}
                                >
                                  <i>
                                    <span>{item.goods_fic_salenum}人</span>
                                  </i>
                                  <img src={item.gImg_240} alt="" />
                                  <p>{item.gTitle}</p>
                                  <p
                                    style={{
                                      textAlign: "left"
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "0.34rem",
                                        color: "#d33d3c",
                                        marginRight: "0.2rem"
                                      }}
                                    >
                                      ￥{item.xianshi_price}
                                    </span>
                                    <b>原价 ¥ {item.gPrice}</b>
                                  </p>
                                </li>
                              );
                            })}

                            {/* <li>
                            <i>
                              <span>12人</span>
                            </i>
                            <img
                              src="https://www.aizhiyi.com/data/upload/shop/store/goods/89/2018/11/09/89_05951032489879724_240.jpg?v=14"
                              alt=""
                            />
                            <p>面颂吉祥发财面</p>
                            <p
                              style={{
                                textAlign: "left"
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "0.34rem",
                                  color: "#d33d3c",
                                  marginRight: "0.2rem"
                                }}
                              >
                                ￥0
                              </span>
                              <b>原价 ¥ 68.00</b>
                            </p>
                          </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 精品推荐 */}
                  <div className="culture-con guess_contain">
                    <header className="title goods_type">
                      <span>精品推荐</span>
                    </header>
                    {/* 商品 */}
                    <ul className="perfect-recom clearfix">
                      {this.state.saleNumber.map(item => {
                        return (
                          <li
                            key={item.goods_id}
                            onClick={this.addGoods.bind(this, item.goods_id)}
                          >
                            <img src={item.gImg_240} alt="" />
                            <h2>{item.gTitle}</h2>
                            <div className="bottom_price clearfix">
                              <span>
                                <dfn>¥</dfn>
                                {item.xianshi_price}
                              </span>
                              <font>销量: {item.goods_fic_salenum}</font>
                            </div>
                          </li>
                        );
                      })}
                      {/* <li>
                      <img
                        src="https://www.aizhiyi.com/data/upload/shop/store/goods/118/2019/03/22/118_06065910278569319_240.jpg?v=14"
                        alt=""
                      />
                      <h2>巧克力蓝牙音箱</h2>
                      <div className="bottom_price clearfix">
                        <span>
                          <dfn>¥</dfn>298.00
                        </span>
                        <font>销量: 647</font>
                      </div>
                    </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
withRouter(Home);
Home = withAxios(Home);
export default Home;
