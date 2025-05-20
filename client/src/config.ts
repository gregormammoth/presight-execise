const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    wsUrl: process.env.REACT_APP_WS_URL || 'http://localhost:8080',
  },
} as const;

export default config; 