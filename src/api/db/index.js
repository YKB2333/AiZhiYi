/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-02-28 22:54:34
 * @LastEditTime: 2019-04-13 17:22:24
 * @mongoDB增删改查封装模块
 */
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const database_url = "mongodb://localhost:27017";
//数据库名字
const database_name = "aizhiyi";

async function connect() {
  let client = await MongoClient.connect(database_url, {
    useNewUrlParser: true
  });
  let db = client.db(database_name);
  return {
    db,
    client
  };
}

/**
 * @description:数据增加
 * @param:集合名 , 单条:{name:value}/多条:[{name:value},{name:value}]
 * @return:res
 */
exports.insert = async (colName, data) => {
  let { db, client } = await connect();

  let collection = db.collection(colName);
  let res = await collection[Array.isArray(data) ? "insertMany" : "insertOne"](
    data
  );

  client.close();

  return res;
};
/**
 * @description:数据操作:删除
 * @param: 集合名, {查询条件}
 * @return:res
 */
exports.delete = async (colName, query) => {
  let { db, client } = await connect();

  let collection = db.collection(colName);
  let res = await collection["deleteMany"](query);

  client.close();

  return res;
};
/**
 * @description:数据操作:修改
 * @param : 集合名,{查询条件},{$set:{更换的数据}}
 * @return:res
 */
exports.update = async (colName, query, newData) => {
  let { db, client } = await connect();

  let collection = db.collection(colName);
  let res = await collection["updateMany"](query, newData);

  client.close();

  return res;
};
/**
 * @description: 查询
 * @param {colName,query}
 * @return:
 */

exports.find = async (colName, query) => {
  let { db, client } = await connect();

  let collection = db.collection(colName);
  let res = await collection.find(query).toArray();
  client.close();

  // 返回查询结果
  return res;
};
