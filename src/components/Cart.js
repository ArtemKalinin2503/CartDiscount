import React, { Component } from 'react';
import { connect } from 'react-redux'; //connect нужен для связи компонента со store
import store from '../store';
import { actionProduct, actionPrice, actionPriceDiscount, actiontDiscount} from '../reducers/'

//Компонент Корзина
class Cart extends Component {

    render() {
        return (
            <tr>
                <td className="cart__nameProduct"></td>
                <td className="cart__price"></td>
                <td className="cart__price__discount"></td>
            </tr> 
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