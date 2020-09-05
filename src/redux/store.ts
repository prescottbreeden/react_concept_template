import { combineReducers, applyMiddleware, createStore } from 'redux';
import {personReducer} from './reducers/person.reducer';
import {personMiddleware} from './middleware/person.middleware';
import {apiMiddleware} from './middleware/api.middleware';
import {compose} from '../utilities';
import {normalizeMiddleware} from './middleware/normalize.middleware';

const rootReducer = combineReducers({
  person: personReducer,
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
