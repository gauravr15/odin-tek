import { EnvConfig } from '../config/env-config';

export class UrlBuilder {
  static build(serviceAlias: string, endpoint: string): string {
    return `${EnvConfig.GATEWAY_BASE_URL}${serviceAlias}${endpoint}`;
  }
}
