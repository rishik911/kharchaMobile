import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import IndexReducer from './indexReducer';
import IndexSaga from './indexSaga';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const middleware = [sagaMiddleware];

const pReducer = persistReducer(persistConfig, IndexReducer);

if (__DEV__) {
  import('../../ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

export const store = createStore(pReducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);

sagaMiddleware.run(IndexSaga);

export default [store, persistor];
