import { setProducts,setSelectedProduct } from "./productSlice";
import {toast} from 'react-toastify'
import {getProducts,postProducts,deleteProduct,updateProduct, getSingleProduct} from  "../../helpers/axiosHelpers";


export const fetchProductsAction=()=>async(dispatch)=>{
    // call axios for the help

    const {status,products} = await getProducts()

    status === 'success' && products.length && dispatch(setProducts(products))
}

export const fetchSingleProductAction=(_id)=>async(dispatch)=>{
  // call axios for the help

  const {status,products} = await getSingleProduct(_id)

  status === 'success' && dispatch(setSelectedProduct(products))
}

export const postProductAction = catObj =>async dispatch =>{
   const response =  postProducts(catObj)
   toast.promise(response,{
    pending: "Please wait ....."
   })
  const result = await response
  toast [result.status](result.message)
  result.status === 'success' && dispatch(fetchProductsAction())
}

export const deleteProductAction = (ids) =>async dispatch =>{
    const response =  deleteProduct(ids)
    toast.promise(response,{
     pending: "Please wait ....."
    })
   const result = await response
   toast [result.status](result.message)
   result.status === 'success' && dispatch(fetchProductsAction())
 }

 
export const updateProductAction = catObj =>async dispatch =>{
  const response =  updateProduct(catObj)
  toast.promise(response,{
   pending: "Please wait ....."
  })
 const result = await response
 toast [result.status](result.message)
//  result.status === 'success' && dispatch(fetchProductsAction())
 result.status === 'success' && dispatch(setSelectedProduct(result))

}