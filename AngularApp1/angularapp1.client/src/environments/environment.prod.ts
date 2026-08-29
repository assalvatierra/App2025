export const environment = {
  production: true,
  entraConfig: {
    clientId: 'YOUR_PROD_ANGULAR_SPA_CLIENT_ID',
    authority: 'https://microsoftonline.com',
    redirectUri: 'https://app2025-h0h5dqbagqg9b7bn.canadacentral-01.azurewebsites.net/'
  },
  apiConfig: {
    scopes: ['api://YOUR_PROD_BACKEND_API_CLIENT_ID/API.Access'],
    uri: ''  // Empty string - APIs are served from same origin (wwwroot)
  }
};
