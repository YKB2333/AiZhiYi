/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-02-28 23:11:22
 * @LastEditTime: 2019-03-18 16:45:08
 * @MongoDB操作封装测试
 */
const db = require("./db");

// 订单
// for (let index = 0; index < 50; index++) {
//   let time = new Date();
//   var year = time.getFullYear(); //年
//   var mon = time.getMonth() + 1; //月
//   var day = time.getDate(); //日
//   var hour = time.getHours(); //时
//   var min = time.getMinutes(); //分
//   var sec = time.getSeconds(); //秒
//   async function add() {
//     let res = await db.insert("cart", {
//       _id: `${index}`,
//       cNum: "" + year + mon + day + hour + min + sec + index,
//       buyer: "买家" + (index + 1),
//       total: (min * sec * (index * sec + 1)).toFixed(2),
//       pay: "1",
//       send_out: "1",
//       arrive: "1",
//       buying_time: year + "-" + mon + "-" + day + "/" + hour + "-" + min
//     });
//     console.log(res.result);
//   }
//   // add();
// }

// 用户
for (let index = 0; index < 10; index++) {
  async function add() {
    let res = await db.insert("goods", {
      gName: `商品${index + 1}`,
      gPrice: 10 * (index + 1) * (index + 1),
      gDesigner: `大帅比`,
      gImg: "template_28551_5.png",
      gClassify: "手机壳"
    });
    console.log(res.result);
  }
  add();
}
//删除测试
async function remove_() {
  let res = await db.delete("user", {
    userName: "椰大奶"
  });
  console.log(res.result);
}

//修改测试
async function update() {
  let res = await db.update(
    "user", {
      userName: "椰大奶"
    }, {
      $set: {
        age: 18
      }
    }
  );
  console.log(res.result);
}
// update();

//查询测试
async function cx() {
  let res = await db.find("user", {
    age: 18
  });
  console.log(res);
}
// cx();
