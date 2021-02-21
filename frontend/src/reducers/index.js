import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import SiteReducer from './SiteReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  sites: SiteReducer,
})
export default createRootReducer;