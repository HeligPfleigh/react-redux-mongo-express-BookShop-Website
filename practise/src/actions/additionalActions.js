"use strict"

import axios from 'axios';

export function downloadImage(){
    return function(dispatch){
        axios.get('/api/downloadimage')
        .then(function(res){
            console.log(res);
        })
        .catch(function(err){
            console.log(err);
        })
    }
}

export function uploadImage(formData){
    return function(dispatch){
        axios.post('/api/uploadimage', formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function(res){
            if(res.data === "UPLOAD_SUCCESSFULLY")
                console.log("Upload success!");
        })
        .catch(function(err){
            console.log("An error occur when upload image: " + err);
        })
    }
}