import { getCustomers, getOrders } from "../../helpers/axiosHelpers";
import { setOrders } from "./orderSlice";

export const getOrdersAction = _id =>async dispatch=>{
    const {status,orders} =  await getOrders(_id)
    status ==='success' && dispatch(setOrders(orders))
}


