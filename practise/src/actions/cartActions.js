"use strict"
import axios from 'axios';

export function getCart(cart){
    return function(dispatch){
        axios.get("/api/cart")
        .then(function(res){
            dispatch({
                type:"GET_CART",
                payload: res.data
            })
        })
        .catch(function(err){
            dispatch({
                type:"GET_CARD_REJECTED",
                msg:"error when getting the cart from session"
            })
        })
    }
}

export function addToCart(cart){
    // return ({
    //     type: 'CART_TO_ADD',
    //     payload: book
    // })
    return function(dispatch){
        axios.post("/api/cart", cart)
        .then(function(res){
            dispatch({
                type: 'CART_TO_ADD',
                payload: res.data
            })
        })
        .catch(function(err){
            dispatch({
                type: 'CART_TO_ADD_REJECTED',
                payload: err
            })
        })
    }
}

export function deleteCartItem(cart){
    // return ({
    //     type: 'DELETE_CART_ITEM',
    //     payload: cart
    // })
    return function(dispatch){
        axios.post("/api/cart", cart)
        .then(function(res){
            dispatch({
                type: 'DELETE_CART_ITEM',
                payload: cart
            })
        })
        .catch(function(err){
            dispatch({
                type: 'DELETE_CART_ITEM_REJECTED',
                msg: 'error when deleting an item from the cart'
            })
        })
    }
}

export function updateCart(_id, unit, cart){
    const currentBookToUpdate = cart;
    const indexToUpdate = currentBookToUpdate.findIndex((book) => {
        return book._id === _id;
    });
    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
    };
    let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate),
        newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)];

    // return ({
    //     type: 'UPDATE_CART',
    //     payload: cartUpdate
    // })

    return function(dispatch){
        axios.post("/api/cart", cartUpdate)
        .then(function(res){
            dispatch({
                type: 'UPDATE_CART',
                payload: res.data
            })
        })
        .catch(function(err){
            dispatch({
                type: 'UPDATE_CART_REJECTED',
                payload: err
            })
        })
    }
}

