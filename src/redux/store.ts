import { compose } from 'utils/utilities';
import { DevTools } from 'components/DevTools';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { stateFreezer } from 'redux/reducers/enhancers/stateFreezer';
import { personMiddleware } from 'redux/middleware/feature/person.middleware';
import { apiMiddleware } from 'redux/middleware/core/api.middleware';
import { normalizeMiddleware } from 'redux/middleware/core/normalize.middleware';
import { notificationMiddleware } from 'redux/middleware/core/notification.middleware';
import { personReducer } from 'redux/reducers/feature/person.reducer';
import { loaderReducer } from 'redux/reducers/core/loader.reducer';
import { notificationsReducer } from 'redux/reducers/core/notifications.reducer';
import { PERSON_KEY, LOADING_KEY, NOTIFICATION_KEY } from './keys';

const rootReducer = combineReducers({
  [PERSON_KEY]: personReducer,
  [LOADING_KEY]: loaderReducer,
  [NOTIFICATION_KEY]: notificationsReducer,
});

const featureMiddleware: any[] = [personMiddleware];

const coreMiddleware: any[] = [
  apiMiddleware,
  normalizeMiddleware,
  notificationMiddleware,
];

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(
        applyMiddleware(...featureMiddleware, ...coreMiddleware),
        DevTools.instrument()
      )
    : compose(applyMiddleware(...featureMiddleware, ...coreMiddleware));

export const store = createStore(stateFreezer(rootReducer), {}, enhancer);
