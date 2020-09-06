import { compose } from 'utilities';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { stateFreezer } from 'redux/reducers/reducerEnhancers/stateFreezer';
import { apiMiddleware } from 'redux/middleware/core/api.middleware';
import { normalizeMiddleware } from 'redux/middleware/core/normalize.middleware';
import { notificationMiddleware } from 'redux/middleware/core/notification.middleware';
import { personReducer } from 'redux/reducers/feature/person.reducer';
import { loaderReducer } from 'redux/reducers/core/loader.reducer';
import { notificationsReducer } from 'redux/reducers/core/notifications.reducer';
import { PERSON_KEY, LOADING_KEY, NOTIFICATION_KEY } from './keys';
import { dataMiddleware } from './middleware/core/data.middleware';
import { personMiddleware } from './middleware/feature/person.middleware';

const rootReducer = combineReducers({
  [PERSON_KEY]: personReducer,
  [LOADING_KEY]: loaderReducer,
  [NOTIFICATION_KEY]: notificationsReducer,
});

const featureMiddleware: any[] = [personMiddleware];

const coreMiddleware: any[] = [
  apiMiddleware,
  dataMiddleware,
  normalizeMiddleware,
  notificationMiddleware,
];

const enhancer = compose(
  applyMiddleware(...featureMiddleware, ...coreMiddleware)
);

export const store = createStore(stateFreezer(rootReducer), {}, enhancer);
