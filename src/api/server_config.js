function resolveIp() {
  const mode = process.env.NODE_ENV.trim();
  if (mode === 'development') {
    return {
      login: '/log',
      thirdServer: '/third',
      logic: '/fangman'
    };
  }
  return {
    login: 'https://passport.leekerlabs.com',
    thirdServer: 'https://dashboard-api.leekerlabs.com',
    logic: 'https://dashboard-api.leekerlabs.com'
  };
}
export const serverIp = resolveIp();
