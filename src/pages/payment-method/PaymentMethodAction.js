import {
  deletePaymentMethod,
  getPaymentMethods,
  postPaymentMethod,
  updatePaymentMethod,
} from "../../helpers/axiosHelpers";
import {
  setPaymentMethods,
  setSelectedPaymentMethod,
} from "./paymentMethodSlice";
import { toast } from "react-toastify";
import { toggleModal } from "../../components/system-state/systemSlice";

export const fetchPaymentMethods = () => async (dispatch) => {
  // call axios to call api and get data and set to state
  const response = await getPaymentMethods();
  console.log(response);
  response.status === "success" && dispatch(setPaymentMethods(response.result));
};

export const fetchSinglePaymentMethod = (_id) => async (dispatch) => {
   // call axios to call api and get data and set to state
   const response = await getPaymentMethods(_id);
   console.log(response);
   response.status === "success" && dispatch(setSelectedPaymentMethod(response.result));
 };

export const postFetchPaymentMethod = (obj) => async (dispatch) => {
  // call axios to call api and get data and set to state
  const responsePromise = postPaymentMethod(obj);
  toast.promise(responsePromise, {
    pending: "Please wait....",
  });
  const response = await responsePromise;
  toast[response.status](response.message);
  response.status === "success" && dispatch(fetchPaymentMethods());
};

export const deleteFetchPaymentMethod = (_id) => async (dispatch) => {
  // call axios to call api and get data and set to state
  const responsePromise = deletePaymentMethod(_id);
  toast.promise(responsePromise, {
    pending: "Please wait....",
  });
  const response = await responsePromise;
  toast[response.status](response.message);
  response.status === "success" && dispatch(fetchPaymentMethods());
};


export const editFetchPaymentMethod = (_id) => async (dispatch) => {
  // call axios to call api and get data and set to state
  dispatch(toggleModal())
  dispatch(fetchSinglePaymentMethod(_id))


};

export const updateFetchPaymentMethod = (_id) => async (dispatch) => {
   // call axios to call api and get data and set to state
   const responsePromise = updatePaymentMethod(_id);
   toast.promise(responsePromise, {
     pending: "Please wait....",
   });
   const response = await responsePromise;
   toast[response.status](response.message);
   response.status === "success" && dispatch(fetchPaymentMethods()) && dispatch(toggleModal());
 };