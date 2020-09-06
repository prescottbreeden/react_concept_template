import { combineReducers, applyMiddleware, createStore } from 'redux';
import {personReducer} from './reducers/person.reducer';
import {personMiddleware} from './middleware/person.middleware';
import {apiMiddleware} from './middleware/api.middleware';
import {compose} from '../utilities';
import {normalizeMiddleware} from './middleware/normalize.middleware';
import {loaderReducer} from './reducers/loader.reducer';
import {notificationsReducer} from './reducers/notifications.reducer';

const rootReducer = combineReducers({
  person: personReducer,
  loader: loaderReducer,
  notification: notificationsReducer,
});

const featureMiddleware: any[] = [
  personMiddleware,
];

const coreMiddleware: any[] = [
  apiMiddleware,
  normalizeMiddleware,
];

const enhancer = compose(
  applyMiddleware(...featureMiddleware, ...coreMiddleware),
);

export const store = createStore(rootReducer, {}, enhancer);
