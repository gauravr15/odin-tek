import * as CryptoJS from 'crypto-js';
import { EnvConfig } from '../config/env-config';

export class EncryptionDecryptionUtility {

  /**
   * Encrypts data using AES-ECB with PKCS7 padding.
   * Returns ciphertext Base64 compatible with Java AES/ECB/PKCS5Padding.
   */
  static encrypt(data: string, uuid: string, timestamp: string): string {
    if (!EnvConfig.IS_ENCRYPTION_ENABLED) return data;

    const key = this.deriveKey(uuid, timestamp);

    const encrypted = CryptoJS.AES.encrypt(data, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    // Return Base64 ciphertext
    return encrypted.toString();
  }

  /**
   * Decrypts AES-ECB PKCS7 Base64 ciphertext.
   * Handles URL-safe Base64 and logs errors without breaking the app.
   */
  static decrypt(encryptedBase64: string, uuid: string, timestamp: string): string {
    if (!EnvConfig.IS_ENCRYPTION_ENABLED) return encryptedBase64;

    const key = this.deriveKey(uuid, timestamp);

    try {
      // Handle possible URL-safe Base64 variants (replace -/_ with +/)
      const cleanedBase64 = encryptedBase64.replace(/-/g, '+').replace(/_/g, '/');

      // Convert Base64 string into CipherParams
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(cleanedBase64)
      });

      // Perform AES-ECB decryption
      const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

      // Convert WordArray to UTF-8 string
      const result = decrypted.toString(CryptoJS.enc.Utf8);

      // If result is empty, it likely indicates invalid UTF-8 (wrong key or corrupt data)
      if (!result) {
        console.warn('Decryption produced empty result. Possible key mismatch or corrupt data.');
      } else {
        console.log('Decrypted result:', result);
      }

      return result;
    } catch (err) {
      console.error('Decryption failed:', err, encryptedBase64);
      return '';
    }
  }

  /**
   * Derives AES-256 key (32 bytes) from base key + timestamp + uuid
   */
  private static deriveKey(uuid: string, timestamp: string) {
    const keyMaterial = EnvConfig.ENCRYPTION_KEY + timestamp + uuid;
    return CryptoJS.SHA256(keyMaterial); // 32-byte key
  }
}
