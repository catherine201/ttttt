import createApi from '../createApi';

const config = {
  // 查询用户列表  获取用户对应菜单
  queryUser: {
    url: '/accounts',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 修改用户分组
  reviseTeam: {
    url: '/accounts',
    method: 'put',
    options: {
      errorHandler: true,
      showLoading: true
    }
  }
};

export default createApi(config);
