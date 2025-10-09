export interface JwtDTO {
  token: string;
  refreshToken?: string;
  expiry?: string;
}
