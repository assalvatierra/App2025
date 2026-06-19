export const environment = {
  production: false,
  entraConfig: {
    clientId: 'YOUR_ANGULAR_SPA_CLIENT_ID',
    authority: 'https://microsoftonline.com',
    redirectUri: 'http://localhost:4200'
  },
  apiConfig: {
    scopes: ['api://YOUR_BACKEND_API_CLIENT_ID/API.Access'],
    uri: 'http://localhost:5000/api'
  }
};