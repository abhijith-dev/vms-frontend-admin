import axios from 'axios';

let headers = {
    'content-type':'applicaton/json',
    'admin-token':'Bearer fdjhbfbfdbbfjdf'
}
export async function addVehicles(body){
    let response ={}
    let url =''
    let method=''
    await axios({
      url,
      headers,
      method,
      data:body
    })
    .then(res=>{
        if(res.status === 200){
            response.error = false
            response.message = 'success'
        }
    })
    .catch(error=>{
        response.error = true
        response.message = error.response.data.exception
    })
}


export async function editVehicles(body){
    let response ={}
    let url =''
    let method=''
    await axios({
      url,
      headers,
      method,
      data:body
    })
    .then(res=>{
        if(res.status === 200){
            response.error = false
            response.message = 'success'
        }
    })
    .catch(error=>{
        response.error = true
        response.message = error.response.data.exception
    })
}