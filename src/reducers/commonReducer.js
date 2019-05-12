/*
 * @writer: 咕鸽仙人
 * @LastEditors: 咕鸽仙人
 * @Date: 2019-04-09 11:20:51
 * @LastEditTime: 2019-04-09 14:20:58
 * @ 隐藏状态栏
 */
let initState = {
  show: true
};
let reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "show_menu":
      return {
        ...state,
        show: true
      };
    case "hide_menu":
      return {
        ...state,
        show: false
      };

    default:
      return state;
  }
};

export default reducer;
