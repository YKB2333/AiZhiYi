import React, { Component } from "react";
import Top from "../Home/top";
// import Loading from "../loading";
import withAxios from "../../hoc/withAxios";
import { Icon } from "antd";
import "./index.css";
class List extends Component {
  constructor(params) {
    super();
    this.state = {
      list_how: []
    };
    console.log(this);
  }
  // 跳转详情页
  detail = (id, ev) => {
    // ev.preventDefault();
    console.log(id, ev.target.tagName);
    if (ev.target.tagName === "IMG" || ev.target.tagName === "H4") {
      this.props.history.push({
        pathname: "/goods",
        search: "id=" + id
      });
    }
    if (ev.target.tagName === "path" || ev.target.tagName === "svg") {
      //   let { axios } = this.props;
      //   let {
      //     goods_id,
      //     gShop,
      //     gImg,
      //     gTitle,
      //     gDescribe,
      //     gPrice,
      //     gNumber
      //   } = this.state.list_how;
      //   axios
      //     .post("/home", {
      //       a: "addCart",
      //       goods_id,
      //       gShop,
      //       gImg,
      //       gTitle,
      //       gDescribe,
      //       gPrice,
      //       gNumber
      //     })
      //     .then(res => {});
    }
  };
  componentWillMount() {
    let { axios } = this.props;
    // 获取gc_id
    let gc_id = this.props.location.search.split("?")[1].split("=")[1];

    axios
      .get("/routeHome", {
        params: {
          a: "classify",
          gc_id_1: gc_id
        }
      })
      .then(res => {
        this.setState({
          list_how: res.data
        });

        console.log("list_how", this.state.list_how);
      });
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.hist == this.state.hist) {
  //     return false;
  //   }
  // }
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Top />
        <div className="goods-search-list-nav clear_float">
          <div className="TopNav">
            <ul className="nav_ul clear_float">
              <li className="hover">综合</li>
              <li>销量</li>
              <li>价格</li>
            </ul>
            <Icon
              type="shopping-cart"
              style={{
                fontSize: "26px"
              }}
              className="shop-cart"
            />
          </div>
          <div className="nctouch-main-layout-hlq  mb20">
            <div style={{ overflowX: "hidden", height: "100%" }}>
              <ul className="goods-secrch-list-hlq clear_float">
                {this.state.list_how.map(item => {
                  return (
                    <li
                      className="goods-item-hlq"
                      key={item.goods_id}
                      onClick={this.detail.bind(this, item.goods_id)}
                    >
                      <span className="goods-pic-hlq">
                        <img src={item.gImg_240} alt="" />
                      </span>
                      <div className="goods-info-hlq">
                        <div className="goods-name-hlq">
                          <h4 style={{ fontSize: "14px" }}> {item.gTitle}</h4>
                        </div>
                        <div className="goods-sale-hlq">
                          <span className="goods-price-hlq">
                            <i>￥</i>
                            <em>{item.xianshi_price}</em>
                          </span>
                        </div>
                        <p className="por-fk-hlq">
                          <span>{item.goods_fic_salenum}</span>人已付款
                        </p>
                        <Icon
                          type="shopping-cart"
                          style={{
                            color: "#d62327",
                            fontSize: "20px",
                            position: "absolute",
                            right: "20px",
                            bottom: "12px"
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
                {/* <li className="goods-item">
                  <span className="goods-pic">
                    <img
                      src="https://www.aizhiyi.com/data/upload/shop/store/goods/94/2018/12/28/94_05993287052278317_360.jpg?v=14"
                      alt=""
                    />
                  </span>
                  <div className="goods-info">
                    <div className="goods-name">
                      <h4> 龙泉青瓷听香茶杯</h4>
                    </div>
                    <div className="goods-sale">
                      <span className="goods-price">
                        <i>￥</i>
                        <em>99.00</em>
                      </span>
                    </div>
                    <p className="por-fk">
                      <span>235</span>人已付款
                    </p>
                    <Icon
                      type="shopping-cart"
                      style={{
                        color: "#d62327",
                        fontSize: "20px",
                        position: "absolute",
                        right: "20px",
                        bottom: "12px"
                      }}
                    />
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
List = withAxios(List);
export default List;
