import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import DashboardReducer from './DashboardReducer';
import NewsReducer from './NewsReducer';
import CareersReducer from './CareersReducer';
import CalcReducer from './CalcReducer';
import infoReducer from './InfoReducer';

const reducers = combineReducers({
  login: LoginReducer,
  dashboard: DashboardReducer,
  news: NewsReducer,
  career:CareersReducer,
  calc: CalcReducer,
  info:infoReducer
});

export default reducers;