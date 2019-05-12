```javascript
/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-04-1 15:35:38
 * @LastEditTime: 2019-04-13 17:16:17
 */
```

##  爱之依
> aizhiyi

#### 技术支持

    UI框架 : Ant Design
    前端框架 : ReactJS
    后端语言 : nodeJS
    数据库 : MongoDB

#### 说明

  * 项目名称 : 爱之依
  * 人员结构 : 组长 : `黄理强`    组员 :  `李明钢` `曾晓添` `袁家建`
  * 官方地址 : https://www.aizhiyi.com/wap/
  * 演示地址 : 120.79.4.209
  * github地址:https://github.com/gzh51811/AiZhiYi

#### 页面划分

* 模块一 `袁家建`
```javascript

* 登录注册
* 购物车页
* (有时间就做订单页)

```
* 模块二 `黄理强`
```javascript

* 首页(内容)
* 搜索页
* 列表页
* 详情页

```
* 模块三 `李明钢`
```javascript

* 福利页 (打折多少在数据库写好)
* 后台管理
  *  (商品管理 打折功能 修改商品是否打折,输入折扣)

```
* 模块四 `曾晓添`
```javascript

* 分类页
* 后台

```

#### 数据库

* goods (商品表)
  * goods_id    //识别id
  * gTitle        // 商品标题    (string)
  * gDescribe     // 商品描述    (string)
  * gPrice        // 商品价格    (number)
  * xianshi_discount     // 折扣        (string)
  * goods_salenum      // 销量        (number) (购物车点击购买 + n)
  * goods_fic_salenum  //总销量
  * gc_id_1         // 分类页      (string) (例 : 传统工艺 民俗文化等)
  * gSonSort      // 子分类      (string) (例 : 红茶 绿茶 服饰等)
  * gShop         // 专馆(店铺)  (string) (例 : 文创生活馆)
  * gImg_240          // 商品图片    (图片地址)


* store_list (专馆)
  * "store_id"    	//商店id
  * "store_collect" //商店被收藏数量
  * "store_avatar"  //商店头像
  * "store_name"  	//商店名称

* goods_bigClass (商品大分类：如民俗文化、茶艺茶道)
  *	"gc_id"        //商品分类id
  * "gc_name"      //商品分类名称
  *	"text"         //商品小分类名称（如："陶瓷/雕塑/布艺/锻造"）
  * "wap_goodsclass_image_info": {
		"image_name": "_05856724964122215.jpg",  // 图片名称
		"image_path": "https://www.aizhiyi.com/data/upload/shop/goods_class/_05856724964122215.jpg" // 图片路径
	}

* goods_smallClass (商品小分类：如陶瓷、雕塑)
  * "gc_id": "1819"  //商品分类id
  * "gc_name":       //商品分类名称
  * "wap_goodsclass_image_info": {
	  	"wap_advs1": {
				"image_name": "_05476685004113383.png", // 图片名称
				"image_path": "https://www.aizhiyi.com/data/upload/shop/goods_class/_05476685004113383.png" // 图片路径
			}
	},
  * "child": [// （子分类：如彩瓷、青瓷）
		{
			"gc_id": "1848",  //商品分类id
			"gc_name": "文具", //商品分类名称
			"wap_goodsclass_image_info": {
				"wap_advs1": {
					"image_name": "_05483571251410122.png", // 图片名称
					"image_path": "https://www.aizhiyi.com/data/upload/shop/goods_class/_05483571251410122.png" // 图片路径
				}
			}
		}
	]




* cart (购物车)
  * telNumber        //电话号码
  * cNum                 //商品数量       (number)
  * goods_id          //商品的 _id     (objectNumber)

* user (用户)
  * uImg          //用户头像        (统一用 : https://www.aizhiyi.com/data/upload/shop/avatar/1.png?timestemp=1554122083174)

  * name          // 用户名         (string)
  * phone         // 手机号         (string)
  * pass          // 密码           (string)
  * sex           // 性别           (string) (默认保密 可更改?)
