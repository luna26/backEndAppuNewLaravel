import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import DashboardReducer from './DashboardReducer';
import NewsReducer from './NewsReducer';

const reducers = combineReducers({
  login: LoginReducer,
  dashboard: DashboardReducer,
  news: NewsReducer
});

export default reducers;