import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'
import './styles/main.scss';
import App from './components/App';
import {timeboxReducer} from './reducers';
import thunk from 'redux-thunk'

const store = createStore(timeboxReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>
,document.getElementById("root"));   