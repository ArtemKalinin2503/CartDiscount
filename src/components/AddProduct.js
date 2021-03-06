import React, { Component } from 'react';
import { connect } from 'react-redux'; //connect нужен для связи компонента со store
import {postData, getData, fetchResult} from '../reducers/'; //Импортируем thunk компоненты (для сетевого запроса) и action
import { store } from '../store';

//Компонент Корзина
class AddProduct extends Component {

    //При загрузке получим данные 
    componentDidMount() {
        this.props.fetchGet(); //Вызов thunk getData (для вывода данных с сервера при загрузке страницы)
    }

    //Клик по кнопке Добавить
    addProduct() {
        let inputValuePriceProduct = parseInt(this.refs.inputProductPrice.value); //Преобразуем полученное значение в число 
        let data = {
            product: this.refs.inputProductName.value, //Значение input Продукт
            price: inputValuePriceProduct, //Значение input Цена
            priceDiscount: inputValuePriceProduct //Цена продукта (временное состояние)
        }
        this.props.fetchPost(data); //Вызов thunk getPost (все что передали в объект data запишеться на сервер)
    };

    //Клик по кнопке Применить скидку
    handleAddDiscount(e) {
        e.preventDefault();
        let inputValuePriceDiscount = parseInt(this.refs.inputDiskount.value); //Преобразуем полученное значение в число 
        //Возьмем данные с сервера и с помощью цикла map переберем значения price 
        var discountedData = this.props.apiData.map(oldValue => {
            let newValue  = {
                ...oldValue, //Записываем все значения которые прейдут в oldValue
                priceDiscount: oldValue.price - (oldValue.price*((inputValuePriceDiscount/100).toFixed(2))) //Рассчет скидки (запишем резудьтат рассчета в состояние priceDiscount)
            }
            return newValue;
        });
        this.props.updateDiscounted(discountedData); //Вызовим updateDiscounted (в который передали action fetchResult (в функции mapDispatchToProps)) 
    }

    render() {
        return (
            <div className="formAddProduct__wrapper">
                <p className="formAddProduct__title">Добавить продукт</p>
                <form className="formAddProduct">
                    <label>
                        <p>Продукт</p>
                        <input type="text" ref='inputProductName' className="formAddProduct__input"/>    
                    </label>
                    <label>
                        <p>Цена</p>
                        <input type="number" ref="inputProductPrice" className="formAddProduct__input"/>
                    </label>
                </form>                                    {/*Прокинем контекст this с помощью bind (для ref)*/}     
                <button className="formAddProduct__btnAdd" ref="btnAdd"  onClick={this.addProduct.bind(this)}>Добавить</button>
                <div className="cart__wrapper">
                    <p className="cart__title">Корзина</p>
                    <table className="cart_table">
                        <tbody>
                            <tr>
                                <td>Продукт</td>
                                <td>Цена</td>
                                <td>Цена со скидкой</td>
                            </tr>
                            {/*Переберем массив данных с сервера и выведим в таблицу*/}
                            {this.props.apiData.map(arrayDataProduct => {
                                return (
                                    <tr key={arrayDataProduct.id}>
                                        <td>{arrayDataProduct.product}</td>
                                        <td>{arrayDataProduct.price}</td>
                                        <td>{arrayDataProduct.priceDiscount}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <form className="cart__form">
                        <label>
                            <p>Применить скидку</p>
                            <input type="number" ref='inputDiskount' className="cart__form-input"/>
                            Руб
                        </label>                              {/*Прокинем контекст this с помощью bind (для ref)*/}      
                        <button className="cart__form-addBtn"  onClick={this.handleAddDiscount.bind(this)}>Применить</button>
                    </form>    
                </div>
            </div>
        )
    }
};

//Для связи со store
const mapStateToProps = (state) => ({
    id: state.mainReducer.id,
    product: state.mainReducer.product,
    price: state.mainReducer.price,
    priceDiscount: state.mainReducer.priceDiscount,
    discount: state.mainReducer.discount,
    apiData: state.mainReducer.fetchResult //Для сетевого запроса (сюда приходить ответ от сервера)
});

//Передаем thunk компоненты
const mapDispatchToProps = {
    fetchPost: postData,
    fetchGet: getData,
    updateDiscounted: fetchResult //Для вызова action fetchResult - который обновит данные 
}

//Обвернем данный компонент в connect для свзяи с хранилищем
const ComponentAddProduct = connect (
    mapStateToProps,
    mapDispatchToProps
)(AddProduct);

export default ComponentAddProduct;