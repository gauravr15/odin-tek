import { Injectable } from '@angular/core';
import { AuthApi } from '../api/auth-api.service';
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token?: string;

  constructor(private api: AuthApi) {}

  async login(mobile: string, otp: string): Promise<JwtDTO> {
    const response = await this.api.login(mobile, otp);
    this.token = response.token;
    localStorage.setItem('jwt', JSON.stringify(response));
    return response;
  }

  getToken(): string | undefined {
    if (!this.token) {
      const stored = localStorage.getItem('jwt');
      if (stored) this.token = JSON.parse(stored).token;
    }
    return this.token;
  }
}
