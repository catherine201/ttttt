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
    login: 'http://dash-passport-api.tbnb.io:10101',
    thirdServer: 'http://dash-api.tbnb.io:10101',
    logic: 'http://dash-api.tbnb.io:10101',
    article: 'http://dash-art-api.tbnb.io:10101'
  };
}
export const serverIp = resolveIp();
