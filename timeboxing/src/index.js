import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './components/App';
import {timeboxReducer} from './reducers';
import {createStore} from 'redux';

const store = createStore(timeboxReducer);
export const StoreContext = React.createContext({store: null})

ReactDOM.render(
    <StoreContext.Provider value = {{store}}>
        <App/>
    </StoreContext.Provider>
,document.getElementById("root"));   