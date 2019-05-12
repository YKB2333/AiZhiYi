import React, { Component } from "react";
import withAxios from "../hoc/withAxios";
import { Tabs, Icon } from "antd";
import "../css/cate.css";
const TabPane = Tabs.TabPane;

class Cate extends Component {
  constructor() {
    super();
    this.state = {
      cate: [
        "专馆基地",
        "活动专区",
        "传统工艺",
        "民俗文化",
        "茶艺茶道",
        "特产美食",
        "珠宝首饰",
        "文化创意",
        "个性定制"
      ],
      dataStore: [],
      dataStoreHot: [],
      datalist: [
        {
          cate: [],
          wap_goodsclass_image_info: {}
        }
      ]
    };
    this.onTabClick = this.onTabClick.bind(this);
    this.toList = this.toList.bind(this);
  }
  async componentWillMount() {
    let _data = await this.props.axios.get("/cate/storeHot");
    this.setState({
      dataStoreHot: _data.data
    });

    let { data } = await this.props.axios.get("/cate/store");
    console.log(data);
    this.setState({
      dataStore: data
    });
  }
  async onTabClick(key) {
    let gcName = this.state.cate[key];
    if (key != 0 && key != 1) {
      let { data } = await this.props.axios.get("/cate/list", {
        params: {
          gcName
        }
      });
      this.setState({
        datalist: data
      });
    }
  }
  toList(name) {
    console.log(name);
  }
  render() {
    let { match } = this.props;
    return (
      <div className="cate">
        <span className="cate_header">
          分类
          <Icon
            type="message"
            style={{ position: "absolute", right: "0.4rem", top: "0.26rem" }}
          />
        </span>
        <Tabs tabPosition="left" onTabClick={this.onTabClick}>
          {this.state.cate.map((item, idx) => (
            <TabPane tab={item} key={idx}>
              {item == "活动专区" ? (
                <dl className="brands-recommend hot-area">
                  <div className="categroy-banner top_banner">
                    <a href="javascript;;">
                      <img
                        src={require("../img/z142.jpg")}
                        className="cate_hearder_img"
                      />
                    </a>
                  </div>
                  <dd>
                    <a
                      href="javascript:;"
                      className="seckill_zone"
                      id="toseckill"
                      seckill_type="xsm"
                    >
                      <span>
                        <img src={require("../img/z170.png")} />
                      </span>
                      <p>首发体验</p>
                    </a>
                  </dd>
                  <dd>
                    <a
                      href="javascript:;"
                      className="seckill_zone"
                      id="togroupbuy"
                      seckill_type="abt"
                    >
                      <span>
                        <img src={require("../img/abt.png")} />
                      </span>
                      <p>拼团</p>
                    </a>
                  </dd>
                  <dd>
                    <a
                      href="javascript:;"
                      className="seckill_zone"
                      id="tolimitbuy"
                      seckill_type="xsg"
                    >
                      <span>
                        <img src={require("../img/xsg.png")} />
                      </span>
                      <p>限时购</p>
                    </a>
                  </dd>
                  <dd>
                    <a href="javascript:;" className="lastGoods">
                      <span>
                        <img src={require("../img/newgoods.png")} />
                      </span>
                      <p>新品上市</p>
                    </a>
                  </dd>
                </dl>
              ) : (
                <div>
                  {item == "专馆基地" ? (
                    <dl className="brands-recommend hot-area">
                      <div className="categroy-banner top_banner">
                        <a href="javascript;;">
                          <img
                            src={require("../img/z141.jpg")}
                            className="cate_hearder_img"
                          />
                        </a>
                      </div>
                      <dt>
                        <a href="javascript:;">
                          <img src="https://www.aizhiyi.com/wap/images/cloud.png?999" />
                          <span className="cat-two">热门专馆</span>
                        </a>
                      </dt>
                      {this.state.dataStoreHot.map(item => {
                        return (
                          <dd key={item._id}>
                            <a href="javascript:;" className="seckill_zone">
                              <span>
                                <img src={item.store_avatar} />
                              </span>
                              <p
                                style={{
                                  fontSize: "12px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis"
                                }}
                              >
                                {item.store_name}
                              </p>
                            </a>
                          </dd>
                        );
                      })}
                      <dt>
                        <a href="javascript:;">
                          <img src="https://www.aizhiyi.com/wap/images/cloud.png?999" />
                          <span className="cat-two">全部专馆</span>
                        </a>
                      </dt>
                      {this.state.dataStore.map(item => {
                        return (
                          <dd key={item._id}>
                            <a href="javascript:;" className="seckill_zone">
                              <span>
                                <img src={item.store_avatar} />
                              </span>
                              <p
                                style={{
                                  fontSize: "12px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis"
                                }}
                              >
                                {item.store_name}
                              </p>
                            </a>
                          </dd>
                        );
                      })}
                    </dl>
                  ) : (
                    <dl className="brands-recommend hot-area">
                      <div className="categroy-banner top_banner">
                        <a href="javascript;;">
                          <img
                            src={
                              this.state.datalist[0].wap_goodsclass_image_info
                                .image_path
                            }
                            className="cate_hearder_img"
                          />
                        </a>
                      </div>
                      {this.state.datalist[0].cate.map(item => {
                        return (
                          <>
                            <dt>
                              <a
                                href="javascript:;"
                                onClick={this.toList(item.gc_name)}
                              >
                                <img src="https://www.aizhiyi.com/wap/images/cloud.png?999" />
                                <span className="cat-two">{item.gc_name}</span>
                              </a>
                            </dt>
                            {item.child.map(item1 => {
                              return (
                                <dd onClick={this.toList(item1.gc_name)}>
                                  <a
                                    href="javascript:;"
                                    className="seckill_zone"
                                  >
                                    <span>
                                      <img
                                        src={
                                          item1.wap_goodsclass_image_info
                                            .wap_advs1.image_path
                                        }
                                      />
                                    </span>
                                    <p>{item1.gc_name}</p>
                                  </a>
                                </dd>
                              );
                            })}
                          </>
                        );
                      })}
                    </dl>
                  )}
                </div>
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

Cate = withAxios(Cate);
export default Cate;
