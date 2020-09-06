import { ReduxBaseAction } from './redux.type';

export interface ApiAction extends ReduxBaseAction<any> {
  meta: {
    method: string;
    url: string;
    feature: string;
  };
}

export interface ApiRequest {
  body?: any;
  method: string;
  param?: string;
  feature: string;
}

export interface ApiResponse {
  payload?: any[];
  error?: string;
  feature: string;
  method?: string;
}
