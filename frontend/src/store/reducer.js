import * as actionTypes from './actions';

const initialState = {
    cartData: [],
    dataPassing: [],
    cart: 0,
    price: 0,
    isAuthenticated: false,
    userData: {},
    shopFilter: { // not implemented
        value: [0, 2000],
        checkboxDiscount: false,
        checkboxValue: false,
    },
    production: "" //"http://localhost:5000" // SET for LOCALHOST or "" !! heroku deploy 
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            console.log(action.payload)
            return {
                ...state,
                isAuthenticated: action.Payload,
            }
        case actionTypes.REMOVE_WHOLE_CART_DATA:
            return {
                ...state,
                cartData: [],
                cart: 0,
            }
        case actionTypes.ADD_DATA:
            return {
                ...state,
                cartData: [ 
                    ...state.cartData, 
                    action.payload 
                ],
            }
            //WORK
        case actionTypes.ADD_WHOLE_CART:
            let data = action.payload;
            let newPrice = data.reduce((acc, {dprice, price, count}) => acc + (
                dprice ? dprice * count : price * count
            ), 0 );
            let newCart = data.reduce((acc, {count}) => acc + count, 0 );
            return {
                ...state,
                cartData: [
                    ...state.cartData,
                    ...action.payload,
                ],
                cart: state.cart + newCart,
                price: newPrice,
            }
            // WORK !!!
        case actionTypes.ADD_SAME_CART_ITEM:
            // check wich item has same UID and it only updates the count +1
            let newDataUid = action.payload;
            let oldDataArray = [...state.cartData]
            let newDataArray = oldDataArray.map(item => item.uid === newDataUid ? { ...item, count: item.count+1 } : item )
            return {
                ...state,
                cartData: newDataArray
            }
        case actionTypes.REMOVE_SAME_CART_ITEM:
            // check wich item has same UID and it only updates the count -1
            let newDataUidR = action.payload;
            let oldDataArrayR = [...state.cartData]
            let newDataArrayR = oldDataArrayR.map(item => item.uid === newDataUidR ? { ...item, count: item.count-1 } : item )
            return {
                ...state,
                cartData: newDataArrayR
            }
            //work
        case actionTypes.REMOVE_WHOLE_ITEM_FROM_CART:
            const idRWIFC = action.payload._id;
            const allDataRWIFC = [...state.cartData]
            // get COUNT and remove from cartCOUNTER wich is cart
            const newCount = allDataRWIFC.filter(item => item._id === idRWIFC);
            // removes WHOLE ITEM from DB
            const newDataRWIFC = allDataRWIFC.filter(item => item._id !== idRWIFC );
            return {
                ...state,
                cart: state.cart - action.payload.count,
                cartData: newDataRWIFC,
                price: state.price - (newCount[0].dprice ? newCount[0].dprice * newCount[0].count : newCount[0].price * newCount[0].count),
            }
        case actionTypes.ADD_CART:
            return {
                ...state,
                cart: state.cart + 1,
            }
        case actionTypes.REMOVE_CART:
            return {
                ...state,
                cart: state.cart - 1,
            }
        case actionTypes.ADD_PRICE:
            return {
                ...state,
                price: state.price + action.payload,
            }
        case actionTypes.REMOVE_PRICE:
            return {
                ...state,
                price: state.price - action.payload,
            }
            //work
        case actionTypes.ADD_QUANTITY_FROM_SELECTED_ITEM:
            console.log(action.payload)
            let uid = action.payload.item.uid;
            let count = action.payload.quantity
            let allData = [...state.cartData]
            //check if item same
            const checkElement = (element) => element.uid === uid;
            const checkSame = allData.some(checkElement)
            // we make new array of obj.'s 
            let newData;
            if (checkSame) {
                newData = state.cartData.map(item => item.uid === uid ? { ...item, count: item.count + count } : item )
            } else {
                newData = [ ...allData, { ...action.payload.item, count: count } ];
            }
            return {
                ...state,
                cartData: newData,
                price: state.price + ( action.payload.item.dprice ? action.payload.item.dprice * count : action.payload.item.price * count ),
                cart: state.cart + count,
            }
        case actionTypes.DELETE_ALL_FROM_CART:
            return {
                ...state,
                price: 0,
                cartData: [],
                cart: 0,
            }
        case actionTypes.DATA_PASSING:
            return {
                ...state,
                dataPassing: action.payload,
            }
        case actionTypes.SHOP_FILTER:
            let check = action.payload;
            console.log(check);
            return {
                ...state,
                // shopFilter: {
                //     ...state.shopFilter,
                //     action.payload,
                // },
            }
        default:
            console.log("default state reducer")
            return state;
    }
};

export default reducer;