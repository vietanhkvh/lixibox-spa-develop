import { store } from 'app/init-react-app';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
