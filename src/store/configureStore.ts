import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from './monitorReducer';
import RootReducer from './reducers';
import sagas from './sagas/root.saga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const middlewares = [loggerMiddleware, thunkMiddleware, sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composeEnhancers =
    (window as Window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedEnhancers: StoreEnhancer = composeEnhancers(...enhancers);

  const store = createStore(RootReducer, undefined, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(RootReducer));
  }

  sagaMiddleware.run(sagas);

  return store;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
