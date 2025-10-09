export class DeviceSignatureUtil {
  static generateDeviceSignature(): string {
    const ua = navigator.userAgent;
    const lang = navigator.language;
    const time = new Date().getTime();
    return btoa(`${ua}-${lang}-${time}`);
  }
}
