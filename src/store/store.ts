// store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import themeReducer from './features/themeSlice';
import authReducer from './features/authSlice';

// 1. Combine all your reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});

// 2. Configuration for persistence
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['theme', 'auth'], // Only these reducers will be saved
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;