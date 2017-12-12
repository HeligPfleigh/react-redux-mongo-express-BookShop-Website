"use strict"

function totals(payloadArr){
    const totalAmount = payloadArr.map(function(cartArr){
        return cartArr.price*cartArr.quantity;
    }).reduce(function(a, b){
        return a + b;
    }, 0);

    const totalQty = payloadArr.map(function(qty){
        return qty.quantity;
    }).reduce(function(a,b){
        return a + b;
    }, 0);

    return {
        amount:totalAmount.toFixed(2),
        quantity: totalQty
    };
}

let cartReducers = (state={cart:[]}, action) => {
    switch(action.type){
        case "CART_TO_ADD":
        {
            return {...state, 
                cart:action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).quantity
            }
        }
        case "DELETE_CART_ITEM":
        {
            return {...state, 
                cart:action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).quantity
            }
        }
        case "UPDATE_CART":
        {
            // const currentBookToUpdate = [...state.cart];
            // const indexToUpdate = currentBookToUpdate.findIndex((book) => {
            //     return book._id === action._id;
            // });
            // const newBookToUpdate = { 
            //     ...currentBookToUpdate[indexToUpdate], 
            //     quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit 
            // };
            // let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate),
            //         newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)];
            return {...state, 
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).quantity
            };
        }
        case "GET_CART":
        {
            return {...state, 
                cart:action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).quantity
            }
        }
        default:
            return state;
    }
}

export default cartReducers;