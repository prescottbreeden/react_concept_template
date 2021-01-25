export interface ApiOptions {
  url: string;
  method: string;
  body: any;
}

export interface ApiRequest {
  body?: any;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  feature: string;
}

export interface ApiResponse {
  payload?: any[] | any;
  error?: string;
  feature: string;
  method: string;
}
