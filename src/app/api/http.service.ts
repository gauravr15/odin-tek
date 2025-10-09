import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { EnvConfig } from '../config/env-config';
import { DeviceSignatureUtil } from '../utils/device-signature.config';
import { v4 as uuidv4 } from 'uuid';
import { EncryptionDecryptionUtility } from '../utils/encryption-decryption.config';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private generateHeaders(requestUuid: string, requestTimestamp: string): HttpHeaders {
    const headersObj: Record<string, string> = {
      'Content-Type': 'application/json',
      'devicesignature': DeviceSignatureUtil.generateDeviceSignature(),
      'requestTimestamp': requestTimestamp,
      'requestChecksum': requestUuid,
    };
    return new HttpHeaders(headersObj);
  }

  private async encryptRequest(body: any, uuid: string, timestamp: string): Promise<any> {
    if (!EnvConfig.IS_ENCRYPTION_ENABLED) return body;

    const encrypted = EncryptionDecryptionUtility.encrypt(JSON.stringify(body), uuid, timestamp);
    return { request: encrypted };
  }

  private decryptResponse<T>(response: any, uuid: string, timestamp: string): T {
    if (!EnvConfig.IS_ENCRYPTION_ENABLED || !response?.response) return response;

    const decryptedString = EncryptionDecryptionUtility.decrypt(response.response, uuid, timestamp);
    return JSON.parse(decryptedString) as T;
  }

  async post<T>(path: string, body: any): Promise<T> {
  const url = `${EnvConfig.GATEWAY_BASE_URL}${path}`;
  const requestTimestamp = Date.now().toString();
  const requestUuid = uuidv4();

  const payload = await this.encryptRequest(body, requestUuid, requestTimestamp);
  const headers = this.generateHeaders(requestUuid, requestTimestamp);

  // Use { observe: 'response' } to get headers
  const httpResponse = await lastValueFrom(
    this.http.post<any>(url, payload, { headers, observe: 'response' as 'body' })
  );

  const responseBody = httpResponse.body;

  // ⚡ Get decryption keys from response headers
  const responseTimestamp = httpResponse.headers.get('responseTimestamp');
  const responseUuid = httpResponse.headers.get('responseChecksum');

  if (!responseTimestamp || !responseUuid) {
    console.warn('Missing response headers for decryption. Returning raw body.');
    return responseBody;
  }

  return this.decryptResponse<T>(responseBody, responseUuid, responseTimestamp);
}


  async get<T>(path: string): Promise<T> {
    const url = `${EnvConfig.GATEWAY_BASE_URL}${path}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const response = await lastValueFrom(this.http.get<T>(url, { headers }));
    return response;
  }
}
