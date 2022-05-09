import axios from 'axios';
import { ENV } from '../configs/config';

let headers = {
    'admin-token':`${localStorage.getItem('token')}`,
}
export async function addVehicles(body){
    let response ={}
    let url =`${ENV.API_BASE_URL}${ENV.ADD_VEHICLES}`
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


export async function editVehicles(body,id){
    let response ={}
    let url =`${ENV.API_BASE_URL}${ENV.EDIT_VEHICLES}/${id}`
    let method='PUT'
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

export async function fetchVehicleDetails(){
    let response ={}
    let url1 =`${ENV.API_BASE_URL}${ENV.FETCH_ALL_VEHICLES}`
    let method='GET'
    await axios({
      params:{
          type:1
      },
      url:url1,
      method,
      headers
    })
    .then(res=>{
        if(res.status === 200){
            response.error = false
            response.v_total = res.data.length
            response.all_vehicles = res.data
        }
    })
    .catch(error=>{
        response.error = true
    })

    let url2 =`${ENV.API_BASE_URL}${ENV.FETCH_ALL_VEHICLES}`
    await axios({
        params:{
            type:2
        },
        url:url2,
        method,
        headers
    })
    .then(res=>{
        if(res.status === 200){
            response.error = false
            response.nvm_total = res.data.length
        }
    })
    .catch(error=>{
        response.error = true
    })
    response.vm_total = parseInt(response.v_total-response.nvm_total)
    return response 
}

export async function deleteVheicles(id){
    let url = `${ENV.API_BASE_URL}${ENV.DELETE_DRIVER}/${id}`
    let method = 'DELETE'
    await axios({
        url,
        method,
        headers
    })
}

export async function fecthDrivers(){
    let response
    let url = `${ENV.API_BASE_URL}${ENV.FETCH_ALL_DRIVERS}/`
    let method = 'GET'
    await axios({
        params:{
          type:2
        },
        url,
        method,
        headers
    })
    .then(res=>{
        response =  res.data
    })
    return response
}

export async function mapping(body){
    console.log(body)
    let response={}
    let url = `${ENV.API_BASE_URL}${ENV.MAPPING}/`
    let method = 'POST'
    await axios({
        url,
        method,
        headers,
        data:body
    })
    .then(res=>{
        if(res.status === 200){
            response.error = false
        }
    })
    .catch(error=>{
        console.log(error)
        response.error = true
    })
    return response
}

export async function deleteVehicle(id){
    let url = `${ENV.API_BASE_URL}${ENV.DELETE_VEHICLE}/${id}`
    let method = 'DELETE'
    await axios({
        url,
        method,
        headers
    })
 }