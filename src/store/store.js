import {createStore,combineReducers,applyMiddleware } from 'redux'
import * as home from './home/reducer' //应该引入reducer
import * as product from './production/reducer'
import * as index from './index/reducer'
import thunk from 'redux-thunk'

let store = createStore(
    combineReducers({...home,...product,...index}),
    applyMiddleware(thunk)
)
export default store;