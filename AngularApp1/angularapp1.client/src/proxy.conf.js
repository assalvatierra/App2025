const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7252';

// Debug logging to help diagnose proxy issues
console.log('🔍 PROXY CONFIGURATION:');
console.log('  ASPNETCORE_HTTPS_PORT:', env.ASPNETCORE_HTTPS_PORT || 'not set');
console.log('  ASPNETCORE_URLS:', env.ASPNETCORE_URLS || 'not set');
console.log('  ✅ Proxy Target:', target);
console.log('  📡 Will proxy /api requests to:', target);

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api"
    ],
    target,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug'
  }
]

module.exports = PROXY_CONFIG;
