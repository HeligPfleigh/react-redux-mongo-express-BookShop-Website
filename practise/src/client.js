"use strick"
import {createStore, applyMiddleware} from  'redux';
import reducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk'; // if use require instead import, need add .default with thunk version 2.x
import {addToCart, postBooks, deleteBook, updateBook} from './actions';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Route, Router, browserHistory, IndexRoute} from 'react-router';

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BookForm from './components/pages/booksForm';
import Main from './main';

//STEP 1 create the store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducer, middleware);
//store.subscribe(()=>console.log(store.getState()));

const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Router path='/' component={Main}>
                <IndexRoute component={BooksList} />
                <Route path="/admin" component={BookForm}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/about"/>
                <Route path="/contacts"/>
            </Router>
        </Router>
    </Provider>
)

ReactDOM.render( Routes,
    document.getElementById('app')
);