import { environment } from '../../environments/environment';

export const EnvConfig = (environment as any)[environment.ACTIVE_PROFILE];
