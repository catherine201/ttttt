import createApi from '../createApi';

const config = {
  // 注册
  register: {
    url: '/register/name',
    method: 'post',
    options: {
      errorHandler: true,
      showLoading: true
    }
  },
  // 预登录
  login: {
    url: '/users/name/login',
    method: 'post',
    options: {
      errorHandler: true,
      showLoading: true
    }
  },
  // 最终登录
  secondLogin: {
    url: '/login',
    method: 'post',
    options: {
      errorHandler: true,
      showLoading: true,
      baseUrl: 'http://192.168.1.189:3033'
    }
  }
};

export default createApi(config);
