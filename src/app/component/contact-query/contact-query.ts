import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // ✅ add this
import { HttpService } from '../../api/http.service';
import { EnvConfig } from '../../config/env-config';
import { ApiEndpoints } from '../../constants/api-endpoints';
import { ChannelConstants } from '../../constants/channel.constants';
import { MessageConstants } from '../../constants/message.constants';

@Component({
  selector: 'app-contact-query',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './contact-query.html',
  styleUrls: ['./contact-query.scss']
})
export class ContactQueryComponent {
  formData = {
    name: '',
    toEmail: '',
    mobile: '',
    body: ''
  };

  response: any = null;
  error: string | null = null;
  isLoading = false;

  constructor(private httpService: HttpService) {}

  async sendQuery() {
    this.isLoading = true;
    this.response = null;
    this.error = null;

    const alias = EnvConfig.NOTIFICATION_SERVICE;
    const endpoint = ApiEndpoints.NOTIFICATION.SEND_USER_QUERY;
    const url = `${alias}${endpoint}`;

    const body = {
      messageId: MessageConstants.USER_QUERY,
      name: this.formData.name,
      toEmail: this.formData.toEmail,
      body: this.formData.body,
      mobile: this.formData.mobile,
      channel: ChannelConstants.EMAIL
    };

    try {
      this.response = await this.httpService.post(url, body);
      this.error = null;
      this.formData = { name: '', toEmail: '', mobile: '', body: '' };
    } catch (err: any) {
      this.error = JSON.stringify(err?.error || err?.message);
      this.response = null;
    } finally {
      this.isLoading = false;
    }
  }
}
