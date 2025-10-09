import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UrlBuilder } from '../utils/url-builder.util';
import { ApiEndpoints } from '../constants/api-endpoints';
import { EnvConfig } from '../config/env-config';
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  constructor(private http: HttpService) {}

  login(mobile: string, otp: string) {
    const url = UrlBuilder.build(EnvConfig.AUTH_SERVICE, ApiEndpoints.AUTH.SIGN_IN);
    return this.http.post<JwtDTO>(url, { mobile, otp });
  }

  signUp(firstName: string, lastName: string, mobile: string, password: string) {
    const url = UrlBuilder.build(EnvConfig.AUTH_SERVICE, ApiEndpoints.AUTH.SIGN_UP);
    return this.http.post(url, { firstName, lastName, mobile, password });
  }

  refreshToken(refreshToken: string) {
    const url = UrlBuilder.build(EnvConfig.AUTH_SERVICE, ApiEndpoints.AUTH.REFRESH_TOKEN);
    return this.http.post<JwtDTO>(url, { refreshToken });
  }
}
