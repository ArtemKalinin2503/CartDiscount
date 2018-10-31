import { combineReducers } from 'redux';

//Создаем actions с помощью расширения createAction (каждый action будет получать состояние и изменять его)
export const actionProduct = (productAdd) => {return {type: "Action_Product_Form", payload: productAdd}};
export const actionPrice = (productPrice) => {return {type: "Action_Price_Product", payload: productPrice}};
export const actionPriceDiscount = (priceDiscount) => {return {type: "Action_Price_Discount", payload: priceDiscount}};
export const actiontDiscount = (discount) => {return {type: "Action_Discount", payload: discount}};

//Создадим состояния с помощью метода initState (в каждое состояние передан тип данных которое мы ожидаем записать в каждое состояние)
export const initState = {
  product: '',
  price: 0,
  priceDiscount: 0,
  discount: 0
};

//Создадим редьюсер в котором опишем, что должен делать каждый action
const mainReducer = (state = initState, action) => {
    //С помощью конструкции switch case опишем каждый action
    switch(action.type) {
        case "Action_Product_Form":
            return {
                ...state,
                product: action.payload
        };
        case "Action_Price_Product":
            return {
                ...state,
                price: action.payload
        };  
        case "Action_Price_Discount":
            return {
                ...state,
                priceDiscount: action.payload
        }; 
        case "Action_Discount":
            return {
                ...state,
                discount: action.payload
        };        
        default:
            return state;    
    }
};

//Передаим созданный редьюсер mainReducer в расширение combineReducers
const todoApp = combineReducers ({
    mainReducer
});
  
export default todoApp;  