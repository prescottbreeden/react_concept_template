export interface ApiAction {
  type: string;
  payload: any;
  meta: {
    method?: string;
    url?: string;
    feature: string;
  };
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
}
