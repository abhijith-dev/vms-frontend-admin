import axios from 'axios';
import { ENV } from '../configs/config';

let headers = {
    'admin-token':`${localStorage.getItem('token')}`,
}
export async function addDrivers(body,file){
    let response ={}
    let url =`${ENV.API_BASE_URL}${ENV.ADD_DRIVERS}`
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
            response.data=res.data
        }
    })
    .catch(error=>{
        response.error = true
        response.message = error.response.data.message
    })
    let cusheaders = headers
    let img_url = `${ENV.API_BASE_URL}${ENV.ADD_PROFILE_PICTURE}`
    cusheaders.id = response.data.id
    let data = new FormData() 
    data.append('file',file)
    await axios({
       url:img_url,
       method:'POST',
       headers:cusheaders,
       data:data
    })
    return response
}


export async function editDrivers(body,files,id){
    let response ={}
    let url =`${ENV.API_BASE_URL}${ENV.EDIT_DRIVER}/${id}`
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
    if(!files === ''){
        let cusheaders = headers
        let img_url = `${ENV.API_BASE_URL}${ENV.ADD_PROFILE_PICTURE}`
        cusheaders.id = id
        let data = new FormData() 
        data.append('file',files)
        await axios({
           url:img_url,
           method:'POST',
           headers:cusheaders,
           data:data
        }) 
    }
    return response
}

export async function fetchDriversDetails(){
    let response ={}
    let url1 =`${ENV.API_BASE_URL}${ENV.FETCH_ALL_DRIVERS}`
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
            response.d_total = res.data.length
            response.all_drivers = res.data
        }
    })
    .catch(error=>{
        response.error = true
    })

    let url2 =`${ENV.API_BASE_URL}${ENV.FETCH_ALL_DRIVERS}`
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
            response.ndm_total = res.data.length
        }
    })
    .catch(error=>{
        response.error = true
    })
    response.dm_total = parseInt(response.d_total-response.ndm_total)
    return response 
}

export async function deleteDrivers(id){
   let url = `${ENV.API_BASE_URL}${ENV.DELETE_DRIVER}/${id}`
   let method = 'DELETE'
   await axios({
       url,
       method,
       headers
   })
}