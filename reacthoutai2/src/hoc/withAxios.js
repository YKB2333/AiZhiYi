import React from 'react';
import axios from 'axios';
axios.defaults.baseURL ='http://localhost:1822';
export default (Com)=>{
    return function(props){
        return <Com axios={axios} {...props} ></Com>
    } 

    
}