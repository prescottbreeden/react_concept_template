export interface ApiOptions {
  body: any;
  method: string;
  url: string;
}

export interface ApiRequest {
  body?: any;
  description?: string;
  feature: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
}

export interface ApiResponse {
  error?: string;
  feature: string;
  method: string;
  payload?: any[] | any;
}
