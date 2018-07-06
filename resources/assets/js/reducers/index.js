import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import DashboardReducer from './DashboardReducer';
import NewsReducer from './NewsReducer';
import CareersReducer from './CareersReducer';

const reducers = combineReducers({
  login: LoginReducer,
  dashboard: DashboardReducer,
  news: NewsReducer,
  career:CareersReducer
});

export default reducers;