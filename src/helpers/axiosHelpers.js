import axios from "axios";
import { adminLogout } from "../pages/register-login/signInUpAction";

const rootUrlApi = "http://localhost:8000/api/v1";
const adminEp = rootUrlApi + "/admin";
const catAPI = rootUrlApi + "/category";
const productAPI = rootUrlApi + "/products";
const paymentMethodAPI = rootUrlApi + "/payment-method";

// Admin APIS

const apiProcessor = async ({ method, url, dataObj, headers }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: dataObj,
      headers,
    });
    return data;
  } catch (err) {
    console.log(err);
    let message = err.message;
    if(err.response && err.response.status===401){
      sessionStorage.removeItem('accessJWT')
      localStorage.removeItem('refreshJWT')
      return {
        status:"error",
        message:"Unauthenticated"
      }
    }
    if (err.response && err.response.data) {
      message = err.response.data.message;
      
    }

    if (message === "jwt expired!") {
      // call the api to get new jwt and re-call the api processor itself
     const accessJWT = await requestNewAccessJWT()
      if (accessJWT) {
        
        return apiProcessor({
          method,
          url,
          dataObj,
          headers: {
            Authorization: accessJWT,
          },
        });
      }
    }

    return {
      status: "error",
      message,
    };
  }
};

export const requestNewAccessJWT=async()=>{
  const { accessJWT } = await apiProcessor({
    method: "get",
    url: adminEp+"/accessjwt",
    headers: {
      Authorization: localStorage.getItem("refreshJWT"),
    },
  });
  sessionStorage.setItem("accessJWT", accessJWT);
  return accessJWT
}
export const getAdminUser = () => {
  const url = adminEp;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postUser = (dataObj) => {
  const url = adminEp;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postUserVerification = (dataObj) => {
  const url = adminEp + "/email-verification";
  return apiProcessor({ method: "post", url, dataObj });
};

export const LoginUser = (dataObj) => {
  const url = adminEp + "/login";
  return apiProcessor({ method: "post", url, dataObj });
};

export const updateAdminUser = (dataObj) => {
  const url = adminEp;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const requestOtp = (dataObj) => {
  const url = adminEp + "/otp-request";
  return apiProcessor({ method: "post", url, dataObj });
};
// reset password
export const updatePassword = (dataObj) => {
  const url = adminEp + "/password";
  return apiProcessor({ method: "patch", url, dataObj });
};

// update password from admin profile
export const updateAdminPasswordFromProfile = (dataObj) => {
  const url = adminEp + "/update-password";
  return apiProcessor({
    method: "patch",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};
// Categories API

export const getCategories = () => {
  const url = catAPI;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postCategories = (dataObj) => {
  const url = catAPI;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const deleteCategory = (_id) => {
  const url = catAPI;
  return apiProcessor({
    method: "delete",
    url,
    dataObj: { _id },
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const updateCategory = (dataObj) => {
  const url = catAPI;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// Products API

export const getProducts = () => {
  const url = productAPI;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const getSingleProduct = (_id) => {
  const url = productAPI + "/" + _id;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postProducts = (dataObj) => {
  const url = productAPI;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const deleteProduct = (dataObj) => {
  const url = productAPI;
  return apiProcessor({
    method: "delete",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const updateProduct = (dataObj) => {
  const url = productAPI;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// ====payment methods

// Get payment method
export const getPaymentMethods = (_id) => {
  const url = _id ? paymentMethodAPI + "/" + _id : paymentMethodAPI;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// Post payment method
export const postPaymentMethod = (dataObj) => {
  const url = paymentMethodAPI;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// delete payment method
export const deletePaymentMethod = (_id) => {
  const url = paymentMethodAPI + "/" + _id;
  return apiProcessor({
    method: "delete",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// update payment method
export const updatePaymentMethod = (dataObj) => {
  const url = paymentMethodAPI;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};
