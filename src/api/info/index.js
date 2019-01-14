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
  }
};

export default createApi(config);
