export class ApiEndpoints {
  // 🔐 Authentication
  static readonly SIGN_IN = '/v1/signIn';
  static readonly SIGN_UP = '/v1/signUp';
  static readonly REFRESH_TOKEN = '/v1/auth/refresh';
  
  // 👤 Customer
  static readonly CUSTOMER_DETAILS = '/v1/customer/details';

  // 🔔 Notifications
  static readonly SAVE_FCM_TOKEN = '/v1/fcmNotificationToken/save';

  // 🧩 Misc
  static readonly HEALTH_CHECK = '/actuator/health';
}
