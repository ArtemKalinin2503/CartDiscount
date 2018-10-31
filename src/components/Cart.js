import React, { Component } from 'react';
import { connect } from 'react-redux'; //connect нужен для связи компонента со store
import store from '../store';
import { actionProduct, actionPrice, actionPriceDiscount, actiontDiscount} from '../reducers/'

//Компонент Корзина
class Cart extends Component {

    //Компонент componentDidMount сработает сразу после загрузки
    componentDidMount() {
       
    }

    handleAddDiscount = event => {

    };

    render() {
        return (
            <div className="cart__wrapper">
                <p className="cart__title">Корзина</p>
                <table className="cart_table">
                    <tbody>
                        <tr>
                            <td>Продукт</td>
                            <td>Цена</td>
                            <td>Цена со скидкой</td>
                        </tr>
                        <tr>
                            <td className="cart__nameProduct"></td>
                            <td className="cart__price"></td>
                            <td className="cart__price__discount"></td>
                        </tr> 
                    </tbody>
                </table>
                <form className="cart__form">
                    <label>
                        Применить скидку
                        <input type="number" className="cart__form-input"/>
                        Рублей
                    </label>
                    <button className="cart__form-addBtn" onClick={this.handleAddDiscount}>Применить</button>
                </form>    
            </div>
        )
    }
};

//Для связи со store
const mapStateToProps = (state,ownProps={}) => ({
    product: state.mainReducer.product,
    price: state.mainReducer.price,
    priceDiscount: state.mainReducer.priceDiscount,
    discount: state.mainReducer.discount,
});


//Обвернем данный компонент в connect для свзяи с хранилищем
const ComponentCart = connect (
    mapStateToProps,
)(Cart);

export default ComponentCart;