import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from './monitorReducer';
import RootReducer from './reducers';

export default function configureStore() {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composeEnhancers =
    (window as Window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedEnhancers: StoreEnhancer = composeEnhancers(...enhancers);

  const store = createStore(RootReducer, undefined, composedEnhancers);

  return store;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
