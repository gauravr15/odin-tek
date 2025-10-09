export const environment = {
  production: false,
  ACTIVE_PROFILE: 'dev',
  dev: {
    GATEWAY_BASE_URL: 'http://localhost:9011/authenticator/traffic',
    PROFILE_SERVICE: '/ps',
    NOTIFICATION_SERVICE: '/ns',
    AUTH_SERVICE: '/auth',
    REFERENCE_SERVICE: '/ref',
    ENCRYPTION_KEY: 'eHNRh5qF6v9mT6/IVkD6X5a9S8hI3Pz9F5y5Vt5jz8Y=',
    IS_ENCRYPTION_ENABLED: false,
    AUTH_MODE: 'OTP',
    OTP_LENGTH: '6'
  }
};
