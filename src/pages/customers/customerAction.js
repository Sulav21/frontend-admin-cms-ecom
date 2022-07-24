import { getCustomers } from "../../helpers/axiosHelpers";
import { setCustomers } from "./customerSlice";

export const getCustomersAction = _id =>async dispatch=>{
    const {status,customers} =  await getCustomers(_id)
    status ==='success' && customers.length && dispatch(setCustomers(customers))
}


