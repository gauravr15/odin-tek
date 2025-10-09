import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiEndpoints } from '../../constants/api-endpoints';
import { HttpService } from '../../api/http.service';
import { EnvConfig } from '../../config/env-config';

@Component({
  selector: 'app-signin-tester',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './signin-tester.html',
  styleUrls: ['./signin-tester.scss']
})
export class SigninTesterComponent {
  response: any = null;
  error: string | null = null;
  isLoading = false;

  constructor(private httpService: HttpService) {}

  async testSignIn() {
    this.isLoading = true;
    this.response = null;
    this.error = null;

    const alias = EnvConfig.PROFILE_SERVICE;
    const endpoint = ApiEndpoints.AUTH.SIGN_IN;
    const url = `${alias}${endpoint}`;

    const body = {
      mobile: '9905663459',
      firstName: 'gaurav',
      lastName: 'bhasker',
      customerType: 'CUSTOMER',
      auth: { password: '12345678' }
    };

    try {
      this.response = await this.httpService.post(url, body);
      this.error = null;
    } catch (err: any) {
      this.error = JSON.stringify(err?.error || err?.message);
      this.response = null;
    } finally {
      this.isLoading = false;
    }
  }
}
