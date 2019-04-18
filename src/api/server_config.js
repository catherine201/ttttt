function resolveIp() {
  const mode = process.env.NODE_ENV.trim();
  console.dir(process);
  if (mode === 'development') {
    return {
      login: '/log',
      thirdServer: '/third',
      logic: '/fangman',
      article: '/article'
    };
  }
  // return {
  //   login: 'https://passport.leekerlabs.com',
  //   thirdServer: 'https://dashboard-api.leekerlabs.com',
  //   logic: 'https://dashboard-api.leekerlabs.com',
  //   article: 'https://art-api.euen.io'
  // };
  return {
    login: 'https://dash-api.leekerlabs.com',
    thirdServer: 'https://dash-passport-api.leekerlabs.com',
    logic: 'https://dash-passport-api.leekerlabs.com',
    article: 'https://dash-art-api.leekerlabs.com'
  };
}
export const serverIp = resolveIp();
