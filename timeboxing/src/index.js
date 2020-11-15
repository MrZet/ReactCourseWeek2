import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import './styles/main.scss';
import App from './components/App';
import {timeboxReducer} from './reducers';

const store = createStore(timeboxReducer);

ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>
,document.getElementById("root"));   