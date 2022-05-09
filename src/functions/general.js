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

export async function bookingDetails(body){
    let response ={}
    await axios({
       url:`${ENV.API_BASE_URL}${ENV.FETCH_BOOKINGS}`,
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

export async function fuelDetails(){
    let response ={}
    await axios({
       url:`${ENV.API_BASE_URL}${ENV.FETCH_FUEL}`,
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

export async function chartData(){
    let response ={}
    await axios({
       url:`${ENV.API_BASE_URL}${ENV.FETCH_CHART_DATA}`,
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


export async function downloadFile(){
    let response ={}
    await axios({
       url:`${ENV.API_BASE_URL}${ENV.DOWNLOAD_FILE}`,
       method:'POST',
       headers
   })
   .then(res=>{
       console.log(res.data)
       response = res.data
   })
   .catch(error=>{
       response = []       
   })

   return response
}

export async function fetchVehicleAllDetails(){
    let response ={}
    await axios({
        params:{
            type:1
        },
       url:`${ENV.API_BASE_URL}${ENV.FETCH_ALL_VEHICLES}`,
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

export async function addFuels(body){
    let response ={}
    let url =`${ENV.API_BASE_URL}${ENV.ADD_FUEL}`
    let method='POST'
    await axios({
      url,
      method,
      headers,
      data:body
    })
    .then(res=>{
        if(res.status === 201){
            response.error = false
            response.message = 'success'
        }
    })
    .catch(error=>{
        response.error = true
        response.message = error.response.data.message
    })
    return response
}

export async function fetchVehicleAllDetailsToTrack(){
    let response ={}
    await axios({
       url:`${ENV.API_BASE_URL}${ENV.FETCH_ALL_TRACKING_VEHICLES}`,
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

export async function fetchCordsByBookingId(id){
    let response ={}
    await axios({
       url:`${ENV.API_BASE_URL}${ENV.FETCH_ALL_CORDS}/${id}`,
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

export async function fetchTotalAmount(){
    let response ={}
    await axios({
       url:`${ENV.API_BASE_URL}${ENV.TOTAL_BALANCE}`,
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
