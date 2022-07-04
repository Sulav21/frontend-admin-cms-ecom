import { updateAdminUser } from '../../helpers/axiosHelpers'
import {setUser} from './AdminProfileSlice'
import {toast} from 'react-toastify'

export const updateAdminProfileAction = (obj) => async dispatch=>{
    const promiseResponse=  updateAdminUser(obj)

    toast.promise(promiseResponse, {pending:'Please wait ...'})
    
    const {status,message,user} = await promiseResponse

    toast[status](message)
    status === 'success' && dispatch(setUser(user))
}