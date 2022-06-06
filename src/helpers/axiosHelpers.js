import axios from "axios";

const rootUrlApi = "http://localhost:8000/api/v1";
const adminEp = rootUrlApi + "/admin";


export const postUser = async(userObj) => {
  try {
    const { data } = await axios.post(adminEp, userObj);
    console.log(data)
    return data;

  } catch (err) {
    console.log(err);
    return {
      status: "error",
      message: err.message,
    };
  }
};


export const postUserVerification = async (obj) =>{
    try{
     
      const {data} = await axios.post(adminEp+"/email-verification",obj)
    return data
    }catch(err){
        console.log(err)
        return{
            status:"error",
            message:err.message
        }
    }
}