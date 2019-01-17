import createApi from '../createApi';
import { serverIp } from '../server_config';

const config = {
  // 修改昵称
  reviseUserInfo: {
    url: '/users',
    method: 'put',
    options: {
      baseUrl: serverIp.login
    }
  },
  uploadFile: {
    url: '/users',
    method: 'put',
    options: {
      baseUrl: serverIp.login
    }
  },
  uploadAvatar: {
    url: '/users',
    method: 'put',
    options: {
      baseUrl: serverIp.login
    }
  },
  // 绑定google
  getBindGoogleInfo: {
    url: '/users',
    method: 'post',
    options: {
      baseUrl: serverIp.login,
      showLoading: false
    }
  },
  // 解绑google
  unBindGoogle: {
    url: '/users',
    method: 'delete',
    options: {
      baseUrl: serverIp.login
    }
  },
  // 解绑google
  bindGoogle: {
    url: '/users',
    method: 'put',
    options: {
      baseUrl: serverIp.login
    }
  }
};

export default createApi(config);
