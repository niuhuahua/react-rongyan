import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import 'babel-polyfill'
import store  from './store/store'
import Route from './router/index'
import FastClick from 'fastclick'
import { AppContainer } from 'react-hot-loader' //热加载
import {Provider} from 'react-redux'; //在原来的应用上包裹一层，接受redux的store作为props ，通过content对象传递给子孙组件上的connect
import './utils/setRem'
import './style/base.css'
import 'antd-mobile/dist/antd-mobile.css'; 
import registerServiceWorker from './registerServiceWorker';
FastClick.attach(document.body)

const render = Component => {
    ReactDOM.render(
        <Provider store={store} >
            <AppContainer>
                <Component/>
            </AppContainer>
        </Provider>,
        document.getElementById('root')
    )
}


render(Route)
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./router/', () => {
      render(Route);
    })
  }
registerServiceWorker();
