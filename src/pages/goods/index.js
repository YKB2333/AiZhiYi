import React, { Component } from "react";
import "./index.css";
import { Icon } from "antd";
import withAxios from "../../hoc/withAxios";
import Loading from "../loading";
class Goods extends Component {
  constructor() {
    super();
    this.state = {
      goods: ""
    };
  }
  componentWillMount() {
    let id = this.props.location.search.split("?")[1].split("=")[1];
    let { axios } = this.props;
    axios
      .get("/routeHome", {
        params: {
          a: "goods",
          id: id
        }
      })
      .then(res => {
        this.setState({
          goods: res.data[0]
        });
      });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.goods === this.state.goods) {
      return false;
    } else {
      return true;
    }
  }
  return = () => {
    this.props.history.goBack("key");
  };
  addCart = ev => {
    let { axios } = this.props;
    let {
      goods_id,
      gShop,
      gImg,
      gTitle,
      gDescribe,
      gPrice,
      gNumber
    } = this.state.goods;
    axios
      .post("/routeHome", {
        a: "addCart",
        goods_id,
        gShop,
        gImg,
        gTitle,
        gDescribe,
        gPrice,
        gNumber
      })
      .then(res => {
        this.refs.cart.style.color = "red";
      });
  };
  render() {
    console.log(this.state);
    let {
      gTitle,
      gDescribe,
      gImg_240,
      xianshi_price,
      goods_fic_salenum
    } = this.state.goods;
    return (
      <div
        className="goods"
        style={{
          display: "Flex",
          flexDirection: "column"
        }}
      >
        <div className="Top">
          <div className="header-l" onClick={this.return}>
            <Icon
              type="left"
              style={{
                fontSize: "22px",
                color: "#fff"
              }}
            />
          </div>
          <ul className="header-nav">
            <li className="cur">商品</li>
          </ul>
          <div className="Top_right">
            <Icon type="shopping-cart" />
          </div>
        </div>
        {this.state.goods !== "" ? (
          <main className="main">
            {/* 轮播图 */}
            <div className="img_Box">
              <img src={gImg_240} alt="" />
            </div>
            <div className="goods-detail-cnt">
              <div className="goods-detail-name">
                <span> {gTitle} </span>
                <p>{gDescribe}</p>
              </div>
              <div className="goods-detail-price">
                <p>
                  <span className="fl">
                    ￥<em>{xianshi_price}</em>
                  </span>
                  <span className="discount-test fl">
                    <span className="discounts">购物满99可省5元</span>
                  </span>
                </p>
              </div>
              {/* 包邮 */}
              <div className="shipp cfl">
                <div className="goods-detail-item active cfl ">
                  <span className="fl">包邮</span>
                  <span
                    style={{
                      float: "right"
                    }}
                  >
                    销量 : {goods_fic_salenum}
                  </span>
                </div>
              </div>
            </div>
          </main>
        ) : (
          <Loading />
        )}

        <div className="bottom">
          <div className="otreh-handle">
            <li>
              <Icon type="shop" className="tu" />
              <span>店铺</span>
            </li>
            <li>
              <Icon type="customer-service" className="tu" />
              <span>客服</span>
            </li>
            <li>
              <Icon type="heart" className="tu" />
              <span>收藏</span>
            </li>
          </div>
          <div className="buy-handle">
            <span onClick={this.addCart.bind(this)} ref="cart">
              加入购物车
            </span>
            <span>并不想购买</span>
          </div>
        </div>
      </div>
    );
  }
}
Goods = withAxios(Goods);
export default Goods;
