function resolveIp() {
  const mode = process.env.NODE_ENV.trim();
  if (mode === 'development') {
    return 'http://192.168.1.96:51002';
  }
  return 'http://localhost:3333';
}
export const serverIpAddress = resolveIp();
