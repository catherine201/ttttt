module.exports = {
  id: 1,
  name: '生产环境',
  domain:
    process.argv.splice(2)[0] === 'old'
      ? 'https://dashboard.leekerlabs.com'
      : 'http://dash-passport.tbnb.io', // 域名
  host: '47.244.41.119', // ip
  port: 22, // 端口
  username: 'root', // 登录服务器的账号
  password: 'vX8UDWEaTM', // 登录服务器的账号
  path:
    process.argv.splice(2)[0] === 'old'
      ? '/data/dashboard-web/build'
      : '/data/new_service/dashboard-web/build' // 发布至静态服务器的项目路径
};
