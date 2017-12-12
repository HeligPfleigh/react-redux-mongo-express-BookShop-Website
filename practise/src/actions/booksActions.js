"use strict"
import axios from 'axios';

export function postBooks(books){
    // return ({
    //     type: 'POST_BOOK',
    //     payload: books
    // })
    return function(dispatch){
        axios.post("/api/books", books)
        .then(function(res){
            dispatch({
                type: 'POST_BOOK',
                payload: res.data
            })
        })
        .catch(function(err){
            dispatch({
                type: 'POST_BOOK_REJECTED',
                payload: "There was an error while posting a new book!"
            })
        })
    }
}

export function deleteBook(bookID){
    // return ({
    //     type: 'DELETE_BOOK',
    //     payload: bookID
    // })
    return function(dispatch){
        axios.delete("/api/books/" + bookID)
        .then(function(res){
            dispatch({
                type: "DELETE_BOOK",
                payload: bookID
            })
        })
        .catch(function(err){
            dispatch({
                type: "DELETE_BOOK_REJECTED",
                payload: err
            })
        })
    }
}

export function updateBook(book){
    return({
        type: 'UPDATE_BOOK',
        payload: book
    })
}

export function getBooks(){
    // return ({
    //     type: 'GET_BOOKS'
    // })
    return function(dispatch){
        axios.get('/api/books')
        .then(function(res){
            dispatch({
                type: 'GET_BOOKS',
                payload: res.data
            })
        })
        .catch(function(err){
            dispatch({
                type: 'GET_BOOKS_REJECTED',
                payload: err
            })
        })
    }
}

export function resetButton(){
    return({
        type: 'RESET_BUTTON',
    })
}