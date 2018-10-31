import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'; //Подключаем React-Redux
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; //Для роутинга
import createStore from './store'; //Подключаем хранилище
//Подключаем компоненты
import AddProduct from './components/AddProduct';

//Создадим store (хранилище)
const store = createStore;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <Switch>
            <Route path="/" exact component={AddProduct}></Route> {/*exact - значит при загрузке страницы сразу отрисуем данный компонент  */}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

