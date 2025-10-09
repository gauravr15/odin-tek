export class ApiEndpoints {
  // Authentication
  static readonly AUTH = {
    SIGN_IN: '/v1/signIn',
    SIGN_UP: '/v1/signUp',
    REFRESH_TOKEN: '/v1/refreshToken'
  };

  // Profile Service
  static readonly PROFILE = {
    DETAILS: '/v1/customer/details',
    UPDATE: '/v1/customer/update'
  };

  // Notification Service
  static readonly NOTIFICATION = {
    SAVE_FCM_TOKEN: '/v1/fcmNotificationToken/save',
    SEND_USER_QUERY: '/v1/email/send'
  };

  // Reference Service (your example)
  static readonly REFERENCE = {
    FORM_PROFILE: '/v1/form/profile'
  };
}
