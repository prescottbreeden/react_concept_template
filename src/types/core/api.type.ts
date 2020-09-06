export interface ApiOptions {
  url: string;
  method: string;
  body: any;
}

export interface ApiRequest {
  body: any;
  method: string;
  url: string;
  feature: string;
}

export interface ApiResponse {
  payload?: any[];
  error?: string;
  feature: string;
  method: string;
}
