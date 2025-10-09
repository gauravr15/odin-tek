import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UrlBuilder } from '../utils/url-builder.util';
import { ApiEndpoints } from '../constants/api-endpoints';
import { EnvConfig } from '../config/env-config';

@Injectable({
  providedIn: 'root'
})
export class ReferenceApi {
  constructor(private http: HttpService) {}

  getProfileForm() {
    const url = UrlBuilder.build(EnvConfig.REFERENCE_SERVICE, ApiEndpoints.REFERENCE.FORM_PROFILE);
    return this.http.get(url);
  }
}
