import React, { Component } from 'react';
import { connect } from 'react-redux'; //connect нужен для связи компонента со store
import {postData, getData, actiontDiscount} from '../reducers/';
import { store } from '../store';

//Компонент Корзина
class AddProduct extends Component {


    //При загрузке получим данные 
    componentDidMount() {
        this.props.fetchGet(); //Вызов thunk getData
    }

    //Клик по кнопке Добавить
    addProduct() {
        let inputValuePriceProduct = parseInt(this.refs.inputProductPrice.value); //Преобразуем полученное значение в число 
        let data = {
            product: this.refs.inputProductName.value, //Значение input Продукт
            price: inputValuePriceProduct, //Значение input Цена
            priceDiscount: inputValuePriceProduct
        }
        this.props.fetchPost(data); //Вызов thunk getPost
        this.props.fetchGet(); //Вызов thunk getData
    };

    //Клик по кнопке Применить скидку
    handleAddDiscount(e) {
        e.preventDefault();
        let inputValuePriceDiscount = parseInt(this.refs.inputDiskount.value); //Преобразуем полученное значение в число 

        {this.props.apiData.map(testArray => {
            return (
                store.dispatch(actiontDiscount(testArray.priceDiscount/inputValuePriceDiscount))
            )
        })}        
    };  

    render() {
        return (
            <div className="formAddProduct__wrapper">
                <p className="formAddProduct__title">Добавить продукт</p>
                <form className="formAddProduct">
                    <label>
                        Продукт
                        <input type="text" ref='inputProductName' className="formAddProduct__input" />    
                    </label>
                    <label>
                        Цена
                        <input type="number" ref="inputProductPrice" className="formAddProduct__input"/>
                    </label>
                </form>                                    {/*Прокинем контекст this с помощью bind (для ref)*/}     
                <button className="formAddProduct__btnAdd" onClick={this.addProduct.bind(this)}>Добавить</button>
                <div className="cart__wrapper">
                    <p className="cart__title">Корзина</p>
                    <table className="cart_table">
                        <tbody>
                            <tr>
                                <td>Продукт</td>
                                <td>Цена</td>
                                <td>Цена со скидкой</td>
                            </tr>
                            {this.props.apiData.map(arrayDataProduct => {
                                return (
                                    <tr key={arrayDataProduct.id}>
                                        <td>{arrayDataProduct.product}</td>
                                        <td>{arrayDataProduct.price}</td>
                                        <td>{this.props.discount}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <form className="cart__form">
                        <label>
                            Применить скидку
                            <input type="number" ref='inputDiskount' className="cart__form-input"/>
                            Рублей
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

//Передаем thunk компонент
const mapDispatchToProps = {
    fetchPost: postData,
    fetchGet: getData
}

//Обвернем данный компонент в connect для свзяи с хранилищем
const ComponentAddProduct = connect (
    mapStateToProps,
    mapDispatchToProps
)(AddProduct);

export default ComponentAddProduct;