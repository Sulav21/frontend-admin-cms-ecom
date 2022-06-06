import { postUser } from '../../helpers/axiosHelpers.js'
import  {isPending,responseResolved} from './signInUpSlice.js'
import { toast } from 'react-toastify';

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