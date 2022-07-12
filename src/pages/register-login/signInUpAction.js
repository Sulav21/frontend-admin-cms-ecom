import { postUser,LoginUser, getAdminUser, requestNewAccessJWT } from '../../helpers/axiosHelpers.js'
import  {isPending,responseResolved} from './signInUpSlice.js'
import { toast } from 'react-toastify';
import { setUser } from '../admin-profile/AdminProfileSlice.js';

export const postUserAction= (user) => async (dispatch) =>{
    dispatch(isPending())

    // call axios to call api
    const promiseData =  postUser(user)
    

    toast.promise(promiseData,{
        pending:"Please wait....",
        
    })

    const data = await promiseData

    console.log(data)
    toast[data.status](data.message)
    dispatch(responseResolved(data))

}

export const postLoginUser = (user)=> async (dispatch)=>{
    dispatch(isPending())
    // call axios helper to call api
    const promiseData =  LoginUser(user)
    

    toast.promise(promiseData,{
        pending:"Please wait....",
       
    })

    const data = await promiseData

if (data.status==='success'){
    console.log(data.user)
    sessionStorage.setItem("accessJWT", data.jwts.accessJWT)
    localStorage.setItem("refreshJWT", data.jwts.refreshJWT)

    dispatch(setUser(data.user))
    
}
   
   data.status==='error' && toast[data.status](data.message)
    dispatch(responseResolved(data))

}

const fetchUser =  (accessJWT)=>async (dispatch)=>{
    // call axios to fetch user
    const response = await getAdminUser()
    response.status==='success' && dispatch(setUser(response.user))
}
export const autoAdminLogin=()=>async (dispatch)=>{
    const accessJWT = sessionStorage.getItem('accessJWT')
    const refreshJWT = localStorage.getItem('refreshJWT')

    if(accessJWT){
        dispatch(fetchUser())
        return
    }else if (refreshJWT){
        // if accessJWT exists, fetch user and mount user in our state
    // else
    // if refreshJWT exists, fetch new accessJWT and fetch the user
      const token = await requestNewAccessJWT()
      token ? dispatch(fetchUser()) : dispatch(adminLogout())
    }else{  
        dispatch(adminLogout())
    }
    
}

export const adminLogout=()=>(dispatch)=>{
    sessionStorage.removeItem('accessJWT')
    localStorage.removeItem('refreshJWT')
    dispatch(setUser({}))
}