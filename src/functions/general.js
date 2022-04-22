import axios from 'axios';
import {ENV} from '../configs/config'
let headers={
    'content-type':'application/json',
    'admin-token': `${localStorage.getItem('token')}`
}

export async function loadOrder(){
    let response ={}
    console.log(`${ENV.API_BASE_URL}${ENV.FETCH_ORDERS}`)
   await axios({
       url:`${ENV.API_BASE_URL}${ENV.FETCH_ORDERS}`,
       method:'GET',
       headers
   })
   .then(res=>{
       response.error = false
       response.data = res.data
   })
   .catch(error=>{
       response.error = true
       response.message = error.response.data.exception       
   })

   return response
}

export async function verification(body){
    let response ={}
   await axios({
       url:`${ENV.API_BASE_URL}${ENV.ADMIN_VERIFICATION}`,
       method:'POST',
       headers,
       data:body
   })
   .then(res=>{
       response.error = false
       response.token = res.data.access_token
   })
   .catch(error=>{
       response.error = true
       response.message = error.response.data.exception       
   })

   return response
}

export async function customerDetails(body){
    let response ={}
    await axios({
       url:`${ENV.API_BASE_URL}${ENV.FETCH_CUSTOMER}`,
       method:'GET',
       headers
   })
   .then(res=>{
       response = res.data
   })
   .catch(error=>{
       response = []       
   })

   return response
}
