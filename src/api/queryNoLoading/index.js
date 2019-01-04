import createApi from '../createApi';

const config = {
  // 查询所有菜单
  queryMenus: {
    url: '/menus',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 查询所有分组
  queryTeams: {
    url: '/teams',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 查询用户列表  获取用户对应菜单
  queryUser: {
    url: '/accounts',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  }
};

export default createApi(config);
