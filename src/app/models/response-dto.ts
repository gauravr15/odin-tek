export interface ResponseDTO<T = any> {
  responseCode: string;
  responseMessage: string;
  data?: T;
}
