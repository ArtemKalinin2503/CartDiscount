import React, { Component } from 'react';
import { connect } from 'react-redux'; //connect нужен для связи компонента со store
import store from '../store';
import Cart from './Cart';
import { actionProduct, actionPrice, actionPriceDiscount, actiontDiscount} from '../reducers/'

//Компонент Корзина
class AddProduct extends Component {

    //Компонент componentDidMount сработает сразу после загрузки
    componentDidMount() {
       console.log(store.getState());
       console.log(this.props.price);
    }

    handleAddProduct = event => {

    };

    render() {
        return (
            <div className="formAddProduct__wrapper">
                <p className="formAddProduct__title">Добавить продукт</p>
                <form className="formAddProduct">
                    <label>
                        Продукт
                        <input type="text" className="formAddProduct__input"/>
                    </label>
                    <label>
                        Цена
                        <input type="number" className="formAddProduct__input"/>
                    </label>
                    <button className="formAddProduct__btnAdd" onClick={this.handleAddProduct}>Добавить</button>
                </form>
                {/*Компонент Корзина*/}
                <Cart />
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
const ComponentAddProduct = connect (
    mapStateToProps,
)(AddProduct);

export default ComponentAddProduct;