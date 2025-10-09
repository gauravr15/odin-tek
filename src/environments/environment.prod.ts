// environment.prod.ts
export const environment = {
  production: true,
  ACTIVE_PROFILE: 'prod',
  prod: {
    GATEWAY_BASE_URL: 'https://prod-api.example.com',
    PROFILE_SERVICE: '/ps',
    NOTIFICATION_SERVICE: '/ns',
    ENCRYPTION_KEY: 'eHNRh5qF6v9mT6/IVkD6X5a9S8hI3Pz9F5y5Vt5jz8Y=',
    IS_ENCRYPTION_ENABLED: 'true',
    AUTH_MODE: 'OTP',
    OTP_LENGTH: '6'
  }
};
