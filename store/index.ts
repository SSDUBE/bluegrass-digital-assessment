import { combineReducers, configureStore } from '@reduxjs/toolkit';
import resultsReducer from './slices/resultsSlice';

// Combine reducers
const rootReducer = combineReducers({
  results: resultsReducer,
});

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
