import { createStore, applyMiddleware, compose} from 'redux';
//serviceApp contain combineReducers which has the reducer files
import serviceApp from '../reducers';

import thunk from 'redux-thunk';
//Logger is
import  logger from 'redux-logger';


const initStore = () => {
  const middlewares = [thunk]  

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  
  if (process.env.NODE_ENV !== 'production'){
    middlewares.push(logger)
  }

  const store = createStore(
    serviceApp, 
    composeEnhancers(applyMiddleware(...middlewares))
  )

  return store
}


export default initStore;

