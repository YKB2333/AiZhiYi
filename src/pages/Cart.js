/* eslint-disable no-redeclare */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { List, Checkbox } from "antd";
import withAxios from "../hoc/withAxios";
const goodsstyle = {
  display: "block",
  zIndex: 1,
  height: "2.5rem",
  padding: "0.24rem 0 0.24rem 0.24rem",
  marginBottom: "0.02rem",
  borderBottom: "1px solid #e8e8e8",
  position: "relative"
};
const num_mind = {
  display: "inline-block",
  color: "#666",
  fontSize: "0.28rem",
  textAlign: "right",
  lineHeight: "2.03rem"
};
const none = {
  display: "none"
};
const value_box_init = {
  left: "auto",
  right: 0,
  bottom: "0.7rem",
  border: "0 none"
};
const value_box_last = {
  left: "0.24rem",
  border: "1px solid #d9d9d9"
};
const value_input_init = {
  border: "0 none",
  width: "0.5rem",
  height: "0.3rem",
  verticalAlign: "baseline",
  fontSize: "0.24rem",
  lineHeight: "0.24rem",
  fontWeight: "normal",
  textAlign: "left",
  paddingLeft: "0.1rem"
};
const value_input_last = {
  width: "1rem",
  textAlign: "center",
  height: "0.62rem",
  lineHeight: "0.7rem",
  fontSize: "0.3rem",
  borderWidth: "0 1px",
  color: "#666",
  fontWeight: "500",
  padding: 0
};
class Cart extends Component {
  constructor() {
    super();
    this.state = {
      goodslist: [],
      goodsobj: {},
      allChecked: false,
      goods_arr: [],
      goods_id_arr: [],
      goodsprice: 0,
      goodsNumber: 0,
      edit: true,
      fix: {
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: 99,
        backgroundColor: "#efeff4"
      },
      headerCart: {
        display: "none"
      }
    };
  }
  componentWillMount() {
    this.props.axios.get("/routeCart").then(res => {
      console.log(res.data);
      this.setState(
        {
          goodslist: res.data
        },
        () => {
          if (this.state.goodslist.length > 0) {
            this.setState({
              fix: {
                display: "none"
              },
              headerCart: {
                display: "block"
              }
            });
          }
        }
      );

      let goodarr = this.state.goodslist.reduce(function(arr, item) {
        arr[item.gShop] ? "" : (arr[item.gShop] = []);
        arr[item.gShop].push(item);
        return arr;
      }, {});

      this.setState(
        {
          goodsobj: goodarr
        },
        () => {
          console.log(goodarr, this.state.goodsobj);
          console.log(Object.keys(this.state.goodsobj));
        }
      );
    });
  }

  CheckGooditem(gooditem, e) {
    let {
      goodslist,
      goods_arr,
      goods_id_arr,
      goodsprice,
      goodsNumber
    } = this.state;
    goods_arr = [];
    goodsprice = 0;
    goodsNumber = 0;
    // 根据复选框checkecd属性实现选框选中并实现全部选中时有全选框也被选中
    if (e.target.checked) {
      for (var i = 0; i < goodslist.length; i++) {
        if (gooditem.goods_id === goodslist[i].goods_id) {
          goods_id_arr.push(gooditem.goods_id);
        }
      }
    } else {
      for (var j = 0; j < goodslist.length; j++) {
        if (gooditem.goods_id === goodslist[j].goods_id) {
          let index = goods_id_arr.indexOf(gooditem.goods_id);
          goods_id_arr.splice(index, 1);
        }
      }
    }
    // 获取选中商品信息并存放在数组中以用来判断商品是否全选
    for (var i = 0; i < goodslist.length; i++) {
      for (var j = 0; j < goods_id_arr.length; j++) {
        if (goods_id_arr[j] === goodslist[i].goods_id) {
          goods_arr.push(goodslist[i]);
        }
      }
    }
    for (var i = 0; i < goods_arr.length; i++) {
      goodsprice += goods_arr[i].gPrice * 1 * goods_arr[i].gNumber;
      goodsNumber += goods_arr[i].gNumber * 1;
    }
    this.setState({
      goods_id_arr,
      goodsprice,
      goodsNumber
    });
    if (goods_id_arr.length === goodslist.length) {
      this.setState({
        allChecked: true
      });
    } else {
      this.setState({
        allChecked: false
      });
    }
  }
  handelallChecked(e) {
    let { goodsprice, goodsNumber, goodslist, goods_id_arr } = this.state;
    let good = [];
    goods_id_arr = [];
    goodsprice = 0;
    goodsNumber = 0;
    if (e.target.checked) {
      for (var i = 0; i < goodslist.length; i++) {
        goods_id_arr.push(goodslist[i].goods_id);
        good.push(goodslist[i]);
      }
      for (var j = 0; j < good.length; j++) {
        goodsprice += good[j].gPrice * 1 * good[j].gNumber;
        goodsNumber += good[j].gNumber * 1;
      }
      this.setState({
        allChecked: true,
        goods_id_arr: goods_id_arr,
        goodsNumber,
        goodsprice
      });
    } else {
      goodsprice = 0;
      for (var j = 0; j < good.length; j++) {
        goodsprice += good[j].gPrice * 1 * good[j].gNumber;
      }
      this.setState({
        allChecked: false,
        goods_id_arr: [],
        goodsprice,
        goodsNumber
      });
    }
  }

  //根据编辑还是完成实现样式改变效果
  handleEdit = () => {
    this.setState({
      edit: false
    });
  };
  handleComplete = () => {
    this.setState({
      edit: true
    });
  };
  goodsCompute(goodslist) {
    let { goods_id_arr, goodsprice, goodsNumber } = this.state;
    goodsprice = 0;
    goodsNumber = 0;
    let goods = [];
    if (goods_id_arr.length) {
      for (var i = 0; i < goods_id_arr.length; i++) {
        for (var j = 0; j < goodslist.length; j++) {
          if (goods_id_arr[i] === goodslist[j].goods_id) {
            goods.push(goodslist[j]);
          }
        }
      }
    }
    for (var j = 0; j < goods.length; j++) {
      goodsprice += goods[j].gPrice * 1 * goods[j].gNumber;
      goodsNumber += goods[j].gNumber * 1;
    }
    this.setState({
      goodsNumber,
      goodsprice
    });
  }
  goodMinus(gooditem) {
    let { goodslist } = this.state;
    for (var i = 0; i < goodslist.length; i++) {
      if (gooditem.goods_id === goodslist[i].goods_id) {
        if (goodslist[i].gNumber > 1) {
          goodslist[i].gNumber -= 1;
        } else {
          goodslist[i].gNumber = 1;
        }
      }
    }
    this.goodsCompute(goodslist);
    this.setState({
      goodslist
    });
  }
  goodAdd(gooditem) {
    let { goodslist } = this.state;
    for (var i = 0; i < goodslist.length; i++) {
      if (gooditem.goods_id === goodslist[i].goods_id) {
        if (goodslist[i].gNumber < 100) {
          goodslist[i].gNumber = goodslist[i].gNumber * 1 + 1;
        } else {
          goodslist[i].gNumber = 100;
        }
      }
    }
    this.goodsCompute(goodslist);
    this.setState({
      goodslist
    });
  }

  //返回上一页
  goBack = () => {
    this.props.history.goBack();
  };

  //UI界面渲染
  render() {
    let {
      goodsobj,
      allChecked,
      goods_id_arr,
      goodsprice,
      goodsNumber,
      fix,
      headerCart,
      edit
    } = this.state;
    return (
      <div>
        <div className="load_wrap" style={fix} />
        <header className="header-cart" style={headerCart}>
          <div className="header-wrap">
            <div className="header-l">
              <a href="javascript:;" onClick={this.goBack}>
                <i className="back" />
              </a>
            </div>
            <div className="header-title">
              <h1>
                购物车 <i id="cart_mum" />
              </h1>
            </div>
            <div className="header-edit">
              {edit ? (
                <span
                  className="edit_cart"
                  id="edit_btn"
                  onClick={this.handleEdit}
                >
                  编辑
                </span>
              ) : (
                <span
                  className="edit_cart"
                  id="edit_btn"
                  onClick={this.handleComplete}
                >
                  完成
                </span>
              )}
            </div>
            <div className="header-r">
              <a id="header-nav" href="javascript:;">
                <i className="more" />
                <sup />
              </a>
            </div>
          </div>
        </header>

        <div className="nctouch-main-layout">
          {/* 分割线 */}
          <span className="top_line" />
          <div>
            {Object.keys(goodsobj).map(item => (
              <div className="nctouch-cart-container" key={item}>
                <List.Item
                  style={{
                    borderBottom: "1px solid #e8e8e8",
                    position: "relative"
                  }}
                >
                  <span className="store-check">
                    <Checkbox className="store_checkbox" id="">
                      {item}
                    </Checkbox>
                    {/* <Checkbox className="store_checkbox" id=""   onChange={this.CheckItem.bind(this,item)}>{item}</Checkbox> */}
                  </span>
                  <span className="freight">
                    <i />
                    满88元免运费 !
                  </span>
                </List.Item>
                {goodsobj[item].map(gooditem => (
                  <List.Item style={goodsstyle} key={gooditem.gTitle}>
                    <div className="goods-item">
                      <div className="goods-check">
                        <Checkbox
                          className="store_checkbox"
                          checked={goods_id_arr.includes(gooditem.goods_id)}
                          onChange={this.CheckGooditem.bind(this, gooditem)}
                        />
                      </div>
                      <div className="goods-pic">
                        <a href="javascript:;" data_id="104164">
                          <img src={gooditem.gImg} />
                        </a>
                      </div>
                      <dl className="goods-info" style={edit ? {} : none}>
                        <dt className="goods-name">
                          <a href="javascript:;">{gooditem.gTitle}</a>
                        </dt>
                        <dd className="goods-type">{gooditem.gDescribe}</dd>
                      </dl>
                      <div className="goods-del" style={edit ? none : {}}>
                        <a href="javascript:;">删除</a>
                      </div>
                      <div className="goods-subtotal">
                        <span className="goods-price" style={edit ? {} : none}>
                          ¥<em>{gooditem.gPrice}</em>
                        </span>
                        <div
                          className="value-box"
                          style={edit ? value_box_init : value_box_last}
                        >
                          <span
                            className="minus"
                            style={edit ? none : {}}
                            onClick={this.goodMinus.bind(this, gooditem)}
                          >
                            <a href="javascript:;">&nbsp;</a>
                          </span>
                          <span>
                            <i
                              className="num_mind"
                              style={edit ? num_mind : none}
                            >
                              x
                            </i>
                            <input
                              type="text"
                              pattern="[0-9]*"
                              style={edit ? value_input_init : value_input_last}
                              readOnly
                              className="buy-num buynum"
                              onChange={function() {}}
                              value={gooditem.gNumber}
                            />
                          </span>
                          <span
                            className="add"
                            style={edit ? none : {}}
                            onClick={this.goodAdd.bind(this, gooditem)}
                          >
                            <a href="javascript:;">&nbsp;</a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                ))}
              </div>
            ))}
            <div className="nctouch-cart-bottom ">
              <div className="all-check">
                <Checkbox
                  className="store_checkbox"
                  checked={allChecked}
                  onChange={this.handelallChecked.bind(this)}
                >
                  <span>全选</span>
                </Checkbox>
              </div>
              <div className="total general">
                <dl className="total-money">
                  <dt>合计：</dt>
                  <dd>
                    ¥<em>{goodsprice.toFixed(2)}</em>
                  </dd>
                </dl>
              </div>
              <div
                className="check-out"
                style={{
                  backgroundColor: goods_id_arr.length > 0 ? "#d33d3c" : "#BBB"
                }}
              >
                <a href="javascript:;">
                  结算
                  <i>(&nbsp;{goodsNumber}&nbsp;)</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Cart = withAxios(Cart);
export default Cart;
