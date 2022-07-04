import { postUser,LoginUser } from '../../helpers/axiosHelpers.js'
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
    dispatch(setUser(data.user))
}
   
   data.status==='error' && toast[data.status](data.message)
    dispatch(responseResolved(data))

}