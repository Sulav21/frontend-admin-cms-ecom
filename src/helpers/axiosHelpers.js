import axios from "axios";

const rootUrlApi = "http://localhost:8000/api/v1";
const adminEp = rootUrlApi + "/admin";
const catAPI = rootUrlApi + '/category'

// Admin APIS

const apiProcessor = async({method,url,dataObj})=>{
  try{
  const {data} = await axios({
    method,
    url,
    data:dataObj
  })
return data
  }catch(err){
      console.log(err)
      let message = err.message
      if(err.response && err.response.data){
        message=err.response.data.message
      }
      return{
          status:"error",
          message
      }
  }
}
export const postUser =  (dataObj) =>{
  const url = adminEp
  return apiProcessor({method:'post',url,dataObj})
  
  }

export const postUserVerification =  (dataObj) =>{
  const url = adminEp + '/email-verification'
  return apiProcessor({method:'post',url,dataObj})
  
  }

export const LoginUser =  (dataObj) =>{
const url = adminEp + '/login'
return apiProcessor({method:'post',url,dataObj})

}


// Categories API

export const getCategories =  () =>{
  const url = catAPI
  return apiProcessor({method:'get',url})
  }

  
export const postCategories =  (dataObj) =>{
  const url = catAPI
  return apiProcessor({method:'post',url,dataObj})
  }

  export const deleteCategory =  (_id) =>{
    const url = catAPI
    return apiProcessor({method:'delete',url,dataObj: {_id}})
    }
    
  
  