const asideState = {
  state: {
    collapsed: true
  },
  reducers: {
    setCollapse(state, data) {
      // 从第二个变量开始为调用increment时传递进来的参数，后面依次类推，例如：dispatch.count.increment(10, 20)时， num1 = 10 , num2 = 20.
      return {
        ...state,
        collapsed: data
      };
    }
  },
  effects: {}
};

export default asideState;
