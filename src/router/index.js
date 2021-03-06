import React,{Component} from 'react'
import {HashRouter,Switch,Route,Redirect,BrowserRouter} from 'react-router-dom'
// import asyncComponent  from 'u'
import asyncComponent from '../utils/asyncComponent';

import app from '../page/index/index'
const login = asyncComponent(()=>import('../page/login/login'))
const proList = asyncComponent(()=>import('../page/index/proList'))
const proDetail = asyncComponent(()=>import('../page/proDetail/proDetail'))
export default class RouteConfig extends Component {
    render(){
        return(
         <BrowserRouter>
            <Switch>
              <Route path="/" exact component={app}></Route>
              <Route path="/index" exact component={app}></Route>
              <Route path="/login" component={login}></Route>
              <Route path='/index/:type' component={proList} />
              <Route path='/prodetail' component={proDetail}></Route>
              <Redirect to="/"></Redirect>
            </Switch>
          </BrowserRouter>
        )
    }
}