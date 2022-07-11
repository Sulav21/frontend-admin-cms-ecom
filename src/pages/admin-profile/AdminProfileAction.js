import {
  updateAdminUser,
  requestOtp,
  updatePassword,
  updateAdminPasswordFromProfile,
} from "../../helpers/axiosHelpers";
import {
  setUser,
  setPassResetResponse,
  setIsLoading,
  setPassResettingEmail
} from "./AdminProfileSlice";
import { toast } from "react-toastify";

export const updateAdminProfileAction = (obj) => async (dispatch) => {
  const promiseResponse = updateAdminUser(obj);

  toast.promise(promiseResponse, { pending: "Please wait ..." });

  const { status, message, user } = await promiseResponse;

  toast[status](message);
  status === "success" && dispatch(setUser(user));
};

export const requestPassResetOTPAction = (obj) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await requestOtp(obj);
  dispatch(setPassResettingEmail(obj.email))
  dispatch(setPassResetResponse(response));
};

export const resetPassAction = (obj) => async (dispatch) => {
  const promiseResponse = updatePassword(obj);
  toast.promise(promiseResponse, { pending: "Please wait ..." });

  const { status,message } = await promiseResponse;

  toast[status](message);
};

export const updatePassAction = (obj) => async (dispatch) => {
  const promiseResponse = updateAdminPasswordFromProfile(obj);
  toast.promise(promiseResponse, { pending: "Please wait ..." });

  const { status,message } = await promiseResponse;

  toast[status](message);
};

