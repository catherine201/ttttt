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
    login: '',
    thirdServer: '',
    logic: ''
  };
}
export const serverIp = resolveIp();
