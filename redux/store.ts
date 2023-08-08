import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import siteReducer from './reducer/site';
import authReducer from './reducer/auth';
import userReducer from './reducer/user';

const persistConfig = {
	key: 'auth',
	storage,
	whitelist: ['isLogged'],
};

const reducers = combineReducers({
	auth: persistReducer(persistConfig, authReducer),
	site: siteReducer,
	user: userReducer,
});

export const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
