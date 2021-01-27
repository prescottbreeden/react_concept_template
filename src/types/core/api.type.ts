export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface ApiOptions {
  body: any;
  method: ApiMethod;
  url: string;
}

export interface ApiRequest {
  body?: any;
  description?: string;
  feature: string;
  method: ApiMethod;
  url: string;
}

export interface ApiResponse {
  error?: string;
  feature: string;
  method: ApiMethod;
  payload?: any[] | any;
}
